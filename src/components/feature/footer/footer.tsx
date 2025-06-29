"use client";

import { footerLinksValues } from "@/lib/static-datasource/footer-links-values";
import { cn, getUniqueId } from "@/lib/utils";
import { FooterContactInformation } from "./footer-contact-information";
import { MainBlock, TwoColContainer, TwoColContainerBlock } from "../common";
import { SocialsBlock } from "../socials";
import { socials } from "@/lib/static-datasource";
import Link from "next/link";
import { FooterInformation } from "./footer-information";
import { useEffect, useRef, useState } from "react";
import { useOnboardingStore } from "../onboarding/lib/store";
import {
  getExplanatoryMovie,
  MovieDataType,
  MovieFilterParamKey,
} from "@/components/movie";

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [explanatoryMovie, setExplanatoryMovie] = useState<MovieDataType>();
  // Set the footer ref, we will use it in the Onboarding component
  useOnboardingStore.setState({ footerRef });

  // Get Movies Category for First Time
  useEffect(() => {
    const fetchData = async () => {
      const explanatoryMovieResponse: { data?: MovieDataType } =
        await getExplanatoryMovie();
      const { data } = explanatoryMovieResponse ?? {};
      setExplanatoryMovie(data);
    };

    fetchData();
  }, []);

  return (
    <footer ref={footerRef}>
      <MainBlock size="lg" className="w-full p-0 sm:px-0 lg:p-0">
        <TwoColContainer className="items-center gap-[4.375rem] bg-coral-300 px-[1rem] py-12 lg:px-[6.25rem] lg:py-[5rem]">
          <TwoColContainerBlock className="block">
            <footer className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {footerLinksValues?.map(({ section, links }, index) => (
                <div
                  key={getUniqueId(index.toString())}
                  className={cn("", {
                    "order-3 lg:order-2": index === 1, // What Is Workation Nurse
                    "order-2 lg:order-3": index === 2, // First time
                    "order-4": index === 3, // Company Information
                  })}
                >
                  <h4 className="border-b border-b-white pb-[.625rem] font-yugothic text-[1.125rem] font-bold text-white">
                    {section}
                  </h4>
                  <div className="flex flex-col gap-3 pt-5">
                    {links?.map(({ label, url }, index) => {
                      const updatedURL =
                        url === "/first-time/movie"
                          ? `/movie?${MovieFilterParamKey.Categories}=${explanatoryMovie?.id}`
                          : url;
                      return (
                        <div key={getUniqueId(index.toString())}>
                          <Link
                            href={updatedURL}
                            className="font-yugothic text-xs font-bold text-white lg:text-sm"
                          >
                            {label}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </footer>
          </TwoColContainerBlock>

          {/* Footer Right */}
          <TwoColContainerBlock className="flex max-w-[21.4375rem] flex-col items-center gap-[.625rem] lg:max-w-[20.5625rem]">
            <FooterContactInformation />

            <p className="font-xs mt-7 text-left font-albertsans font-medium uppercase text-white">
              FOLLOW US
            </p>

            <SocialsBlock
              socials={socials}
              iconOnly={true}
              useWhiteIcons={true}
              className="gap-[1.875rem] lg:gap-[1.625rem]"
            />
          </TwoColContainerBlock>
        </TwoColContainer>

        <FooterInformation />
      </MainBlock>
    </footer>
  );
};
