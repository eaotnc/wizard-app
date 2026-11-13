import React, {useMemo} from 'react';
import {FormDatePicker} from '@components/form/FormDatePicker';
import {FormInput} from '@components/form/FormInput';
import {FormRadioGroup} from '@components/form/FormRadioGroup';
import {FormRow} from '@components/form/FormRow';
import {FormSection} from '@components/form/FormSection';
import {FormSelect} from '@components/form/FormSelect';
import {genderOptions, titleOptions} from '../../constants/options';
import type {InsuranceApplicationForm} from '../../types/insurance-application.type';

export function PersonalInformationForm() {
  const today = useMemo(() => new Date(), []);
  const defaultBirthDate = useMemo(() => new Date(1990, 0, 1), []);

  return (
    <FormSection
      title="Personal Information"
      description="Enter the applicant's details as they appear on the national ID.">
      <FormSelect<InsuranceApplicationForm>
        name="personalInformation.title"
        label="Title"
        required
        options={titleOptions}
        placeholder="Select title"
      />
      <FormRow>
        <FormInput<InsuranceApplicationForm>
          name="personalInformation.firstName"
          label="First Name"
          required
          autoCapitalize="words"
          autoCorrect={false}
          placeholder="First name"
        />
        <FormInput<InsuranceApplicationForm>
          name="personalInformation.lastName"
          label="Last Name"
          required
          autoCapitalize="words"
          autoCorrect={false}
          placeholder="Last name"
        />
      </FormRow>
      <FormRow>
        <FormInput<InsuranceApplicationForm>
          name="personalInformation.nationalId"
          label="National ID"
          required
          keyboardType="number-pad"
          maxLength={13}
          autoCorrect={false}
          placeholder="13 digits"
        />
        <FormDatePicker<InsuranceApplicationForm>
          name="personalInformation.dateOfBirth"
          label="Date of Birth"
          required
          fallbackDate={defaultBirthDate}
          maximumDate={today}
        />
      </FormRow>
      <FormRadioGroup<InsuranceApplicationForm>
        name="personalInformation.gender"
        label="Gender"
        required
        options={genderOptions}
      />
    </FormSection>
  );
}
