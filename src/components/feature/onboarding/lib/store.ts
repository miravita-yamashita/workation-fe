import { create } from "zustand";

type OnboardingStore = {
  footerRef: React.RefObject<HTMLDivElement | null>;
};

export const useOnboardingStore = create<OnboardingStore>(() => ({
  footerRef: { current: null },
}));
