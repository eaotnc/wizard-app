import {z} from 'zod';
import {beneficiarySchema} from './beneficiary.schema';
import {confirmationSchema} from './confirmation.schema';
import {contactInformationSchema} from './contact.schema';
import {healthInformationSchema} from './health.schema';
import {insurancePlanSchema} from './insurance.schema';
import {personalInformationSchema} from './personal.schema';

export const applicationSchema = z.object({
  personalInformation: personalInformationSchema,
  contactInformation: contactInformationSchema,
  insurancePlan: insurancePlanSchema,
  beneficiary: beneficiarySchema,
  healthInformation: healthInformationSchema,
  confirmation: confirmationSchema,
});

export const stepSchemas = {
  1: applicationSchema.pick({
    personalInformation: true,
    contactInformation: true,
  }),
  2: applicationSchema.pick({
    insurancePlan: true,
    beneficiary: true,
  }),
  3: applicationSchema.pick({
    healthInformation: true,
    confirmation: true,
  }),
} as const;
