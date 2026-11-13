import React from 'react';
import {FormInput} from '@components/form/FormInput';
import {FormSection} from '@components/form/FormSection';
import {FormSelect} from '@components/form/FormSelect';
import {relationshipOptions} from '../../constants/options';
import type {InsuranceApplicationForm} from '../../types/insurance-application.type';

export function BeneficiaryForm() {
  return (
    <FormSection
      title="Beneficiary Information"
      description="The person who receives the benefit if a claim is paid.">
      <FormInput<InsuranceApplicationForm>
        name="beneficiary.fullName"
        label="Beneficiary Full Name"
        required
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Full name"
      />
      <FormSelect<InsuranceApplicationForm>
        name="beneficiary.relationship"
        label="Relationship"
        required
        options={relationshipOptions}
        placeholder="Select relationship"
      />
      <FormInput<InsuranceApplicationForm>
        name="beneficiary.nationalId"
        label="Beneficiary National ID"
        keyboardType="number-pad"
        maxLength={13}
        autoCorrect={false}
        placeholder="13 digits, if available"
      />
      <FormInput<InsuranceApplicationForm>
        name="beneficiary.phoneNumber"
        label="Beneficiary Phone Number"
        keyboardType="number-pad"
        maxLength={10}
        autoCorrect={false}
        placeholder="10 digits, if available"
      />
    </FormSection>
  );
}
