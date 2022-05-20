export default class FingeringMismatchError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, FingeringMismatchError.prototype);
  }
}
