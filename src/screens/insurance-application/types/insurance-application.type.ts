import type {z} from 'zod';
import type {applicationSchema} from '../schemas/application.schema';

export type InsuranceApplicationForm = z.infer<typeof applicationSchema>;

export type WizardStep = 1 | 2 | 3;

export type WizardStepMeta = {
  id: WizardStep;
  title: string;
  description: string;
};

export const STEP_META: readonly WizardStepMeta[] = [
  {
    id: 1,
    title: 'Applicant',
    description: 'Personal and contact details',
  },
  {
    id: 2,
    title: 'Insurance',
    description: 'Plan and beneficiary',
  },
  {
    id: 3,
    title: 'Confirmation',
    description: 'Health and review',
  },
];

export const defaultApplicationValues: InsuranceApplicationForm = {
  personalInformation: {
    title: '',
    firstName: '',
    lastName: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
  },
  contactInformation: {
    mobilePhone: '',
    email: '',
    address: '',
    province: '',
    postalCode: '',
  },
  insurancePlan: {
    plan: '',
    coverageAmount: '',
    startDate: '',
    duration: '',
  },
  beneficiary: {
    fullName: '',
    relationship: '',
    nationalId: '',
    phoneNumber: '',
  },
  healthInformation: {
    hasPreExistingConditions: '',
    medicalConditionDetails: '',
    takingMedication: '',
    medicationDetails: '',
    smokingStatus: '',
  },
  confirmation: {
    acceptTerms: false,
    confirmAccuracy: false,
  },
};

export function isWizardStep(value: unknown): value is WizardStep {
  return value === 1 || value === 2 || value === 3;
}

export function isApplicationDraft(
  value: unknown,
): value is InsuranceApplicationForm {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const draft = value as Record<string, unknown>;
  return (
    isRecord(draft.personalInformation) &&
    isRecord(draft.contactInformation) &&
    isRecord(draft.insurancePlan) &&
    isRecord(draft.beneficiary) &&
    isRecord(draft.healthInformation) &&
    isRecord(draft.confirmation)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
