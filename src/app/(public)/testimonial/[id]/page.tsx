import {
  BackgroundContainer,
  MainBlock,
  NoDataFound,
} from "@/components/feature/common";
import {
  getTestimonialDetails,
  TestimonialDetail,
} from "@/components/testimonial";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = (await params) || {};
  const [testimonialDetailsResponse] = await Promise.all([
    getTestimonialDetails(id),
  ]);

  const { data: testimonialDetails } = testimonialDetailsResponse || {};

  if (!testimonialDetails) {
    return <NoDataFound />;
  }

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock
          size="sm"
          className="font-bold text-coral-300 lg:p-0 lg:py-[.625rem] lg:text-[1.625rem]"
        >
          参加者の声一覧
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="lg:p-0">
        <BackgroundContainer className="bg-white">
          <TestimonialDetail
            item={testimonialDetails}
            className="my-[3.75rem] p-10"
          />
        </BackgroundContainer>
      </MainBlock>
    </>
  );
}
