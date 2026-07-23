export type CategorySeed = {
  slug: string;
  name: string;
  emoji: string;
  typicalItems: string;
  frequency: string;
  group: string;
};

const FOOD = "Food & Beverage";
const FACILITY = "Facility & Consumables";
const OPERATIONS = "Utilities & Maintenance";
const BUSINESS = "Business & Admin";
const SETUP = "Setup & Equipment";

export const categories: CategorySeed[] = [
  { slug: "fresh-produce", name: "Fresh produce", emoji: "🥬", typicalItems: "Vegetables, fruits, herbs", frequency: "Daily", group: FOOD },
  { slug: "meat-poultry", name: "Meat & poultry", emoji: "🥩", typicalItems: "Beef, pork, chicken, duck", frequency: "Daily / 2-3x week", group: FOOD },
  { slug: "seafood", name: "Seafood", emoji: "🐟", typicalItems: "Fish, shrimp, crab, squid", frequency: "Daily", group: FOOD },
  { slug: "bakery", name: "Bakery", emoji: "🥖", typicalItems: "Bread, buns, pastries", frequency: "Daily", group: FOOD },
  { slug: "eggs-dairy", name: "Eggs & dairy", emoji: "🥚", typicalItems: "Eggs, butter, cream, cheese, milk", frequency: "Weekly", group: FOOD },
  { slug: "dry-goods", name: "Dry goods", emoji: "🍚", typicalItems: "Rice, flour, sugar, pasta, spices", frequency: "Weekly", group: FOOD },
  { slug: "beverages", name: "Beverages", emoji: "🥤", typicalItems: "Soft drinks, water, juices", frequency: "Weekly", group: FOOD },
  { slug: "beer-alcohol", name: "Beer & alcohol", emoji: "🍺", typicalItems: "Beer, wine, spirits", frequency: "Weekly", group: FOOD },
  { slug: "coffee-tea", name: "Coffee & tea", emoji: "☕", typicalItems: "Beans, tea, syrups", frequency: "Weekly", group: FOOD },
  { slug: "desserts", name: "Desserts", emoji: "🍦", typicalItems: "Ice cream, cakes", frequency: "Weekly", group: FOOD },
  { slug: "condiments", name: "Condiments", emoji: "🧂", typicalItems: "Sauces, ketchup, soy sauce, oil", frequency: "Weekly", group: FOOD },
  { slug: "ice", name: "Ice", emoji: "🧊", typicalItems: "Food-grade ice", frequency: "Daily (many restaurants)", group: FOOD },
  { slug: "cleaning-products", name: "Cleaning products", emoji: "🧹", typicalItems: "Detergents, sanitizers, gloves", frequency: "Weekly", group: FACILITY },
  { slug: "packaging", name: "Packaging", emoji: "📦", typicalItems: "Takeaway boxes, cups, bags", frequency: "Weekly", group: FACILITY },
  { slug: "consumables", name: "Consumables", emoji: "🧻", typicalItems: "Toilet paper, napkins, tissues", frequency: "Weekly", group: FACILITY },
  { slug: "gas-supplier", name: "Gas supplier", emoji: "🔥", typicalItems: "LPG cylinders", frequency: "Monthly / as needed", group: FACILITY },
  { slug: "utilities", name: "Utilities", emoji: "⚡", typicalItems: "Electricity, water", frequency: "Monthly", group: OPERATIONS },
  { slug: "internet", name: "Internet", emoji: "🌐", typicalItems: "ISP", frequency: "Monthly", group: OPERATIONS },
  { slug: "equipment-maintenance", name: "Equipment maintenance", emoji: "🛠", typicalItems: "Refrigeration, kitchen equipment", frequency: "As needed", group: OPERATIONS },
  { slug: "air-conditioning", name: "Air conditioning", emoji: "❄", typicalItems: "Cleaning & repairs", frequency: "Quarterly", group: OPERATIONS },
  { slug: "pest-control", name: "Pest control", emoji: "🐜", typicalItems: "Insects & rodents", frequency: "Monthly / Quarterly", group: OPERATIONS },
  { slug: "laundry", name: "Laundry", emoji: "👕", typicalItems: "Tablecloths, uniforms", frequency: "Weekly", group: OPERATIONS },
  { slug: "security", name: "Security", emoji: "🔒", typicalItems: "CCTV maintenance, guards", frequency: "Monthly", group: OPERATIONS },
  { slug: "flowers-decoration", name: "Flowers & decoration", emoji: "🌺", typicalItems: "Floral arrangements", frequency: "Weekly", group: BUSINESS },
  { slug: "music-licensing", name: "Music licensing", emoji: "🎵", typicalItems: "Public music rights (if applicable)", frequency: "Annual", group: BUSINESS },
  { slug: "payment-services", name: "Payment services", emoji: "💳", typicalItems: "Card & QR payment processing integration", frequency: "Ongoing", group: BUSINESS },
  { slug: "pos-software", name: "POS software", emoji: "🖥", typicalItems: "POS subscription & support", frequency: "Monthly", group: BUSINESS },
  { slug: "marketing", name: "Marketing", emoji: "📱", typicalItems: "Facebook ads, graphic design, photography", frequency: "Monthly", group: BUSINESS },
  { slug: "insurance", name: "Insurance", emoji: "🛡", typicalItems: "Property, liability, employee insurance", frequency: "Annual", group: BUSINESS },
  { slug: "kitchen-equipment", name: "Kitchen equipment", emoji: "🍳", typicalItems: "Ovens, fridges, grills, stainless steel prep tables", frequency: "One-time / as needed", group: SETUP },
  { slug: "pos-hardware", name: "POS hardware", emoji: "🧾", typicalItems: "POS terminals, receipt printers, cash drawers, barcode scanners", frequency: "One-time / as needed", group: SETUP },
  { slug: "furniture-fixtures", name: "Furniture & fixtures", emoji: "🪑", typicalItems: "Tables, chairs, bar stools, shelving, counters", frequency: "One-time / as needed", group: SETUP },
  { slug: "signage-branding", name: "Signage & branding", emoji: "🪧", typicalItems: "Signboards, menu boards, branding materials", frequency: "One-time / as needed", group: SETUP },
  { slug: "tableware", name: "Tableware", emoji: "🍴", typicalItems: "Plates, cutlery, glassware, cups & mugs", frequency: "One-time / as needed", group: SETUP },
];
