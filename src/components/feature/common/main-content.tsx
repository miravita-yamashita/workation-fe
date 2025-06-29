import { cn } from "@/lib/utils";

type MainBlockProps = {
  mainId?: string;
  className?: string;
  children: React.ReactNode;
};

export const MainContent = ({
  mainId,
  className = "",
  children,
}: MainBlockProps) => {
  const finalMainId = mainId || "main";

  return (
    <main id={finalMainId} className={cn(className)}>
      {children}
    </main>
  );
};
