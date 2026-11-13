import {z} from 'zod';
import {optionalDigits, requiredChoice, requiredText} from '../utils/schema-fields';

export const relationshipValues = ['parent', 'spouse', 'child', 'other'] as const;

export const beneficiarySchema = z.object({
  fullName: requiredText('Beneficiary full name is required'),
  relationship: requiredChoice(relationshipValues, 'Relationship is required'),
  nationalId: optionalDigits(13, 'National ID must be exactly 13 digits'),
  phoneNumber: optionalDigits(10, 'Phone number must be 10 digits'),
});
