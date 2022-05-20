export default class GuitarFretboardError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, GuitarFretboardError.prototype);
  }
}
