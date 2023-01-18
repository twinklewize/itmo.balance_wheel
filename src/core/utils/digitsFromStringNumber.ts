export function digitsFromStringNumber(num: string): number[] {
    return String(num).split("").map(num => Number(num))
}

export function stringNumberFromDigits(digits: number[]): string {
    let num = '';
    digits.forEach(d => num += d)
    return num;
}