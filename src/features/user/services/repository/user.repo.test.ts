import { UserProps } from "../../model/user.model";
import { UserRepo } from "./user.repo";

describe("Given UserRepo", () => {
  let userRepo: UserRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
  });

  describe("When registerUser method is called", () => {
    test("Then it should make a POST request to the /register endpoint with the given user data", async () => {
      const user: UserProps = {
        id: "1",
        email: "test@test.com",
        name: "testname",
        password: "1234",
      };
      const expectedUser: UserProps = {
        id: "1",
        email: "test@test.com",
        name: "testname",
        password: "1234",
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
        json: () => Promise.resolve(expectedUser),
      } as Response);

      const result = await userRepo.registerUser(user);

      expect(fetchSpy).toHaveBeenCalled();
      expect(fetchSpy).toHaveBeenCalledWith(`${userRepo.url}/registro`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });
      expect(result).toEqual(expectedUser);

      fetchSpy.mockRestore();
    });
  });

  describe("When loginUser method is called", () => {
    test("Then it should make a POST request to the /login endpoint with the given user data (with empty name field)", async () => {
      const user: UserProps = {
        id: "1",
        name: "",
        email: "test@test.com",
        password: "1234",
      };
      const expectedUser: UserProps = {
        id: "1",
        email: "test@test.com",
        name: "",
        password: "1234",
      };
      const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
        json: () => Promise.resolve(expectedUser),
      } as Response);

      const result = await userRepo.loginUser(user);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(`${userRepo.url}/acceso`, {
        method: "POST",
        body: JSON.stringify({ ...user, name: "" }),
        headers: {
          "Content-type": "application/json",
        },
      });
      expect(result).toEqual(expectedUser);

      fetchSpy.mockRestore();
    });
  });
});
