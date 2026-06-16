"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.css";
import React, { type ComponentPropsWithoutRef } from "react";

type Props = {
  content: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(headingText).join("");
  return "";
}

function makeHeading(Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  return function Heading({
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof Tag>) {
    const id = slugify(headingText(children));
    return (
      <Tag id={id} {...props}>
        {children}
      </Tag>
    );
  };
}

type DetailsVariant = "default" | "hint" | "losningsforslag";

const variantStyles: Record<
  DetailsVariant,
  { details: string; summary: string; icon: string }
> = {
  default: {
    details: "border-neutral-200 bg-neutral-50 open:bg-white",
    summary: "text-neutral-800",
    icon: "▶",
  },
  hint: {
    details: "border-amber-200 bg-amber-50 open:bg-amber-50/40",
    summary: "text-amber-800",
    icon: "💡",
  },
  losningsforslag: {
    details: "border-green-200 bg-green-50 open:bg-green-50/40",
    summary: "text-green-800",
    icon: "✅",
  },
};

function getVariant(className?: string): DetailsVariant {
  if (className?.includes("losningsforslag")) return "losningsforslag";
  if (className?.includes("hint")) return "hint";
  return "default";
}

function Summary({ children, ...props }: ComponentPropsWithoutRef<"summary">) {
  return (
    <summary
      className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-4 py-3 font-semibold select-none marker:hidden hover:brightness-95 active:brightness-90"
      {...props}
    >
      {children}
    </summary>
  );
}

function Details({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"details">) {
  const variant = getVariant(className);
  const styles = variantStyles[variant];
  const isDefault = variant === "default";

  const kids = Array.isArray(children) ? children : [children];
  const summaryEl = kids.find(
    (c) => (c as React.ReactElement)?.type === Summary
  );
  const rest = kids.filter((c) => (c as React.ReactElement)?.type !== Summary);

  const summaryWithIcon = summaryEl
    ? React.cloneElement(
        summaryEl as React.ReactElement<ComponentPropsWithoutRef<"summary">>,
        {
          children: (
            <>
              {isDefault ? (
                <span className="text-neutral-400 transition-transform duration-200 group-open:rotate-90">
                  ▶
                </span>
              ) : (
                <span className="inline-block transition-transform duration-200 group-open:rotate-90">
                  {styles.icon}
                </span>
              )}
              <span className={styles.summary}>
                {
                  (
                    summaryEl as React.ReactElement<{
                      children: React.ReactNode;
                    }>
                  ).props.children
                }
              </span>
            </>
          ),
        }
      )
    : null;

  return (
    <details
      className={`group my-4 rounded-lg border ${styles.details}`}
      {...props}
    >
      {summaryWithIcon}
      <div className="px-4 pb-4">{rest}</div>
    </details>
  );
}

const components = {
  h1: makeHeading("h1"),
  h2: makeHeading("h2"),
  h3: makeHeading("h3"),
  h4: makeHeading("h4"),
  h5: makeHeading("h5"),
  h6: makeHeading("h6"),
  details: Details,
  summary: Summary,
};

export function ReadmeRenderer({ content }: Props) {
  return (
    <article className="prose prose-neutral max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
