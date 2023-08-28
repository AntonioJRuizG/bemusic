/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MenuOptions } from "../../../app/app";
import { MenuList } from "./menu.list";

describe("Given Menu component", () => {
  describe("When it renders", () => {
    const mockMenuOptions: MenuOptions[] = [
      { id: "1", label: "Galería", path: "/" },
    ];

    beforeEach(() => {
      render(
        <MemoryRouter>
          <MenuList menuOptions={mockMenuOptions}></MenuList>
        </MemoryRouter>
      );
    });

    test("Then it should be in the document", () => {
      const element = screen.getByText(mockMenuOptions[0].label);
      expect(element).toBeInTheDocument();
    });
  });
});
