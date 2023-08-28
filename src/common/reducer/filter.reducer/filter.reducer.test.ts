import * as ac from "./filter.action.creator";
import { filterReducer } from "./filter.reducer";

describe("Given filterReducer", () => {
  const filter = {
    filter: "test-filter",
  };

  describe("When it is called", () => {
    test("Then it should return the initial state", () => {
      return expect(
        filterReducer(undefined, {
          type: undefined,
        })
      ).toEqual({ filter: "" });
    });

    test("Then it should handle loadCreator and load filter", () => {
      expect(filterReducer(filter, ac.loadCreator(filter))).toEqual(filter);
    });

    test("Then it should handle clearCreator and clear filter", () => {
      expect(filterReducer(filter, ac.clearCreator())).toEqual({ filter: "" });
    });
  });
});
