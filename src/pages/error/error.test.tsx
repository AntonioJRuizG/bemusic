/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import ErrorPage from "./error";
import { BrowserRouter as Router } from "react-router-dom";

describe("Given the ErrorPage component", () => {
  beforeEach(async () => {
    render(
      <Router>
        <ErrorPage></ErrorPage>
      </Router>
    );
  });

  describe("When it renders", () => {
    test("Then it should be in the document", async () => {
      const element = screen.getAllByRole("heading");
      expect(element[0]).toBeInTheDocument();
    });
  });
});
