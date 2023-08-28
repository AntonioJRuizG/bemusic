import { render } from "@testing-library/react";
import App from "./app";
import { AppRouter } from "../routes/app.router";
import { MemoryRouter as Router } from "react-router-dom";
import { Header } from "../common/components/header/header";

jest.mock("../common/components/header/header");
jest.mock("../routes/app.router");

describe("Given App component", () => {
  describe("When it is rendered", () => {
    test("Then the Header and the AppRouter should be called", () => {
      render(
        <Router>
          <App></App>
        </Router>
      );

      expect(Header).toHaveBeenCalled();
      expect(AppRouter).toHaveBeenCalled();
    });
  });
});
