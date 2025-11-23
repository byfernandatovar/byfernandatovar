import Button from "../../ui/button";

export function HomeCta2() {
  return (
    <div className="bg-[#F0EBE1] h-screen bg-[url('/ctas/cta-bg.webp')] bg-cover bg-bottom w-full flex flex-col items-center justify-center px-4 py-24 text-center relative">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-normal font-heading uppercase leading-tight mb-6">
         LA ALEGRÍA <br/>DE SER VISTO
        </h1>
        <p className="text-white text-lg md:text-xl lg:text-2xl font-normal max-w-2xl">
          — La pasión de reflejar y documentar el sueño más grande.
        </p>
        <Button variant="primary" className="my-10">Agendar sesión</Button>
      </div>
    </div>
  );
}