import { QuickLinkDataType } from "./types";


export const QUICK_LINKS: QuickLinkDataType[] = [
  {
    id: 1,
    title: "投稿",
    create: {
      label: "一覧",
      path: "/admin/posts",
    },
    list: {
      label: "新規作成",
      path: "/admin/posts/create",
    },
  },
  {
    id: 2,
    title: "施設",
    create: {
      label: "一覧",
      path: "/admin/facilities",
    },
    list: {
      label: "新規作成",
      path: "/admin/facilities/new",
    },
  },
  {
    id: 3,
    title: "求人",
    create: {
      label: "一覧",
      path: "/admin/jobs",
    },
    list: {
      label: "新規作成",
      path: "/admin/jobs/new",
    },
  },
  {
    id: 4,
    title: "動画",
    create: {
      label: "一覧",
      path: "/admin/movie",
    },
    list: {
      label: "新規作成",
      path: "/admin/movie/create",
    },
  },
  {
    id: 5,
    title: "質問",
    create: {
      label: "一覧",
      path: "/admin/faq",
    },
    list: {
      label: "新規作成",
      path: "/admin/faq/new",
    },
  },
];
