import code from "./code.ts";

const loadInput = async (): Promise<string> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text;
}

const input = await loadInput();
const blockers = code.parseBlockers(input);
let guard = code.parseGuard(input);
const [mapWidth, mapHeight] = code.parseMapSize(input);
console.log(`coverage: ${code.calcGuardCoverage(guard, blockers, mapWidth, mapHeight)}`);
guard = code.parseGuard(input);
console.log(mapWidth, mapHeight);
console.log(`loop spots: ${code.calcLoopSpots(guard, blockers, mapWidth, mapHeight)}`);
