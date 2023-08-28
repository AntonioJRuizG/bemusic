/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { AppRouter } from "./app.router";
import "@testing-library/jest-dom";

jest.mock("../features/euphonium/components/gallery/gallery");
jest.mock("../features/user/components/login/login");
jest.mock("../features/user/components/register/register");
jest.mock("../pages/add/add.page");

const pathsEntries = [
  "/",
  "/nuevo_bombardino",
  "/registro",
  "/iniciar_sesion",
  "/detalles/12",
  "/editar/12",
];

describe("Given AppRouter component", () => {
  describe("When it is reder and the path is '/'", () => {
    test("Then the gallery apge should be in the screen", async () => {
      await render(
        <Router initialEntries={pathsEntries} initialIndex={0}>
          <AppRouter></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is reder and the path is '/nuevo_bombardino'", () => {
    test("Then the nuevo_bombardino form should be in the screen", async () => {
      await render(
        <Router initialEntries={pathsEntries} initialIndex={1}>
          <AppRouter></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is reder and the path is '/registro'", () => {
    test("Then the registro form should be in the screen", async () => {
      await render(
        <Router initialEntries={pathsEntries} initialIndex={2}>
          <AppRouter></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is render and the path is '/login'", () => {
    test("Then the login form should be in the screen", async () => {
      await render(
        <Router initialEntries={pathsEntries} initialIndex={3}>
          <AppRouter></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is render and the path is '/details'", () => {
    test("Then the details should be in the screen", async () => {
      await render(
        <Router initialEntries={pathsEntries} initialIndex={4}>
          <AppRouter></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When it is render and the path is '/editar/:instrumentEditId'", () => {
    test("Then the '/editar/:instrumentEditId' should be in the screen", async () => {
      await render(
        <Router initialEntries={pathsEntries} initialIndex={5}>
          <AppRouter></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("generic");
      expect(element).toBeInTheDocument();
    });
  });
});
