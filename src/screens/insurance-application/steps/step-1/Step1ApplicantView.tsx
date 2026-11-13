import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '@constants/theme';
import {ContactInformationForm} from './ContactInformationForm';
import {PersonalInformationForm} from './PersonalInformationForm';

export function Step1ApplicantView() {
  return (
    <View style={styles.step}>
      <View style={styles.intro}>
        <Text style={styles.title}>Applicant Information</Text>
        <Text style={styles.description}>
          Tell us who is applying and how we can reach them.
        </Text>
      </View>
      <PersonalInformationForm />
      <ContactInformationForm />
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
