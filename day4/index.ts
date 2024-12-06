const countXmas = (puzzle: string[]): number => {
  let count = 0;
  const directions = [
    {x: 0, y: -1}, // up
    {x: 0, y: 1}, // down
    {x: -1, y: 0}, // left
    {x: 1, y: 0}, // right
    {x: -1, y: -1}, // upleft
    {x: 1, y: -1}, // upright
    {x: -1, y: 1}, // downleft
    {x: 1, y: 1}, // downright
  ]

  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[row].length; col++) {
      // loop over all directions and see if if we find xmas
      for (let i = 0; i < directions.length; i++) {
        let word = "";
        let target = "XMAS";
        const dir = directions[i];
        for (let j = 0; j < target.length; j++) {
          const x = col + j * dir.x;
          if (x < 0) {
            break;
          }
          if (x > puzzle[row].length - 1) {
            break;
          }
          const y = row + j * dir.y;
          if (y < 0) {
            break;
          }
          if (y > puzzle.length - 1) {
            break;
          }
          word += puzzle[y][x];
        }
        if (word === target) {
          count++;
        }
      }
    }
  }

  return count;
};

const countDashXmas = (puzzle: string[]): number => {
  let count = 0;
  const directions = [
    {x: -1, y: -1}, // upleft
    {x: 1, y: -1}, // upright
    {x: -1, y: 1}, // downleft
    {x: 1, y: 1}, // downright
  ];
  const paths = [
    [directions[0], {x: 0, y: 0}, directions[3]],
    [directions[1], {x: 0, y: 0}, directions[2]],
    [directions[2], {x: 0, y: 0}, directions[1]],
    [directions[3], {x: 0, y: 0}, directions[0]],
  ];

  for (let row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle[row].length; col++) {
      if (puzzle[row][col] !== "A") {
        continue;
      }

      // check paths
      // if two paths === "MAS", we win
      // loop over all directions and see if if we find xmas
      let pathCount = 0;
      for (let i = 0; i < paths.length; i++) {
        let word = "";
        let target = "MAS";
        const path = paths[i];
        for (let j = 0; j < path.length; j++) {
          const dir = path[j];
          const x = col + dir.x;
          if (x < 0) {
            break;
          }
          if (x > puzzle[row].length - 1) {
            break;
          }
          const y = row + dir.y;
          if (y < 0) {
            break;
          }
          if (y > puzzle.length - 1) {
            break;
          }
          word += puzzle[y][x];
        }
        if (word === target) {
          pathCount++;
        }
      }
      if (pathCount >= 2) {
        count++;
      }
    }
  }

  return count;
};

const loadPuzzle = async (): Promise<string[]> => {
  const input = Bun.file("./input.txt");
  const text = await input.text();
  return text.split("\n");
}

export default {
  countXmas,
  countDashXmas
}

let puzzle = await loadPuzzle();
console.log(`xmas count: ${countXmas(puzzle)}`);

puzzle = await loadPuzzle();
console.log(`dashxmas count: ${countDashXmas(puzzle)}`);
