import { PropsWithChildren } from "react";
import { SearchPanelDescription, SearchPanelTitle } from "./search-panel";
import {
  SearchForm,
  SearchFormBody,
  SearchFormHeader,
  SearchFormSubText,
} from "./search-form";
import { FieldHorizontalRuleBlock } from "@/components/feature/common";
import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const SearchComposite = ({ className }: CommonProps) => {
  return (
    <section className={cn("", className)}>
      <div>
        <SearchPanelTitle>Q&A検索</SearchPanelTitle>
        <SearchPanelDescription>
          よくある質問をフリーワードやキーワードから検索することができます。
        </SearchPanelDescription>
      </div>
      <SearchForm>
        <SearchFormHeader>
          <span className="shrink-0">フリーワードで探す</span>
          <FieldHorizontalRuleBlock />
        </SearchFormHeader>

        <SearchFormBody />
        <SearchFormSubText>※気になる単語でご入力ください。</SearchFormSubText>
      </SearchForm>
    </section>
  );
};
