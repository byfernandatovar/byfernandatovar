import Button from "../../ui/button";

export function HomeCta2() {
  return (
    <div className="bg-[#F0EBE1] h-screen bg-[url('/home-imgs/ctas/cta-bg.webp')] bg-cover bg-bottom w-full flex flex-col items-center justify-center px-4 py-24 text-center relative">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-normal font-heading uppercase leading-tight mb-6">
        Celebrating <br/> the beauty of <br/>nostalgia
        </h1>
        <p className="text-white text-lg md:text-xl lg:text-2xl font-normal max-w-2xl mb-12">
          — preserving moments with a <span className="italic">timeless editorial gaze</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/contact">
            <Button variant="primary">Inquire Now</Button>
          </a>
          <a href="/portfolio">
            <Button variant="secondary">Portfolio</Button>
          </a>
        </div>
      </div>
    </div>
  );
}