import React from "react";
import { IconSolidCircle } from "../icons";

type Props = {
  mode: "left" | "right";
  items: Item[];
  className?: string;
  title?: React.ReactNode;
};

type Item = {
  dot?: React.ReactNode;
  label?: React.ReactNode;
  children?: React.ReactNode;
};

const Timeline = (props: Props) => {
  const { mode, items, className, title } = props;

  return (
    <div>
      {title ? title : null}
      <ul className={className ? className : ""}>
        {items.map((item: Item, index: number) => (
          <li
            key={index}
            className={`relative mb-0 flex items-baseline gap-6 pb-5 ${
              mode === "right" && "flex-row-reverse"
            }`}
          >
            <div
              className={
                index !== items.length - 1
                  ? `after:absolute after:h-full after:w-px after:bg-gray-400 ${
                      mode === "left"
                        ? "after:left-[5.5px]"
                        : "after:right-[5.5px]"
                    }`
                  : ""
              }
            >
              {item.dot ? item.dot : <IconSolidCircle className="h-3 w-3" />}
            </div>
            <div className="text-base text-text1">
              {item.label && <div className="font-semibold">{item.label}</div>}
              {item.children && <div className="mt-2">{item.children}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
