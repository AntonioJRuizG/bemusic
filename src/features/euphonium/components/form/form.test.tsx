/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useUsers } from "../../../user/hook/use.user.hook";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { AddEditForm } from "./form";

jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Given Add component", () => {
  describe("When it renders with ID the form update an item", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: jest.fn().mockReturnValue({
        instrumentEditId: "1234",
      }),
    }));

    let elements: HTMLElement[];

    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [{ id: "1234" }],
        addEuphonium: jest.fn(),
        updateEuphonium: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        user: { token: "", user: { id: "1" } },
      });

      render(
        <MemoryRouter initialEntries={["/editar/1234"]}>
          <Routes>
            <Route path="/editar/:instrumentEditId" element={<AddEditForm />} />
          </Routes>
        </MemoryRouter>
      );

      elements = [
        screen.getByRole("heading"),
        ...screen.getAllByRole("textbox"),
        ...screen.getAllByRole("combobox"),
        screen.getByRole("button"),
      ];
    });

    test("Then it shoud be in the document", () => {
      expect(elements[0]).toBeInTheDocument();
      expect(elements.length).toBe(7);
    });

    test("Then it should be in the screen", async () => {
      const mockText = "test";
      await act(async () => {
        await userEvent.type(elements[2], mockText);
      });
      await expect(elements[2]).toHaveValue(mockText);
    });

    test("Then submit button and update hook should be called if clicked", async () => {
      await act(async () => {
        await userEvent.click(elements[6]);
      });
      expect(useEuphonium).toHaveBeenCalled();
    });
  });

  describe("When it renders without ID the form add an item", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: jest.fn().mockReturnValue({
        instrumentEditId: undefined,
      }),
    }));

    let elements: HTMLElement[];

    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [{ id: "1234" }],
        addEuphonium: jest.fn(),
        updateEuphonium: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        user: { token: "", user: {} },
      });

      render(
        <MemoryRouter initialEntries={["/nuevo_bombardino"]}>
          <Routes>
            <Route path="/nuevo_bombardino" element={<AddEditForm />} />
          </Routes>
        </MemoryRouter>
      );

      elements = [
        screen.getByRole("heading"),
        ...screen.getAllByRole("textbox"),
        ...screen.getAllByRole("combobox"),
        screen.getByRole("button"),
      ];
    });

    test("Then it should be in the screen", async () => {
      const mockText2 = "test";

      await act(async () => {
        await userEvent.type(elements[2], mockText2);
      });
      expect(elements[2]).toHaveValue(mockText2);
    });

    test("Then submit button and update hook should be called if clicked", async () => {
      await act(async () => {
        await userEvent.click(elements[6]);
      });
      expect(useEuphonium).toHaveBeenCalled();
    });
  });
});
