import { render } from "@testing-library/react";
import { AddEditForm } from "../../features/euphonium/components/form/form";
import EditPage from "./edit.page";

jest.mock("../../features/euphonium/components/form/form");

describe("Given GalleryPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<EditPage></EditPage>);
      expect(AddEditForm).toHaveBeenCalled();
    });
  });
});
