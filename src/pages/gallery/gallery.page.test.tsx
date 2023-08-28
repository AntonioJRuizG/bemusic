import { render } from "@testing-library/react";
import { Gallery } from "../../features/euphonium/components/gallery/gallery";
import GalleryPage from "./gallery.page";

jest.mock("../../features/euphonium/components/gallery/gallery");

describe("Given GalleryPage component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<GalleryPage></GalleryPage>);
      expect(Gallery).toHaveBeenCalled();
    });
  });
});
