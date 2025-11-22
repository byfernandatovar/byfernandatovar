import Button from "../../ui/button";

export function HomeCta() {
  return (
    <section className="w-full h-full bg-[#F0EBE1] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-[#000000] mb-6 leading-tight">
          ¿Listo para crear tu historia?
        </h2>
        <p className="text-lg md:text-xl text-[#7D7873] mb-12 font-light">
          Permítenos capturar los momentos más hermosos de tu vida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            onClick={() => console.log("Consulta enviada")}
          >
            Agenda tu sesión
          </Button>
          <Button variant="secondary">Conocer más</Button>
        </div>
      </div>
    </section>
  );
}

