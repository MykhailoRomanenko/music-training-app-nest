import { Note } from './notes';

export class GuitarFretboard {
  private readonly openNotes: number[];

  constructor(openNotes: number[]) {
    this.openNotes = openNotes;
  }

  getNote(stringNum: number, fret: number): number {
    if (fret < 0) {
      throw new Error('Negative fret');
    }
    const stringIndex = stringNum - 1;
    if (stringIndex < 0 || stringIndex >= this.openNotes.length) {
      throw new Error('Invalid string');
    }
    const openNote = this.openNotes[stringIndex];
    return (openNote + fret) % 12;
  }
}

export const DefaultGuitarFretboard = new GuitarFretboard([
  Note.E,
  Note.B,
  Note.G,
  Note.D,
  Note.A,
  Note.E,
]);
