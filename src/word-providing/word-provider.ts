/** Interface, which describes classes, that provide random words. */
export default interface IWordProvider {
  getWord(): Promise<string>;
}
