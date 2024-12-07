interface Point {
  x: number
  y: number
}

interface Guard extends Point {
  facing: "up"|"down"|"left"|"right"
}

export default {
  parseMapSize(input: string): [number, number] {
    const lines = input
      .split("\n")
      .filter(l => l.trim());

    return [lines[0].length, lines.length];
  },

  parseBlockers(input: string): Point[] {
    const lines = input
      .split("\n")
      .filter(l => l.trim());

    const blockers: {x: number, y: number}[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j] === "#") {
          blockers.push({x: j, y: i});
        }
      }
    }

    return blockers;
  },

  parseGuard(input: string): Guard {
    const lines = input
      .split("\n")
      .filter(l => l.trim());

    const guard: Guard = {x: 0, y: 0, facing: "up"};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const result = /[\^<>v]/.exec(line);
      if (result) {
        guard.x = result.index;
        guard.y = i;
        switch (result[0]) {
          case "^":
            guard.facing = "up";
            break;
            case "v":
            guard.facing = "down";
            break;
            case "<":
            guard.facing = "left";
            break;
            case ">":
            guard.facing = "right";
            break;
        }
      }
    }

    return guard;
  },

  calcGuardCoverage(guard: Guard, blockers: Point[], mapWidth: number, mapHeight: number): number {
    let ticks = 0;
    let visitedPoints = new Set();
    visitedPoints.add(`${guard.x},${guard.y}`);
    while (ticks < 10_000) {
      ticks++;
      const destPos = {x: guard.x, y: guard.y};
      switch (guard.facing) {
        case "up":
          destPos.y--;
          break;
        case "down":
          destPos.y++;
          break;
        case "left":
          destPos.x--;
          break;
        case "right":
          destPos.x++;
          break;
      }
      // see if blocker is at dest, turn right if there is
      let blocked = false;
      for (let i = 0; i < blockers.length; i++) {
        const blocker = blockers[i];
        if (destPos.x === blocker.x && destPos.y === blocker.y) {
          blocked = true;
        }
      }

      if (blocked) {
        switch (guard.facing) {
          case "up":
            guard.facing = "right";
            break;
          case "down":
            guard.facing = "left";
            break;
          case "left":
            guard.facing = "up";
            break;
          case "right":
            guard.facing = "down";
            break;
        }
      }
      else {
        guard.x = destPos.x;
        guard.y = destPos.y;
      }
      if (guard.x < 0 || guard.x >= mapWidth) {
        break;
      }
      if (guard.y < 0 || guard.y >= mapHeight) {
        break;
      }

      visitedPoints.add(`${guard.x},${guard.y}`);
    }
    if (ticks >= 10_000) {
      throw new Error("stuck");
    }

    return visitedPoints.size;
  },

  calcLoopSpots(guard: Guard, blockers: Point[], mapWidth: number, mapHeight: number): number {
    let loopCount = 0;
    for (let i = 0; i < mapHeight; i++) {
      for (let j = 0; j < mapWidth; j++) {
        console.log(j + mapWidth * i);
        try {
          this.calcGuardCoverage({x: guard.x, y: guard.y, facing: guard.facing}, [...blockers, {x: j, y: i}], mapWidth, mapHeight);
        }
        catch {
          loopCount++;
        }
      }
    }
    return loopCount;
  },
}
