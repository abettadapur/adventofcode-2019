export default class Computer {
  private program: number[];
  private inputs: number[] = [];
  private outputs: number[] = [];
  private PC = 0;
  private IC = 0;

  constructor(program: number[]) {
    this.program = program;
  }

  public get output(): number {
    return this.outputs[this.outputs.length - 1];
  }

  public addInput(input: number) {
    this.inputs.push(input);
  }

  public run(): { state: "halted" | "suspend" } {
    console.dir(this.inputs);
    while (this.PC < this.program.length) {
      const { type, modes } = parseOpcode(this.program[this.PC]);
      let arg1 = this.program[this.PC + 1];
      let arg2 = this.program[this.PC + 2];
      let arg3 = this.program[this.PC + 3];
      switch (type) {
        case "add":
          if (modes[2] === "pos") {
            arg1 = this.program[arg1];
          }
          if (modes[1] === "pos") {
            arg2 = this.program[arg2];
          }
          this.program[arg3] = arg1 + arg2;
          this.PC += 4;
          break;
        case "mult":
          if (modes[2] === "pos") {
            arg1 = this.program[arg1];
          }
          if (modes[1] === "pos") {
            arg2 = this.program[arg2];
          }
          this.program[arg3] = arg1 * arg2;
          this.PC += 4;
          break;
        case "read":
          if (this.inputs.length <= this.IC) {
            console.log("SUSPENDING");
            /// suspend
            return { state: "suspend" };
          }
          this.program[arg1] = this.inputs[this.IC++];
          console.log(this.inputs[this.IC - 1]);
          this.PC += 2;
          break;
        case "write":
          if (modes[2] === "pos") {
            arg1 = this.program[arg1];
          }
          this.outputs.push(arg1);
          this.PC += 2;
          break;
        case "jit":
          if (modes[2] === "pos") {
            arg1 = this.program[arg1];
          }
          if (modes[1] === "pos") {
            arg2 = this.program[arg2];
          }

          if (arg1 !== 0) {
            this.PC = arg2;
          } else {
            this.PC += 3;
          }
          break;
        case "jif":
          if (modes[2] === "pos") {
            arg1 = this.program[arg1];
          }
          if (modes[1] === "pos") {
            arg2 = this.program[arg2];
          }

          if (arg1 === 0) {
            this.PC = arg2;
          } else {
            this.PC += 3;
          }
          break;
        case "lt":
          if (modes[2] === "pos") {
            arg1 = this.program[arg1];
          }
          if (modes[1] === "pos") {
            arg2 = this.program[arg2];
          }
          if (arg1 < arg2) {
            this.program[arg3] = 1;
          } else {
            this.program[arg3] = 0;
          }
          this.PC += 4;
          break;
        case "eq":
          if (modes[2] === "pos") {
            arg1 = this.program[arg1];
          }
          if (modes[1] === "pos") {
            arg2 = this.program[arg2];
          }
          if (arg1 === arg2) {
            this.program[arg3] = 1;
          } else {
            this.program[arg3] = 0;
          }
          this.PC += 4;
          break;

        case "halt":
          return { state: "halted" };
      }
    }

    return { state: "halted" };
  }
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
  const opcodeStr = opcode.toString();
  const opcodeTypeBit: string = opcodeStr[opcodeStr.length - 1];
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
    for (let i = modeBits.length - 1; i >= 0; i--) {
      if (modeBits[i] === "1") {
        modes[i] = "imm";
      }
    }
  }
  console.dir({ type, modes });
  return { type, modes };
}
