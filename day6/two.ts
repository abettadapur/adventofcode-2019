import fs from "fs";
import path from "path";

export default function _() {
  const inputStr = fs.readFileSync(path.join(__dirname, "test.txt"), {
    encoding: "utf8"
  });
  const entries = inputStr.split("\n");
  const nodes: {
    [name: string]: { name: string; to?: string; from?: string };
  } = {};

  for (const entry of entries) {
    const planets = entry.split(")");
    const orbited = planets[0];
    const orbits = planets[1];

    if (!nodes[orbited]) {
      nodes[orbited] = { name: orbited };
    }

    if (!nodes[orbits]) {
      nodes[orbits] = { name: orbits };
    }

    nodes[orbited].to = orbits;
    if (nodes[orbits]) {
      nodes[orbits].from = orbited;
    }
  }

  console.dir(nodes);
  const visited = new Set();
  const stack = ["YOU"];
  let stepMap: { [planet: string]: number } = { YOU: 0 };

  while (stack.length > 0) {
    const current = stack.pop();
    if (current === "SAN") {
      console.log("FOUND!");
      console.log(stepMap["SAN"]);
      break;
    }

    if (!visited.has(current)) {
      // visit
      visited.add(current);

      const node = nodes[current];
      const to = node.to;
      const from = node.from;
      console.log(current, to, from);

      if (to && !visited.has(to)) {
        stepMap[to] = stepMap[current] + 1;
        console.log("WILL VISITING", to);
        stack.push(to);
      }

      if (from && !visited.has(from)) {
        stepMap[from] = stepMap[current] + 1;
        console.log("WILL VISITING", to);
        stack.push(from);
      }
    }
  }
}
