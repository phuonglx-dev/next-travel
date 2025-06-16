import CoverImage from './cover-image';
import PostProps from '@/types/post';
import Date from '../common/date';
import { Link } from '@/navigation';

export default function PostPreview({
  props,
  className,
  slugs,
}: {
  props: PostProps;
  className?: string;
  slugs?: string[];
}) {
  const { title, image, image_alt, created_at, slug } = props;

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="relative">
        <div className="w-full min-h-88 relative">
          {image && (
            <CoverImage
              title={title}
              image={image}
              image_alt={image_alt ? image_alt : title}
              slug={slug}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-2">
            <div className="mt-1 mb-2 text-lg font-semibold text-white">
              <Link
                href="#"
                className="inline-block w-full hover:underline"
                aria-label={title}>
                {title}
              </Link>
            </div>
            <p className="mt-auto text-sm text-white">
              <Date dateString={created_at} />
            </p>
          </div>
          <Link href="#" aria-label={title}>
            <div className="z-5 modal rounded-md cursor-pointer"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
