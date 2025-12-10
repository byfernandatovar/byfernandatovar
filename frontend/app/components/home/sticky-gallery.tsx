// StickyGallery.tsx
import React, { forwardRef } from "react";

export type StickyGalleryProps = React.HTMLAttributes<HTMLElement>;

const StickyGallery = forwardRef<HTMLElement, StickyGalleryProps>(
  ({ className = "", ...rest }, ref) => {
    return (
      <main
        ref={ref}
        className={`bg-[#F0EBE1] ${className}`}
        {...rest}
      >
        <h2 className="text-center text-4xl font-semibold text-gray-800 mb-8">A closer look at my work</h2>
        <section className="text-white md:w-[80%] w-full mx-auto py-24 bg-[#F0EBE1]">
          <div className="grid grid-cols-12 gap-2">
            <div className="grid gap-2 col-span-4">
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero1.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero2.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero3.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero4.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero5.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
            </div>

            <div className="sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3">
              <a href="/portfolio" className="w-full h-full cursor-pointer">
                <figure className="w-full h-full">
                  <img
                    src="/home-imgs/hero/hero6.webp"
                    alt=""
                    className="transition-all duration-300 h-full w-full align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full h-full cursor-pointer">
                <figure className="w-full h-full">
                  <img
                    src="/home-imgs/hero/hero7.webp"
                    alt=""
                    className="transition-all duration-300 h-full w-full align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full h-full cursor-pointer">
                <figure className="w-full h-full">
                  <img
                    src="/home-imgs/hero/hero8.webp"
                    alt=""
                    className="transition-all duration-300 h-full w-full align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
            </div>

            <div className="grid gap-2 col-span-4">
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero9.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero10.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero11.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero12.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
              <a href="/portfolio" className="w-full cursor-pointer">
                <figure className="w-full">
                  <img
                    src="/home-imgs/hero/hero13.webp"
                    alt=""
                    className="transition-all duration-300 w-full h-96 align-bottom object-cover hover:opacity-90"
                  />
                </figure>
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }
);

StickyGallery.displayName = "StickyGallery";

export default StickyGallery;
