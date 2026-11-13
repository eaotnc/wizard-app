import {z} from 'zod';
import {requiredChoice} from '../utils/schema-fields';

export const yesNoValues = ['yes', 'no'] as const;

export const healthInformationSchema = z
  .object({
    hasPreExistingConditions: requiredChoice(
      yesNoValues,
      'Please answer this question',
    ),
    medicalConditionDetails: z.string(),
    takingMedication: requiredChoice(
      yesNoValues,
      'Please answer this question',
    ),
    medicationDetails: z.string(),
    smokingStatus: requiredChoice(yesNoValues, 'Smoking status is required'),
  })
  .superRefine((data, ctx) => {
    if (
      data.hasPreExistingConditions === 'yes' &&
      data.medicalConditionDetails.trim().length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['medicalConditionDetails'],
        message: 'Medical condition details are required',
      });
    }

    if (
      data.takingMedication === 'yes' &&
      data.medicationDetails.trim().length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['medicationDetails'],
        message: 'Medication details are required',
      });
    }
  });
