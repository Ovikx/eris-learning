export async function sleep(time: number) {
    console.log('start timer');
    await (() => new Promise(resolve => setTimeout(resolve, time)))();
    console.log('end timer');
}