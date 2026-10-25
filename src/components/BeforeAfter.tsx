"use client";

import { useState } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfter({
  before,
  after,
  beforeAlt = "During the build",
  afterAlt = "Finished garage",
  beforeLabel = "During",
  afterLabel = "After",
}: Props) {
  const [pos, setPos] = useState(52);

  return (
    <div className="relative overflow-hidden bg-[#101114]">
      <div className="relative aspect-[16/10] w-full select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-[#f3eee6]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#c4a574] bg-[#070708] text-[0.65rem] tracking-[0.14em] text-[#c4a574]">
            ↔
          </span>
        </div>
        <span className="absolute top-4 left-4 bg-[#070708]/75 px-3 py-1 display text-[0.62rem] tracking-[0.22em] text-[#f3eee6]">
          {beforeLabel}
        </span>
        <span className="absolute top-4 right-4 bg-[#070708]/75 px-3 py-1 display text-[0.62rem] tracking-[0.22em] text-[#c4a574]">
          {afterLabel}
        </span>
        <input
          type="range"
          min={2}
          max={98}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          className="absolute inset-0 z-10 cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
