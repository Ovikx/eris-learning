export async function sleep(ms: number) {
    await (() => new Promise(resolve => setTimeout(resolve, ms)))();
}

export function randRange(max: number, min: number): number {
    return Math.random() * (max-min) + min;
}