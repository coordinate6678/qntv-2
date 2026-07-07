"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "span";
  delay?: 1 | 2 | 3;
};

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | HTMLElement | HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag;

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal${className ? ` ${className}` : ""}`}
      {...(delay !== undefined ? { "data-delay": String(delay) } : {})}
      {...rest}
    >
      {children}
    </Component>
  );
}
