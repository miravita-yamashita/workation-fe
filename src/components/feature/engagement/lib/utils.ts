export const formatEngagementCount = (count: number) => {
  return count >= 100 ? "99+" : count.toString();
};
