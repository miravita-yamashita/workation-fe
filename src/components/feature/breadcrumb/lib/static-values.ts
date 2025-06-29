/**
 * NOTE: These static values help minimize code duplication for breadcrumb assignments.
 * If your breadcrumb structure is dynamic or does not fit this format,
 * consider creating a custom breadcrumb implementation. You can place your custom code
 * in specific page components instead.
 */
export const BREADCRUMB = {
  top: {
    label: "TOP",
    link: "/",
  },
  contact: {
    select: {
      label: "お問い合わせ",
      link: "/contact-select",
    },
    general: {
      label: "お問い合わせ（一般の方）",
      link: "/contact",
    },
    nurse: {
      label: "お問い合わせ（看護師の方）",
      link: "/contact-nurse",
    },
    hospital: {
      label: "お問い合わせ（医療機関の方）",
      link: "/contact-hospital",
    },
  },
  question: {
    base: {
      label: "お問い合わせ（一般の方）",
      link: "/question",
    },
  },
  conditions: {
    base: {
      label: "保存した検索条件一覧",
      link: "/conditions",
    },
  },
  result: {
    base: {
      label: "求人を探す",
      link: "/result",
    },
  },
  recruit: {
    base: {
      label: "お問い合わせ",
      link: "",
    },
    check: {
      label: "求人専用応募フォーム",
      link: "/recruit/check",
    },
    thanks: {
      label: "求人専用応募フォーム",
      link: "recruit/thanks",
    },
  },
  jobs: {
    base: {
      label: "求人を探す",
      link: "",
    },
  },
  recommended: {
    base: {
      label: "おすすめの求人",
      link: "/recommended",
    },
  },
  keep: {
    base: {
      label: "キープ一覧",
      link: "/keep",
    },
  },
  recentViewedJobs: {
    base: {
      label: "最近見た求人一覧",
      link: "",
    },
  },
  privacyPolicy: {
    base: {
      label: "プライバシーポリシー",
      link: "",
    },
  },
  contentsPolicy: {
    base: {
      label: "保存した検索条件一覧",
      link: "",
    },
  },
  employerPlan: {
    base: {
      label: "一般事業主行動計画",
      link: "",
    },
  },
  about: {
    base: {
      label: "バケーションナースとは",
      link: "/about",
    },
    previousSlug: {
      label: ":slug",
      link: "/about/:slug",
    },
    search: {
      label: "検索結果",
      link: "/",
    },
  },
  company: {
    base: {
      label: "会社概要",
      link: "/company",
    },
  },
  sitemap: {
    base: {
      label: "サイトマップ",
      link: "/site-map",
    },
  },
  testimonial: {
    base: {
      label: "参加者の声一覧",
      link: "/testimonial",
    },
  },
  firstTime: {
    base: {
      label: "はじめての方へ",
      link: "/first-time",
    },
  },
  movie: {
    base: {
      label: "動画一覧",
      link: "/movie",
    },
  },
  recommendedArticles: {
    base: {
      label: "おすすめの記事",
      link: "/posts",
    },
  },
};

export const BREADCRUMB_ADMIN = {
  dashboard: {
    label: "ホーム",
    link: "/admin/dashboard",
  },
  static: {
    list: {
      label: "固定ページ一覧",
      link: "/admin/static-page",
    },
    top: {
      detail: {
        label: "トップページ Top詳細",
        link: "/admin/dashboard",
      },
    },
    beginners: {},
    company: {
      detail: {
        label: "会社概要 Company Profile詳細",
        link: "/admin/static-page/:id/company/detail",
      },
      edit: {
        label: "編集",
        link: "/admin/static-page/:id/company/edit",
      },
    },
    employer: {
      label: "一般事業主行動計画 General Employer Action Plan詳細",
      link: "/",
    },
    contentPolicy: {
      label: "コンテンツ作成ポリシー Content Creation Policy詳細",
      link: "/",
    },
    privacyPolicy: {
      label: "プライバシーポリシー Privacy Policy詳細",
      link: "/",
    },
  },
  categories: {
    base: {
      label: "カテゴリートップ",
      link: "/admin/categories",
    },
    list: {
      label: "カテゴリー一覧",
      link: "/admin/categories",
    },
    listSubCategory: {
      label: "カテゴリー一覧",
      link: "/admin/categories/:categoryId/list",
    },
    detail: {
      label: "詳細",
      link: "/admin/categories/:categoryId/list/:subCategoryId/detail",
    },
    edit: {
      label: "編集",
      link: "/admin/categories/:categoryId/list/:subCategoryId/edit",
    },
    create: {
      label: "作成",
      link: "/admin/categories/:categoryId/create",
    },
  },
  facilities: {
    base: {
      label: "ホーム",
      link: "/admin",
    },
    list: {
      label: "施設一覧",
      link: "/admin/facilities",
    },
    edit: {
      label: "施設詳細編集",
      link: "/admin/facilities",
    },
    new: {
      label: "新規作成",
      link: "/admin/facilities",
    },
  },
  jobs: {
    base: {
      label: "ホーム",
      link: "/admin",
    },
    list: {
      label: "求人一覧",
      link: "/admin/jobs",
    },
    new: {
      label: "新規作成",
      link: `/admin/jobs/new`,
    },
    edit: {
      label: "編集",
      link: ``,
    },
  },
  staticPage: {
    base: {
      label: "ホーム",
      link: "/admin/static-page",
    },
    list: {
      label: "固定ページ一覧",
      link: "/admin/static-page",
    },
    detail: {
      label: "詳細",
      link: "/admin/static-page/:id/:slug/detail",
    },
  },
  faq: {
    base: {
      label: "ホーム",
      link: "/admin/dashboard",
    },
    list: {
      label: "よくある質問一覧",
      link: "/admin/faq",
    },
    detail: {
      label: "詳細",
      link: "",
    },
    preEdit: {
      label: "よくある質問詳細",
      link: "/admin/faq/:id",
    },
    edit: {
      label: "編集",
      link: "",
    },
  },
  inquiries: {
    base: {
      label: "ホーム",
      link: "/admin/dashboard",
    },
    list: {
      label: "お問い合わせ一覧",
      link: "/admin/inquiries",
    },
    detail: {
      label: "詳細",
      link: "",
    },
    reply: {
      label: "対応フォーム",
      link: "",
    },
  },
  emailTemplates: {
    base: {
      label: "ホーム",
      link: "/admin/email-templates",
    },
    list: {
      label: "返信用メールテンプレート一覧",
      link: "/admin/email-templates",
    },
    detail: {
      label: "応募済み用",
      link: "",
    },
    new: {
      label: "新規作成",
      link: "",
    },
    edit: {
      label: "編集",
      link: "",
    },
  },
  movie: {
    list: {
      label: "動画一覧",
      link: "/admin/movie",
    },
    detail: {
      label: "はじめての方が見る動画はこちら！",
      link: "/admin/movie/:id/detail",
    },
  },
  customerTestimonials: {
    base: {
      label: "ホーム",
      link: "/admin/customer-testimonials",
    },
    list: {
      label: "お客様の声一覧",
      link: "/admin/customer-testimonials",
    },
    details: {
      label: "詳細",
      link: "",
    },
    edit: {
      label: "編集",
      link: "",
    },
    new: {
      label: "新規作成",
      link: "",
    },
  },
  posts: {
    base: {
      label: "投稿一覧",
      link: "/admin/posts",
    },
    create: {
      label: "VIEW OR 編集 OR 新規作成",
      link: "/admin/posts/create",
    },
    edit: {
      label: "VIEW OR 編集 OR 新規作成",
      link: "/admin/posts/:id/edit",
    },
  },
  userManagement: {
    base: {
      label: "ホーム",
      link: "/admin/dashboard",
    },
    list: {
      label: "ユーザー一覧",
      link: "/admin/user-management",
    },
    edit: {
      label: "編集",
      link: "",
    },
    new: {
      label: "新規作成",
      link: "/admin/user-management/new",
    },
  },
};
