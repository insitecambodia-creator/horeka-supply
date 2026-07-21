import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// NOTE: Suppliers below are real Cambodia hospitality-supply businesses,
// sourced from a public research report (company websites, the Cambodia
// Hotel Association directory, and business listings). Contact details
// have not been independently confirmed by us — verify before ordering.
// Categories not covered by any supplier here (e.g. utilities, insurance,
// pest control) are intentionally left empty rather than filled with
// placeholder data.

type CategorySeed = {
  slug: string;
  name: string;
  emoji: string;
  typicalItems: string;
  frequency: string;
  group: string;
};

type SupplierSeed = {
  slug: string;
  name: string;
  description: string;
  city: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  telegram?: string;
  email?: string;
  website?: string;
  verified?: boolean;
  categories: string[]; // category slugs
};

const FOOD = "Food & Beverage";
const FACILITY = "Facility & Consumables";
const OPERATIONS = "Utilities & Maintenance";
const BUSINESS = "Business & Admin";

const categories: CategorySeed[] = [
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
];

const suppliers: SupplierSeed[] = [
  {
    slug: "makro-cambodia",
    name: "Makro (Cambodia) Company Limited",
    description: "Cash-and-carry wholesaler supplying food ingredients, groceries, beverages, condiments and non-food consumables to hotels and restaurants. Branches in Phnom Penh, Siem Reap and Chroy Changvar.",
    city: "Phnom Penh",
    phone: "+855 (23) 977 355",
    website: "https://makrocambodia.com",
    categories: ["fresh-produce", "dry-goods", "beverages", "condiments", "cleaning-products", "consumables"],
  },
  {
    slug: "dksh-cambodia",
    name: "DKSH (Cambodia) Ltd.",
    description: "FMCG distributor with broad channel access for HoReCa procurement, covering dry goods, beverages, condiments and consumables.",
    city: "Phnom Penh",
    phone: "+855 81 888 099",
    email: "info@dksh.com.kh",
    website: "https://dksh.com/kh-en/home",
    categories: ["dry-goods", "beverages", "condiments", "consumables", "cleaning-products"],
  },
  {
    slug: "lsh-cambodia",
    name: "LSH (Cambodia) Pte. Ltd.",
    description: "Foodservice importer and distributor of meat, dairy, confectionery, bakery and beverages, including ambient, chilled and frozen products.",
    city: "Phnom Penh",
    phone: "+855 23 968 688; +855 17 388 399; +855 16 800 833",
    website: "https://lshcambodia.com",
    categories: ["meat-poultry", "eggs-dairy", "bakery", "desserts", "beverages"],
  },
  {
    slug: "boncafe-cambodia",
    name: "Boncafé (Cambodia) Ltd.",
    description: "Coffee beans, machines, café equipment and barista training for foodservice coffee programs. Branches in Phnom Penh, Siem Reap and Sihanoukville.",
    city: "Phnom Penh",
    phone: "+855 23 883 100 / 200",
    email: "info@boncafe.com.kh",
    website: "https://boncafe.com.kh",
    categories: ["coffee-tea"],
  },
  {
    slug: "kofi",
    name: "KOFI Co., Ltd.",
    description: "Coffee beans, roasting, machines, accessories and barista training for hospitality coffee programs.",
    city: "Phnom Penh",
    phone: "+855 69 666 999; +855 77 777 970",
    email: "info@kofi.com.kh",
    website: "https://kofi.com.kh",
    categories: ["coffee-tea"],
  },
  {
    slug: "phs-asia",
    name: "PHS Asia Co., Ltd.",
    description: "Room linen, amenities, cleaning & sanitizing (including Ecolab F&B), laundry, locks, safes and minibars for hotels. Serves Phnom Penh and Siem Reap.",
    city: "Phnom Penh",
    phone: "+855 11 888 270; +855 63 965 533",
    email: "info@phsasia.com.kh",
    website: "https://phsasia.com.kh",
    categories: ["cleaning-products", "laundry", "consumables"],
  },
  {
    slug: "sdc-hotel-supply",
    name: "SDC Hotel Supply",
    description: "Linen, textiles, amenities, F&B ware and housekeeping supplies for hotels.",
    city: "Phnom Penh",
    phone: "+855 76 240 4444; +855 12/10 866 648",
    email: "sdc-sell@sdchotelsupply.com",
    website: "https://sdchotelsupply.com",
    categories: ["laundry", "consumables"],
  },
  {
    slug: "da-houg-heng-enterprise",
    name: "Da Houg Heng Enterprise Ltd.",
    description: "Food & beverage distribution plus tissue/paper and branded FMCG for HoReCa and general trade.",
    city: "Phnom Penh",
    phone: "+855 92 249 154",
    email: "nattachai@dahfh.com",
    website: "https://dahoughengenterprise.com",
    categories: ["beverages", "dry-goods", "consumables"],
  },
  {
    slug: "fresh-food-supply-cambodia",
    name: "Fresh Food Supply Cambodia",
    description: "Fresh produce, meat, seafood and groceries delivered to hotels, restaurants, cafés and cruises.",
    city: "Phnom Penh",
    phone: "+855 93 887 171",
    email: "sales@freshfoodcambodia.com",
    website: "https://freshfoodcambodia.com",
    categories: ["fresh-produce", "meat-poultry", "seafood"],
  },
  {
    slug: "jny-home-cambodia",
    name: "JNY Home Cambodia",
    description: "Mattresses, bed and bath linen, room amenities, chinaware, flatware and kitchen/bar utensils for hotels.",
    city: "Phnom Penh",
    phone: "+855 23 231 088; +855 92 982 322; +855 92 982 338",
    website: "https://jnycambodia.com",
    categories: ["laundry", "consumables"],
  },
  {
    slug: "bell-foods-cambodia",
    name: "Bell Foods Cambodia",
    description: "Japanese sauces, soup bases and seasonings for restaurants, hotels and retail.",
    city: "Phnom Penh",
    phone: "+855 61 313 311",
    email: "cs@bellfoods.com.kh",
    website: "https://bellfoods.com.kh",
    categories: ["condiments"],
  },
  {
    slug: "dk-linen",
    name: "DK Linen",
    description: "Bed linen, curtains, uniforms, towels, chair covers, tablecloths and amenities for hotels and restaurants.",
    city: "Phnom Penh",
    phone: "078 613 666; 071 9 613 666; 096 6 613 666",
    email: "info@dklinen.com",
    website: "https://dklinen.com",
    categories: ["laundry"],
  },
  {
    slug: "karcher-cambodia",
    name: "Kärcher Cambodia",
    description: "Commercial cleaning machines, care agents and floor/surface cleaning systems.",
    city: "Phnom Penh",
    phone: "+855 23 933 233",
    email: "info@kh.karcher.com",
    website: "https://karcher.com/kh",
    categories: ["cleaning-products", "equipment-maintenance"],
  },
  {
    slug: "gbs-gourmet-beverage-solutions",
    name: "GBS – Gourmet Beverage Solutions",
    description: "Coffee and tea solutions, machines, beans and barista training. Locations in Phnom Penh, Siem Reap and Preah Sihanouk.",
    city: "Phnom Penh",
    phone: "+855 10 490 416; +855 69 900 550",
    email: "info@gbs.com.kh",
    website: "https://gbs.com.kh",
    categories: ["coffee-tea"],
  },
  {
    slug: "guang-hong-kitchen-equipment",
    name: "Guang Hong Kitchen Equipment",
    description: "Commercial kitchen equipment — grills, salamanders, mixers and stainless equipment.",
    city: "Phnom Penh",
    phone: "+855 23 214 178; +855 23 219 078",
    website: "https://guanghongkh.com",
    categories: ["equipment-maintenance"],
  },
  {
    slug: "putih-khmer-import",
    name: "Putih Khmer Import Co., Ltd.",
    description: "Laundry equipment — washer-extractors, dryers, ironers, folders and finishing equipment, plus maintenance.",
    city: "Phnom Penh",
    phone: "+855 23 989 555",
    email: "info@putihkhmerimport.com",
    website: "https://putihkhmerimport.com",
    categories: ["laundry", "equipment-maintenance"],
  },
  {
    slug: "posflow-solutions",
    name: "POSFlow Solutions",
    description: "POS systems, restaurant hardware and mobile ordering software for hospitality operations.",
    city: "Phnom Penh",
    phone: "+855 10 633 889",
    email: "info@posflowkh.com",
    website: "https://posflowkh.com",
    categories: ["pos-software"],
  },
  {
    slug: "mpos-cambodia",
    name: "MPOS Cambodia",
    description: "Restaurant POS, QR ordering, multilingual POS and label/printer tools.",
    city: "Phnom Penh",
    phone: "+855 11 223 319",
    email: "support@metathought.co",
    website: "https://m-pos.cc",
    categories: ["pos-software"],
  },
  {
    slug: "kambio-nature",
    name: "Kambio Nature",
    description: "Eco-friendly hotel amenities, scent diffusers, spa supply and room gifts.",
    city: "Phnom Penh",
    phone: "+855 12 442 654",
    email: "info@kambionature.com",
    website: "https://kambionature.com",
    categories: ["consumables"],
  },
  {
    slug: "bkb-hotel-supply",
    name: "BKB Hotel Supply",
    description: "Room linen, amenities, chinaware, glassware, housekeeping and F&B equipment for hotels. Contact: Nang Vuthy (Manager).",
    city: "Phnom Penh",
    phone: "+855 78 859 035",
    website: "https://bkbhotelsupply.com",
    categories: ["laundry", "consumables"],
  },
];

async function main() {
  console.log("Seeding categories...");
  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { ...category, sortOrder: index },
      create: { ...category, sortOrder: index },
    });
  }

  console.log("Removing suppliers not in the current seed list...");
  await prisma.supplier.deleteMany({
    where: { slug: { notIn: suppliers.map((s) => s.slug) } },
  });

  console.log("Seeding suppliers...");
  for (const supplier of suppliers) {
    const { categories: categorySlugs, ...data } = supplier;
    await prisma.supplier.upsert({
      where: { slug: supplier.slug },
      update: {
        ...data,
        categories: {
          deleteMany: {},
          create: categorySlugs.map((slug) => ({ category: { connect: { slug } } })),
        },
      },
      create: {
        ...data,
        categories: {
          create: categorySlugs.map((slug) => ({ category: { connect: { slug } } })),
        },
      },
    });
  }

  console.log(`Seeded ${categories.length} categories and ${suppliers.length} suppliers.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
