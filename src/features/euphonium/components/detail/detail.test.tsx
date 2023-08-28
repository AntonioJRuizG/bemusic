import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Detail from "./detail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ instrumentId: "test-id" }),
}));

jest.mock("../../hook/use.euphonium.hook", () => ({
  useEuphonium: () => ({
    euphoniums: [
      {
        id: "test-id",
        manufacturer: "Yamaha",
        alias: "YBH-301MS",
        image: "image-url",
        instrumentModel: "YBH-301MS",
        material: "Intermediate",
        valves: 3,
        marchingBand: true,
        creator: {},
      },
    ],
    loadOneEuphonium: jest.fn(() => ({
      id: "test-id",
      manufacturer: "Yamaha",
      alias: "YBH-301MS",
      image: "image-url",
      instrumentModel: "YBH-301MS",
      material: "Intermediate",
      valves: 3,
      marchingBand: true,
      creator: { name: "test-name" },
    })),
  }),
}));

describe("Given a detail component", () => {
  describe("When it renders and the detailBombardino is undefined", () => {
    test("Then it should return a loading message", () => {
      render(
        <MemoryRouter>
          <Detail></Detail>
        </MemoryRouter>
      );
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
