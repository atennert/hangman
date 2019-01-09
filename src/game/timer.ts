
/**
 * Creates a simple timeout encapsulated in a Promise.
 * @param ms timeout in ms
 */
export default function timer(ms: number): Promise<{}> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
