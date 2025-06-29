import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import {
  FAQPopularPanel,
  FAQPopularPanelTitle,
  FAQPopularPanelTitleBorder,
} from "./faq-popular-panel";
import {
  FAQPopularInfo,
  FAQPopularInfoBullet,
  FAQPopularInfoHeader,
  FAQPopularInfoIcon,
  FAQPopularInfoItem,
  FAQPopularInfoLink,
  FAQPopularInfoList,
  FAQPopularInfoListTitle,
} from "./faq-popular-info";
import { FAQPopularGroup, FAQPopularByGroupResponseType } from "./lib/types";
import { FAQSearchParamKey } from "../search/lib/types";
import {
  FAQAccordion,
  FAQAccordionCommonContent,
  FAQAccordionContent,
  FAQAccordionEmphasized,
  FAQAccordionItem,
  FAQAccordionPanel,
  FAQAccordionPanelLegend,
  FAQAccordionPanelTitle,
  FAQAccordionTrigger,
} from "../faq-accordion";
import Image from "next/image";
import ImageAccordionTitleFAQ from "@public/image-accordion-title-faq.svg";
import ImageAccordionTitleFAQAlt from "@public/image-accordion-title-faq-alt.svg";
import { GENERIC_NO_DATA } from "@/lib/message-map";
type CommonProps = PropsWithChildren & {
  className?: string;
  data: FAQPopularByGroupResponseType;
};

export const FAQPopularComposite = ({ className, data }: CommonProps) => {
  const result = data?.data ?? [];
  const nurse = result[FAQPopularGroup.Nurse] ?? {};
  const hospital = result[FAQPopularGroup.Hospital] ?? {};
  const general = result[FAQPopularGroup.General] ?? {};

  return (
    <section className={cn("h-full", className)}>
      <FAQPopularPanel className="h-full">
        <FAQPopularPanelTitle className="lg:mb-0">
          よく見られているFAQ
        </FAQPopularPanelTitle>
        <FAQPopularInfo>
          <FAQPopularInfoHeader>
            <FAQPopularInfoListTitle>看護師向けの質問</FAQPopularInfoListTitle>
            <FAQPopularInfoLink
              href={`/recruit-conform?${FAQSearchParamKey.Category}=${FAQPopularGroup.Nurse}&${FAQSearchParamKey.Group}=看護師向けの質問`}
              className="justify-end text-blue-300 underline"
            >
              もっと見る
            </FAQPopularInfoLink>
          </FAQPopularInfoHeader>
          <FAQPopularInfoList>
            {Object.entries(nurse)
              .slice(0, 3)
              .map(([key, item]) => (
                <FAQPopularInfoItem key={`${key}-${item.id}`}>
                  <FAQPopularInfoBullet>Q</FAQPopularInfoBullet>
                  <FAQPopularInfoLink
                    href={`/recruit-conform?${FAQSearchParamKey.Search}=${item.question}`}
                  >
                    <span className="line-clamp-1 overflow-hidden">
                      {item.question}
                    </span>
                    <FAQPopularInfoIcon />
                  </FAQPopularInfoLink>
                </FAQPopularInfoItem>
              ))}
          </FAQPopularInfoList>
          {Object.keys(nurse).slice(0, 3).length === 0 && (
            <span>データがありません。</span>
          )}
        </FAQPopularInfo>

        <FAQPopularInfo>
          <FAQPopularInfoHeader>
            <FAQPopularInfoListTitle>
              医療機関向けの質問
            </FAQPopularInfoListTitle>
            <FAQPopularInfoLink
              href={`/recruit-conform?${FAQSearchParamKey.Category}=${FAQPopularGroup.Hospital}&${FAQSearchParamKey.Group}=医療機関向けの質問`}
              className="justify-end text-blue-300 underline"
            >
              もっと見る
            </FAQPopularInfoLink>
          </FAQPopularInfoHeader>
          <FAQPopularInfoList>
            {Object.entries(hospital)
              .slice(0, 3)
              .map(([key, item]) => (
                <FAQPopularInfoItem key={`${key}-${item.id}`}>
                  <FAQPopularInfoBullet>Q</FAQPopularInfoBullet>
                  <FAQPopularInfoLink
                    href={`/recruit-conform?${FAQSearchParamKey.Search}=${item.question}`}
                  >
                    <span className="line-clamp-1 overflow-hidden">
                      {item.question}
                    </span>
                    <FAQPopularInfoIcon />
                  </FAQPopularInfoLink>
                </FAQPopularInfoItem>
              ))}
          </FAQPopularInfoList>
          {Object.keys(hospital).length === 0 && (
            <span>データがありません。</span>
          )}
        </FAQPopularInfo>

        <FAQPopularInfo>
          <FAQPopularInfoHeader>
            <FAQPopularInfoListTitle>一般向けの質問</FAQPopularInfoListTitle>
            <FAQPopularInfoLink
              href={`/recruit-conform?${FAQSearchParamKey.Category}=${FAQPopularGroup.General}&${FAQSearchParamKey.Group}=一般向けの質問`}
              className="justify-end text-blue-300 underline"
            >
              もっと見る
            </FAQPopularInfoLink>
          </FAQPopularInfoHeader>
          <FAQPopularInfoList>
            {Object.entries(general)
              .slice(0, 3)
              .map(([key, item]) => (
                <FAQPopularInfoItem key={`${key}-${item.id}`}>
                  <FAQPopularInfoBullet>Q</FAQPopularInfoBullet>
                  <FAQPopularInfoLink
                    href={`/recruit-conform?${FAQSearchParamKey.Search}=${item.question}`}
                  >
                    <span className="line-clamp-1 overflow-hidden">
                      {item.question}
                    </span>
                    <FAQPopularInfoIcon />
                  </FAQPopularInfoLink>
                </FAQPopularInfoItem>
              ))}
            {Object.keys(general).length === 0 && (
              <span>データがありません。</span>
            )}
          </FAQPopularInfoList>
        </FAQPopularInfo>
      </FAQPopularPanel>
    </section>
  );
};

export const FAQPopularByGroupComposite = ({
  data,
  className,
}: CommonProps) => {
  const result = data?.data ?? [];
  const nurse = result[FAQPopularGroup.Nurse] ?? {};
  const hospital = result[FAQPopularGroup.Hospital] ?? {};
  const general = result[FAQPopularGroup.General] ?? {};

  return (
    <section className={cn("", className)}>
      <FAQAccordionPanel>
        <FAQAccordionPanelLegend>FAQ</FAQAccordionPanelLegend>
        <div className="!mt-0 flex justify-center">
          <FAQAccordionPanelTitle>
            <Image
              src={ImageAccordionTitleFAQ}
              alt="accordion title"
              fill
              sizes="100%"
              className="hidden lg:block"
            />
            <Image
              src={ImageAccordionTitleFAQAlt}
              alt="accordion title"
              fill
              sizes="100%"
              className="block lg:hidden"
            />
          </FAQAccordionPanelTitle>
        </div>
        <FAQPopularPanel>
          {Object.keys(nurse).length === 0 &&
            Object.keys(hospital).length === 0 &&
            Object.keys(general).length === 0 && <span>{GENERIC_NO_DATA}</span>}
          {Object.keys(nurse).length > 0 && (
            <FAQPopularInfo>
              <FAQPopularInfoHeader className="mb-3.5 border-0">
                <FAQPopularPanelTitleBorder className="shrink-0">
                  看護師向けの質問
                </FAQPopularPanelTitleBorder>
                <FAQPopularInfoLink
                  href={`/recruit-conform?${FAQSearchParamKey.Category}=${FAQPopularGroup.Nurse}&${FAQSearchParamKey.Group}=看護師向けの質問`}
                  className="justify-end text-blue-300 underline"
                >
                  もっと見る
                </FAQPopularInfoLink>
              </FAQPopularInfoHeader>
              <FAQAccordion>
                {Object.entries(nurse)
                  .slice(0, 3)
                  .map(([key, { id, question, answer }]) => (
                    <FAQAccordionItem value={id} key={`${id}-${key}`}>
                      <FAQAccordionTrigger>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized>
                            <span>Q</span>
                          </FAQAccordionEmphasized>
                          {question}
                        </FAQAccordionCommonContent>
                      </FAQAccordionTrigger>
                      <FAQAccordionContent>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized className="text-blue-300">
                            <span>A</span>
                          </FAQAccordionEmphasized>
                          {answer}
                        </FAQAccordionCommonContent>
                      </FAQAccordionContent>
                    </FAQAccordionItem>
                  ))}
              </FAQAccordion>
            </FAQPopularInfo>
          )}
          {Object.keys(hospital).length > 0 && (
            <FAQPopularInfo>
              <FAQPopularInfoHeader className="mb-3.5 border-0">
                <FAQPopularPanelTitleBorder className="shrink-0">
                  医療機関向けの質問
                </FAQPopularPanelTitleBorder>
                <FAQPopularInfoLink
                  href={`/recruit-conform?${FAQSearchParamKey.Category}=${FAQPopularGroup.Hospital}&${FAQSearchParamKey.Group}=医療機関向けの質問`}
                  className="justify-end text-blue-300 underline"
                >
                  もっと見る
                </FAQPopularInfoLink>
              </FAQPopularInfoHeader>
              <FAQAccordion>
                {Object.entries(hospital)
                  .slice(0, 3)
                  .map(([key, { id, question, answer }]) => (
                    <FAQAccordionItem value={id} key={`${id}-${key}`}>
                      <FAQAccordionTrigger>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized>
                            <span>Q</span>
                          </FAQAccordionEmphasized>
                          {question}
                        </FAQAccordionCommonContent>
                      </FAQAccordionTrigger>
                      <FAQAccordionContent>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized className="text-blue-300">
                            <span>A</span>
                          </FAQAccordionEmphasized>
                          {answer}
                        </FAQAccordionCommonContent>
                      </FAQAccordionContent>
                    </FAQAccordionItem>
                  ))}
              </FAQAccordion>
            </FAQPopularInfo>
          )}
          {Object.keys(general).length > 0 && (
            <FAQPopularInfo>
              <FAQPopularInfoHeader className="mb-3.5 border-0">
                <FAQPopularPanelTitleBorder className="shrink-0">
                  一般向けの質問
                </FAQPopularPanelTitleBorder>
                <FAQPopularInfoLink
                  href={`/recruit-conform?${FAQSearchParamKey.Category}=${FAQPopularGroup.General}&${FAQSearchParamKey.Group}=一般向けの質問`}
                  className="justify-end text-blue-300 underline"
                >
                  もっと見る
                </FAQPopularInfoLink>
              </FAQPopularInfoHeader>
              <FAQAccordion>
                {Object.entries(general)
                  .slice(0, 3)
                  .map(([key, { id, question, answer }]) => (
                    <FAQAccordionItem value={id} key={`${id}-${key}`}>
                      <FAQAccordionTrigger>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized>
                            <span>Q</span>
                          </FAQAccordionEmphasized>
                          {question}
                        </FAQAccordionCommonContent>
                      </FAQAccordionTrigger>
                      <FAQAccordionContent>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized className="text-blue-300">
                            <span>A</span>
                          </FAQAccordionEmphasized>
                          {answer}
                        </FAQAccordionCommonContent>
                      </FAQAccordionContent>
                    </FAQAccordionItem>
                  ))}
              </FAQAccordion>
            </FAQPopularInfo>
          )}
        </FAQPopularPanel>
      </FAQAccordionPanel>
    </section>
  );
};
