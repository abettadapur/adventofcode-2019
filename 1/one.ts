import fs from "fs";
import path from "path";
import computeFuel from "../common/computeFuel";

export default function adventOne() {
  const fileContent: string = fs.readFileSync(
    path.join(__dirname, "input.txt"),
    {
      encoding: "utf8"
    }
  );
  const weights = fileContent.split("\n");
  let totalFuel = 0;

  for (const weight of weights) {
    totalFuel += computeFuel(Number(weight));
  }

  console.log("Total Fuel", totalFuel);
}
