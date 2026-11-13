import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {tabletWidth} from '@constants/layout';
import {theme} from '@constants/theme';
import {WizardFooter} from '@components/wizard/WizardFooter';
import {WizardStepper} from '@components/wizard/WizardStepper';
import {ApplicationSuccessView} from './ApplicationSuccessView';
import {useInsuranceWizard} from './hooks/useInsuranceWizard';
import {Step1ApplicantView} from './steps/step-1/Step1ApplicantView';
import {Step2InsuranceView} from './steps/step-2/Step2InsuranceView';
import {Step3ConfirmationView} from './steps/step-3/Step3ConfirmationView';
import {
  STEP_META,
  defaultApplicationValues,
  isWizardStep,
  type InsuranceApplicationForm,
} from './types/insurance-application.type';
import {wizardResolver} from './utils/validation';

function WizardLayout() {
  const wizard = useInsuranceWizard();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const isTablet = width >= tabletWidth;
  const currentMeta = STEP_META.find(step => step.id === wizard.currentStep);

  if (wizard.isSubmitted) {
    return (
      <View
        style={[
          styles.screen,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
        <ApplicationSuccessView
          referenceNumber={wizard.referenceNumber}
          onStartNew={wizard.startNewApplication}
        />
      </View>
    );
  }

  return (
    <View style={[styles.screen, {paddingTop: insets.top}]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <View style={[styles.header, isTablet ? styles.headerTablet : null]}>
        <Text style={styles.title}>Insurance Application</Text>
        <Text style={styles.progress}>
          Step {wizard.currentStep} of 3
          {currentMeta ? ` · ${currentMeta.title}` : ''}
        </Text>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.body, isTablet ? styles.bodyWide : null]}>
          <View style={isTablet ? styles.sidebar : null}>
            <WizardStepper
              variant={isTablet ? 'vertical' : 'horizontal'}
              steps={STEP_META}
              currentStep={wizard.currentStep}
              completedSteps={wizard.completedSteps}
              onStepPress={step => {
                if (isWizardStep(step)) {
                  wizard.goToStep(step);
                }
              }}
            />
          </View>
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.content,
              isTablet ? styles.contentTablet : null,
            ]}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets>
            {wizard.currentStep === 1 ? <Step1ApplicantView /> : null}
            {wizard.currentStep === 2 ? <Step2InsuranceView /> : null}
            {wizard.currentStep === 3 ? <Step3ConfirmationView /> : null}
          </ScrollView>
        </View>
        <WizardFooter
          previousDisabled={wizard.currentStep === 1 || wizard.isSubmitting}
          showSubmit={wizard.currentStep === 3}
          isSubmitting={wizard.isSubmitting}
          isDraftSaved={wizard.isDraftSaved}
          onPrevious={wizard.handlePrevious}
          onSaveDraft={wizard.handleSaveDraft}
          onNext={() => {
            void wizard.handleNext();
          }}
          onSubmit={() => {
            void wizard.handleSubmitApplication();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default function InsuranceApplicationScreen() {
  // One form owns every step. shouldUnregister stays false so leaving a
  // step does not drop values or errors from unmounted fields.
  const methods = useForm<InsuranceApplicationForm>({
    defaultValues: defaultApplicationValues,
    resolver: wizardResolver,
    shouldUnregister: false,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <WizardLayout />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  headerTablet: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  progress: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  body: {
    flex: 1,
  },
  bodyWide: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  sidebar: {
    width: 300,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  contentTablet: {
    width: '100%',
    maxWidth: 880,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});
