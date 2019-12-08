import fs from "fs";
import path from "path";
import Computer from "./computer2";

export default function ThermalComputer() {
  const programStr = fs.readFileSync(path.join(__dirname, "input.txt"), {
    encoding: "utf8"
  });

  const program = programStr.split(",").map(i => Number(i));

  const tests = permutator([5, 6, 7, 8, 9]);
  let max = 0;
  let phase = [];
  for (const test of tests) {
    let output = runLoop(program, test);
    console.log("OUTPUT", output);
    if (max < output) {
      max = output;
      phase = test;
    }
  }

  console.log(max);
  console.dir(phase);
}

function runLoop(program: number[], phases: number[]): number {
  const amplifiers = [
    new Computer([...program]),
    new Computer([...program]),
    new Computer([...program]),
    new Computer([...program]),
    new Computer([...program])
  ];

  amplifiers.forEach((amp, i) => amp.addInput(phases[i]));
  let ampIndex = 0;
  let lastOutput = 0;
  while (ampIndex < amplifiers.length) {
    console.log("Running on", ampIndex);
    const amp = amplifiers[ampIndex];
    amp.addInput(lastOutput);
    const { state } = amp.run();
    lastOutput = amp.output;
    console.log("output", lastOutput);
    if (state === "suspend") {
      ampIndex++;
      if (ampIndex === amplifiers.length) ampIndex = 0;
    } else {
      ampIndex++;
    }
  }
  console.log("LASTOUTPUT", lastOutput);
  return lastOutput;
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
