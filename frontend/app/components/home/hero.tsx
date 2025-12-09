// hero.tsx
import React, {
    useEffect,
    useRef,
    createContext,
    useCallback,
    useContext,
  } from "react";
  import type { RefObject, ReactNode } from "react";
  import {
    motion,
    stagger,
    useAnimate,
    useAnimationFrame,
  } from "framer-motion";
  
  // Utilidad simple para concatenar clases (reemplazo de cn)
  const cn = (...classes: Array<string | undefined | null | false>) =>
    classes.filter(Boolean).join(" ");
  

  // ======================
  // Hook: useMousePositionRef
  // ======================
  const useMousePositionRef = (
    containerRef?: RefObject<HTMLElement | SVGElement>
  ) => {
    const positionRef = useRef({ x: 0, y: 0 });
  
    useEffect(() => {
      const updatePosition = (x: number, y: number) => {
        if (containerRef && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const relativeX = x - rect.left;
          const relativeY = y - rect.top;
  
          positionRef.current = { x: relativeX, y: relativeY };
        } else {
          positionRef.current = { x, y };
        }
      };
  
      const handleMouseMove = (ev: MouseEvent) => {
        updatePosition(ev.clientX, ev.clientY);
      };
  
      const handleTouchMove = (ev: TouchEvent) => {
        const touch = ev.touches[0];
        if (!touch) return;
        updatePosition(touch.clientX, touch.clientY);
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }, [containerRef]);
  
    return positionRef;
  };


  // ======================
  // Hook: usePositionRef (mouse/touch for all devices)
  // ======================
  const usePositionRef = (containerRef?: RefObject<HTMLElement | SVGElement>) => {
    return useMousePositionRef(containerRef);
  };
  
  // ======================
  // Contexto y componentes Floating
  // ======================
  interface FloatingContextType {
    registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
    unregisterElement: (id: string) => void;
  }
  
  const FloatingContext = createContext<FloatingContextType | null>(null);
  
  interface FloatingProps {
    children: ReactNode;
    className?: string;
    sensitivity?: number;
    easingFactor?: number;
  }
  
  const Floating: React.FC<FloatingProps> = ({
    children,
    className,
    sensitivity = 1,
    easingFactor = 0.05,
    ...props
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementsMap = useRef<
      Map<
        string,
        {
          element: HTMLDivElement;
          depth: number;
          currentPosition: { x: number; y: number };
        }
      >
    >(new Map());
    const mousePositionRef = usePositionRef(containerRef as RefObject<HTMLDivElement>);
  
    const registerElement = useCallback(
      (id: string, element: HTMLDivElement, depth: number) => {
        elementsMap.current.set(id, {
          element,
          depth,
          currentPosition: { x: 0, y: 0 },
        });
      },
      []
    );
  
    const unregisterElement = useCallback((id: string) => {
      elementsMap.current.delete(id);
    }, []);
  
    useAnimationFrame(() => {
      if (!containerRef.current) return;
  
      elementsMap.current.forEach((data) => {
        const strength = (data.depth * sensitivity) / 20;
  
        const newTargetX = mousePositionRef.current.x * strength;
        const newTargetY = mousePositionRef.current.y * strength;
  
        const dx = newTargetX - data.currentPosition.x;
        const dy = newTargetY - data.currentPosition.y;
  
        data.currentPosition.x += dx * easingFactor;
        data.currentPosition.y += dy * easingFactor;
  
        data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
      });
    });
  
    return (
      <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={containerRef}
          className={cn("absolute top-0 left-0 w-full h-full", className)}
          {...props}
        >
          {children}
        </div>
      </FloatingContext.Provider>
    );
  };
  
  interface FloatingElementProps {
    children: ReactNode;
    className?: string;
    depth?: number;
  }
  
  const FloatingElement: React.FC<FloatingElementProps> = ({
    children,
    className,
    depth = 1,
  }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const idRef = useRef<string>(Math.random().toString(36).substring(7));
    const context = useContext(FloatingContext);
  
    useEffect(() => {
      if (!elementRef.current || !context) return;
  
      const nonNullDepth = depth ?? 0.01;
      context.registerElement(idRef.current, elementRef.current, nonNullDepth);
  
      return () => {
        context.unregisterElement(idRef.current);
      };
    }, [depth, context]);
  
    return (
      <div
        ref={elementRef}
        className={cn("absolute will-change-transform", className)}
      >
        {children}
      </div>
    );
  };
  
  // ======================
  // Datos de ejemplo para las imágenes
  // ======================
  const exampleImages = [
    {
      url: "/home-imgs/hero/hero1.webp",
      author: "Branislav Rodman",
      link: "/portfolio",
      title: "A Black and White Photo of a Woman Brushing Her Teeth",
    },
    {
      url: "/home-imgs/hero/hero3.webp",
      link: "/portfolio",
      title: "Neon Palm",
      author: "Tim Mossholder",
    },
    {
      url: "/home-imgs/hero/hero2.webp",
      link: "/portfolio",
      author: "ANDRII SOLOK",
      title: "A blurry photo of a crowd of people",
    },
    {
      url: "/home-imgs/hero/hero4.webp",
      link: "/portfolio",
      author: "Wesley Tingey",
      title: "Rippling Crystal Blue Water",
    },
    {
      url: "/home-imgs/hero/hero5.webp",
      link: "/portfolio",
      author: "Serhii Tyaglovsky",
      title: "Mann im schwarzen Hemd unter blauem Himmel",
    },
    {
      url: "/home-imgs/hero/hero6.webp",
      link: "/portfolio",
      author: "Vladimir Yelizarov",
      title: "A women with a flower crown on her head",
    },
    {
      url: "/home-imgs/hero/hero7.webp",
      title: "A blurry photo of white flowers in a field",
      author: "Eugene Golovesov",
      link: "/portfolio",
    },
    {
      url: "/home-imgs/hero/hero8.webp",
      author: "Mathilde Langevin",
      link: "/portfolio",
      title: "A table topped with two wine glasses and plates",
    },
  ];
  
  // ======================
  // Hero component (antes Preview)
  // ======================
  export const Hero: React.FC = () => {
    const [scope, animate] = useAnimate();
  
    useEffect(() => {
      animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) });
    }, [animate]);
  
    return (
      <div
        className="flex w-full h-full min-h-[600px] justify-center items-center bg-[#F0EBE1] overflow-hidden relative"
        ref={scope}
      >
        <motion.div
          className="z-50 text-center space-y-4 items-center flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 1.5 }}
        >
          <img
            src="/textlogo.png"
            alt="By Fernanda Tovar"
            className="z-50 w-auto h-24 md:h-24 px-10 object-contain"
          />
        </motion.div>
  
        <Floating sensitivity={-1} className="overflow-hidden">
          <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
            <a href={exampleImages[0].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[0].url}
                alt={exampleImages[0].title}
                className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
  
          <FloatingElement depth={1} className="top-[10%] left-[32%]">
            <a href={exampleImages[1].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[1].url}
                alt={exampleImages[1].title}
                className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
  
          <FloatingElement depth={2} className="top-[2%] left-[53%]">
            <a href={exampleImages[2].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[2].url}
                alt={exampleImages[2].title}
                className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
  
          <FloatingElement depth={1} className="top-[0%] left-[83%]">
            <a href={exampleImages[3].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[3].url}
                alt={exampleImages[3].title}
                className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
  
          <FloatingElement depth={1} className="top-[40%] left-[2%]">
            <a href={exampleImages[4].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[4].url}
                alt={exampleImages[4].title}
                className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
  
          <FloatingElement depth={2} className="top-[70%] left-[77%]">
            <a href={exampleImages[7].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[7].url}
                alt={exampleImages[7].title}
                className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
  
          <FloatingElement depth={4} className="top-[73%] left-[15%]">
            <a href={exampleImages[5].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[5].url}
                alt={exampleImages[5].title}
                className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
  
          <FloatingElement depth={1} className="top-[80%] left-[50%]">
            <a href={exampleImages[6].link}>
              <motion.img
                initial={{ opacity: 0 }}
                src={exampleImages[6].url}
                alt={exampleImages[6].title}
                className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </a>
          </FloatingElement>
        </Floating>
      </div>
    );
  };
  
  export default Hero;
  