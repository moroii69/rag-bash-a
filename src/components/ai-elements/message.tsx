import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, HTMLAttributes } from "react";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      // base layout: horizontal flex with vertical alignment
      "group flex w-full items-end gap-2 py-4",
      // user messages should be right aligned, assistant left aligned
      from === "user" ? "is-user flex-row-reverse justify-end" : "is-assistant justify-start",
      className,
    )}
    {...props}
  />
);

const messageContentVariants = cva("is-user:dark flex flex-col gap-2 text-sm", {
  variants: {
    variant: {
      // contained kept for compatibility, but we prefer flat (no heavy bubble)
      contained: [
        "max-w-[80%] px-4 py-3 rounded-lg",
        "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
        "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground",
      ],
      flat: [
        // flatter look: subtle padding, no solid background, rely on text color
        "group-[.is-user]:max-w-[80%] group-[.is-user]:px-3 group-[.is-user]:py-2",
        "group-[.is-assistant]:px-3 group-[.is-assistant]:py-2",
        "rounded-md",
        // subtle accent: right border for user, left border for assistant
        "group-[.is-user]:border-r group-[.is-user]:border-zinc-700/40",
        "group-[.is-assistant]:border-l group-[.is-assistant]:border-zinc-700/40",
        "border-transparent",
      ],
    },
  },
  defaultVariants: {
    variant: "flat",
  },
});

export type MessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageContentVariants>;

export const MessageContent = ({ children, className, variant, ...props }: MessageContentProps) => (
  <div className={cn(messageContentVariants({ variant, className }))} {...props}>
    {children}
  </div>
);

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const MessageAvatar = ({ src, name, className, ...props }: MessageAvatarProps) => (
  <Avatar className={cn("size-8 ring-1 ring-border", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);
