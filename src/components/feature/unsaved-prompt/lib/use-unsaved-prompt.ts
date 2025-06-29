"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  openUnsavedPromptModal,
  toggleContinueNavigate,
  useModalUnsavedPromptStore,
} from "./store";


export const useUnsavedPrompt = ({
  isDirty,
  formRef,
}: {
  isDirty: boolean;
  formRef: React.RefObject<HTMLFormElement | null>;
}) => {
  const router = useRouter();

  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );
  const [bypassCheck, setBypassCheck] = useState(false);

  // Initialize the form on l=first load - we will use this for submitting
  useEffect(() => {
    if (formRef.current) {
      useModalUnsavedPromptStore.setState({
        formRef: formRef,
      });
    }
  }, [formRef]);

  // Function to continue navigation when confirmed
  useEffect(() => {
    if (pendingNavigation && bypassCheck) {
      router.push(pendingNavigation);
      setPendingNavigation(null); // Clear after navigation
    }
  }, [pendingNavigation, bypassCheck, router]);

  // Handle when user decides to navigate away
  useEffect(() => {
    const attemptRouterBack = () => {
      const originalPathname = window.location.pathname;

      const intervalId = setInterval(() => {
        // Check if the current pathname has changed
        if (window.location.pathname !== originalPathname) {
          clearInterval(intervalId); // Stop the loop if the pathname has changed
          return;
        }

        // Check if there's a history entry to go back to
        if (window.history.length > 1) {
          router.back();
        } else {
          clearInterval(intervalId); // Stop the loop if there's no history
        }
      }, 100);
    };

    const unsubscribe = useModalUnsavedPromptStore.subscribe(
      (state) => state.continueNavigate,
      (continueNavigate) => {
        if (continueNavigate) {
          setBypassCheck(true);
          if (!pendingNavigation) {
            attemptRouterBack(); // Only attempt back if no pending navigation
          }
          toggleContinueNavigate(false);
        }
      },
    );

    return () => unsubscribe();
  }, [pendingNavigation, router]);

  // Ensure there is a history and popstate to work
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, document.title, window.location.href);
    }
  }, []);

  // Handle page navigation
  useEffect(() => {
    const originalPush = router.push;

    const customPush = (url: string) => {
      if (!handleRouteChange(url)) return;
      return originalPush(url);
    };
    // Override router.push
    router.push = customPush;

    const handleRouteChange = (url: string) => {
      if (isDirty && !bypassCheck) {
        setPendingNavigation(url);
        openUnsavedPromptModal();
        return false;
      }
      return true;
    };

    const handlePopState = (event: PopStateEvent) => {
      if (isDirty && !bypassCheck) {
        event.preventDefault();
        window.history.pushState(null, "", window.location.href); // Push current state to prevent back navigation
        openUnsavedPromptModal();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      router.push = originalPush;
    };
  }, [isDirty, router, bypassCheck]);

  // Handle window/tab close / reload
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!isDirty || bypassCheck) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [isDirty, bypassCheck]);

  return {};
};
