import Button from "../../ui/button";

export function HomeCta() {
  return (
    <section className="bg-[#F0EBE1] w-full h-screen bg-[url('/ctas/cta-2-bg.webp')] bg-cover bg-bottom flex items-center justify-center px-4 py-24 relative">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-2xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
          ¿Listo para crear tu historia?
        </h2>
        <p className="text-lg md:text-xl text-white mb-12 font-normal">
          Permíteme capturar los momentos más hermosos de tu vida.
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

