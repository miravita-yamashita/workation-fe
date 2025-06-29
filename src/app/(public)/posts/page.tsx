import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { PostList } from "@/components/post";
import { getArticleList } from "@/components/post/post-list/lib";

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.recommendedArticles.base];

// Only articles/posts with the "Article List" category will be displayed on this page
// Note: The "Article List" category must be created by an Admin before it can be used
export default async function Page() {
  const [getArticleListResponse] = await Promise.all([getArticleList()]);

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader> おすすめの記事</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="lg:p-0">
        <BackgroundContainer className="bg-ivory-100">
          <PostList response={getArticleListResponse} />
        </BackgroundContainer>
      </MainBlock>
    </>
  );
}
