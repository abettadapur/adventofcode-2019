import fs from "fs";
import path from "path";
import computeFuel from "./computeFuel";

const inputFuel = 3324332;

export default function adventTwo() {
  const fileContent: string = fs.readFileSync(
    path.join(__dirname, "input.txt"),
    {
      encoding: "utf8"
    }
  );
  const weights = fileContent.split("\n");
  let totalFuel = 0;

  for (const weight of weights) {
    const fuelForWeight = computeFuel(Number(weight));
    const fuelForFuel = computeFuelForFuel(fuelForWeight);

    totalFuel = totalFuel + fuelForWeight + fuelForFuel;
  }

  console.log("Total Fuel", totalFuel);
}

function computeFuelForFuel(fuel: number): number {
  let totalFuel = 0;
  let additionalFuel = fuel;

  console.log("Fuel", fuel);
  while (additionalFuel > 0) {
    const fuelForAdditionalFuel = computeFuel(additionalFuel);
    if (fuelForAdditionalFuel <= 0) {
      break;
    }
    console.log("Requires", fuelForAdditionalFuel);
    totalFuel += fuelForAdditionalFuel;
    additionalFuel = fuelForAdditionalFuel;
  }

  return totalFuel;
}
