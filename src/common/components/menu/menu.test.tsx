import { render } from "@testing-library/react";
import React from "react";
import { useUsers } from "../../../features/user/hook/use.user.hook";
import { Menu } from "./menu";
import { MenuList } from "../menu.list/menu.list";
import { LogoutBtn } from "../../../features/user/components/logout/logout.btn";

jest.mock("../menu.list/menu.list");
jest.mock("../../../features/user/hook/use.user.hook");
jest.mock("../../../features/user/components/logout/logout.btn");

describe("Given Menu component", () => {
  describe("When it renders and there is no logged user", () => {
    test("Then it should call the MenuList component", async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: {},
      });
      render(<Menu></Menu>);
      expect(MenuList).toHaveBeenCalled();
    });
  });

  describe("When it renders and there is a logged user", () => {
    test("Then it should render the MenuList and LogOut button", async () => {
      (useUsers as jest.Mock).mockReturnValue({
        user: { token: "token-test", user: { id: "1" } },
      });
      render(<Menu></Menu>);
      expect(MenuList).toHaveBeenCalled();
      expect(LogoutBtn).toHaveBeenCalled();
    });
  });
});
