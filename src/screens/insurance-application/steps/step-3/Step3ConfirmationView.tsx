import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '@constants/theme';
import {ApplicationSummary} from '../../components/ApplicationSummary';
import {ApplicationConfirmationForm} from './ApplicationConfirmationForm';
import {HealthInformationForm} from './HealthInformationForm';

export function Step3ConfirmationView() {
  return (
    <View style={styles.step}>
      <View style={styles.intro}>
        <Text style={styles.title}>Health and Confirmation</Text>
        <Text style={styles.description}>
          Complete the health questions, review the application, and confirm it
          is ready to submit.
        </Text>
      </View>
      <HealthInformationForm />
      <ApplicationSummary />
      <ApplicationConfirmationForm />
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
