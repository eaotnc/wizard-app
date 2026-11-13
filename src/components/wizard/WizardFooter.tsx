import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {tabletWidth} from '@constants/layout';
import {theme} from '@constants/theme';

type WizardFooterProps = {
  previousDisabled: boolean;
  showSubmit: boolean;
  isSubmitting: boolean;
  isDraftSaved: boolean;
  onPrevious: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export function WizardFooter({
  previousDisabled,
  showSubmit,
  isSubmitting,
  isDraftSaved,
  onPrevious,
  onSaveDraft,
  onNext,
  onSubmit,
}: WizardFooterProps) {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const isTablet = width >= tabletWidth;

  return (
    <View
      style={[
        styles.footer,
        isTablet ? styles.footerTablet : null,
        {paddingBottom: Math.max(insets.bottom, 12)},
      ]}>
      {isDraftSaved ? (
        <Text style={styles.saved}>Draft saved on this device</Text>
      ) : null}
      <View style={isTablet ? styles.tabletActions : undefined}>
      <View style={[styles.secondaryRow, isTablet ? styles.secondaryRowTablet : null]}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{disabled: previousDisabled}}
          disabled={previousDisabled}
          onPress={onPrevious}
          style={({pressed}) => [
            styles.secondaryButton,
            previousDisabled ? styles.buttonDisabled : null,
            pressed && !previousDisabled ? styles.secondaryPressed : null,
          ]}>
          <Text
            style={[
              styles.secondaryLabel,
              previousDisabled ? styles.disabledLabel : null,
            ]}>
            Previous
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{disabled: isSubmitting}}
          disabled={isSubmitting}
          onPress={onSaveDraft}
          style={({pressed}) => [
            styles.secondaryButton,
            isSubmitting ? styles.buttonDisabled : null,
            pressed && !isSubmitting ? styles.secondaryPressed : null,
          ]}>
          <Text style={styles.secondaryLabel}>Save Draft</Text>
        </Pressable>
      </View>
      {showSubmit ? (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{disabled: isSubmitting, busy: isSubmitting}}
          disabled={isSubmitting}
          onPress={onSubmit}
          style={({pressed}) => [
            styles.primaryButton,
            pressed && !isSubmitting ? styles.primaryPressed : null,
          ]}>
          {isSubmitting ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : null}
          <Text style={styles.primaryLabel}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{disabled: isSubmitting}}
          disabled={isSubmitting}
          onPress={onNext}
          style={({pressed}) => [
            styles.primaryButton,
            isSubmitting ? styles.buttonDisabled : null,
            pressed && !isSubmitting ? styles.primaryPressed : null,
          ]}>
          <Text style={styles.primaryLabel}>Next</Text>
        </Pressable>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  footerTablet: {
    paddingHorizontal: theme.spacing.xl,
  },
  tabletActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  secondaryRowTablet: {
    flexGrow: 0,
    flexBasis: 360,
    maxWidth: 420,
  },
  saved: {
    color: theme.colors.success,
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    minHeight: theme.controlHeight,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  secondaryPressed: {
    backgroundColor: theme.colors.primarySoft,
  },
  secondaryLabel: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButton: {
    minHeight: theme.controlHeight,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    minWidth: 220,
  },
  primaryPressed: {
    backgroundColor: theme.colors.primaryPressed,
  },
  primaryLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  disabledLabel: {
    color: theme.colors.disabledText,
  },
});
