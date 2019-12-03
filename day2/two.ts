import fs from "fs";
import path from "path";
import computer from "./computer";

export default function partTwo() {
  const inpuStr: string = fs.readFileSync(path.join(__dirname, "input.txt"), {
    encoding: "utf8"
  });
  const inputStrArray = inpuStr.split(",");
  const input = inputStrArray.map(i => Number(i));

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const newInput = [...input];
      newInput[1] = i;
      newInput[2] = j;
      let result = computer(newInput);
      if (result === 19690720) {
        console.log(i, ",", j);
      }
    }
  }
}
