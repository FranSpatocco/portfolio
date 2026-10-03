"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  // "scroll": aparece al entrar en pantalla. "load": anima al montar
  // (sin opacidad, para no retrasar el LCP del hero).
  trigger?: "scroll" | "load";
  // Anima los hijos directos en cascada en lugar del bloque entero
  stagger?: boolean;
};

export default function Reveal({
  children,
  className,
  trigger = "scroll",
  stagger = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Sólo anima si el usuario no pidió reducir el movimiento
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? ref.current!.children : ref.current;
        gsap.from(targets, {
          y: 24,
          opacity: trigger === "load" ? 1 : 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: stagger ? 0.1 : 0,
          // Sin estilos inline al terminar: si no, el transform que deja
          // GSAP pisa el hover de las tarjetas (.card-link)
          clearProps: "transform,opacity",
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: ref.current, start: "top 85%", once: true }
              : undefined,
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
