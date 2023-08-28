/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUsers } from "../../hook/use.user.hook";
import { UserRepo } from "../../services/repository/user.repo";
import { LogoutBtn } from "./logout.btn";

jest.mock("../../hook/use.user.hook");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
const repoUserMock = {} as UserRepo;

describe("Given menu component", () => {
  beforeEach(async () => {
    (useUsers as jest.Mock).mockReturnValue({
      user: {
        user: { id: "1" },
        token: "token-test",
      },
      logoutUser: jest.fn(),
    });

    await act(async () => {
      render(<LogoutBtn></LogoutBtn>);
    });
  });
  describe("When it renders there is a user logged", () => {
    test("Then it should be in the document", async () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });

    test("Then it should call logoutUser when clickd", async () => {
      const element = screen.getByRole("button");
      await userEvent.click(element);
      expect(useUsers(repoUserMock).logoutUser).toHaveBeenCalled();
    });
  });
});
