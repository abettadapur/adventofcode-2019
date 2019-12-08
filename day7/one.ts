import fs from "fs";
import path from "path";
import computer from "./computer";

export default function ThermalComputer() {
  const programStr = fs.readFileSync(path.join(__dirname, "input.txt"), {
    encoding: "utf8"
  });

  const program = programStr.split(",").map(i => Number(i));

  const tests = permutator([0, 1, 2, 3, 4]);
  let max = 0;
  let phase = [];
  for (const test of tests) {
    let output = 0;
    for (let i = 0; i < 5; i++) {
      output = computer([...program], [test[i], output])[0];
    }

    console.log("OUTPUT", output);
    if (max < output) {
      max = output;
      phase = test;
    }
  }

  console.log(max);
  console.dir(phase);
}

const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};
