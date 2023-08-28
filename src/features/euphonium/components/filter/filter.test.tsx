/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";
import { useFilter } from "../../../../common/hooks/filter.hook/use.filter.hook";
import { GalleryFilter } from "./filter";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../../common/hooks/pagination.hook/use.pagination.hook");
jest.mock("../../../../common/hooks/filter.hook/use.filter.hook");

describe("Given GalleryFilter component", () => {
  let buttons: HTMLElement[];
  const mockEuphoniumRepo = {} as EuphoniumRepo;
  describe("When it renders", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        clearEuphoniumsList: jest.fn(),
      });

      (usePagination as jest.Mock).mockReturnValue({
        restartPagination: jest.fn(),
      });

      (useFilter as jest.Mock).mockReturnValue({
        loadFilter: jest.fn(),
        clearFilter: jest.fn(),
      });

      render(<GalleryFilter></GalleryFilter>);

      buttons = screen.getAllByRole("button");
    });

    test("Then it should be in the document", async () => {
      expect(buttons[0]).toBeInTheDocument();
    });

    describe("When click the first button", () => {
      test("Then it should call the removeFilterHandler", async () => {
        await act(async () => {
          await userEvent.click(buttons[0]);
        });

        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(useFilter().clearFilter).toHaveBeenCalled();
        expect(usePagination().restartPagination).toHaveBeenCalled();
      });
    });

    describe("When click the second button", () => {
      test("Then it should call the filterHandler", async () => {
        await act(async () => {
          await userEvent.click(buttons[1]);
        });
        expect(useFilter().loadFilter).toHaveBeenCalled();
      });
    });
  });
});
