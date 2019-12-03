const ADDITION = 1;
const MULT = 2;
const HALT = 99;

export default function computer(input: number[]): number {
  let i = 0;
  while (i < input.length) {
    const operand = input[i];
    const arg1 = input[input[i + 1]];
    const arg2 = input[input[i + 2]];
    const dest = input[i + 3];

    if (operand === ADDITION) {
      input[dest] = arg1 + arg2;
    } else if (operand === MULT) {
      input[dest] = arg1 * arg2;
    } else if (operand === HALT) {
      break;
    }

    i += 4;
  }

  return input[0];
}
