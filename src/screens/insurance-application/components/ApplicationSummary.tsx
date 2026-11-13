import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useFormContext, useWatch} from 'react-hook-form';
import {expandedWidth} from '@constants/layout';
import {theme} from '@constants/theme';
import {
  durationOptions,
  genderOptions,
  optionLabel,
  planOptions,
  relationshipOptions,
  titleOptions,
} from '../constants/options';
import type {InsuranceApplicationForm} from '../types/insurance-application.type';

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

function displayDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return value || '—';
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
    return value;
  }

  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function displayAmount(value: string) {
  if (!/^\d+$/.test(value) || Number(value) <= 0) {
    return value || '—';
  }

  return `${Number(value).toLocaleString('en-US')} THB`;
}

function displayText(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : '—';
}

function SummaryRow({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  const {width} = useWindowDimensions();
  const columns = width >= expandedWidth;

  return (
    <View
      style={[
        styles.row,
        columns && !full ? styles.rowHalf : null,
        columns && full ? styles.rowFull : null,
      ]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function ApplicationSummary() {
  const {control} = useFormContext<InsuranceApplicationForm>();
  const personal = useWatch({control, name: 'personalInformation'});
  const contact = useWatch({control, name: 'contactInformation'});
  const plan = useWatch({control, name: 'insurancePlan'});
  const beneficiary = useWatch({control, name: 'beneficiary'});

  const {width} = useWindowDimensions();
  const columns = width >= expandedWidth;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Application Summary</Text>
      <Text style={styles.description}>
        Review the applicant and insurance details before you confirm.
      </Text>

      <View style={columns ? styles.grid : styles.stack}>
      <Text style={styles.groupTitle}>Applicant</Text>
      <SummaryRow
        label="Name"
        value={displayText(
          [
            optionLabel(titleOptions, personal?.title ?? ''),
            personal?.firstName,
            personal?.lastName,
          ]
            .filter(part => part && part !== '—')
            .join(' '),
        )}
      />
      <SummaryRow
        label="National ID"
        value={displayText(personal?.nationalId ?? '')}
      />
      <SummaryRow
        label="Date of Birth"
        value={displayDate(personal?.dateOfBirth ?? '')}
      />
      <SummaryRow
        label="Gender"
        value={optionLabel(genderOptions, personal?.gender ?? '')}
      />
      <SummaryRow
        label="Mobile"
        value={displayText(contact?.mobilePhone ?? '')}
      />
      <SummaryRow label="Email" value={displayText(contact?.email ?? '')} />
      <SummaryRow
        label="Address"
        full
        value={displayText(contact?.address ?? '')}
      />
      <SummaryRow
        label="Province"
        value={displayText(contact?.province ?? '')}
      />
      <SummaryRow
        label="Postal Code"
        value={displayText(contact?.postalCode ?? '')}
      />

      <Text style={styles.groupTitle}>Insurance</Text>
      <SummaryRow
        label="Plan"
        value={optionLabel(planOptions, plan?.plan ?? '')}
      />
      <SummaryRow
        label="Coverage"
        value={displayAmount(plan?.coverageAmount ?? '')}
      />
      <SummaryRow
        label="Start Date"
        value={displayDate(plan?.startDate ?? '')}
      />
      <SummaryRow
        label="Duration"
        value={optionLabel(durationOptions, plan?.duration ?? '')}
      />
      <SummaryRow
        label="Beneficiary"
        value={displayText(beneficiary?.fullName ?? '')}
      />
      <SummaryRow
        label="Relationship"
        value={optionLabel(relationshipOptions, beneficiary?.relationship ?? '')}
      />
      <SummaryRow
        label="Beneficiary ID"
        value={displayText(beneficiary?.nationalId ?? '')}
      />
      <SummaryRow
        label="Beneficiary Phone"
        value={displayText(beneficiary?.phoneNumber ?? '')}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  groupTitle: {
    width: '100%',
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
  },
  stack: {
    gap: theme.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: theme.spacing.sm,
  },
  row: {
    gap: 2,
  },
  rowHalf: {
    width: '48%',
  },
  rowFull: {
    width: '100%',
  },
  rowLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  rowValue: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
});
