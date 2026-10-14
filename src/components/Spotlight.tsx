"use client";

import { useEffect } from "react";

// Sólo con mouse (en touch no hay cursor que seguir) y sin movimiento reducido
const query = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Gesto principal del diseño: un brillo del acento sigue al cursor y
// enciende el borde de las tarjetas cercanas. El efecto es CSS (.card en
// globals.css); acá sólo se pasa la posición del mouse a cada tarjeta.
export default function Spotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const mq = matchMedia(query);
    let frame = 0;
    let x = 0;
    let y = 0;

    // Un cálculo por frame aunque el mouse dispare más eventos
    const paint = () => {
      frame = 0;
      for (const card of document.querySelectorAll<HTMLElement>(".card")) {
        const r = card.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        card.style.setProperty("--spot-x", `${x - r.left}px`);
        card.style.setProperty("--spot-y", `${y - r.top}px`);
      }
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      root.classList.add("spot-on");
      if (!frame) frame = requestAnimationFrame(paint);
    };
    // El scroll mueve las tarjetas bajo un cursor quieto
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => root.classList.remove("spot-on");

    const sync = () => {
      if (mq.matches) {
        root.classList.add("spotlight");
        addEventListener("pointermove", move, { passive: true });
        addEventListener("scroll", scroll, { passive: true });
        document.addEventListener("pointerleave", leave);
      } else {
        root.classList.remove("spotlight", "spot-on");
        removeEventListener("pointermove", move);
        removeEventListener("scroll", scroll);
        document.removeEventListener("pointerleave", leave);
      }
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      removeEventListener("pointermove", move);
      removeEventListener("scroll", scroll);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
      root.classList.remove("spotlight", "spot-on");
    };
  }, []);

  return null;
}
