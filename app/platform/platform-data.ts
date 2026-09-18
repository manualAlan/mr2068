export type FocusArea = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  image: string;
  alt?: string;
  imagePosition?: string;
  statement: string;
};

export const focusAreas: FocusArea[] = [
  {
    number: "01",
    slug: "mission-statement",
    title: "What we believe.",
    shortTitle: "Mission",
    image: "/images/policy-mission.jpg",
    imagePosition: "center 61%",
    statement: "An open letter to all Capricans.",
  },
  {
    number: "07",
    slug: "economy",
    title: "Economics & Enterprise",
    shortTitle: "Economy",
    image: "/images/economy.jpg",
    alt: "A small business owner welcoming a customer",
    imagePosition: "6% center",
    statement: "Back the next good idea.",
  },
  {
    number: "02",
    slug: "housing",
    title: "Housing",
    shortTitle: "Housing",
    image: "/images/policy-housing.jpg",
    alt: "Modern apartments with balconies and trees",
    imagePosition: "center 48%",
    statement: "Make room for homes, ownership and the independence of a new generation.",
  },
  {
    number: "03",
    slug: "healthcare",
    title: "Healthcare",
    shortTitle: "Healthcare",
    image: "/images/policy-healthcare.jpg",
    alt: "A clinical team working together in an operating room",
    imagePosition: "center 46%",
    statement: "Universal access, visible results and more freedom to deliver excellent care.",
  },
  {
    number: "04",
    slug: "civil-liberties",
    title: "Civil Liberties",
    shortTitle: "Civil liberties",
    image: "/images/policy-civil-liberties.jpg",
    alt: "Lady Justice holding the scales of justice",
    imagePosition: "center 38%",
    statement: "A capable state under law, with privacy, expression and equal citizenship protected.",
  },
  {
    number: "05",
    slug: "foreign-policy",
    title: "Foreign Policy",
    shortTitle: "Foreign policy",
    image: "/images/belief-world.jpg",
    alt: "A container ship and cranes connecting a port to international trade",
    imagePosition: "center 50%",
    statement: "Liberal in purpose, realist in method and dependable in the Columbian Union.",
  },
  {
    number: "06",
    slug: "defense",
    title: "Defense",
    shortTitle: "Defense",
    image: "/images/policy-defense.jpg",
    alt: "A fleet at sea in formation",
    imagePosition: "center 57%",
    statement: "Sea control, air reach and a smaller elite army built for an island nation.",
  },
];

export function getFocusArea(slug: string) {
  return focusAreas.find((area) => area.slug === slug);
}
