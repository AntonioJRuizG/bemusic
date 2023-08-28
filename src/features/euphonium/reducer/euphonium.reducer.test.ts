import * as ac from "./euphonium.action.creator";
import { euphoniumReducer } from "./euphonium.reducer";

describe("Given bombardinosReducer", () => {
  const bombardino1 = {
    id: "1",
    alias: "test",
    manufacturer: "test",
    instrumentModel: "test",
    valves: 3,
    material: "test",
    marchingBand: true,
    image: "test",
    creator: { name: "test-1" },
  };

  const bombardino2 = {
    id: "2",
    alias: "test",
    manufacturer: "test",
    instrumentModel: "test",
    valves: 4,
    material: "test",
    marchingBand: true,
    image: "test",
    creator: { name: "test-2" },
  };

  const euphoniums = [bombardino1, bombardino2];

  describe("When it is called", () => {
    test("Then it should return the initial state", () => {
      return expect(
        euphoniumReducer(undefined, {
          type: undefined,
        })
      ).toEqual([]);
    });

    test("Then it should handle loadCreator and load euphoniums", () => {
      expect(euphoniumReducer([], ac.loadCreator(euphoniums))).toEqual(
        euphoniums
      );
    });

    test("Then it should handle addCreator and add bombardino2", () => {
      expect(
        euphoniumReducer([bombardino1], ac.addCreator(bombardino2))
      ).toEqual(euphoniums);
    });

    test("Then it should handle updateCreator", () => {
      const updatedbombardino2 = {
        ...bombardino2,
        alias: "test-updated",
      };
      const updatedbombardinos = [bombardino1, updatedbombardino2];
      expect(
        euphoniumReducer(euphoniums, ac.updateCreator(updatedbombardino2))
      ).toEqual(updatedbombardinos);
    });

    test("Then it should handle deleteCreator and delete euphoniums 1", () => {
      expect(
        euphoniumReducer(euphoniums, ac.deleteCreator(bombardino1.id))
      ).toEqual([bombardino2]);
    });

    test("Then it should handle clearCreator1", () => {
      expect(euphoniumReducer(euphoniums, ac.clearCreator([]))).toEqual([]);
    });

    test("Then it should handle addListCreator and push euphonium 2 2", () => {
      expect(
        euphoniumReducer(euphoniums, ac.addListCreator([bombardino1]))
      ).toEqual([bombardino1, bombardino2, bombardino1]);
    });
  });
});
