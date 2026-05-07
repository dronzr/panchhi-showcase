import bridal from "@/assets/p-bridal.jpg";
import party from "@/assets/p-party.jpg";
import pink from "@/assets/p-pink.jpg";
import indowest from "@/assets/p-indowest.jpg";
import saree from "@/assets/p-saree.jpg";
import office from "@/assets/p-office.jpg";
import casual from "@/assets/p-casual.jpg";
import wine from "@/assets/p-wine.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  rentPrice?: number;
  category: string;
  color: string;
  colorHex: string;
  sizes: string[];
  image: string;
  rentable: boolean;
  description: string;
  fabric: string;
  work: string;
};

export const categories = [
  "Bridal",
  "Party Wear",
  "Indo-Western",
  "Sarees",
  "Anarkali",
  "Office Wear",
  "Casual",
  "Plus Size",
];

export const fabrics = ["Velvet", "Satin Silk", "Georgette", "Net & Crepe", "Banarasi Silk", "Wool Crepe", "Cotton Silk"];
export const colorOptions = [
  { name: "Maroon", hex: "#5b1a1a" },
  { name: "Green", hex: "#0e6b48" },
  { name: "Pink", hex: "#e7b6b6" },
  { name: "Black", hex: "#111111" },
  { name: "Gold", hex: "#caa35a" },
  { name: "Cream", hex: "#efe6cf" },
  { name: "Navy", hex: "#1a2540" },
  { name: "Wine", hex: "#5e1a2b" },
];

export const products: Product[] = [
  { id: "royal-maroon-lehenga", name: "Royal Maroon Lehenga", price: 24000, rentPrice: 4500, category: "Bridal", color: "Maroon", colorHex: "#5b1a1a", sizes: ["S","M","L","XL","XXL"], image: bridal, rentable: true, description: "Heavy embroidered maroon bridal lehenga with intricate zardosi work, paired with embroidered dupatta.", fabric: "Velvet", work: "Zardosi, Dabka, Sequins" },
  { id: "emerald-party-gown", name: "Emerald Party Gown", price: 14500, rentPrice: 3000, category: "Party Wear", color: "Green", colorHex: "#0e6b48", sizes: ["S","M","L","XL"], image: party, rentable: true, description: "Floor-sweeping emerald gown with golden hem embroidery — made for unforgettable evenings.", fabric: "Satin Silk", work: "Hand Embroidery" },
  { id: "blush-pink-anarkali", name: "Blush Pink Anarkali", price: 9800, rentPrice: 2200, category: "Anarkali", color: "Pink", colorHex: "#e7b6b6", sizes: ["S","M","L","XL"], image: pink, rentable: true, description: "Soft pink chikankari-inspired anarkali with delicate silver detailing — pure grace.", fabric: "Georgette", work: "Chikankari, Sequins" },
  { id: "noir-indo-western", name: "Noir Indo-Western Gown", price: 12500, rentPrice: 2800, category: "Indo-Western", color: "Black", colorHex: "#111111", sizes: ["S","M","L","XL"], image: indowest, rentable: true, description: "Sleek black gown with antique gold motifs — the perfect cocktail statement.", fabric: "Net & Crepe", work: "Antique Gold Embroidery" },
  { id: "golden-zari-saree", name: "Golden Zari Saree", price: 11000, rentPrice: 2500, category: "Sarees", color: "Gold", colorHex: "#caa35a", sizes: ["Free"], image: saree, rentable: true, description: "Classic Banarasi-style golden zari saree with handwoven borders.", fabric: "Banarasi Silk", work: "Zari Weave" },
  { id: "ivory-power-suit", name: "Ivory Power Suit", price: 8500, category: "Office Wear", color: "Cream", colorHex: "#efe6cf", sizes: ["S","M","L","XL"], image: office, rentable: false, description: "Tailored ivory co-ord with structured shoulders and signature gold buttons.", fabric: "Wool Crepe", work: "Tailored" },
  { id: "midnight-kurta-set", name: "Midnight Kurta Set", price: 4800, category: "Casual", color: "Navy", colorHex: "#1a2540", sizes: ["S","M","L","XL","XXL"], image: casual, rentable: false, description: "Easy navy kurta with subtle thread work — your everyday elegance.", fabric: "Cotton Silk", work: "Thread Work" },
  { id: "wine-velvet-gown", name: "Wine Velvet Gown", price: 13500, rentPrice: 3200, category: "Party Wear", color: "Wine", colorHex: "#5e1a2b", sizes: ["S","M","L","XL"], image: wine, rentable: true, description: "Liquid velvet gown in deep wine — a timeless red-carpet silhouette.", fabric: "Velvet", work: "Minimal" },
];

export const getProduct = (id: string) => products.find(p => p.id === id);
