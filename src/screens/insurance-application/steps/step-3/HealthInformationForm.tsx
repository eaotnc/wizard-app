import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {FormInput} from '@components/form/FormInput';
import {FormRadioGroup} from '@components/form/FormRadioGroup';
import {FormSection} from '@components/form/FormSection';
import {yesNoOptions} from '../../constants/options';
import type {InsuranceApplicationForm} from '../../types/insurance-application.type';

export function HealthInformationForm() {
  const {setValue, clearErrors} = useFormContext<InsuranceApplicationForm>();
  const hasPreExisting = useWatch<InsuranceApplicationForm>({
    name: 'healthInformation.hasPreExistingConditions',
  });
  const takingMedication = useWatch<InsuranceApplicationForm>({
    name: 'healthInformation.takingMedication',
  });

  return (
    <FormSection
      title="Health Information"
      description="Answer each question. Extra detail is required only when you answer Yes.">
      <FormRadioGroup<InsuranceApplicationForm>
        name="healthInformation.hasPreExistingConditions"
        label="Do you have any pre-existing medical conditions?"
        required
        options={yesNoOptions}
        onValueChange={value => {
          if (value !== 'no') {
            return;
          }
          setValue('healthInformation.medicalConditionDetails', '', {
            shouldDirty: true,
            shouldValidate: false,
          });
          clearErrors('healthInformation.medicalConditionDetails');
        }}
      />
      {hasPreExisting === 'yes' ? (
        <FormInput<InsuranceApplicationForm>
          name="healthInformation.medicalConditionDetails"
          label="Medical condition details"
          required
          multiline
          placeholder="Describe the condition"
        />
      ) : null}
      <FormRadioGroup<InsuranceApplicationForm>
        name="healthInformation.takingMedication"
        label="Are you currently taking any medication?"
        required
        options={yesNoOptions}
        onValueChange={value => {
          if (value !== 'no') {
            return;
          }
          setValue('healthInformation.medicationDetails', '', {
            shouldDirty: true,
            shouldValidate: false,
          });
          clearErrors('healthInformation.medicationDetails');
        }}
      />
      {takingMedication === 'yes' ? (
        <FormInput<InsuranceApplicationForm>
          name="healthInformation.medicationDetails"
          label="Medication details"
          required
          multiline
          placeholder="List the medication"
        />
      ) : null}
      <FormRadioGroup<InsuranceApplicationForm>
        name="healthInformation.smokingStatus"
        label="Smoking Status"
        required
        options={yesNoOptions}
      />
    </FormSection>
  );
}
