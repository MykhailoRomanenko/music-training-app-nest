import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FingeringDto } from '../../modules/guitar-chord/dto/create-guitar-chord.dto';

@ValidatorConstraint({ name: 'IsValidFingering', async: false })
export class IsValidFingering implements ValidatorConstraintInterface {
  validate(fingerings: FingeringDto[], args: ValidationArguments) {
    if (!fingerings) {
      return false;
    }
    const usedStrings: number[] = [];
    return !fingerings.some((f: FingeringDto) => {
      if (!usedStrings.includes(f.string)) {
        usedStrings.push(f.string);
        return false;
      }
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return 'Provided fingerings contain two or more frettings of the same string';
  }
}
