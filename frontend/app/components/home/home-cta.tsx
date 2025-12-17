import Button from "../../ui/button";

export function HomeCta() {
  return (
    <section className="bg-[#F0EBE1] w-full h-screen bg-[url('/home-imgs/ctas/cta-2-bg.webp')] bg-cover bg-top flex items-center justify-center px-4 py-24 relative">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-2xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
          Start your journey here.
        </h2>
        <p className="text-lg md:text-xl text-white mb-12 font-normal">
          Let me capture the most beautiful moments of your life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/contact">
            <Button variant="primary">
              Let's talk
            </Button>
          </a>
          <a href="/about">
            <Button variant="secondary">Know Me</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

