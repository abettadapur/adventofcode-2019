import fs from "fs";
import path from "path";
export default function _() {
  const inputStr = fs.readFileSync(path.join(__dirname, "input.txt"), {
    encoding: "utf8"
  });
  const entries = inputStr.split("\n");
  const orbitMap: { [name: string]: string } = {};
  for (const entry of entries) {
    const planets = entry.split(")");
    const orbited = planets[1];
    const orbits = planets[0];

    if (!orbitMap[orbited]) {
      orbitMap[orbited] = orbits;
    }

    if (!orbitMap[orbits]) {
      orbitMap[orbits] = null;
    }
  }

  console.dir(orbitMap);
  const pathLength: { [planet: string]: number } = {};
  let total = 0;
  for (const planet of Object.keys(orbitMap)) {
    if (!pathLength[planet]) {
      const planetOrbitLength = computePath(planet, orbitMap, pathLength);
      console.log(planet, planetOrbitLength);
      pathLength[planet] = planetOrbitLength;
    }
  }

  console.dir(
    Object.values(pathLength).reduce((prev, value) => prev + value, 0)
  );
}

function computePath(
  planet: string,
  orbitMap: { [name: string]: string },
  pathLength: { [name: string]: number }
): number {
  let path = 0;
  let current = planet;

  while (current) {
    const orbits = orbitMap[current];
    if (orbits) {
      if (pathLength[orbits]) {
        return pathLength[orbits] + path + 1;
      } else {
        path++;
      }
    }

    current = orbits;
  }

  return path;
}
