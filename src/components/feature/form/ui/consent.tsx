import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Consent = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "leading-1.5rem border-t pt-5 text-center text-sm lg:text-base lg:leading-[1.6875rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

// This component is used to address repetitive code, Do not use this component if style and layout is different
export const ConsentDefault = () => {
  return (
    <>
      <p>個人情報の取り扱いについては、</p>
      <p>
        当社の
        <Link href="/privacy-policy" target="_blank">
          <span className="text-pink-100 underline">プライバシーポリシー</span>
        </Link>
        <span className="block md:inline">
          に 同意していただく必要があります。
        </span>
      </p>
      <p>
        よろしければ以下の「同意する」に
        <span className="block md:inline">チェックしてください。</span>
      </p>
    </>
  );
};
