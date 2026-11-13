import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {theme} from '@constants/theme';
import {FormField} from './FormField';
import type {FormOption} from './form-option';

type FormRadioGroupProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  options: readonly FormOption[];
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onValueChange?: (value: string) => void;
};

export function FormRadioGroup<T extends FieldValues = FieldValues>({
  name,
  label,
  options,
  required = false,
  disabled = false,
  readOnly = false,
  onValueChange,
}: FormRadioGroupProps<T>) {
  const {control} = useFormContext<T>();
  const locked = disabled || readOnly;

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <FormField label={label} required={required} error={error?.message}>
          <View style={styles.group}>
            {options.map(option => {
              const selected = option.value === value;
              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityLabel={option.label}
                  accessibilityState={{selected, disabled: locked}}
                  disabled={locked}
                  onPress={() => {
                    onChange(option.value);
                    onValueChange?.(option.value);
                    onBlur();
                  }}
                  style={({pressed}) => [
                    styles.option,
                    selected ? styles.optionSelected : null,
                    locked ? styles.locked : null,
                    pressed && !locked ? styles.pressed : null,
                  ]}>
                  <View
                    style={[styles.ring, selected ? styles.ringSelected : null]}>
                    {selected ? <View style={styles.dot} /> : null}
                  </View>
                  <Text
                    style={[
                      styles.optionLabel,
                      selected ? styles.optionLabelSelected : null,
                    ]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </FormField>
      )}
    />
  );
}

const styles = StyleSheet.create({
  group: {
    gap: theme.spacing.sm,
  },
  option: {
    minHeight: theme.controlHeight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
  },
  locked: {
    backgroundColor: theme.colors.disabled,
  },
  pressed: {
    opacity: 0.85,
  },
  ring: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringSelected: {
    borderColor: theme.colors.primary,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  optionLabel: {
    color: theme.colors.text,
    fontSize: 16,
  },
  optionLabelSelected: {
    fontWeight: '600',
  },
});
