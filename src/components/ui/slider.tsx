// slider.tsx
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none items-center select-none",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="bg-primary absolute h-full cursor-pointer" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="border-primary bg-background block h-5 w-5 cursor-pointer rounded-full border-2 outline-hidden transition-colors disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="border-primary bg-background block h-5 w-5 cursor-pointer rounded-full border-2 outline-hidden transition-colors disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
