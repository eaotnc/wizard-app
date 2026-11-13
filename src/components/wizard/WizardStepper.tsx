import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '@constants/theme';

export type WizardStepItem = {
  id: number;
  title: string;
  description: string;
};

type WizardStepperProps = {
  steps: readonly WizardStepItem[];
  currentStep: number;
  completedSteps: readonly number[];
  onStepPress: (step: number) => void;
  variant: 'horizontal' | 'vertical';
};

type StepStatus = 'complete' | 'current' | 'upcoming';

function stepStatus(
  id: number,
  currentStep: number,
  completedSteps: readonly number[],
): StepStatus {
  if (id === currentStep) {
    return 'current';
  }
  if (completedSteps.includes(id)) {
    return 'complete';
  }
  return 'upcoming';
}

export function WizardStepper({
  steps,
  currentStep,
  completedSteps,
  onStepPress,
  variant,
}: WizardStepperProps) {
  if (variant === 'horizontal') {
    return (
      <View style={styles.horizontal}>
        {steps.map((step, index) => {
          const status = stepStatus(step.id, currentStep, completedSteps);
          const canOpen = status !== 'upcoming';
          const previousComplete =
            index > 0 && completedSteps.includes(steps[index - 1].id);
          const outgoingComplete = completedSteps.includes(step.id);
          return (
            <View key={step.id} style={styles.horizontalItem}>
              <View style={styles.track}>
                <View
                  style={[
                    styles.trackLine,
                    index === 0 ? styles.trackHidden : null,
                    previousComplete ? styles.trackComplete : null,
                  ]}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={step.title}
                  accessibilityState={{
                    selected: status === 'current',
                    disabled: !canOpen,
                  }}
                  disabled={!canOpen}
                  onPress={() => onStepPress(step.id)}
                  style={styles.bubblePress}>
                  <View
                    style={[
                      styles.bubble,
                      status === 'current' ? styles.bubbleCurrent : null,
                      status === 'complete' ? styles.bubbleComplete : null,
                    ]}>
                    <Text
                      style={[
                        styles.bubbleText,
                        status === 'upcoming' ? styles.bubbleTextMuted : null,
                      ]}>
                      {status === 'complete' ? '✓' : step.id}
                    </Text>
                  </View>
                </Pressable>
                <View
                  style={[
                    styles.trackLine,
                    index === steps.length - 1 ? styles.trackHidden : null,
                    outgoingComplete ? styles.trackComplete : null,
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.horizontalLabel,
                  status === 'current' ? styles.labelCurrent : null,
                  status === 'complete' ? styles.labelComplete : null,
                ]}>
                {step.title}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.verticalCard}>
      {steps.map((step, index) => {
        const status = stepStatus(step.id, currentStep, completedSteps);
        const canOpen = status !== 'upcoming';
        return (
          <Pressable
            key={step.id}
            accessibilityRole="button"
            accessibilityLabel={step.title}
            accessibilityState={{
              selected: status === 'current',
              disabled: !canOpen,
            }}
            disabled={!canOpen}
            onPress={() => onStepPress(step.id)}
            style={({pressed}) => [
              styles.verticalItem,
              pressed && canOpen ? styles.pressed : null,
            ]}>
            <View style={styles.rail}>
              <View
                style={[
                  styles.bubble,
                  status === 'current' ? styles.bubbleCurrent : null,
                  status === 'complete' ? styles.bubbleComplete : null,
                ]}>
                <Text
                  style={[
                    styles.bubbleText,
                    status === 'upcoming' ? styles.bubbleTextMuted : null,
                  ]}>
                  {status === 'complete' ? '✓' : step.id}
                </Text>
              </View>
              {index < steps.length - 1 ? (
                <View
                  style={[
                    styles.verticalLine,
                    completedSteps.includes(step.id)
                      ? styles.trackComplete
                      : null,
                  ]}
                />
              ) : null}
            </View>
            <View style={styles.verticalCopy}>
              <Text
                style={[
                  styles.verticalTitle,
                  status === 'current' ? styles.labelCurrent : null,
                  status === 'complete' ? styles.labelComplete : null,
                  status === 'upcoming' ? styles.labelMuted : null,
                ]}>
                {step.title}
              </Text>
              <Text style={styles.verticalDescription}>{step.description}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  horizontalItem: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  trackLine: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.border,
  },
  trackHidden: {
    backgroundColor: 'transparent',
  },
  trackComplete: {
    backgroundColor: theme.colors.success,
  },
  bubblePress: {
    paddingHorizontal: 2,
  },
  bubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  bubbleCurrent: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  bubbleComplete: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  bubbleText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  bubbleTextMuted: {
    color: theme.colors.textMuted,
  },
  horizontalLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelCurrent: {
    color: theme.colors.primary,
  },
  labelComplete: {
    color: theme.colors.success,
  },
  labelMuted: {
    color: theme.colors.textMuted,
  },
  verticalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius,
    borderCurve: 'continuous',
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  verticalItem: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
  rail: {
    alignItems: 'center',
    width: 32,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.border,
  },
  verticalCopy: {
    flex: 1,
    gap: 2,
    paddingBottom: theme.spacing.md,
  },
  verticalTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  verticalDescription: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
