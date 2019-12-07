
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
}

function checkPassword(value: number): boolean {
    let hasRepeat: boolean = false;
    let prev: string = undefined;
    for (const char of value.toString()) {
        if (prev) {
            if (char.localeCompare(prev) < 0) {
                return false;
            }

            if (prev === char) {
                hasRepeat = true;
            }
        }

        prev = char;
    }

    return hasRepeat;
}