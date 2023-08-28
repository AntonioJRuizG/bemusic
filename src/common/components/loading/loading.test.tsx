/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import { LoadingSpin } from "./loading";

describe("Given the Loading component", () => {
  describe("When it is reder", () => {
    beforeEach(() => {
      render(<LoadingSpin></LoadingSpin>);
    });

    test("Then a generic div element should be in the document", () => {
      const element = screen.getAllByRole("generic");
      expect(element[0]).toBeInTheDocument();
    });
  });
});
