"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageBlock } from "@/components/feature/common";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import IconSearch from "@public/icon-search.svg";
import Image from "next/image";
import { ArticleSearchParamKey } from "@/components/about-search";

type ArticleSearchProps = {
  slug: string;
};

export const ArticleSearch = ({ slug }: ArticleSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const handleOnSubmit = (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (inputValue.trim() !== "") {
      router.push(
        `/about-search?${ArticleSearchParamKey.Keyword}=${encodeURIComponent(inputValue)}&slug=${slug || ""}`,
      );
    }
  };

  return (
    <FormItem className="relative mb-5 bg-white" onSubmit={handleOnSubmit}>
      <form className="relative w-full" onSubmit={handleOnSubmit}>
        <div className="absolute left-[95%] top-1/2 block translate-x-[-2.5rem] translate-y-[-50%] transform">
          <button type="submit" className="p-4">
            <ImageBlock className="icon-search h-4 w-4">
              <Image src={IconSearch} alt="search" fill />
            </ImageBlock>
          </button>
        </div>
        <Input
          className="pr-[5rem]"
          placeholder="宮古島"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleOnSubmit(e)}
        />
      </form>
    </FormItem>
  );
};
