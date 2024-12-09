import { test, expect, describe } from "bun:test";
import code from "./code.ts";

const input = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

describe("code", () => {

  test("parseAntennas", () => {
    const antennas = code.parseAntennas(input);
    expect(antennas).toEqual([
      {x:8, y: 1, frequency: "0"},
      {x:5, y: 2, frequency: "0"},
      {x:7, y: 3, frequency: "0"},
      {x:4, y: 4, frequency: "0"},
      {x:6, y: 5, frequency: "A"},
      {x:8, y: 8, frequency: "A"},
      {x:9, y: 9, frequency: "A"},
    ]);
  });

  test("parseMapSize", () => {
    const [mapWidth, mapHeight] = code.parseMapSize(input);
    expect(mapWidth).toEqual(12);
    expect(mapHeight).toEqual(12);
  });

  test("countAntinodes", () => {
    const antennas = code.parseAntennas(input);
    const [mapWidth, mapHeight] = code.parseMapSize(input);
    const count = code.countAntinodes(antennas, mapWidth, mapHeight);
    expect(count).toEqual(14);
  });

  test("countResonanceAntinodes", () => {
    const antennas = code.parseAntennas(input);
    const [mapWidth, mapHeight] = code.parseMapSize(input);
    const count = code.countResonanceAntinodes(antennas, mapWidth, mapHeight);
    expect(count).toEqual(34);
  });
});
