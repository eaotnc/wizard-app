import React, {useMemo} from 'react';
import {FormDatePicker} from '@components/form/FormDatePicker';
import {FormInput} from '@components/form/FormInput';
import {FormSection} from '@components/form/FormSection';
import {FormSelect} from '@components/form/FormSelect';
import {durationOptions, planOptions} from '../../constants/options';
import type {InsuranceApplicationForm} from '../../types/insurance-application.type';

export function InsurancePlanForm() {
  const today = useMemo(() => new Date(), []);

  return (
    <FormSection
      title="Insurance Plan"
      description="Choose the coverage and when the policy should begin.">
      <FormSelect<InsuranceApplicationForm>
        name="insurancePlan.plan"
        label="Insurance Plan"
        required
        options={planOptions}
        placeholder="Select a plan"
      />
      <FormInput<InsuranceApplicationForm>
        name="insurancePlan.coverageAmount"
        label="Coverage Amount"
        required
        keyboardType="number-pad"
        autoCorrect={false}
        placeholder="Amount in THB"
      />
      <FormDatePicker<InsuranceApplicationForm>
        name="insurancePlan.startDate"
        label="Insurance Start Date"
        required
        fallbackDate={today}
        minimumDate={today}
      />
      <FormSelect<InsuranceApplicationForm>
        name="insurancePlan.duration"
        label="Insurance Duration"
        required
        options={durationOptions}
        placeholder="Select duration"
      />
    </FormSection>
  );
}
