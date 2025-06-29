"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type JobSaveActionContextType = {
  disabledButton: boolean;
  setDisabledButton: (state: boolean) => void;
};

const JobSaveActionContext = 
createContext<JobSaveActionContextType | undefined>(undefined);

export const JobSaveActionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [disabledButton, setDisabledButton] = useState(false);

  return (
    <JobSaveActionContext.Provider
      value={{ disabledButton, setDisabledButton }}
    >
      {children}
    </JobSaveActionContext.Provider>
  );
};

export const useJobActionSaveContext = () => {
  const context = useContext(JobSaveActionContext);
  if (!context) {
    throw new Error(
      "useJobActionSaveContext must be used within a JobSaveActionProvider",
    );
  }
  return context;
};
