import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ChordDegreeDto } from '../../modules/chord/dto/create-chord.dto';
import {
  degreeToSemitones,
  isValidChordDegreeString,
  isValidScaleDegreeString,
} from '../utils/degree-utils';

function isDegreeArrayValid(
  degrees: string[],
  degreeSymbolValidator: (d: string) => boolean,
): boolean {
  const degreesBySemitones: Map<number, string> = new Map<number, string>();
  return degrees.every((d) => {
    if (!degreeSymbolValidator(d)) {
      return false;
    }
    const semitones = degreeToSemitones(d);
    if (degreesBySemitones.has(semitones)) {
      return false;
    }
    degreesBySemitones.set(semitones, d);
    return true;
  });
}

@ValidatorConstraint({ name: 'ValidChordDegrees', async: false })
export class IsValidChordDegreeList implements ValidatorConstraintInterface {
  validate(degreeDtos: ChordDegreeDto[], args: ValidationArguments) {
    return isDegreeArrayValid(
      degreeDtos.map((degree) => degree.d),
      isValidChordDegreeString,
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'Provided degrees have two or more enharmonically equal degrees';
  }
}

@ValidatorConstraint({ name: 'ValidDegrees', async: false })
export class IsValidScaleDegreeList implements ValidatorConstraintInterface {
  validate(degrees: string[], args: ValidationArguments) {
    return isDegreeArrayValid(degrees, isValidScaleDegreeString);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Provided degrees contain duplicate or unknown degrees';
  }
}
