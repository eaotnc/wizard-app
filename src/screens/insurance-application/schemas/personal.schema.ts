import {z} from 'zod';
import {
  requiredChoice,
  requiredDigits,
  requiredText,
} from '../utils/schema-fields';

export const titleValues = ['mr', 'mrs', 'ms'] as const;
export const genderValues = ['male', 'female', 'other'] as const;

export const personalInformationSchema = z.object({
  title: requiredChoice(titleValues, 'Title is required'),
  firstName: requiredText('First name is required'),
  lastName: requiredText('Last name is required'),
  nationalId: requiredDigits(
    13,
    'National ID is required',
    'National ID must be exactly 13 digits',
  ),
  dateOfBirth: requiredText('Date of birth is required'),
  gender: requiredChoice(genderValues, 'Gender is required'),
});
