import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const AccessMap = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const AccessMapHeader = ({ children, className }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const AccessMapContent = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex flex-col bg-white", className)}>{children}</div>
  );
};

export const AccessMapEmbed = ({
  className = "",
  embedUrl = "",
}: CommonProps & { embedUrl?: string }) => {
  return (
    <div
      className={cn("", className)}
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <iframe
        src={embedUrl}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "0",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
