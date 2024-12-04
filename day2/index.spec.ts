import { test, expect, describe } from "bun:test";
import index from "./index.ts";

describe("index", () => {
  test("countSafe", () => {
    const reports = [
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ];

    expect(index.countSafe(reports)).toEqual(2);
  });
});
