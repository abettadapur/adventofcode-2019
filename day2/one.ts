import fs from "fs";
import path from "path";
import computer from "./computer";

export default function gravityComputer() {
  const inpuStr: string = fs.readFileSync(path.join(__dirname, "input.txt"), {
    encoding: "utf8"
  });
  const inputStrArray = inpuStr.split(",");
  const input = inputStrArray.map(i => Number(i));
  console.log(computer(input));
}
