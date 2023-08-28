/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { euphoniumReducer } from "../reducer/euphonium.reducer";
import { EuphoniumRepo } from "../services/repository/euphonium.repo";
import { useEuphonium } from "./use.euphonium.hook";
import { paginationReducer } from "../../../common/reducer/page.reducer/page.reducer";
import { filterReducer } from "../../../common/reducer/filter.reducer/filter.reducer";

jest.mock("../services/firebase/firebase-user");
const mockFile = new File(["image"], "test.jpeg");

const mockRepo: EuphoniumRepo = {
  url: "",
  loadEuphoniums: jest.fn(),
  getEuphonium: jest.fn(),
  deleteEuphonium: jest.fn(),
  createEuphonium: jest.fn(),
  updateEuphonium: jest.fn(),
  loadEuphoniumsPaginated: jest.fn(),
};
const mockStore = configureStore({
  reducer: {
    euphoniums: euphoniumReducer,
    page: paginationReducer,
    filter: filterReducer,
  },
  preloadedState: {
    euphoniums: [
      {
        id: "1",
        alias: "test",
        manufacturer: "test",
        instrumentModel: "test",
        valves: 3,
        material: "test",
        marchingBand: true,
        image: "test",
        creator: { name: "Fabio" },
      },
      {
        id: "2",
        alias: "test-2",
        manufacturer: "test-2",
        instrumentModel: "test",
        valves: 3,
        material: "test",
        marchingBand: true,
        image: "test",
        creator: { name: "Fabio" },
      },
    ],
    page: { currentPage: 1 },
    filter: { filter: "" },
  },
});

describe("Given the useEuphonium hook", () => {
  let elements: HTMLElement[];

  beforeEach(async () => {
    const TestComponent = function () {
      const {
        euphoniums,
        loadEuphoniums,
        loadOneEuphonium,
        deleteEuphonium,
        addEuphonium,
        updateEuphonium,
        clearEuphoniumsList,
      } = useEuphonium(mockRepo);
      return (
        <div>
          <button onClick={() => loadEuphoniums()}></button>
          <button onClick={() => loadOneEuphonium("1")}></button>
          <button onClick={() => deleteEuphonium("1", "test-token")}></button>
          <button
            onClick={() => deleteEuphonium("id-not-found", "test-token")}
          ></button>
          <button
            onClick={() => addEuphonium(euphoniums[0], "test-token", mockFile)}
          ></button>

          <button
            onClick={() =>
              updateEuphonium(euphoniums[0], "test-token", mockFile)
            }
          ></button>
          <button onClick={() => clearEuphoniumsList()}></button>
          <button
            onClick={() => updateEuphonium(euphoniums[0], "test-token", null!)}
          ></button>
        </div>
      );
    };

    render(
      <Provider store={mockStore}>
        <TestComponent></TestComponent>
      </Provider>
    );

    elements = await screen.findAllByRole("button");
  });

  describe("When TestComponent is rendered", () => {
    test("then button should be in the document", async () => {
      const element = await screen.findAllByRole("button");
      expect(element[0]).toBeInTheDocument();
    });
  });

  describe("When click on first button", () => {
    test("Then it should call the repo method loadEuphoniums", async () => {
      await fireEvent.click(elements[0]);
      expect(mockRepo.loadEuphoniums).toHaveBeenCalled();
    });
  });

  describe("When click on second button", () => {
    test("Then it should call the repo method loadOneEuphonium", async () => {
      const loadOneEuphonium = await fireEvent.click(elements[1]);
      expect(mockRepo.getEuphonium).toHaveBeenCalled();
      expect(loadOneEuphonium).toEqual(true);
    });
  });

  describe("When click on third button", () => {
    test("Then it should call the repo method deleteEuphonium", async () => {
      await act(async () => {
        await fireEvent.click(elements[2]);
      });
      expect(mockRepo.deleteEuphonium).toHaveBeenCalled();
    });
  });

  describe("When click on fourth button", () => {
    test("Then it should call the repo method deleteEuphonium and fail because no id found", async () => {
      (mockRepo.deleteEuphonium as jest.Mock).mockRejectedValue("error");
      await act(async () => fireEvent.click(elements[3]));
      expect(mockRepo.deleteEuphonium).toHaveBeenCalled();
    });
  });

  describe("When click on fifth button", () => {
    test("Then it should call the repo method addEuphonium", async () => {
      await act(async () => {
        await fireEvent.click(elements[4]);
      });
      expect(mockRepo.createEuphonium).toHaveBeenCalled();
    });
    test("Then it should throw error if fails", async () => {
      (mockRepo.createEuphonium as jest.Mock).mockRejectedValue("error");
      await fireEvent.click(elements[4]);
      expect(mockRepo.createEuphonium).toHaveBeenCalled();
    });
  });

  describe("When click on sixth button", () => {
    test("Then it should call the repo method updateEuphonium", async () => {
      await act(async () => {
        await fireEvent.click(elements[5]);
      });
      expect(mockRepo.updateEuphonium).toHaveBeenCalled();
    });
    test("Then it should throw error if fails", async () => {
      (mockRepo.updateEuphonium as jest.Mock).mockRejectedValue("error");
      await fireEvent.click(elements[5]);
      expect(mockRepo.updateEuphonium).toHaveBeenCalled();
    });
    test("Then it should update no file if there is no File", async () => {
      await act(async () => {
        await fireEvent.click(elements[7]);
      });
      expect(mockRepo.updateEuphonium).toHaveBeenCalled();
    });
  });

  describe("When click on nineth button", () => {
    test("Then it should call the repo method clearEuphoniumList", async () => {
      const clearEuphoniumList = await fireEvent.click(elements[6]);
      expect(clearEuphoniumList).toEqual(true);
    });
  });

  describe("When click on tenth button", () => {
    test("Then it should call the repo method addEuphoniumList and not upload File tu firebase", async () => {
      const addEuphonium = await fireEvent.click(elements[6]);
      expect(addEuphonium).toEqual(true);
    });
  });
});

describe("Given the useEuphonium hook with another page different to 1 and a filter", () => {
  let elements: HTMLElement[];

  const mockStore = configureStore({
    reducer: {
      euphoniums: euphoniumReducer,
      page: paginationReducer,
      filter: filterReducer,
    },
    preloadedState: {
      page: { currentPage: 2 },
      filter: { filter: "test" },
    },
  });

  beforeEach(async () => {
    const TestComponent = function () {
      const { loadEuphoniumsPaginated } = useEuphonium(mockRepo);
      return (
        <div>
          <button
            onClick={() => loadEuphoniumsPaginated("test-offset", "")}
          ></button>
        </div>
      );
    };

    render(
      <Provider store={mockStore}>
        <TestComponent></TestComponent>
      </Provider>
    );

    elements = await screen.findAllByRole("button");
  });

  describe("When click on seventh button", () => {
    test("Then it should call the repo method loadEuphoniumsPaginated", async () => {
      await fireEvent.click(elements[0]);
      expect(mockRepo.loadEuphoniumsPaginated).toHaveBeenCalled();
    });
  });
});
