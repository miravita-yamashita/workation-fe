export type EngagementDataType = {
  count: number;
};

export type EngagementCountResponseType = {
  success: boolean;
  message: string;
  data: {
    recently_viewed: EngagementDataType;
    keep_positions: EngagementDataType;
    saved_search_criteria: EngagementDataType;
  };
};
