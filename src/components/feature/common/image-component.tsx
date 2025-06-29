"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import Image from "next/image";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ImageBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("relative", className)}>{children}</div>;
};

export const ImageItem = ({
  className = "",
  src,
  altText,
}: CommonProps & {
  src: string;
  altText: string;
}) => {
  const [imageSource, setImageSource] = useState<string>(src);
  const [isValidImage, setIsValidImage] = useState(true);

  // Handle 404
  useEffect(() => {
    if (!isValidImage) setImageSource(ImageNoPhoto.src);
  }, [isValidImage]);

  return (
    <Image
      src={imageSource}
      className={cn("absolute h-full w-full object-contain", className)}
      alt={altText}
      onError={() => {
        setIsValidImage(false);
      }}
      fill
      sizes="100%"
      loading="lazy"
    />
  );
};
