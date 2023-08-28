/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import Modal from "./modal";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import userEvent from "@testing-library/user-event";

const mockCustomFunction = jest.fn();
const mockHandleDelete = jest.fn();
let buttons: HTMLElement[];

describe("Given the Modal component", () => {
  describe("When it renders with true showModal value", () => {
    beforeEach(async () => {
      render(
        <Provider store={store}>
          <Modal
            customFunction={mockCustomFunction}
            handleModal={mockHandleDelete}
            showModal={true}
          ></Modal>
        </Provider>
      );

      buttons = screen.getAllByRole("button");
    });
    test("Then it should be in the document", async () => {
      expect(buttons[0]).toBeInTheDocument();
    });

    test("Then it should call mockHandleDelete function if delete button clicked", async () => {
      await userEvent.click(buttons[1]);
      expect(mockHandleDelete).toHaveBeenCalled();
    });

    test("Then it should call mockCustomFunction function if cancel button clicked", async () => {
      await userEvent.click(buttons[0]);
      expect(mockCustomFunction).toHaveBeenCalled();
    });
  });

  describe("When it renders with false showModal value", () => {
    test("Then it should render null", async () => {
      const { container } = render(
        <Provider store={store}>
          <Modal
            customFunction={mockCustomFunction}
            handleModal={mockHandleDelete}
            showModal={false}
          ></Modal>
        </Provider>
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
