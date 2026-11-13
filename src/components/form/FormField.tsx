import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '@constants/theme';

type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export function FormField({label, required, error, children}: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  required: {
    color: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    fontSize: 13,
    lineHeight: 18,
  },
});
