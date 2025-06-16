'use client';
import {
  IconBookBookmark,
  IconLock,
  IconUser
} from '@/components/icons';
import { Link } from '@/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export interface ISideBarAccountProps { }
export const dataSidebar = [
  {
    id: 1,
    title: 'My Bookings',
    href: 'account/bookings',
    icon: (
      <IconBookBookmark className="w-5 h-5 text-white rounded-full fill-inherit" />
    ),
  },
  {
    id: 3,
    title: 'Personal Information',
    href: 'account/profile',
    icon: <IconUser className="w-5 h-5 text-white rounded-full fill-inherit" />,
  },
  {
    id: 4,
    title: 'Change Password',
    href: 'account/change-password',
    icon: <IconLock className="w-5 h-5 text-white rounded-full fill-inherit" />,
  },
];

export default function SideBarAccount(props: ISideBarAccountProps) {
  const pathname = usePathname();

  return (
    <div
      className={`${pathname.slice(1) !== 'account' ? 'hidden' : ''
        } lg:block w-full lg:w-1/4`}
    >
      <div className="sticky top-20 left-0 py-5 border border-slate-300 rounded-lg">
        <Image
          src="https://res.cloudinary.com/drnf8u8vq/image/upload/c_pad,w_400/v1737656277/nextravel/travelers/pexels-vladbagacian-2819587_lprpt9.jpg"
          alt="user"
          width={100}
          height={100}
          className="w-16 h-16 mx-auto my-5 text-white rounded-full fill-inherit"
        />
        <div className="flex flex-col gap-1">
          {dataSidebar.map((item, index) => (
            <div key={item.id}>
              <div className="cursor-pointer">
                <Link
                  href={`/${item.href}`}
                  className={`flex items-center w-full gap-5 py-3 pl-8 pr-2 hover:text-primary ${pathname?.includes(item.href) ? 'font-semibold' : ''
                    }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </div>
              {index + 1 !== dataSidebar.length && (
                <div className="my-2 mx-8 border-b border-slate-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
