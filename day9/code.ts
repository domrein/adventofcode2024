export default {
  parseMap(input: string): number[] {
    const lines = input
      .split("\n")
      .filter(l => l.trim());

    let map: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let id = 0;
      for (let j = 0; j < line.length; j++) {
        let val = Number.parseInt(line[j]);
        for (let k = 0; k < val; k++) {
          if (j % 2 === 0) {
            map.push(id);
          }
          else {
            map.push(-1);
          }
        }
        if (j % 2 === 0 && val) {
          id++;
        }
      }
    }

    return map;
  },

  generateChecksum(map: number[]): BigInt {
    let sum = BigInt(0);

    let start = 0;
    let end = map.length - 1;

    // strip off -1s at the end
    for (let i = map.length - 1; i >= 0; i++) {
      if (map[i] === -1) {
        map.pop();
      }
      else {
        break;
      }
    }

    // flip end to start to fill holes
    while (start < end) {
      if (map[end] === -1) {
        end--;
        continue;
      }
      if (map[start] !== -1) {
        start++;
        continue;
      }
      map[start] = map[end];
      map[end] = -1;
    }
    map = map.filter(n => n !== -1);
    sum = map.reduce((a, b, c) => a + BigInt(b) * BigInt(c), BigInt(0));

    return sum;
  },

  generateChecksumBlock(map: number[]): BigInt {
    let sum = BigInt(0);

    let end = map.length - 1;
    while (end >= 0) {
      while (map[end] === -1) {
        end--;
      }

      // identify next block
      let blockVal = map[end];
      let blockLength = 1;
      for (let i = end - 1; i >= 0; i--) {
        if (map[i] !== blockVal) {
          break;
        }
        blockLength++;
      }

      // see where block fits
      for (let i = 0; i < end - blockLength; i++) {
        if (map[i] === -1) {
          let openBlock = true;
          for (let j = 0; j < blockLength; j++) {
            if (map[j + i] !== -1) {
              openBlock = false;
            }
          }
          if (openBlock) {
            for (let j = 0; j < blockLength; j++) {
              map[j + i] = blockVal;
            }
            for (let j = 0; j < blockLength; j++) {
              map[end-j] = -1;
            }

            break;
          }
        }
      }
      end -= blockLength;
    }

    sum = map.reduce((a, b, c) => {
      if (b === -1) {
        return a;
      }
      return a + BigInt(b) * BigInt(c);
  }, BigInt(0));

    return sum;
  },
}
