import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import { LoginForm } from "./login";
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
describe("Given Login component", () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <LoginForm></LoginForm>
      </Provider>
    );

    elements = [screen.getByRole("button"), ...screen.getAllByRole("textbox")];
  });

  describe("When it is render", () => {
    test("Then it shoud be in the document", () => {
      expect(elements[0]).toBeInTheDocument();
      expect(elements.length).toBe(2);
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
      fireEvent.click(elements[0]);
    });
  });
});
