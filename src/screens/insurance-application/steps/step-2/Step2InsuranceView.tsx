import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '@constants/theme';
import {BeneficiaryForm} from './BeneficiaryForm';
import {InsurancePlanForm} from './InsurancePlanForm';

export function Step2InsuranceView() {
  return (
    <View style={styles.step}>
      <View style={styles.intro}>
        <Text style={styles.title}>Insurance Information</Text>
        <Text style={styles.description}>
          Select a plan and name the person who should receive the benefit.
        </Text>
      </View>
      <InsurancePlanForm />
      <BeneficiaryForm />
    </View>
  );
}

const styles = StyleSheet.create({
  step: {
    gap: theme.spacing.lg,
  },
  intro: {
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
