import { Link } from '@/navigation';
import CoverImage from './cover-image';
import PostProps from '@/types/post';
import Date from '../common/date';
import { IconCalendar } from '../icons';

export default function PostPreview({
  props,
  slugs,
}: {
  props: any;
  slugs?: string[] | undefined;
}) {
  const {
    title,
    image,
    image_alt,
    created_at,
    fulltext,
    featured,
    short,
    slug,
  } = props;
  const alt = image_alt ? image_alt : title;
  return (
    <div className="flex flex-col">
      <div
        className="relative w-full min-h-52 overflow-hidden text-center rounded-lg"
        style={{ cursor: 'pointer' }}>
        {image && (
          <div className="w-full h-full rounded-lg group">
            <CoverImage
              title={title}
              image={image.src}
              image_alt={alt}
              slug={slug}
              className="object-cover w-full h-full transition-all duration-500 ease-in-out transform scale-100 group-hover:scale-110"
            />
          </div>
        )}
      </div>
      <div className="flex-1">
        {/* <span className="text-text1">{title}</span> */}
        <div className="mt-1 mb-2 text-lg font-semibold text-text1">
          <Link
            href={`/post/${slug}`}
            className="inline-block w-full hover:underline"
            aria-label={title}>
            {title}
          </Link>
        </div>
      </div>
      <p className="flex items-center gap-1 mt-auto text-sm text-text3">
        {' '}
        <IconCalendar className="w-4 h-4 lg:w-5 lg:h-5 fill-neutral-300" />
        <Date dateString={created_at} />
      </p>
      {short && (
        <div
          className="mt-2 text-left line-clamp-2 text-text3"
          dangerouslySetInnerHTML={{ __html: short }}
        />
      )}
    </div>
  );
}
