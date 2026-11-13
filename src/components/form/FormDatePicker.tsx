import React, {useState} from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {theme} from '@constants/theme';
import {FormField} from './FormField';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

type FormDatePickerProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  fallbackDate: Date;
  minimumDate?: Date;
  maximumDate?: Date;
};

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatDisplayDate(value: string) {
  const date = parseIsoDate(value);
  if (!date) {
    return '';
  }

  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function FormDatePicker<T extends FieldValues = FieldValues>({
  name,
  label,
  required = false,
  placeholder = 'Select date',
  disabled = false,
  readOnly = false,
  fallbackDate,
  minimumDate,
  maximumDate,
}: FormDatePickerProps<T>) {
  const {control} = useFormContext<T>();
  const [open, setOpen] = useState(false);
  const [draftDate, setDraftDate] = useState(fallbackDate);
  const locked = disabled || readOnly;

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        const currentValue = typeof value === 'string' ? value : '';
        const display = formatDisplayDate(currentValue);

        const commit = (date: Date) => {
          onChange(formatIsoDate(date));
          onBlur();
        };

        const openPicker = () => {
          if (locked) {
            return;
          }
          setDraftDate(parseIsoDate(currentValue) ?? fallbackDate);
          setOpen(true);
        };

        const onAndroidChange = (event: DateTimePickerEvent, date?: Date) => {
          setOpen(false);
          if (event.type === 'dismissed' || !date) {
            onBlur();
            return;
          }
          commit(date);
        };

        return (
          <FormField label={label} required={required} error={error?.message}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{disabled: locked}}
              disabled={locked}
              onPress={openPicker}
              style={({pressed}) => [
                styles.control,
                error ? styles.controlError : null,
                locked ? styles.locked : null,
                pressed && !locked ? styles.pressed : null,
              ]}>
              <Text style={[styles.value, display ? null : styles.placeholder]}>
                {display || placeholder}
              </Text>
            </Pressable>
            {open && Platform.OS === 'android' ? (
              <DateTimePicker
                value={draftDate}
                mode="date"
                display="default"
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={onAndroidChange}
              />
            ) : null}
            {Platform.OS === 'ios' ? (
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
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => {
                          setOpen(false);
                          onBlur();
                        }}>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </Pressable>
                      <Text style={styles.sheetTitle}>{label}</Text>
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => {
                          commit(draftDate);
                          setOpen(false);
                        }}>
                        <Text style={styles.doneText}>Done</Text>
                      </Pressable>
                    </View>
                    <DateTimePicker
                      value={draftDate}
                      mode="date"
                      display="spinner"
                      minimumDate={minimumDate}
                      maximumDate={maximumDate}
                      onChange={(_event, date) => {
                        if (date) {
                          setDraftDate(date);
                        }
                      }}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
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
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
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
    color: theme.colors.text,
    fontSize: 16,
  },
  placeholder: {
    color: theme.colors.textMuted,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 32, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: theme.spacing.lg,
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
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  cancelText: {
    color: theme.colors.textMuted,
    fontSize: 16,
  },
  doneText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
