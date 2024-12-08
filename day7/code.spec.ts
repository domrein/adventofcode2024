import { test, expect, describe } from "bun:test";
import code from "./code.ts";

const input = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

describe("code", () => {
  test("parseEquations", () => {
    const equations = code.parseEquations(input);
    expect(equations).toEqual([
      {left: 190, right: [10, 19]},
      {left: 3267, right:[81, 40, 27]},
      {left: 83, right:[17, 5]},
      {left: 156, right:[15, 6]},
      {left: 7290, right:[6, 8, 6, 15]},
      {left: 161011, right:[16, 10, 13]},
      {left: 192, right:[17, 8, 14]},
      {left: 21037, right:[9, 7, 18, 13]},
      {left: 292, right:[11, 6, 16, 20]},
    ]);
  });

  test("sumSolvableEquations", () => {
    const equations = code.parseEquations(input);
    const sum = code.sumSolvableEquations(equations);
    expect(sum).toEqual(3749);
  });
});
