"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
};

export function StatCounter({ value, suffix = "", label, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block text-display-md font-extrabold text-white"
      >
        {display.toLocaleString("fr-FR")}
        <span className="text-sky">{suffix}</span>
      </span>
      <span className="mt-2 block text-sm text-white/65">{label}</span>
    </div>
  );
}
