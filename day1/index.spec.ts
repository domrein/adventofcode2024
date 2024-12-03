import { test, expect, describe } from "bun:test";
import index from "./index.ts";

describe("index", () => {
  test("calcDist", () => {
    const list1 = [3, 4, 2, 1, 3, 3];
    const list2 = [4, 3, 5, 3, 9, 3];

    expect(index.calcDist(list1, list2)).toEqual(11);
  });
});
