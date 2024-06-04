"use client";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ImageProps extends Omit<NextImageProps, "src" | "onError"> {
  src?: string;
}

const DefaultImagePath = "/assets/images/default.svg";

const Image = ({ src, ...rest }: ImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <NextImage
      {...rest}
      src={imageSrc || DefaultImagePath}
      quality={50}
      onError={() => {
        setImageSrc(DefaultImagePath);
      }}
      unoptimized={true}
    />
  );
};

export default Image;
