import { userReducer } from "./user.reducer";
import * as ac from "./user.action.creator";

describe("Given userReducer", () => {
  const user1 = {
    user: {
      id: "1",
      name: "test1",
      email: "test1@test.com",
      password: "test1",
    },
    token: "test-token",
  };

  const user = {
    user: null,
    token: "",
  };

  describe("When it is called", () => {
    test("Then it should return the initial state", () => {
      return expect(
        userReducer(undefined, {
          type: undefined,
        })
      ).toEqual({
        user: null,
        token: "",
      });
    });
    test("Then it should handle addCreator and add an user", () => {
      expect(userReducer(user, ac.loadCreator(user1))).toEqual(user1);
    });
  });
});
