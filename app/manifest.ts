import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALPEX Autoservis Malacky",
    short_name: "ALPEX",
    description:
      "Profesionálny autoservis ALPEX Group v Malackách. Pneuservis, diagnostika, mechanické práce a príprava na STK.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#15171a",
    lang: "sk",
  };
}
