import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {theme} from '@constants/theme';
import {FormField} from './FormField';
import type {FormOption} from './form-option';

type FormSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  options: readonly FormOption[];
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onValueChange?: (value: string) => void;
};

export function FormSelect<T extends FieldValues = FieldValues>({
  name,
  label,
  options,
  required = false,
  placeholder = 'Select',
  disabled = false,
  readOnly = false,
  onValueChange,
}: FormSelectProps<T>) {
  const {control} = useFormContext<T>();
  const [open, setOpen] = useState(false);
  const locked = disabled || readOnly;

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        const selected = options.find(option => option.value === value);

        return (
          <FormField label={label} required={required} error={error?.message}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{disabled: locked, expanded: open}}
              disabled={locked}
              onPress={() => setOpen(true)}
              style={({pressed}) => [
                styles.control,
                error ? styles.controlError : null,
                locked ? styles.locked : null,
                pressed && !locked ? styles.pressed : null,
              ]}>
              <Text
                style={[
                  styles.value,
                  selected ? null : styles.placeholder,
                  disabled ? styles.lockedText : null,
                ]}>
                {selected ? selected.label : placeholder}
              </Text>
              <Text style={styles.chevron}>▾</Text>
            </Pressable>
            <Modal
              visible={open}
              transparent
              animationType="fade"
              onRequestClose={() => {
                setOpen(false);
                onBlur();
              }}>
              <View style={styles.backdrop}>
                <View style={styles.sheet}>
                  <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>{label}</Text>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Close"
                      onPress={() => {
                        setOpen(false);
                        onBlur();
                      }}
                      style={styles.closeButton}>
                      <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                  </View>
                  <ScrollView keyboardShouldPersistTaps="handled">
                    {options.map(option => {
                      const isSelected = option.value === value;
                      return (
                        <Pressable
                          key={option.value}
                          accessibilityRole="button"
                          accessibilityState={{selected: isSelected}}
                          onPress={() => {
                            onChange(option.value);
                            onValueChange?.(option.value);
                            setOpen(false);
                            onBlur();
                          }}
                          style={[
                            styles.option,
                            isSelected ? styles.optionSelected : null,
                          ]}>
                          <Text
                            style={[
                              styles.optionLabel,
                              isSelected ? styles.optionLabelSelected : null,
                            ]}>
                            {option.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </FormField>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  control: {
    minHeight: theme.controlHeight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  controlError: {
    borderColor: theme.colors.error,
  },
  locked: {
    backgroundColor: theme.colors.disabled,
  },
  pressed: {
    backgroundColor: theme.colors.surface,
  },
  value: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
  },
  placeholder: {
    color: theme.colors.textMuted,
  },
  lockedText: {
    color: theme.colors.disabledText,
  },
  chevron: {
    color: theme.colors.textMuted,
    fontSize: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 32, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '75%',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: theme.spacing.xl,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  sheetTitle: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  closeText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  option: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: theme.colors.primarySoft,
  },
  optionLabel: {
    color: theme.colors.text,
    fontSize: 16,
  },
  optionLabelSelected: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
