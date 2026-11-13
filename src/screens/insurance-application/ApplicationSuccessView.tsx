import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '@constants/theme';

type ApplicationSuccessViewProps = {
  referenceNumber: string;
  onStartNew: () => void;
};

export function ApplicationSuccessView({
  referenceNumber,
  onStartNew,
}: ApplicationSuccessViewProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✓</Text>
      </View>
      <Text style={styles.title}>Application submitted</Text>
      <Text style={styles.description}>
        The application was received. Keep this reference number for your
        records.
      </Text>
      <View style={styles.referenceCard}>
        <Text style={styles.referenceLabel}>Application reference</Text>
        <Text style={styles.referenceValue}>{referenceNumber}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onStartNew}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}>
        <Text style={styles.buttonLabel}>Start a new application</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  badgeText: {
    color: theme.colors.success,
    fontSize: 32,
    fontWeight: '700',
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  referenceCard: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  referenceLabel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  referenceValue: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    alignSelf: 'stretch',
    minHeight: theme.controlHeight,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  buttonPressed: {
    backgroundColor: theme.colors.primaryPressed,
  },
  buttonLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
