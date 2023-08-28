/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import React from "react";
import { useUsers } from "../../hook/use.user.hook";
import { CurrentUserName } from "./current.user";

jest.mock("../../hook/use.user.hook");

describe("Given Header", () => {
  describe("When it is render", () => {
    beforeEach(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });
      render(<CurrentUserName></CurrentUserName>);
    });

    test("Then it should be called", async () => {
      const element = screen.getAllByRole("generic");
      expect(element[0]).toBeInTheDocument();
    });
  });
});
