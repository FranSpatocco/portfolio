"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import CornerTicks from "./CornerTicks";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const boxes = [
  { x: 10, key: "design", active: false },
  { x: 154, key: "code", active: true },
  { x: 298, key: "deploy", active: false },
] as const;

// Gesto principal del sitio: el diagrama se dibuja una vez al cargar.
// Sin JS o con movimiento reducido se muestra completo y estático.
export default function BlueprintDiagram() {
  const t = useTranslations("hero.figure");
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power2.inOut" }, delay: 0.3 })
          .from("[data-draw=box]", { drawSVG: 0, duration: 0.7, stagger: 0.15 })
          .from("[data-draw=text]", { opacity: 0, duration: 0.4, stagger: 0.05 }, "-=0.4")
          .from("[data-draw=arrow]", { drawSVG: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
          .from("[data-draw=link]", { opacity: 0, duration: 0.3 })
          .from("[data-draw=gear]", {
            rotation: -90,
            opacity: 0,
            svgOrigin: "210 204",
            duration: 0.9,
            ease: "power3.out",
          })
          .from("[data-draw=ring]", { drawSVG: 0, duration: 0.6, stagger: 0.1 }, "<0.1")
          .from("[data-draw=dim]", { drawSVG: "50% 50%", duration: 0.6 }, "-=0.3")
          .from("[data-draw=dimText]", { opacity: 0, duration: 0.4 }, "-=0.2");
      });
    },
    { scope: ref },
  );

  return (
    <figure className="relative m-0 border border-border bg-bg p-5 md:p-7">
      <CornerTicks />
      <figcaption className="label flex justify-between text-[0.6875rem]">
        <span>{t("caption")}</span>
        <span className="hidden sm:inline">{t("rev")}</span>
      </figcaption>
      <svg
        ref={ref}
        viewBox="0 0 420 300"
        className="mt-4 block w-full md:mt-5"
        role="img"
        aria-label={t("alt")}
      >
        <g className="font-mono" fontSize="12" textAnchor="middle">
          {boxes.map((b) => (
            <g key={b.key}>
              <rect
                data-draw="box"
                x={b.x}
                y="30"
                width="112"
                height="56"
                className={`fill-surface ${b.active ? "stroke-accent" : "stroke-border"}`}
              />
              <text data-draw="text" x={b.x + 56} y="56" className="fill-fg">
                {t(b.key)}
              </text>
              <text
                data-draw="text"
                x={b.x + 56}
                y="73"
                fontSize="9"
                className="fill-subtle"
              >
                {t(`${b.key}Sub`)}
              </text>
            </g>
          ))}
        </g>
        <g className="stroke-accent" strokeWidth="1.5" fill="none">
          <path data-draw="arrow" d="M122 58 H148 M143 53 L149 58 L143 63" />
          <path data-draw="arrow" d="M266 58 H292 M287 53 L293 58 L287 63" />
          <path data-draw="link" d="M210 86 V146" strokeDasharray="4 4" />
          <circle
            data-draw="gear"
            cx="210"
            cy="204"
            r="50"
            strokeWidth="10"
            strokeDasharray="9.8 9.8"
          />
          <circle data-draw="ring" cx="210" cy="204" r="40" />
          <circle data-draw="ring" cx="210" cy="204" r="14" />
          <path data-draw="ring" d="M210 190 V218 M196 204 H224" strokeWidth="1" />
        </g>
        <path
          data-draw="dim"
          d="M10 286 H410 M10 280 V292 M410 280 V292"
          className="stroke-border"
          fill="none"
        />
        <text
          data-draw="dimText"
          x="210"
          y="278"
          fontSize="10"
          textAnchor="middle"
          className="fill-subtle font-mono"
        >
          {t("target")}
        </text>
      </svg>
    </figure>
  );
}
