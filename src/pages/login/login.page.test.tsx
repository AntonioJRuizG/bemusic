import { render } from "@testing-library/react";
import { LoginForm } from "../../features/user/components/login/login";
import LoginPage from "./login.page";

jest.mock("../../features/user/components/login/login");

describe("Given RegisterPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<LoginPage></LoginPage>);
      expect(LoginForm).toHaveBeenCalled();
    });
  });
});
