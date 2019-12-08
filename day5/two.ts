import fs from "fs";
import path from "path";
import computer from "./computer";

export default function ThermalComputer() {
  const programStr = fs.readFileSync(path.join(__dirname, "input.txt"), {
    encoding: "utf8"
  });

  const program = programStr.split(",").map(i => Number(i));

  const output = computer(program, 5);

  console.log(output);
}
