import React from 'react';
import {FormInput} from '@components/form/FormInput';
import {FormRow} from '@components/form/FormRow';
import {FormSection} from '@components/form/FormSection';
import {FormSelect} from '@components/form/FormSelect';
import {provinceOptions} from '../../constants/options';
import type {InsuranceApplicationForm} from '../../types/insurance-application.type';

export function ContactInformationForm() {
  return (
    <FormSection
      title="Contact Information"
      description="Where policy documents and updates should be sent.">
      <FormRow>
        <FormInput<InsuranceApplicationForm>
          name="contactInformation.mobilePhone"
          label="Mobile Phone"
          required
          keyboardType="number-pad"
          maxLength={10}
          autoCorrect={false}
          placeholder="10 digits"
        />
        <FormInput<InsuranceApplicationForm>
          name="contactInformation.email"
          label="Email Address"
          required
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="name@email.com"
        />
      </FormRow>
      <FormInput<InsuranceApplicationForm>
        name="contactInformation.address"
        label="Address"
        required
        multiline
        placeholder="House number, street, district"
      />
      <FormRow>
        <FormSelect<InsuranceApplicationForm>
          name="contactInformation.province"
          label="Province"
          required
          options={provinceOptions}
          placeholder="Select province"
        />
        <FormInput<InsuranceApplicationForm>
          name="contactInformation.postalCode"
          label="Postal Code"
          required
          keyboardType="number-pad"
          maxLength={5}
          autoCorrect={false}
          placeholder="5 digits"
        />
      </FormRow>
    </FormSection>
  );
}
