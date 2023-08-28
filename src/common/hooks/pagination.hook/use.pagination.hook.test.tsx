import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { paginationReducer } from "../../reducer/page.reducer/page.reducer";
import { usePagination } from "./use.pagination.hook";

let buttons: HTMLElement[];
const mockStoreTool = configureStore({
  reducer: { page: paginationReducer },
  preloadedState: {
    page: {
      currentPage: 1,
    },
  },
});

describe("Given usePagination hook", () => {
  beforeEach(async () => {
    const TestPageComponent = function () {
      const { page, nextPage, prevPage, restartPagination, loadCurrentPage } =
        usePagination();
      return (
        <>
          <h2>{page.currentPage}</h2>
          <button onClick={() => nextPage()}></button>
          <button onClick={() => restartPagination()}></button>
          <button onClick={() => prevPage()}></button>
          <button onClick={() => loadCurrentPage()}></button>
        </>
      );
    };

    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={mockStoreTool}>
        <TestPageComponent></TestPageComponent>
      </Provider>
    );
    buttons = await screen.findAllByRole("button");
  });

  describe("When TestPageComponent renders", () => {
    test("Then buttons should be in the document", async () => {
      expect(buttons[1]).toBeInTheDocument();
    });

    test("Then a heading should be in the document", async () => {
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then the current page value should be in the component", async () => {
      const currentPage = screen.getByText(1);
      expect(currentPage).toHaveTextContent("1");
    });
  });

  describe("When click on the first button", () => {
    test("Then it should call the nextPage method", async () => {
      const setNextPage = await fireEvent.click(buttons[0]);
      expect(setNextPage).toBe(true);
    });
  });

  describe("When click on the second button", () => {
    test("Then it should call the restartPagination method", async () => {
      const restartPage = await fireEvent.click(buttons[1]);
      expect(restartPage).toBe(true);
    });
  });

  describe("When click on the third button", () => {
    test("Then it should call the prevPage method", async () => {
      const setNextPage = await fireEvent.click(buttons[2]);
      expect(setNextPage).toBe(true);
    });
  });

  describe("When click on the fourth button", () => {
    test("Then it should call the loadCurrentPage method", async () => {
      const loadCurrentPage = await fireEvent.click(buttons[3]);
      expect(loadCurrentPage).toBe(true);
    });
  });
});
