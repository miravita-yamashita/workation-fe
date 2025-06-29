import ImageInquiryFromNurses from "@public/footer/inquiry-from-nurses.svg";
import ImageInquiryFromMedicalInstitutions from "@public/footer/inquiry-from-medical-institutions.svg";
import ImageInquiryFromGeneralPublic from "@public/footer/inquiry-from-general-public.svg";

export const footerLinksValues = [
  {
    section: "求人情報",
    links: [
      { label: "求人一覧", url: "/result" },
      { label: "おすすめの求人", url: "/recommended" },
      { label: "キープした求人", url: "/keep" },
      { label: "最近見た求人", url: "/recently" },
    ],
  },
  {
    section: "バケーションナースとは",
    links: [
      {
        label: "バケーションナースの参加者の声",
        url: "/testimonial",
      },
      {
        label: "バケーションナースに人気の宮古島の魅力",
        url: "/article/miyakoisland-charm",
      },
      {
        label: "ウインタースポーツ好きなら北海道でバケーションナース",
        url: "/article/hokkaido-charm",
      },
      {
        label: "フリーランスナースに転職する方法",
        url: "/article/freelance-nurse",
      },
    ],
  },
  {
    section: "はじめての方へ",
    links: [
      {
        label: "採用になりやすい理由",
        url: "/first-time/recruit",
      },
      {
        label: "バケーションナースが選ばれる理由",
        url: "/first-time/reason",
      },
      {
        label: "バケーションナースの説明動画",
        url: "/first-time/movie",
      },
      {
        label: "よくある質問",
        url: "/question",
      },
    ],
  },
  {
    section: "会社情報",
    links: [
      {
        label: "会社概要",
        url: "/company",
      },
      {
        label: "一般事業主行動計画",
        url: "/plan",
      },
      {
        label: "サイトマップ",
        url: "/site-map",
      },
      {
        label: "コンテンツ作成ポリシー",
        url: "/contents-policy",
      },
      {
        label: "プライバシーポリシー",
        url: "/privacy-policy",
      },
    ],
  },
];

export const footerInformationValues = [
  {
    imgSrc: ImageInquiryFromNurses,
    alt: "image of inquiry from nurses contact form",
    url: "/contact-nurse",
  },
  {
    imgSrc: ImageInquiryFromMedicalInstitutions,
    alt: "image of inquiry from medical institutions contact form",
    url: "/contact-hospital",
  },
  {
    imgSrc: ImageInquiryFromGeneralPublic,
    alt: "image of inquiry from general public contact form",
    url: "/contact",
  },
];
