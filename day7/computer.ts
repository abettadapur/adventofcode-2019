export default function computer(
  program: number[],
  inputs: number[]
): number[] {
  let PC = 0;
  let IC = 0;
  let output = [];
  console.log(program[225]);
  while (PC < program.length) {
    console.log("PC", PC);
    const { type, modes } = parseOpcode(program[PC]);
    let arg1 = program[PC + 1];
    let arg2 = program[PC + 2];
    let arg3 = program[PC + 3];
    console.log("ARGS", arg1, arg2, arg3);
    switch (type) {
      case "add":
        if (modes[2] === "pos") {
          arg1 = program[arg1];
        }
        if (modes[1] === "pos") {
          arg2 = program[arg2];
        }
        console.log("Dest", arg3, arg1, "+", arg2, arg1 + arg2);
        program[arg3] = arg1 + arg2;
        PC += 4;
        break;
      case "mult":
        if (modes[2] === "pos") {
          arg1 = program[arg1];
        }
        if (modes[1] === "pos") {
          arg2 = program[arg2];
        }
        program[arg3] = arg1 * arg2;
        PC += 4;
        break;
      case "read":
        program[arg1] = inputs[IC++];
        PC += 2;
        break;
      case "write":
        if (modes[2] === "pos") {
          arg1 = program[arg1];
        }
        output.push(arg1);
        PC += 2;
        break;
      case "jit":
        if (modes[2] === "pos") {
          arg1 = program[arg1];
        }
        if (modes[1] === "pos") {
          arg2 = program[arg2];
        }

        if (arg1 !== 0) {
          PC = arg2;
        } else {
          PC += 3;
        }
        break;
      case "jif":
        if (modes[2] === "pos") {
          arg1 = program[arg1];
        }
        if (modes[1] === "pos") {
          arg2 = program[arg2];
        }

        if (arg1 === 0) {
          PC = arg2;
        } else {
          PC += 3;
        }
        break;
      case "lt":
        if (modes[2] === "pos") {
          arg1 = program[arg1];
        }
        if (modes[1] === "pos") {
          arg2 = program[arg2];
        }
        if (arg1 < arg2) {
          program[arg3] = 1;
        } else {
          program[arg3] = 0;
        }
        PC += 4;
        break;
      case "eq":
        if (modes[2] === "pos") {
          arg1 = program[arg1];
        }
        if (modes[1] === "pos") {
          arg2 = program[arg2];
        }
        if (arg1 === arg2) {
          program[arg3] = 1;
        } else {
          program[arg3] = 0;
        }
        PC += 4;
        break;

      case "halt":
        return output;
    }
  }

  return output;
}

type Mode = "pos" | "imm";

type Parameter = {
  value: number;
  mode: Mode;
};

type InstructionType =
  | "add"
  | "mult"
  | "read"
  | "write"
  | "jit"
  | "jif"
  | "lt"
  | "eq"
  | "halt";

function parseOpcode(
  opcode: number
): { type: InstructionType; modes: [Mode, Mode, Mode] } {
  console.log("Code", opcode.toString());
  const opcodeStr = opcode.toString();
  const opcodeTypeBit: string = opcodeStr[opcodeStr.length - 1];
  console.log("bit", opcodeTypeBit);
  const type: InstructionType =
    opcodeTypeBit === "1"
      ? "add"
      : opcodeTypeBit === "2"
      ? "mult"
      : opcodeTypeBit === "3"
      ? "read"
      : opcodeTypeBit === "4"
      ? "write"
      : opcodeTypeBit === "5"
      ? "jit"
      : opcodeTypeBit === "6"
      ? "jif"
      : opcodeTypeBit === "7"
      ? "lt"
      : opcodeTypeBit === "8"
      ? "eq"
      : "halt";

  let modeBits = opcodeStr.substr(0, opcodeStr.length - 2);
  const modes = ["pos", "pos", "pos"] as [Mode, Mode, Mode];
  if (modeBits.length !== 0) {
    modeBits = modeBits.padStart(3, "0");
    console.log(modeBits);
    for (let i = modeBits.length - 1; i >= 0; i--) {
      if (modeBits[i] === "1") {
        modes[i] = "imm";
      }
    }
  }
  console.dir({ type, modes });
  return { type, modes };
}
