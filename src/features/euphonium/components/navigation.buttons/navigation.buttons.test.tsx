/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";
import { NavButtons } from "./navigation.buttons";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../../user/services/repository/user.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");
jest.mock("../../../../common/hooks/pagination.hook/use.pagination.hook");
jest.mock("../../../../common/hooks/filter.hook/use.filter.hook");
jest.mock("../../../../common/components/loading/loading");

describe("Given the navButtons component", () => {
  let buttons: HTMLElement[];
  describe("When it renders", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [{ id: "1", creator: { id: "1" } }, { id: "2" }, {}, {}],
      });

      (usePagination as jest.Mock).mockReturnValue({
        page: { currentPage: 2 },
        nextPage: jest.fn(),
        prevPage: jest.fn(),
        restartPagination: jest.fn(),
      });

      render(<NavButtons></NavButtons>);

      buttons = screen.getAllByRole("button");
    });

    test("Then it should be in the document", async () => {
      expect(buttons[0]).toBeInTheDocument();
    });

    describe("When click the first Button -show less", () => {
      test("Then it should call prevPage", async () => {
        await act(async () => {
          await userEvent.click(buttons[0]);
        });

        expect(buttons[0]).toBeInTheDocument();
        expect(usePagination().prevPage).toHaveBeenCalled();
      });
    });

    describe("When click the second Button -show more", () => {
      test("Then it should call nextPage", async () => {
        await act(async () => {
          await userEvent.click(buttons[1]);
        });

        expect(buttons[1]).toBeInTheDocument();
        expect(usePagination().nextPage).toHaveBeenCalled();
      });
    });
  });
});
