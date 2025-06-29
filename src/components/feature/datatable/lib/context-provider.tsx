"use client";

import { createContext, useContext, useReducer } from "react";

export enum DashboardActionType {
  SHOW_DELETE_PROMPT = "SHOW_DELETE_PROMPT",
  HIDE_DELETE_PROMPT = "HIDE_DELETE_PROMPT",
  SET_FORM_LOADING = "SET_FORM_LOADING",
}

type DashboardActionState = {
  isShowDeletePrompt: boolean;
  idToDelete: string;
  idsToDelete: string[];
  bulkDeleteEndpoint: string;
  isFormLoading: boolean;
};

export type DashboardAction = {
  type: DashboardActionType;
  payload?: {
    idToDelete?: string;
    idsToDelete?: string[];
    bulkDeleteEndpoint?: string;
    isLoading?: boolean;
  };
};

type DashboardActionContextType = DashboardActionState & {
  dispatch: React.Dispatch<DashboardAction>;
};

const DEFAULT_STATE: DashboardActionState = {
  isShowDeletePrompt: false,
  idToDelete: "",
  idsToDelete: [],
  bulkDeleteEndpoint: "",
  isFormLoading: false,
};

export const DashboardContext =
  createContext<DashboardActionContextType | null>(null);

function reducer(state: DashboardActionState, action: DashboardAction) {
  const { type, payload } = action;
  switch (type) {
    case DashboardActionType.SHOW_DELETE_PROMPT: {
      return {
        ...state,
        isShowDeletePrompt: true,
        idToDelete: payload?.idToDelete || "",
        idsToDelete: payload?.idsToDelete || [],
        bulkDeleteEndpoint: payload?.bulkDeleteEndpoint || "",
      };
    }
    case DashboardActionType.HIDE_DELETE_PROMPT: {
      return {
        ...state,
        isShowDeletePrompt: false,
      };
    }
    case DashboardActionType.SET_FORM_LOADING:
      return {
        ...state,
        isFormLoading: payload?.isLoading || false,
      };
    default:
      return state;
  }
}

export const DashboardActionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  return (
    <DashboardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardActionContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardActionContext must be used within a DashboardActionContextProvider",
    );
  }
  return context;
};
