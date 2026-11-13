import {describe, expect, it} from '@jest/globals';
import {applicationSchema, stepSchemas} from '../src/screens/insurance-application/schemas/application.schema';
import type {InsuranceApplicationForm} from '../src/screens/insurance-application/types/insurance-application.type';

const validApplication: InsuranceApplicationForm = {
  personalInformation: {
    title: 'mr',
    firstName: 'Anan',
    lastName: 'Srisuk',
    nationalId: '1234567890123',
    dateOfBirth: '1990-01-15',
    gender: 'male',
  },
  contactInformation: {
    mobilePhone: '0812345678',
    email: 'anan@example.com',
    address: '123 Sukhumvit Road',
    province: 'Bangkok',
    postalCode: '10110',
  },
  insurancePlan: {
    plan: 'standard',
    coverageAmount: '1000000',
    startDate: '2026-12-01',
    duration: '5',
  },
  beneficiary: {
    fullName: 'Malee Srisuk',
    relationship: 'spouse',
    nationalId: '',
    phoneNumber: '',
  },
  healthInformation: {
    hasPreExistingConditions: 'no',
    medicalConditionDetails: '',
    takingMedication: 'no',
    medicationDetails: '',
    smokingStatus: 'no',
  },
  confirmation: {
    acceptTerms: true,
    confirmAccuracy: true,
  },
};

function issuePaths(result: {success: boolean; error?: {issues: {path: PropertyKey[]}[]}}) {
  if (result.success || !result.error) {
    return [];
  }

  return result.error.issues.map(issue => issue.path.join('.'));
}

describe('insurance application schemas', () => {
  it('rejects an empty first name on step 1', () => {
    const result = stepSchemas[1].safeParse({
      ...validApplication,
      personalInformation: {
        ...validApplication.personalInformation,
        firstName: '   ',
      },
    });

    expect(result.success).toBe(false);
    expect(issuePaths(result)).toContain('personalInformation.firstName');
  });

  it('accepts a valid applicant step without looking at later steps', () => {
    const result = stepSchemas[1].safeParse({
      ...validApplication,
      insurancePlan: {
        ...validApplication.insurancePlan,
        plan: '',
      },
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid national ID, phone, email, and postal code formats', () => {
    const result = stepSchemas[1].safeParse({
      ...validApplication,
      personalInformation: {
        ...validApplication.personalInformation,
        nationalId: '123456789012',
      },
      contactInformation: {
        ...validApplication.contactInformation,
        mobilePhone: '081234567',
        email: 'not-an-email',
        postalCode: '1011',
      },
    });

    expect(result.success).toBe(false);
    const paths = issuePaths(result);
    expect(paths).toContain('personalInformation.nationalId');
    expect(paths).toContain('contactInformation.mobilePhone');
    expect(paths).toContain('contactInformation.email');
    expect(paths).toContain('contactInformation.postalCode');
  });

  it('rejects an empty insurance plan on step 2 only', () => {
    const values = {
      ...validApplication,
      insurancePlan: {
        ...validApplication.insurancePlan,
        plan: '',
      },
    };

    expect(stepSchemas[1].safeParse(values).success).toBe(true);
    const result = stepSchemas[2].safeParse(values);
    expect(result.success).toBe(false);
    expect(issuePaths(result)).toContain('insurancePlan.plan');
  });

  it('requires medical details only when the applicant answers yes', () => {
    const missingDetails = stepSchemas[3].safeParse({
      ...validApplication,
      healthInformation: {
        ...validApplication.healthInformation,
        hasPreExistingConditions: 'yes',
        medicalConditionDetails: '   ',
        takingMedication: 'yes',
        medicationDetails: '',
      },
    });

    expect(missingDetails.success).toBe(false);
    const paths = issuePaths(missingDetails);
    expect(paths).toContain('healthInformation.medicalConditionDetails');
    expect(paths).toContain('healthInformation.medicationDetails');

    const clearedDetails = stepSchemas[3].safeParse({
      ...validApplication,
      healthInformation: {
        hasPreExistingConditions: 'no',
        medicalConditionDetails: '',
        takingMedication: 'no',
        medicationDetails: '',
        smokingStatus: 'no',
      },
    });

    expect(clearedDetails.success).toBe(true);
  });

  it('checks optional beneficiary formats only when a value is entered', () => {
    expect(
      stepSchemas[2].safeParse({
        ...validApplication,
        beneficiary: {
          ...validApplication.beneficiary,
          nationalId: '',
          phoneNumber: '',
        },
      }).success,
    ).toBe(true);

    const result = stepSchemas[2].safeParse({
      ...validApplication,
      beneficiary: {
        ...validApplication.beneficiary,
        nationalId: '1234',
        phoneNumber: '08123',
      },
    });

    expect(result.success).toBe(false);
    const paths = issuePaths(result);
    expect(paths).toContain('beneficiary.nationalId');
    expect(paths).toContain('beneficiary.phoneNumber');
  });

  it('accepts a complete application and rejects missing confirmation', () => {
    expect(applicationSchema.safeParse(validApplication).success).toBe(true);

    const result = applicationSchema.safeParse({
      ...validApplication,
      confirmation: {
        acceptTerms: false,
        confirmAccuracy: false,
      },
    });

    expect(result.success).toBe(false);
    const paths = issuePaths(result);
    expect(paths).toContain('confirmation.acceptTerms');
    expect(paths).toContain('confirmation.confirmAccuracy');
  });
});
