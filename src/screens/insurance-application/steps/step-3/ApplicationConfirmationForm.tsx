import React from 'react';
import {FormCheckbox} from '@components/form/FormCheckbox';
import {FormSection} from '@components/form/FormSection';
import type {InsuranceApplicationForm} from '../../types/insurance-application.type';

export function ApplicationConfirmationForm() {
  return (
    <FormSection
      title="Application Confirmation"
      description="Confirm the application before it is submitted.">
      <FormCheckbox<InsuranceApplicationForm>
        name="confirmation.acceptTerms"
        label="I accept the terms and conditions"
        required
      />
      <FormCheckbox<InsuranceApplicationForm>
        name="confirmation.confirmAccuracy"
        label="I confirm that all information is accurate"
        required
      />
    </FormSection>
  );
}
