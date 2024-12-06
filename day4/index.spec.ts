import { test, expect, describe } from "bun:test";
import index from "./index.ts";

describe("index", () => {
  test("countXmas", () => {
    const puzzle = [
      "MMMSXXMASM",
      "MSAMXMSMSA",
      "AMXSXMAAMM",
      "MSAMASMSMX",
      "XMASAMXAMM",
      "XXAMMXXAMA",
      "SMSMSASXSS",
      "SAXAMASAAA",
      "MAMMMXMMMM",
      "MXMXAXMASX",
    ];

    expect(index.countXmas(puzzle)).toEqual(18);
  });

  test("countDashXmas", () => {
    const puzzle = [
      "MMMSXXMASM",
      "MSAMXMSMSA",
      "AMXSXMAAMM",
      "MSAMASMSMX",
      "XMASAMXAMM",
      "XXAMMXXAMA",
      "SMSMSASXSS",
      "SAXAMASAAA",
      "MAMMMXMMMM",
      "MXMXAXMASX",
    ];

    expect(index.countDashXmas(puzzle)).toEqual(9);
  });
});
