"use client";

import { useState } from "react";
import { clickPopularFAQ } from "@components/feature/faq";
export const useFaqAccordion = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleClick = async (items: string[]) => {
    const isLonger = items.length > openItems.length;

    // if items is longer this means we added a new item
    if (isLonger) {
      const newlyOpenedItem = items[items.length - 1];
      try {
        await clickPopularFAQ(newlyOpenedItem);
      } catch (error) {
        console.error("Error clicking popular FAQ:", error);
      }
    }
    // Update the accordion open items
    setOpenItems(items);
  };

  return {
    openItems,
    setOpenItems,
    handleClick,
  };
};
