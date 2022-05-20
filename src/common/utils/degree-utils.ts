import { DegreeData } from '../types';
import UnknownDegreeError from '../errors/unknown-degree.error';

function createDegreeMap(): Map<string, DegreeData> {
  const degreeMap: Map<string, DegreeData> = new Map<string, DegreeData>();
  degreeMap.set('1', { semitones: 0 });
  degreeMap.set('b2', { semitones: 1 });
  degreeMap.set('2', { semitones: 2 });
  degreeMap.set('#2', { semitones: 3 });
  degreeMap.set('b3', { semitones: 3 });
  degreeMap.set('3', { semitones: 4 });
  degreeMap.set('4', { semitones: 5 });
  degreeMap.set('#4', { semitones: 6 });
  degreeMap.set('b5', { semitones: 6 });
  degreeMap.set('5', { semitones: 7 });
  degreeMap.set('#5', { semitones: 8 });
  degreeMap.set('b6', { semitones: 8 });
  degreeMap.set('6', { semitones: 9 });
  degreeMap.set('b7', { semitones: 10 });
  degreeMap.set('7', { semitones: 11 });
  degreeMap.set('b9', { semitones: 1 });
  degreeMap.set('9', { semitones: 2 });
  degreeMap.set('#9', { semitones: 3 });
  degreeMap.set('11', { semitones: 5 });
  degreeMap.set('#11', { semitones: 6 });
  degreeMap.set('b13', { semitones: 8 });
  degreeMap.set('13', { semitones: 9 });
  return degreeMap;
}

const degreeMap = createDegreeMap();

export function degreeToSemitones(degree: string): number {
  const degreeData = degreeMap.get(degree);
  if (!degreeData) {
    throw new UnknownDegreeError(degree);
  }
  return degreeData.semitones;
}

export function isValidChordDegreeString(degree: string): boolean {
  return degreeMap.has(degree);
}

export function isValidScaleDegreeString(degree: string): boolean {
  return degreeMap.has(degree) && getDegreeNumber(degree) < 8;
}

export function getDegreeNumber(degree: string): number {
  if (degree.startsWith('#') || degree.startsWith('b')) {
    return parseInt(degree.substring(1));
  }
  return parseInt(degree);
}

export function compareDegreeStrings(d1: string, d2: string): number {
  const n1 = getDegreeNumber(d1);
  const n2 = getDegreeNumber(d2);
  if (n1 === n2) {
    if (d1.startsWith('b')) {
      return -1;
    }
    if (d1.startsWith('#')) {
      return 1;
    }
    if (d2.startsWith('b')) {
      return 1;
    }
    return -1;
  }
  return n1 - n2;
}
