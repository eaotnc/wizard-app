import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {
  isApplicationDraft,
  isWizardStep,
  type InsuranceApplicationForm,
  type WizardStep,
} from '../types/insurance-application.type';

type InsuranceApplicationState = {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  applicationDraft: InsuranceApplicationForm | null;
  isSubmitting: boolean;
  isDraftSaved: boolean;
  setCurrentStep: (step: WizardStep) => void;
  completeStep: (step: WizardStep) => void;
  invalidateNextSteps: (step: WizardStep) => void;
  saveDraft: (draft: InsuranceApplicationForm) => void;
  resetApplication: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
};

const initialState = {
  currentStep: 1 as WizardStep,
  completedSteps: [] as WizardStep[],
  applicationDraft: null as InsuranceApplicationForm | null,
  isSubmitting: false,
  isDraftSaved: false,
};

/**
 * Wizard navigation and draft snapshots live here.
 * React Hook Form stays the source of truth while the user is typing.
 * This store updates only when a step is accepted, a draft is saved,
 * or the application is reset.
 */
export const useInsuranceApplicationStore =
  create<InsuranceApplicationState>()(
    persist(
      set => ({
        ...initialState,
        setCurrentStep: currentStep => set({currentStep, isDraftSaved: false}),
        completeStep: step =>
          set(state => ({
            completedSteps: state.completedSteps.includes(step)
              ? state.completedSteps
              : [...state.completedSteps, step].sort(
                  (left, right) => left - right,
                ),
          })),
        invalidateNextSteps: step =>
          set(state => ({
            completedSteps: state.completedSteps.filter(
              completed => completed <= step,
            ),
          })),
        saveDraft: applicationDraft =>
          set({applicationDraft, isDraftSaved: true}),
        resetApplication: () =>
          set({
            currentStep: 1,
            completedSteps: [],
            applicationDraft: null,
            isSubmitting: false,
            isDraftSaved: false,
          }),
        setSubmitting: isSubmitting => set({isSubmitting}),
      }),
      {
        name: 'insurance-application-draft',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: state => ({
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
          applicationDraft: state.applicationDraft,
        }),
        merge: (persistedState, currentState) => {
          const persisted = (persistedState ?? {}) as Partial<{
            currentStep: unknown;
            completedSteps: unknown;
            applicationDraft: unknown;
          }>;
          const completedSteps = Array.isArray(persisted.completedSteps)
            ? persisted.completedSteps.filter(isWizardStep)
            : [];

          return {
            ...currentState,
            currentStep: isWizardStep(persisted.currentStep)
              ? persisted.currentStep
              : 1,
            completedSteps,
            applicationDraft: isApplicationDraft(persisted.applicationDraft)
              ? persisted.applicationDraft
              : null,
          };
        },
      },
    ),
  );
