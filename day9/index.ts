import code from "./code.ts";

const loadInput = async (): Promise<string> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text;
}

const input = await loadInput();

const map = code.parseMap(input);
const checksum = code.generateChecksum(map);
console.log(`checksum: ${checksum}`);
