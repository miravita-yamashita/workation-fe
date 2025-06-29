"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import chevronIcon from "@public/icon-chevron-right.svg";
import markerIcon from "@public/icon-marker.svg";
import salaryIcon from "@public/icon-salary.svg";
import sampleImage from "@public/placeholder/sample-latest-job-img.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { AreaResponseType } from "./lib";

type LatestJobTrigger = {
  value: string;
  label: string;
};
const LatestJobTrigger = ({ value, label }: LatestJobTrigger) => {
  return (
    <TabsTrigger
      value={value}
      className="h-[1.9375rem] min-w-[3.75rem] rounded-b-none bg-[#ECECEC] text-xs font-bold text-[#666666] hover:bg-orange-200 hover:text-white data-[state=active]:bg-orange-200 data-[state=active]:text-white md:text-sm"
    >
      {label}
    </TabsTrigger>
  );
};

interface Props {
  jobs: AreaResponseType;
}
export const LatestJobOpenings = ({ jobs }: Props) => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    arrows: false,
    centerMode: false,
    infinite: false,
    slidesToShow: 2,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          variableWidth: false,
        },
      },
    ],
  };

  const handlePrev = () => {
    if (sliderRef?.current) {
      sliderRef?.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef?.current) {
      sliderRef?.current?.slickNext();
    }
  };

  const renderJobType = (type: string) => {
    if (!type) return null;

    return (
      <div className="mb-[.375rem] rounded-[.1875rem] bg-blue-300 px-[0.625rem] py-[.125rem] text-[.5rem] font-bold leading-3 text-white">
        {type}
      </div>
    );
  };

  return (
    <section className="latest-job relative mb-10 w-full rounded-[.625rem] bg-white px-[0.625rem] pb-[1.875rem] pt-5 md:px-10 md:py-10">
      <div className="flex items-baseline justify-between pb-2 md:items-center md:pb-5">
        <h1 className="slanted-border text-center text-[1.625rem] font-bold uppercase leading-[2.4375rem] text-black md:text-[2rem] md:leading-[3rem]">
          新着求人
        </h1>

        <div className="flex flex-col items-end pt-2 md:flex-row md:items-center md:justify-start md:gap-3 md:pt-0">
          <p className="mb-1 w-[6.25rem] rounded-[1.875rem] bg-green-200 px-5 py-[.375rem] text-xs font-bold leading-[1.125rem] text-white md:m-0 md:mb-0 md:mt-0">
            毎日更新！
          </p>
          <p className="m-0 text-xs font-bold leading-[1.125rem]">
            更新日：
            {jobs.latest_updated && jobs.latest_updated}
          </p>
        </div>
      </div>
      <div>
        <Tabs defaultValue="0" className="bg-orange-50">
          <TabsList className="flex h-auto justify-start gap-[.125rem] overflow-auto rounded-b-none border-b-2 border-orange-200 bg-white p-0 lg:overflow-hidden">
            {jobs?.data?.map((area) => (
              <LatestJobTrigger
                key={area?.id}
                value={area?.id}
                label={area?.areaName}
              />
            ))}
          </TabsList>
          {jobs?.data?.map((area) => (
            <TabsContent
              key={area.id}
              value={area.id}
              className="relative mt-0 min-h-[18.625rem] p-5 pr-0 md:min-h-[23rem] md:px-5 md:py-10 md:pr-0"
            >
              <div className="overflow-hidden">
                <div className="max-w-[28.5rem]">
                  <Slider ref={sliderRef} {...settings}>
                    {area?.jobs?.map((areaJob) => (
                      <div
                        key={areaJob?.id}
                        className="mr-[.625rem] !w-[11.25rem] bg-white p-[.625rem] md:!w-auto"
                      >
                        <Link href={`/result/${areaJob.id}`}>
                          <div className="mb-[.625rem] border-b border-shade-550 pb-[.4375rem]">
                            <h2 className="line-clamp-1 text-sm font-bold">
                              {areaJob.title}
                            </h2>
                          </div>
                          <div className="relative mb-[.625rem] h-[7.5rem] w-full md:h-[9.375rem] md:w-[12.5rem]">
                            <Image
                              src={areaJob?.media || sampleImage}
                              alt={areaJob?.title}
                              fill
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="mb-1 flex gap-[.625rem]">
                            {areaJob["contract_form"] &&
                              renderJobType(areaJob["contract_form"].label)}
                          </div>
                          <div className="mb-1 flex items-center gap-[.375rem]">
                            <div className="relative h-[1.125rem] w-[.875rem]">
                              <Image
                                src={markerIcon}
                                alt="marker icon"
                                priority={true}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {areaJob.area}
                            </span>
                          </div>
                          <div className="flex items-center gap-[.375rem]">
                            <div className="relative h-[1.0625rem] w-[.875rem]">
                              <Image
                                src={salaryIcon}
                                alt="salary icon"
                                priority={true}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {areaJob?.salary}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Slider>

                  <button
                    onClick={handlePrev}
                    disabled={currentSlide <= 0}
                    className="slick-arrow slick-prev custom-arrow-prev !hidden md:!block"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentSlide === area?.jobs?.length - 2}
                    className="slick-arrow slick-next custom-arrow-next !hidden md:!block"
                  >
                    Next
                  </button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="pt-5 text-center">
          <Button
            asChild
            className="inline-flex min-w-[193px] items-center gap-[.625rem]"
          >
            <Link
              href={{
                pathname: "/result",
                query: { "filter[latest]": "true" },
              }}
            >
              <span>もっと見る</span>
              <div className="relative h-[.375rem] w-[.1875rem]">
                <Image
                  src={chevronIcon}
                  alt="chevron right icon"
                  priority={true}
                />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
