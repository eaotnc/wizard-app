import {z} from 'zod';
import {requiredAcceptance} from '../utils/schema-fields';

export const confirmationSchema = z.object({
  acceptTerms: requiredAcceptance(
    'You must accept the terms and conditions',
  ),
  confirmAccuracy: requiredAcceptance(
    'You must confirm that all information is accurate',
  ),
});
