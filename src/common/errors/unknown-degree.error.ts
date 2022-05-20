export default class UnknownDegreeError extends Error {
  constructor(degree: string) {
    super(`Unknown degree: ${degree}.`);
    Object.setPrototypeOf(this, UnknownDegreeError.prototype);
  }
}
