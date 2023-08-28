import { EuphoniumRepo } from "./euphonium.repo";

describe("Given EuphoniumRepo", () => {
  let euphoniumMockRepo: EuphoniumRepo;

  beforeEach(() => {
    euphoniumMockRepo = new EuphoniumRepo();
  });

  describe("When loadEuphoniums method is called", () => {
    test("Then it should fetch and return the euphoniums list", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.loadEuphoniums();
      expect(result).toEqual({ alias: "test" });
    });

    test("Then it should throw error fetch returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = euphoniumMockRepo.loadEuphoniums();
      await expect(result).rejects.toThrow();
    });
  });

  describe("When loadEuphoniumsPaginated method is called", () => {
    test("Then it should fetch and return paginated euphoniums list", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.loadEuphoniumsPaginated(
        "test-offset",
        ""
      );
      expect(result).toEqual({ alias: "test" });
      const resultFilter = await euphoniumMockRepo.loadEuphoniumsPaginated(
        "test-offset",
        "test-filter"
      );
      expect(resultFilter).toEqual({ alias: "test" });
    });

    test("Then it should throw error fetch returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = euphoniumMockRepo.loadEuphoniumsPaginated(
        "test-offset",
        ""
      );
      await expect(result).rejects.toThrow();
    });
  });

  describe("When getEuphonium method is called", () => {
    test("Then it should fetch and return the euphoniums with the given id", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.getEuphonium("1");
      expect(result).toEqual({ id: "1", alias: "test" });
    });

    test("Then it should throw an error if it returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = euphoniumMockRepo.getEuphonium("1");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When deleteEuphonium method is called with an item id", () => {
    test("Then it should fetch with DELETE method", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.deleteEuphonium("1", "test-token");
      expect(result).toEqual(undefined);
    });

    test("Then it should throw an error if fetch fails", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({}),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer testToken",
        },
      });
      const result = euphoniumMockRepo.deleteEuphonium("1", "test-token");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When createEuphonium method is called", () => {
    test("Then it should fetch and create a new euphonium", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test",
        }),
      });
      const result = await euphoniumMockRepo.createEuphonium(
        { alias: "test" },
        "test-token"
      );
      expect(result).toEqual({ id: "1", alias: "test" });
    });
  });

  describe("When updateEuphonium method is called", () => {
    test("Then it should fetch and return the updated euphonium", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          alias: "test-2",
        }),
      });
      const result = await euphoniumMockRepo.updateEuphonium(
        {
          id: "1",
          alias: "test-2",
        },
        "test-id"
      );
      expect(result).toEqual({ id: "1", alias: "test-2" });
    });
  });
});
