import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {theme} from '@constants/theme';

type FormCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export function FormCheckbox<T extends FieldValues = FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  readOnly = false,
}: FormCheckboxProps<T>) {
  const {control} = useFormContext<T>();
  const locked = disabled || readOnly;

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        const checked = value === true;
        return (
          <View style={styles.field}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityLabel={label}
              accessibilityState={{checked, disabled: locked}}
              disabled={locked}
              onPress={() => {
                onChange(!checked);
                onBlur();
              }}
              style={({pressed}) => [
                styles.row,
                error ? styles.rowError : null,
                locked ? styles.locked : null,
                pressed && !locked ? styles.pressed : null,
              ]}>
              <View style={[styles.box, checked ? styles.boxChecked : null]}>
                {checked ? <Text style={styles.tick}>✓</Text> : null}
              </View>
              <Text style={styles.label}>
                {label}
                {required ? <Text style={styles.required}> *</Text> : null}
              </Text>
            </Pressable>
            {error ? <Text style={styles.error}>{error.message}</Text> : null}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  field: {
    gap: theme.spacing.sm,
  },
  row: {
    minHeight: theme.controlHeight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rowError: {
    borderColor: theme.colors.error,
  },
  locked: {
    backgroundColor: theme.colors.disabled,
  },
  pressed: {
    backgroundColor: theme.colors.surface,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  boxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  tick: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  label: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
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
