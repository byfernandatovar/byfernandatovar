import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("portfolio/weddings", "routes/portfolio.weddings.tsx"),
  route("portfolio/portraits", "routes/portfolio.portraits.tsx"),
  route("portfolio/moments", "routes/portfolio.moments.tsx"),
  route("portfolio/couples", "routes/portfolio.couples.tsx"),
  route("api/contact", "routes/api.contact.ts"),
] satisfies RouteConfig;
