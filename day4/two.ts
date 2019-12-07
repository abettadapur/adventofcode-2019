
//     It is a six-digit number.
//     The value is within the range given in your puzzle input.
//     Two adjacent digits are the same (like 22 in 122345).
//     Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

// Other than the range rule, the following are true:

//     111111 meets these criteria (double 11, never decreases).
//     223450 does not meet these criteria (decreasing pair of digits 50).
//     123789 does not meet these criteria (no double).

const MIN = 172851;
const MAX = 675869;

export default function computePassword() {
    let counter = 0;
    for (let i = MIN; i <= MAX; i++) {
        if (checkPassword(i)) {
            counter++;
        }
    }

    console.log(counter);

    console.log(112233, checkPassword(112233));
    console.log(111222, checkPassword(111222));
    console.log(234444, checkPassword(234444));
    console.log(345667, checkPassword(345667));
    console.log(111111, checkPassword(111111));
}

function checkPassword(value: number): boolean {
    let repeatLength: number = 1;
    let hasRepeat: boolean = false;
    let prev: string = undefined;
    for (const char of value.toString()) {
        if (prev) {
            if (char.localeCompare(prev) < 0) {
                return false;
            }

            if (prev === char) {
                repeatLength++;
            } else {
                if (repeatLength === 2) {
                    hasRepeat = true;
                }
                repeatLength = 1;
            }

        }
        prev = char;

    }
    return hasRepeat || repeatLength === 2;
}