import {useEffect, useRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {applicationSchema} from '../schemas/application.schema';
import {useInsuranceApplicationStore} from '../stores/insuranceApplication.store';
import {
  defaultApplicationValues,
  isWizardStep,
  type InsuranceApplicationForm,
  type WizardStep,
} from '../types/insurance-application.type';
import {
  firstInvalidStepFromIssues,
  setActiveSchemaForStep,
  setActiveSchemaForSubmit,
} from '../utils/validation';

const SUBMIT_DELAY_MS = 800;

function createReferenceNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `APP-${year}${month}${day}-${suffix}`;
}

export function useInsuranceWizard() {
  const {handleSubmit, getValues, reset, watch} =
    useFormContext<InsuranceApplicationForm>();
  const currentStep = useInsuranceApplicationStore(state => state.currentStep);
  const completedSteps = useInsuranceApplicationStore(
    state => state.completedSteps,
  );
  const applicationDraft = useInsuranceApplicationStore(
    state => state.applicationDraft,
  );
  const isSubmitting = useInsuranceApplicationStore(state => state.isSubmitting);
  const isDraftSaved = useInsuranceApplicationStore(state => state.isDraftSaved);
  const setCurrentStep = useInsuranceApplicationStore(
    state => state.setCurrentStep,
  );
  const completeStep = useInsuranceApplicationStore(state => state.completeStep);
  const saveDraft = useInsuranceApplicationStore(state => state.saveDraft);
  const resetApplication = useInsuranceApplicationStore(
    state => state.resetApplication,
  );
  const setSubmitting = useInsuranceApplicationStore(
    state => state.setSubmitting,
  );
  const [hasHydrated, setHasHydrated] = useState(
    useInsuranceApplicationStore.persist.hasHydrated(),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const didRestoreDraft = useRef(false);
  const isMoving = useRef(false);

  useEffect(() => {
    const unsubscribe = useInsuranceApplicationStore.persist.onFinishHydration(
      () => {
        setHasHydrated(true);
      },
    );
    setHasHydrated(useInsuranceApplicationStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  useEffect(() => {
    setActiveSchemaForStep(currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (!hasHydrated || didRestoreDraft.current) {
      return;
    }

    didRestoreDraft.current = true;
    if (applicationDraft) {
      reset(applicationDraft);
    }
  }, [applicationDraft, hasHydrated, reset]);

  useEffect(() => {
    const subscription = watch((_values, info) => {
      if (info.type !== 'change') {
        return;
      }

      const state = useInsuranceApplicationStore.getState();
      const hasLaterCompletedStep = state.completedSteps.some(
        step => step > state.currentStep,
      );
      if (hasLaterCompletedStep) {
        state.invalidateNextSteps(state.currentStep);
      }
      if (state.isDraftSaved) {
        useInsuranceApplicationStore.setState({isDraftSaved: false});
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const handleNext = () => {
    if (isSubmitting || isMoving.current || currentStep >= 3) {
      return;
    }

    isMoving.current = true;
    setActiveSchemaForStep(currentStep);
    void handleSubmit(values => {
      const nextStep = (currentStep + 1) as WizardStep;
      saveDraft(values, {notify: false});
      completeStep(currentStep);
      if (isWizardStep(nextStep)) {
        setCurrentStep(nextStep);
      }
    })().finally(() => {
      isMoving.current = false;
    });
  };

  const handlePrevious = () => {
    if (isSubmitting || currentStep === 1) {
      return;
    }

    const previousStep = (currentStep - 1) as WizardStep;
    if (isWizardStep(previousStep)) {
      setCurrentStep(previousStep);
    }
  };

  const handleSaveDraft = () => {
    if (isSubmitting) {
      return;
    }

    saveDraft(getValues());
  };

  const goToStep = (step: WizardStep) => {
    if (isSubmitting || step === currentStep) {
      return;
    }

    if (!completedSteps.includes(step)) {
      return;
    }

    setCurrentStep(step);
  };

  const handleSubmitApplication = () => {
    if (isSubmitting || isMoving.current) {
      return;
    }

    isMoving.current = true;
    setActiveSchemaForSubmit();
    void handleSubmit(
      async values => {
        setSubmitting(true);
        try {
          await new Promise<void>(resolve => {
            setTimeout(resolve, SUBMIT_DELAY_MS);
          });
          saveDraft(values, {notify: false});
          setReferenceNumber(createReferenceNumber());
          setIsSubmitted(true);
        } finally {
          setSubmitting(false);
        }
      },
      () => {
        const parsed = applicationSchema.safeParse(getValues());
        if (!parsed.success) {
          const step = firstInvalidStepFromIssues(parsed.error.issues);
          if (step && step !== currentStep) {
            setCurrentStep(step);
            return;
          }
        }
        setActiveSchemaForStep(currentStep);
      },
    )().finally(() => {
      isMoving.current = false;
    });
  };

  const startNewApplication = () => {
    resetApplication();
    reset(defaultApplicationValues);
    setIsSubmitted(false);
    setReferenceNumber('');
    setActiveSchemaForStep(1);
  };

  return {
    currentStep,
    completedSteps,
    isSubmitting,
    isDraftSaved,
    isSubmitted,
    referenceNumber,
    handleNext,
    handlePrevious,
    handleSaveDraft,
    handleSubmitApplication,
    goToStep,
    startNewApplication,
  };
}
