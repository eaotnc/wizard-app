import React from 'react';
import {
  StyleSheet,
  TextInput,
  type KeyboardTypeOptions,
} from 'react-native';
import {Controller, useFormContext, type FieldPath, type FieldValues} from 'react-hook-form';
import {theme} from '@constants/theme';
import {FormField} from './FormField';

type FormInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  maxLength?: number;
  multiline?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export function FormInput<T extends FieldValues = FieldValues>({
  name,
  label,
  required = false,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  maxLength,
  multiline = false,
  disabled = false,
  readOnly = false,
}: FormInputProps<T>) {
  const {control} = useFormContext<T>();
  const locked = disabled || readOnly;

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <FormField label={label} required={required} error={error?.message}>
          <TextInput
            value={value == null ? '' : String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            maxLength={maxLength}
            multiline={multiline}
            editable={!locked}
            accessibilityLabel={label}
            accessibilityState={{disabled}}
            style={[
              styles.input,
              multiline ? styles.multiline : null,
              error ? styles.inputError : null,
              disabled ? styles.disabled : null,
              readOnly ? styles.readOnly : null,
            ]}
          />
        </FormField>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: theme.controlHeight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.white,
    color: theme.colors.text,
    fontSize: 16,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
    color: theme.colors.disabledText,
  },
  readOnly: {
    backgroundColor: theme.colors.surface,
  },
});
