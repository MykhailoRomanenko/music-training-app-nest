// to have degree names accessible in code
// this should be static, as these names haven't changed for centuries
export enum DEGREE {
  F_SECOND = 'b2',
  SECOND = '2',
  A_SECOND = '#2',
  F_THIRD = 'b3',
  THIRD = '3',
  FOURTH = '4',
  S_FOURTH = '#4',
  D_FIFTH = 'b5',
  FIFTH = '5',
  A_FIFTH = '#5',
  F_SIXTH = 'b6',
  SIXTH = '6',
  F_SEVENTH = 'b7',
  SEVENTH = '7',
  F_NINTH = 'b9',
  NINTH = '9',
  S_NINTH = '#9',
  ELEVENTH = '11',
  S_ELEVENTH = '#11',
  F_THIRTEENTH = 'b13',
  THIRTEENTH = '13',
}

export interface DegreeData {
  semitones: number;
}

export enum SCALE_DEGREE {}
