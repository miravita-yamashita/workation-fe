export const RecentlyResult = ({ count }: { count: number }) => {
  return (
    <div className="mb-5 bg-white px-[.875rem] py-5 text-sm font-medium leading-[1.3125rem] md:mb-[1.875rem] md:p-[1.875rem] md:text-base">
      <p>
        最近見た求人一覧
        <span className="text-[1.625rem] font-bold leading-[2.4375rem] text-pink-200">
          {count}
        </span>
        <span className="font-bold text-pink-200">件</span>
        を表示しています。
      </p>
      <p className="hidden">
        ※この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。
      </p>
    </div>
  );
};
