import Button from "../../ui/button";

export function HomeCta2() {
  return (
    <div className="h-[50vh] bg-[#F0EBE1] w-full flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-black text-5xl md:text-7xl lg:text-8xl font-normal font-heading uppercase leading-tight mb-6">
       LA ALEGRÍA <br/>DE SER VISTO
      </h1>
      <p className="text-black text-lg md:text-xl lg:text-2xl font-normal max-w-2xl">
        — La pasión de reflejar y documentar el sueño más grande.
      </p>
      <Button variant="primary" className="my-10">Agendar sesión</Button>
    </div>
  );
}