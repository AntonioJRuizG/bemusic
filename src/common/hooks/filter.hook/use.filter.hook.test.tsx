/* eslint-disable testing-library/no-render-in-setup */
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useFilter } from "./use.filter.hook";
import { filterReducer } from "../../reducer/filter.reducer/filter.reducer";

describe("Given the useFilter hook", () => {
  let buttons: HTMLElement[];

  const mockStore = configureStore({
    reducer: { filter: filterReducer },
    preloadedState: {
      filter: {
        filter: "test-filter",
      },
    },
  });

  beforeEach(async () => {
    const TestComponent = function () {
      const { filter, clearFilter, loadFilter } = useFilter();

      return (
        <>
          <h1>{filter.filter}</h1>
          <button onClick={() => loadFilter(filter.filter)}></button>
          <button onClick={() => clearFilter()}></button>
        </>
      );
    };

    render(
      <Provider store={mockStore}>
        <TestComponent></TestComponent>
      </Provider>
    );

    buttons = await screen.findAllByRole("button");
  });

  describe("When TestComponent renders", () => {
    test("then a button should be in the document", async () => {
      expect(buttons[0]).toBeInTheDocument();
    });

    test("then a heading should be in the document with current filter value", async () => {
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
      const currentFilter = screen.getByText("test-filter");
      expect(currentFilter).toHaveTextContent("test-filter");
    });
  });

  describe("When click on first button", () => {
    test("Then it should call the loadFilter method", async () => {
      const loadFilter = await fireEvent.click(buttons[0]);
      expect(loadFilter).toBe(true);
    });
  });

  describe("When click on second button", () => {
    test("Then it should call the clearFilter method", async () => {
      const clearFilter = await fireEvent.click(buttons[1]);
      expect(clearFilter).toBe(true);
    });
  });
});
