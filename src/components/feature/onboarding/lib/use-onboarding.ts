"use client";

import { getExplanatoryMovie, MovieDataType } from "@/components/movie";
import { useEffect, useRef, useState } from "react";
import { getVisitedCookie, setVisitedCookie } from "../../first-visit";

export const useOnboarding = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isPermanentlyHidden, setIsPermanentlyHidden] = useState(false); // Override isHidden for other interactions
  const [explanatoryMovieId, setExplanatoryMovieId] = useState("");
  const hasCheckedCookie = useRef(false);

  const handleClose = () => {
    setIsPermanentlyHidden(true);
  };

  // Handle getting the explanatory video category id
  useEffect(() => {
    const fetchData = async () => {
      const explanatoryMovieResponse: { data?: MovieDataType } =
        await getExplanatoryMovie();
      const { data } = explanatoryMovieResponse ?? {};
      setExplanatoryMovieId(data?.id || "");
    };

    fetchData();
  }, []);

  // Handle check on cookie
  useEffect(() => {
    const checkCookie = async () => {
      const hasVisited = await getVisitedCookie();
      hasCheckedCookie.current = true;

      if (hasVisited === undefined) {
        await setVisitedCookie();
        setIsHidden(false);
      } else {
        setIsPermanentlyHidden(true);
      }
    };

    checkCookie();
  }, []);

  return {
    isExpanded,
    setIsExpanded,
    isHidden,
    setIsHidden,
    isPermanentlyHidden,
    setIsPermanentlyHidden,
    handleClose,
    explanatoryMovieId,
    hasCheckedCookie,
  };
};
