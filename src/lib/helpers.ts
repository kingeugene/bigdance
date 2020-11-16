export function addZeroBefore(num: number): string {
    return ("0" + num).slice(-2);
}

export const minutesToTime = (time: number) => {
    const minutes: number = time % 60,
        hours: number = (time - minutes) / 60;

    return `${addZeroBefore(hours)}:${addZeroBefore(minutes)}`
}
