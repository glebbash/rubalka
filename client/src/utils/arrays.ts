export function take<T>(amount: number, arr: T[]): T[] {
    const ret = [];
    for (let i = 0; i < amount; i++) {
        ret.push(arr[i]);
    }
    return ret;
}