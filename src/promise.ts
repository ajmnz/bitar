/**
 * Wait x ms before resolving a promise.
 *
 * @param ms - The milliseconds to wait
 * @returns A promise that resolves after the specified milliseconds
 * @example
 * ```ts
 * console.log("Waiting...");
 * await prom.wait(3000);
 * console.log("Waited for 3s");
 * ```
 */
export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

/**
 * Like `Promise.all`, but awaits all promises sequentially and returns the
 * results in the same order. If any of the promises fail, the whole promise is
 * rejected.
 *
 * @param promises - Promises to resolve
 * @returns The resolved promises
 * @example
 * ```ts
 * const [r1, r2, r3] = await prom.seq([p1, p2, p3]);
 * ```
 */
export async function seq<T extends Promise<unknown>>(
  promises: T[]
): Promise<Awaited<T>[]> {
  const results: Awaited<T>[] = [];
  for (const promise of promises) {
    results.push(await promise);
  }
  return results;
}
