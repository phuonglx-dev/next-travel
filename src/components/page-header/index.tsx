import Image from "next/image";

export interface HeaderParams {
  title: string;
  sub_title?: string;
  slug?: string;
  img?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  sub_title,
  slug,
  img,
  children,
}: HeaderParams) {
  return (
    <div className="relative h-[200px] w-full bg-gray-200 md:h-[330px]">
      {img && (
        <Image
          src={img}
          alt={title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100} // Use the highest quality setting
          priority // Prioritize this critical header image
          unoptimized // Disable Next.js optimization/resizing
        />
      )}

      {/* Overlay with inline opacity */}
      <div className="absolute inset-0 bg-black" style={{ opacity: 0.2 }} />

      <div className="absolute top-1/2 left-1/2 z-30 container flex w-full -translate-x-1/2 -translate-y-1/2 flex-col text-start text-white">
        <div className="w-full md:w-2/5">
          <h1 className="mb-1 text-2xl font-semibold drop-shadow-md md:mb-4 md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <div className="block md:hidden">
            <div className="text-text1 relative w-full py-5">{children}</div>
          </div>
          <p className="hidden text-lg drop-shadow-xs md:block">{sub_title}</p>
        </div>
      </div>
    </div>
  );
}
