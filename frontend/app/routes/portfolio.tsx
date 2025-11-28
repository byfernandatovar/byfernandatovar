import type { Route } from "./+types/portfolio";
import { PortfolioGrid } from "../components/portfolio/portfolio-grid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio - By Fernanda Tovar" },
    { name: "description", content: "Explora mi trabajo fotográfico" },
  ];
}

export default function Portfolio() {
  return (
    <div className="w-full min-h-screen bg-[#F0EBE1]">
      <PortfolioGrid />
    </div>
  );
}

