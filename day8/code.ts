interface Antenna {
  x: number
  y: number
  frequency: string
}

interface Antinode {
  x: number
  y: number
}

export default {
  parseAntennas(input: string): Antenna[] {
    const lines = input
      .split("\n")
      .filter(l => l.trim());

    const antennas: Antenna[]  = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < lines.length; j++) {
        if (line[j] !== ".") {
          antennas.push({x: j, y: i, frequency: line[j]});
        }
      }
    }

    return antennas;
  },

  parseMapSize(input: string): [number, number] {
    const lines = input
      .split("\n")
      .filter(l => l.trim());

    return [lines[0].length, lines.length];
  },

  countAntinodes(antennas: Antenna[], mapWidth: number, mapHeight: number): number {
    const antinodes: Set<string> = new Set();

    for (let i = 0; i < antennas.length; i++) {
      const a1 = antennas[i];
      for (let j = 0; j < antennas.length; j++) {
        const a2 = antennas[j];
        if (i === j) {
          continue;
        }
        if (a1.frequency !== a2.frequency) {
          continue;
        }

        const xDist = a2.x - a1.x;
        const yDist = a2.y - a1.y;
        const antinodeX = a2.x + xDist;
        const antinodeY = a2.y + yDist;

        if (antinodeX < 0) {
          continue;
        }
        if (antinodeX >= mapWidth) {
          continue;
        }
        if (antinodeY < 0) {
          continue;
        }
        if (antinodeY >= mapHeight) {
          continue;
        }
        antinodes.add(`${antinodeX},${antinodeY}`);
      }
    }

    return antinodes.size;
  },

  countResonanceAntinodes(antennas: Antenna[], mapWidth: number, mapHeight: number): number {
    const antinodes: Set<string> = new Set();

    for (let i = 0; i < antennas.length; i++) {
      const a1 = antennas[i];
      for (let j = 0; j < antennas.length; j++) {
        const a2 = antennas[j];
        if (i === j) {
          continue;
        }
        if (a1.frequency !== a2.frequency) {
          continue;
        }

        const xDist = a2.x - a1.x;
        const yDist = a2.y - a1.y;
        let k = 0;
        while (true) {
          let antinodeX = a2.x + xDist * k;
          let antinodeY = a2.y + yDist * k;
          if (antinodeX < 0) {
            break;
          }
          if (antinodeX >= mapWidth) {
            break;
          }
          if (antinodeY < 0) {
            break;
          }
          if (antinodeY >= mapHeight) {
            break;
          }
          antinodes.add(`${antinodeX},${antinodeY}`);
          k++;
        }
      }
    }

    return antinodes.size;
  },
}
