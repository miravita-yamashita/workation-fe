export const TIME_WORK = Array.from({ length: 48 }, (_, index) => {
  const hours = String(Math.floor(index / 2)).padStart(2, "0");
  const minutes = index % 2 === 0 ? "00" : "30";
  return {
    id: `${hours}:${minutes}`,
    value: `${hours}:${minutes}`,
    label: `${hours}:${minutes}`,
  };
});

export const MEDICAL_DEPARTMENT = [
  {
    id: 1,
    value: 1,
    label: "外科",
  },
  {
    id: 2,
    value: 2,
    label: "内科 ",
  },
  {
    id: 3,
    value: 3,
    label: "循環器科",
  },
  {
    id: 4,
    value: 4,
    label: "呼吸器科",
  },

  {
    id: 5,
    value: 5,
    label: "手術室",
  },
  {
    id: 6,
    value: 6,
    label: "救急科",
  },

  {
    id: 7,
    value: 7,
    label: "ICU・HCU",
  },

  {
    id: 8,
    value: 8,
    label: "小児科",
  },

  {
    id: 9,
    value: 9,
    label: "産婦人科",
  },

  {
    id: 10,
    value: 10,
    label: "精神科",
  },

  {
    id: 11,
    value: 11,
    label: "美容外科",
  },
];

export const PREFECTURES = [
  {
    id: 1,
    value: 1,
    label: "北海道",
  },
  {
    id: 2,
    value: 2,
    label: "青森県 ",
  },
  {
    id: 3,
    value: 3,
    label: "岩手県",
  },
  {
    id: 4,
    value: 4,
    label: "宮城県",
  },

  {
    id: 5,
    value: 5,
    label: "秋田県",
  },
  {
    id: 6,
    value: 6,
    label: "山形県",
  },

  {
    id: 7,
    value: 7,
    label: "福島県",
  },

  {
    id: 8,
    value: 8,
    label: "茨城県",
  },

  {
    id: 9,
    value: 9,
    label: "栃木県",
  },

  {
    id: 10,
    value: 10,
    label: "群馬県",
  },

  {
    id: 11,
    value: 11,
    label: "埼玉県",
  },

  {
    id: 12,
    value: 12,
    label: "千葉県",
  },

  {
    id: 13,
    value: 13,
    label: "東京都",
  },

  {
    id: 14,
    value: 14,
    label: "神奈川県",
  },

  {
    id: 15,
    value: 15,
    label: "新潟県",
  },

  {
    id: 16,
    value: 16,
    label: "富山県",
  },

  {
    id: 17,
    value: 17,
    label: "石川県",
  },

  {
    id: 18,
    value: 18,
    label: "福井県",
  },

  {
    id: 19,
    value: 19,
    label: "山梨県",
  },

  {
    id: 20,
    value: 20,
    label: "長野県",
  },

  {
    id: 21,
    value: 21,
    label: "岐阜県",
  },

  {
    id: 22,
    value: 22,
    label: "静岡県",
  },

  {
    id: 23,
    value: 23,
    label: "愛知県",
  },

  {
    id: 24,
    value: 24,
    label: "三重県",
  },

  {
    id: 25,
    value: 25,
    label: "滋賀県",
  },

  {
    id: 26,
    value: 26,
    label: "京都府",
  },

  {
    id: 27,
    value: 27,
    label: "大阪府",
  },

  {
    id: 28,
    value: 28,
    label: "兵庫県",
  },

  {
    id: 29,
    value: 29,
    label: "奈良県",
  },

  {
    id: 30,
    value: 30,
    label: "和歌山県",
  },

  {
    id: 31,
    value: 31,
    label: "鳥取県",
  },

  {
    id: 32,
    value: 32,
    label: "島根県",
  },

  {
    id: 33,
    value: 33,
    label: "岡山県",
  },

  {
    id: 34,
    value: 34,
    label: "広島県",
  },

  {
    id: 35,
    value: 35,
    label: "山口県",
  },

  {
    id: 36,
    value: 36,
    label: "徳島県",
  },

  {
    id: 37,
    value: 37,
    label: "香川県",
  },

  {
    id: 38,
    value: 38,
    label: "愛媛県",
  },

  {
    id: 39,
    value: 39,
    label: "高知県",
  },

  {
    id: 40,
    value: 40,
    label: "福岡県",
  },

  {
    id: 41,
    value: 41,
    label: "佐賀県",
  },

  {
    id: 42,
    value: 42,
    label: "長崎県",
  },

  {
    id: 43,
    value: 43,
    label: "熊本県",
  },

  {
    id: 44,
    value: 44,
    label: "大分県",
  },

  {
    id: 45,
    value: 45,
    label: "宮崎県",
  },

  {
    id: 46,
    value: 46,
    label: "鹿児島県",
  },

  {
    id: 47,
    value: 47,
    label: "沖縄県",
  },
];
