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

const mapBlock = code.parseMap(input);
const checksumBlock = code.generateChecksumBlock(mapBlock);
console.log(`checksumBlock: ${checksumBlock}`);
