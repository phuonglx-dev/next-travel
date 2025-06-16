import cn from "classnames";
import { Link } from "@/navigation";
import ImageCustom from "../image-custom";

interface Props {
  title: string;
  image: string;
  image_alt: string;
  slug?: string;
  className?: string;
}

export default function CoverImage({
  title,
  image,
  image_alt,
  slug,
  className,
}: Props) {
  const images = (
    <ImageCustom
      src={image}
      image_alt={image_alt}
      className={cn("shadow-xs", {
        "hover:shadow-medium h-full w-full rounded-lg object-cover transition-shadow duration-200":
          slug !== null || slug !== undefined,
      })}
    />
  );
  return (
    <>
      {slug ? (
        <Link
          href={`/post/${slug}`}
          aria-label={title}
          className={`relative block w-full sm:mx-0 ${
            className?.includes("min-h-") || className?.includes("h-")
              ? className
              : `min-h-88 ${className}`
          }`}
        >
          {images}
        </Link>
      ) : (
        <div
          className={`relative w-full sm:mx-0 ${
            className?.includes("min-h-") || className?.includes("h-")
              ? className
              : `min-h-88 ${className}`
          }`}
        >
          {images}
        </div>
      )}
    </>
  );
}
