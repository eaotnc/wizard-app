import {z} from 'zod';
import {
  requiredChoice,
  requiredPositiveAmount,
  requiredText,
} from '../utils/schema-fields';

export const planValues = ['basic', 'standard', 'premium'] as const;
export const durationValues = ['1', '5', '10'] as const;

export const insurancePlanSchema = z.object({
  plan: requiredChoice(planValues, 'Insurance plan is required'),
  coverageAmount: requiredPositiveAmount(
    'Coverage amount is required',
    'Enter a coverage amount greater than 0',
  ),
  startDate: requiredText('Insurance start date is required'),
  duration: requiredChoice(durationValues, 'Insurance duration is required'),
});
