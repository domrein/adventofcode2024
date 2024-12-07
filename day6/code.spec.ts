import { test, expect, describe } from "bun:test";
import code from "./code.ts";

const input = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

describe("code", () => {
  test("parseMapSize", () => {
    const [width, height] = code.parseMapSize(input);
    expect(width).toEqual(10);
    expect(height).toEqual(10);
  });

  test("parseBlockers", () => {
    const blockers = code.parseBlockers(input);
    expect(blockers).toEqual([
      {x: 4, y: 0},
      {x: 9, y: 1},
      {x: 2, y: 3},
      {x: 7, y: 4},
      {x: 1, y: 6},
      {x: 8, y: 7},
      {x: 0, y: 8},
      {x: 6, y: 9},
    ]);
  });

  test("parseBlockers", () => {
    const guard = code.parseGuard(input);
    expect(guard).toEqual({x: 4, y: 6, facing: "up"});
  });

  test("calcGuardCoverage", () => {
    const blockers = code.parseBlockers(input);
    const guard = code.parseGuard(input);
    const [mapWidth, mapHeight] = code.parseMapSize(input);
    expect(code.calcGuardCoverage(guard, blockers, mapWidth, mapHeight)).toEqual(41);
  });

  test("calcLoopSpots", () => {
    const blockers = code.parseBlockers(input);
    const guard = code.parseGuard(input);
    const [mapWidth, mapHeight] = code.parseMapSize(input);
    expect(code.calcLoopSpots(guard, blockers, mapWidth, mapHeight)).toEqual(6);
  });
});
