import { ArticleDropdownType } from "./types";

export const filterAlreadySelectedArticleDropdown = (
  data: ArticleDropdownType[],
  selectedIds: string[],
) => {
  return data.filter((item) => !selectedIds.includes(item.id));
};

export const getFAQValue = ({
  faqId,
  customQuestion,
  customAnswer,
}: {
  faqId: string;
  customQuestion: string;
  customAnswer: string;
}) => {
  if (customQuestion && customAnswer) {
    return {
      question: customQuestion,
      answer: customAnswer,
    };
  }

  if (!faqId) return null;

  return {
    id: faqId,
  };
};