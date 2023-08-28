import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import { useUsers } from "../../hook/use.user.hook";
import { UserRepo } from "../../services/repository/user.repo";
import { RegisterForm } from "./register";

jest.mock("../../hook/use.user.hook");
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
describe("Given Register component", () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    (useUsers as jest.Mock).mockReturnValue({
      regUser: jest.fn(),
    });
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <RegisterForm></RegisterForm>
      </Provider>
    );

    elements = [screen.getByRole("button"), ...screen.getAllByRole("textbox")];
  });

  describe("When it is render", () => {
    test("Then it shoud be in the document", () => {
      expect(elements[0]).toBeInTheDocument();
      expect(elements.length).toBe(3);
    });
  });

  describe("When the user type in the inputs", () => {
    test("Then text should be in the screen", () => {
      const mockUser = "";
      userEvent.type(elements[1], mockUser);
      expect(elements[1]).toHaveValue(mockUser);
    });
  });

  describe("When the user click in the button", () => {
    test("Then data should be in the console", async () => {
      const button = screen.getByRole("button");
      const mockUserRepo = {} as unknown as UserRepo;
      await fireEvent.click(button);
      expect(useUsers(mockUserRepo).regUser).toHaveBeenCalledWith({
        name: "",
        email: "",
        password: "",
      });
    });
  });
});
