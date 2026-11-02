import type { StaticImageData } from "next/image";

import { industries, type Industry } from "@/config/industries";
import educationPhoto from "@/assets/photos/industries/education.jpg";
import foodPhoto from "@/assets/photos/industries/food-fmcg.jpg";
import garmentsPhoto from "@/assets/photos/industries/garments-fashion.jpg";
import professionalServicesPhoto from "@/assets/photos/industries/professional-services.jpg";
import factoryPhoto from "@/assets/photos/manufacturing/factory-floor.jpg";
import marketPhoto from "@/assets/photos/retail-electronics/market.jpg";

/** What the directory shows for an industry listed in `config/industries.ts`. */
type IndustryCardContent = {
  description: string;
  photo: StaticImageData;
  photoAlt: string;
};

export type DirectoryIndustry = Industry & IndustryCardContent;

const cardContent: Record<string, IndustryCardContent> = {
  "retail-electronics": {
    description:
      "Purchasing, inventory, sales and financial records for electronics and appliance businesses.",
    photo: marketPhoto,
    photoAlt: "Shoppers and sellers in a busy indoor electronics market",
  },
  manufacturing: {
    description:
      "Purchasing, inventory, sales, billing and financial visibility for manufacturing businesses.",
    photo: factoryPhoto,
    photoAlt: "Industrial workers operating machinery on a factory floor",
  },
  "food-fmcg": {
    description: "Stock, sales and billing for businesses that deal in food and everyday goods.",
    photo: foodPhoto,
    photoAlt: "A supermarket aisle stocked with packaged food",
  },
  "garments-fashion": {
    description: "Stock, sales and accounts for businesses that sell or supply garments.",
    photo: garmentsPhoto,
    photoAlt: "Clothes hanging on racks inside a bright fashion store",
  },
  education: {
    description:
      "Everyday administration, accounts and people records for educational organisations.",
    photo: educationPhoto,
    photoAlt: "A teacher helping a student at a laptop in a classroom",
  },
  "professional-services": {
    description: "Clients, billing, finance and team records for service-based firms.",
    photo: professionalServicesPhoto,
    photoAlt: "A team of professionals gathered around a laptop in an office",
  },
};

export const directoryIndustries: readonly DirectoryIndustry[] = industries.map((industry) => {
  const content = cardContent[industry.slug];
  if (!content) {
    throw new Error(`The directory has no card content for industry: ${industry.slug}`);
  }
  return { ...industry, ...content };
});
