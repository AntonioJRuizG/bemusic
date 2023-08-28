import * as ac from "./page.action.creator";
import { paginationReducer } from "./page.reducer";

describe("Given paginationReducer", () => {
  const page1 = {
    currentPage: 1,
  };
  const page2 = {
    currentPage: 2,
  };

  describe("When it is called", () => {
    test("Then it should return the initial state", () => {
      return expect(
        paginationReducer(undefined, {
          type: undefined,
        })
      ).toEqual(page1);
    });

    test("Then it should handle loadCreator and load page", () => {
      expect(paginationReducer(page1, ac.loadCreator(page2))).toEqual(page2);
    });

    test("Then it should handle restartCreator and load page", () => {
      expect(paginationReducer(page1, ac.restartCreator())).toEqual(page1);
    });
  });
});
