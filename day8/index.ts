import code from "./code.ts";

const loadInput = async (): Promise<string> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text;
}

const input = await loadInput();

const antennas = code.parseAntennas(input);
const [mapWidth, mapHeight] = code.parseMapSize(input);
const count = code.countAntinodes(antennas, mapWidth, mapHeight);

console.log(`antinode unique location count: ${count}`);

const count2 = code.countResonanceAntinodes(antennas, mapWidth, mapHeight);

console.log(`antinode with resonance unique location count: ${count2}`);
