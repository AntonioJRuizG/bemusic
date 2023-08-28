/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import { useUsers } from "../../../user/hook/use.user.hook";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { Gallery } from "./gallery";
import { LoadingSpin } from "../../../../common/components/loading/loading";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../../user/services/repository/user.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");
jest.mock("../../../../common/components/loading/loading");
jest.mock("../thumbnail/thumbnail");
jest.mock("../navigation.buttons/navigation.buttons");
jest.mock("../filter/filter");

describe("Given Gallery", () => {
  describe("When it is render with euphoniums", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [{ id: "1", creator: { id: "1" } }, { id: "2" }, {}, {}],
        deleteEuphonium: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });

      render(<Gallery></Gallery>);
    });

    test("Then it should be called in the document", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    describe("When it renders with empty euphoniums state", () => {
      beforeEach(async () => {
        (useEuphonium as jest.Mock).mockReturnValue({
          euphoniums: [],
        });

        (useUsers as jest.Mock).mockReturnValue({});

        render(<Gallery></Gallery>);
      });

      test("Then de component LoadingSpin should have been called", async () => {
        expect(LoadingSpin).toHaveBeenCalled();
      });
    });
  });
});
