// Esquinas en L de acento, como las marcas de corte de un plano.
// El contenedor padre tiene que ser `relative`.
const corners = [
  "top-[-1px] left-[-1px] border-t-2 border-l-2",
  "top-[-1px] right-[-1px] border-t-2 border-r-2",
  "bottom-[-1px] left-[-1px] border-b-2 border-l-2",
  "bottom-[-1px] right-[-1px] border-b-2 border-r-2",
];

export default function CornerTicks() {
  return (
    <>
      {corners.map((c) => (
        <span
          key={c}
          aria-hidden="true"
          className={`pointer-events-none absolute size-3 border-accent md:size-3.5 ${c}`}
        />
      ))}
    </>
  );
}
