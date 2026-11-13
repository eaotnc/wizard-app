import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useWatch} from 'react-hook-form';
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

function SummaryRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function ApplicationSummary() {
  const personal = useWatch<InsuranceApplicationForm>({
    name: 'personalInformation',
  });
  const contact = useWatch<InsuranceApplicationForm>({
    name: 'contactInformation',
  });
  const plan = useWatch<InsuranceApplicationForm>({name: 'insurancePlan'});
  const beneficiary = useWatch<InsuranceApplicationForm>({name: 'beneficiary'});

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Application Summary</Text>
      <Text style={styles.description}>
        Review the applicant and insurance details before you confirm.
      </Text>

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
      <SummaryRow label="Address" value={displayText(contact?.address ?? '')} />
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
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
  },
  row: {
    gap: 2,
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
