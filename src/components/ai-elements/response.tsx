"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, memo } from "react";
import { Streamdown, StreamdownProps } from "streamdown";

const InlineCode = (props: ComponentProps<"code">) => (
  <code className="text-black" {...props} />
);

const CustomLink = (props: ComponentProps<"a">) => (
  <a
    className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
    {...props}
  />
);

const customComponents: StreamdownProps["components"] = {
  code: InlineCode,
  a: CustomLink,
};

export const Response = memo(
  ({ className, components, ...props }: StreamdownProps) => (
    <Streamdown
      className={cn(
        "size-full text-gray-300 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className,
      )}
      components={{ ...components, ...customComponents }}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

Response.displayName = "Response";
