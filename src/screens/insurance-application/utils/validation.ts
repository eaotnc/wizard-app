import {zodResolver} from '@hookform/resolvers/zod';
import type {Resolver} from 'react-hook-form';
import type {ZodIssue, ZodTypeAny} from 'zod';
import {applicationSchema, stepSchemas} from '../schemas/application.schema';
import type {
  InsuranceApplicationForm,
  WizardStep,
} from '../types/insurance-application.type';

/**
 * zodResolver validates the schema it was created with.
 * trigger(fieldNames) does not narrow that schema, so callers replace
 * `activeSchema` immediately before trigger() or handleSubmit().
 */
let activeSchema: ZodTypeAny = stepSchemas[1];

export function setActiveSchemaForStep(step: WizardStep) {
  activeSchema = stepSchemas[step];
}

export function setActiveSchemaForSubmit() {
  activeSchema = applicationSchema;
}

export const wizardResolver: Resolver<InsuranceApplicationForm> = (
  values,
  context,
  options,
) => {
  // A step schema strips keys it does not know. raw: true returns the original
  // form values so a successful step check cannot drop the other steps.
  return zodResolver(activeSchema, undefined, {raw: true})(
    values,
    context,
    options,
  );
};

const stepByField = {
  personalInformation: 1,
  contactInformation: 1,
  insurancePlan: 2,
  beneficiary: 2,
  healthInformation: 3,
  confirmation: 3,
} as const;

export function firstInvalidStepFromIssues(
  issues: Pick<ZodIssue, 'path'>[],
): WizardStep | null {
  let first: WizardStep | null = null;

  for (const issue of issues) {
    const head = issue.path[0];
    if (typeof head !== 'string' || !(head in stepByField)) {
      continue;
    }

    const step = stepByField[head as keyof typeof stepByField];
    if (first === null || step < first) {
      first = step;
    }
  }

  return first;
}
