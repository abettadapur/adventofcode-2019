import fs from "fs";
import path, { parse } from "path";
import _ from "lodash";

type Stroke = { direction: "U" | "D" | "L" | "R"; value: number };
type Point = { x: number; y: number };

export default function computeClosest() {
  const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
    encoding: "utf8"
  });

  const pathsStr = input.split("\n");
  const path1 = pathsStr[0].split(",").map(s => parseStroke(s));
  const path2 = pathsStr[1].split(",").map(s => parseStroke(s));

  const { points: points1 } = getPoints(path1);
  const { points: points2, pointSet } = getPoints(path2);

  // console.dir(points1);
  // console.dir(points2);

  let counter = 0;
  let common = points1.reduce((commonPoints, point) => {
    console.log("Comparing", ++counter);
    if (pointSet[`X${point.x}Y${point.y}`]) {
      commonPoints.push(point);
    }

    return commonPoints;
  }, [] as Array<Point>);

  const manhattan = common.map(p => Math.abs(p.x) + Math.abs(p.y));
  manhattan.sort((a, b) => a - b);

  console.dir(manhattan);
  // console.log(common[0].x + common[0].y);
}

function parseStroke(stroke: string): Stroke {
  const dir = stroke[0];

  return {
    direction: dir as any,
    value: Number(stroke.substr(1))
  };
}

function getPoints(strokes: Stroke[]): { points: Point[]; pointSet: any } {
  const points: Point[] = [];
  const pointSet = {};
  let current: Point = { x: 0, y: 0 };

  for (const stroke of strokes) {
    let value = stroke.value;
    switch (stroke.direction) {
      case "D": {
        while (value > 0) {
          let newPoint = { ...current, y: current.y + 1 };
          points.push(newPoint);
          pointSet[`X${newPoint.x}Y${newPoint.y}`] = newPoint;
          current = newPoint;
          value--;
        }
        break;
      }
      case "U": {
        while (value > 0) {
          let newPoint = { ...current, y: current.y - 1 };
          points.push(newPoint);
          pointSet[`X${newPoint.x}Y${newPoint.y}`] = newPoint;
          current = newPoint;
          value--;
        }
        break;
      }
      case "L": {
        while (value > 0) {
          let newPoint = { ...current, x: current.x - 1 };
          points.push(newPoint);
          pointSet[`X${newPoint.x}Y${newPoint.y}`] = newPoint;
          current = newPoint;
          value--;
        }
        break;
      }
      case "R": {
        while (value > 0) {
          let newPoint = { ...current, x: current.x + 1 };
          points.push(newPoint);
          pointSet[`X${newPoint.x}Y${newPoint.y}`] = newPoint;
          current = newPoint;
          value--;
        }
        break;
      }
    }
  }

  return { points, pointSet };
}
