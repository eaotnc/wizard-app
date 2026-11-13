import {z} from 'zod';
import {requiredDigits, requiredText} from '../utils/schema-fields';

export const contactInformationSchema = z.object({
  mobilePhone: requiredDigits(
    10,
    'Mobile phone is required',
    'Mobile phone must be 10 digits',
  ),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Enter a valid email address'),
  address: requiredText('Address is required'),
  province: requiredText('Province is required'),
  postalCode: requiredDigits(
    5,
    'Postal code is required',
    'Postal code must be 5 digits',
  ),
});
