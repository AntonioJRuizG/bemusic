import { render } from "@testing-library/react";
import { RegisterForm } from "../../features/user/components/register/register";
import RegisterPage from "./register.page";

jest.mock("../../features/user/components/register/register");

describe("Given RegisterPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<RegisterPage></RegisterPage>);
      expect(RegisterForm).toHaveBeenCalled();
    });
  });
});
