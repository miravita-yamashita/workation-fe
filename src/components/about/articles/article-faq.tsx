import {
  FAQAccordion,
  FAQAccordionContent,
  FAQAccordionEmphasized,
  FAQAccordionItem,
  FAQAccordionPanel,
  FAQAccordionPanelLegend,
  FAQAccordionPanelTitle,
  FAQAccordionTrigger,
} from "@/components/feature/faq";
import ImageAccordionTitle from "@public/post/image-accordion-title-secondary.svg";
import Image from "next/image";
import { QuestionType } from "../lib";

type Props = {
  questions: QuestionType[];
};

export const ArticleFaq = async ({ questions }: Props) => {
  if (!questions || questions?.length === 0) {
    return null;
  }
  return (
    <div id="faq-section">
      <FAQAccordionPanel className="mb-10 lg:mb-[6.25rem]">
        <FAQAccordionPanelLegend>FAQ</FAQAccordionPanelLegend>
        <div className="!mt-0 flex justify-center">
          <FAQAccordionPanelTitle>
            <Image
              src={ImageAccordionTitle}
              alt="accordion title"
              fill
              sizes="100%"
            />
          </FAQAccordionPanelTitle>
        </div>
        <FAQAccordion>
          {Object.entries(questions)?.map(([key, { id, question, answer }]) => (
            <FAQAccordionItem value={id} key={`${id}-${key}`}>
              <FAQAccordionTrigger>
                <div className="flex items-center gap-2 lg:gap-4">
                  <FAQAccordionEmphasized>Q</FAQAccordionEmphasized>
                  {question}
                </div>
              </FAQAccordionTrigger>
              <FAQAccordionContent>
                <div className="flex items-start gap-2 lg:gap-4">
                  <FAQAccordionEmphasized className="text-blue-300">
                    A
                  </FAQAccordionEmphasized>
                  {answer}
                </div>
              </FAQAccordionContent>
            </FAQAccordionItem>
          ))}
        </FAQAccordion>
      </FAQAccordionPanel>
    </div>
  );
};
