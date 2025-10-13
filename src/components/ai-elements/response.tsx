"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, memo } from "react";
// Import Streamdown and necessary types from its definition
import { Streamdown, StreamdownProps } from "streamdown";

const InlineCode = (props: ComponentProps<'code'>) => (
  <code className="text-black" {...props} /> 
);

const customComponents: StreamdownProps['components'] = {
  code: InlineCode, 
};

export const Response = memo(
  ({ className, components, ...props }: StreamdownProps) => (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      components={{ ...components, ...customComponents }}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";