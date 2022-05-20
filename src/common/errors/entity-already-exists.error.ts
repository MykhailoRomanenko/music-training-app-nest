export default class EntityAlreadyExistsError extends Error {
  private readonly _chordId: string;

  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, EntityAlreadyExistsError.prototype);
  }
}
