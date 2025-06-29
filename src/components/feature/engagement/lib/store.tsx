import { create } from "zustand";
import { EngagementCountResponseType } from "./types";

type EngagementStore = {
  count: {
    recentlyViewJob: number;
    savedJob: number;
    savedSearch: number;
  };
};

export const engagementStoreInitialState: EngagementStore = {
  count: {
    recentlyViewJob: 0,
    savedJob: 0,
    savedSearch: 0,
  },
};

export const useEngagementStore = create<EngagementStore>()(() => ({
  ...engagementStoreInitialState,
}));

export const getEngagementNumbers = async () => {
  return useEngagementStore.getState().count;
};

export const setEngagementNumbers = (
  data: EngagementCountResponseType["data"] | undefined,
) => {
  if (!data) return;

  useEngagementStore.setState({
    count: {
      recentlyViewJob: data.recently_viewed.count,
      savedJob: data.keep_positions.count,
      savedSearch: data.saved_search_criteria.count,
    },
  });
};

export const setEngagementCount = (
  key: keyof EngagementStore["count"],
  value: number,
) => {
  useEngagementStore.setState((state) => ({
    count: {
      ...state.count,
      [key]: value,
    },
  }));
};

export const incrementEngagementCount = (
  key: keyof EngagementStore["count"],
) => {
  useEngagementStore.setState((state) => ({
    count: {
      ...state.count,
      [key]: state.count[key] + 1,
    },
  }));
};

export const decrementEngagementCount = (
  key: keyof EngagementStore["count"],
) => {
  useEngagementStore.setState((state) => ({
    count: {
      ...state.count,
      [key]: Math.max(state.count[key] - 1, 0),
    },
  }));
};
