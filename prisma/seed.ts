import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// NOTE: All suppliers below are fictional placeholder/demo data used to
// showcase the directory layout. None represent real businesses. Real
// supplier onboarding will replace this data as the directory grows.

type CategorySeed = {
  slug: string;
  name: string;
  emoji: string;
  typicalItems: string;
  frequency: string;
  group: string;
};

type ProductSeed = {
  slug: string;
  categorySlug: string;
  name: string;
  unit: string;
};

type PriceSeed = {
  supplierSlug: string;
  productSlug: string;
  price: number;
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
  { slug: "boeung-kak-fresh-produce", name: "Boeung Kak Fresh Produce", description: "Daily wholesale delivery of leafy greens, root vegetables and herbs sourced from Kandal province farms.", city: "Phnom Penh", phone: "+855 12 345 601", whatsapp: "+855 12 345 601", email: "orders@bkfreshproduce.example", categories: ["fresh-produce"] },
  { slug: "angkor-veggie-co", name: "Angkor Veggie Co.", description: "Fruit and vegetable wholesaler supplying hotels and restaurants across Siem Reap.", city: "Siem Reap", phone: "+855 12 345 602", email: "sales@angkorveggie.example", categories: ["fresh-produce"] },

  { slug: "mekong-meat-supply", name: "Mekong Meat Supply", description: "Beef and pork wholesale with cold-chain delivery, 2-3 times a week.", city: "Phnom Penh", phone: "+855 12 345 603", whatsapp: "+855 12 345 603", categories: ["meat-poultry"] },
  { slug: "golden-duck-poultry", name: "Golden Duck Poultry", description: "Chicken and duck supplier serving restaurants in Siem Reap and Battambang.", city: "Battambang", phone: "+855 12 345 604", categories: ["meat-poultry"] },

  { slug: "tonle-sap-seafood", name: "Tonle Sap Seafood", description: "Daily fresh fish, shrimp and crab sourced from the Tonle Sap and coastal markets.", city: "Phnom Penh", phone: "+855 12 345 605", whatsapp: "+855 12 345 605", categories: ["seafood"] },
  { slug: "sihanoukville-catch-co", name: "Sihanoukville Catch Co.", description: "Coastal seafood supplier with daily delivery to hotels and restaurants.", city: "Sihanoukville", phone: "+855 12 345 606", categories: ["seafood"] },

  { slug: "golden-crust-bakery", name: "Golden Crust Bakery", description: "Wholesale bread, buns and pastries baked fresh every morning.", city: "Phnom Penh", phone: "+855 12 345 607", email: "wholesale@goldencrust.example", categories: ["bakery"] },
  { slug: "pp-artisan-bread", name: "Phnom Penh Artisan Bread", description: "Boutique bakery supplying pastries and specialty bread to cafes.", city: "Phnom Penh", phone: "+855 12 345 608", categories: ["bakery"] },

  { slug: "kampong-dairy-farm", name: "Kampong Dairy Farm", description: "Eggs, butter, cream and cheese distributor with weekly delivery routes.", city: "Kampong Cham", phone: "+855 12 345 609", categories: ["eggs-dairy"] },
  { slug: "fresh-egg-cambodia", name: "Fresh Egg Cambodia", description: "Egg wholesaler supplying hotels, restaurants and bakeries nationwide.", city: "Phnom Penh", phone: "+855 12 345 610", categories: ["eggs-dairy"] },

  { slug: "angkor-rice-grains", name: "Angkor Rice & Grains", description: "Bulk rice, flour and sugar supplier for hospitality businesses.", city: "Phnom Penh", phone: "+855 12 345 611", categories: ["dry-goods"] },
  { slug: "mekong-dry-goods", name: "Mekong Dry Goods Trading", description: "Pasta, spices and dry pantry staples, weekly delivery.", city: "Siem Reap", phone: "+855 12 345 612", categories: ["dry-goods"] },

  { slug: "cambodia-beverage-distribution", name: "Cambodia Beverage Distribution", description: "Soft drinks, bottled water and juice distributor for hotels and restaurants.", city: "Phnom Penh", phone: "+855 12 345 613", categories: ["beverages"] },
  { slug: "pure-springs-water", name: "Pure Springs Water Co.", description: "Bottled water and juice supplier with weekly scheduled routes.", city: "Siem Reap", phone: "+855 12 345 614", categories: ["beverages"] },

  { slug: "indochine-beverage-import", name: "Indochine Beverage Import", description: "Beer, wine and spirits importer serving hotel bars and restaurants.", city: "Phnom Penh", phone: "+855 12 345 615", categories: ["beer-alcohol"] },
  { slug: "khmer-craft-beer", name: "Khmer Craft Beer Distributors", description: "Local and imported craft beer distribution, weekly delivery.", city: "Siem Reap", phone: "+855 12 345 616", categories: ["beer-alcohol"] },

  { slug: "sen-monorom-coffee", name: "Sen Monorom Coffee Roasters", description: "Coffee bean roaster and wholesaler supplying cafes and hotels.", city: "Phnom Penh", phone: "+855 12 345 617", email: "wholesale@senmonoromcoffee.example", categories: ["coffee-tea"] },
  { slug: "kirirom-tea-traders", name: "Kirirom Tea Traders", description: "Tea and syrup supplier for cafes, weekly delivery.", city: "Siem Reap", phone: "+855 12 345 618", categories: ["coffee-tea"] },

  { slug: "frosty-scoop-icecream", name: "Frosty Scoop Ice Cream Wholesale", description: "Ice cream wholesaler serving restaurants and cafes.", city: "Phnom Penh", phone: "+855 12 345 619", categories: ["desserts"] },
  { slug: "sweet-angkor-cakes", name: "Sweet Angkor Cakes", description: "Cake supplier for hotel restaurants and cafes.", city: "Siem Reap", phone: "+855 12 345 620", categories: ["desserts"] },

  { slug: "golden-soy-sauce-co", name: "Golden Soy Sauce Co.", description: "Sauces, soy sauce and cooking oil distributor.", city: "Phnom Penh", phone: "+855 12 345 621", categories: ["condiments"] },
  { slug: "spice-route-condiments", name: "Spice Route Condiments", description: "Ketchup, sauces and condiment wholesaler, weekly delivery.", city: "Siem Reap", phone: "+855 12 345 622", categories: ["condiments"] },

  { slug: "crystal-ice-pp", name: "Crystal Ice Phnom Penh", description: "Food-grade ice delivered daily to restaurants and bars.", city: "Phnom Penh", phone: "+855 12 345 623", categories: ["ice"] },
  { slug: "coolzone-ice-supply", name: "Coolzone Ice Supply", description: "Daily ice delivery for restaurants and hotel bars.", city: "Siem Reap", phone: "+855 12 345 624", categories: ["ice"] },

  { slug: "cleanpro-cambodia", name: "CleanPro Cambodia", description: "Detergents, sanitizers and gloves for hospitality businesses.", city: "Phnom Penh", phone: "+855 12 345 625", categories: ["cleaning-products"] },
  { slug: "hygieneplus-supplies", name: "HygienePlus Supplies", description: "Cleaning and sanitizing product distributor, weekly delivery.", city: "Sihanoukville", phone: "+855 12 345 626", categories: ["cleaning-products"] },

  { slug: "ecopack-cambodia", name: "EcoPack Cambodia", description: "Takeaway boxes, cups and bags, including eco-friendly options.", city: "Phnom Penh", phone: "+855 12 345 627", website: "https://ecopack.example", categories: ["packaging"] },
  { slug: "pp-packaging-co", name: "Phnom Penh Packaging Co.", description: "Bulk packaging supplier for restaurants and cafes.", city: "Phnom Penh", phone: "+855 12 345 628", categories: ["packaging"] },

  { slug: "softline-paper-products", name: "Softline Paper Products", description: "Toilet paper, napkins and tissue wholesaler.", city: "Phnom Penh", phone: "+855 12 345 629", categories: ["consumables"] },
  { slug: "daily-essentials-trading", name: "Daily Essentials Trading", description: "Consumables supplier for hotels and restaurants, weekly delivery.", city: "Siem Reap", phone: "+855 12 345 630", categories: ["consumables"] },

  { slug: "khmer-lpg-distribution", name: "Khmer LPG Distribution", description: "LPG cylinder supplier and exchange service for commercial kitchens.", city: "Phnom Penh", phone: "+855 12 345 631", categories: ["gas-supplier"] },
  { slug: "sokha-gas-supply", name: "Sokha Gas Supply", description: "LPG delivery for restaurants and hotels, monthly or on request.", city: "Siem Reap", phone: "+855 12 345 632", categories: ["gas-supplier"] },

  { slug: "capital-utility-services", name: "Capital Utility Services", description: "Utility account management and billing support for commercial properties.", city: "Phnom Penh", phone: "+855 12 345 633", categories: ["utilities"] },
  { slug: "mekong-broadband", name: "Mekong Broadband Co.", description: "Business internet service provider with dedicated support lines.", city: "Phnom Penh", phone: "+855 12 345 634", categories: ["internet"] },
  { slug: "speednet-cambodia", name: "SpeedNet Cambodia", description: "ISP offering business-grade fiber packages for hospitality venues.", city: "Siem Reap", phone: "+855 12 345 635", categories: ["internet"] },

  { slug: "kitchentech-repair", name: "KitchenTech Repair Services", description: "Kitchen equipment and refrigeration maintenance and repair.", city: "Phnom Penh", phone: "+855 12 345 636", categories: ["equipment-maintenance"] },
  { slug: "coldchain-equipment-services", name: "ColdChain Equipment Services", description: "Refrigeration servicing for restaurants and hotels, on-call.", city: "Siem Reap", phone: "+855 12 345 637", categories: ["equipment-maintenance"] },

  { slug: "coolair-cambodia", name: "CoolAir Cambodia", description: "Air conditioning cleaning and repair, quarterly maintenance plans.", city: "Phnom Penh", phone: "+855 12 345 638", categories: ["air-conditioning"] },
  { slug: "arctic-air-services", name: "Arctic Air Services", description: "AC servicing and repair for hospitality venues.", city: "Sihanoukville", phone: "+855 12 345 639", categories: ["air-conditioning"] },

  { slug: "safeguard-pest-control", name: "SafeGuard Pest Control", description: "Insect and rodent control with monthly and quarterly plans.", city: "Phnom Penh", phone: "+855 12 345 640", categories: ["pest-control"] },
  { slug: "khmer-pest-solutions", name: "Khmer Pest Solutions", description: "Pest control services for restaurants and hotels.", city: "Siem Reap", phone: "+855 12 345 641", categories: ["pest-control"] },

  { slug: "cleanlinen-laundry", name: "CleanLinen Laundry Services", description: "Tablecloth and uniform laundry service, weekly pickup.", city: "Phnom Penh", phone: "+855 12 345 642", categories: ["laundry"] },
  { slug: "royal-laundry-co", name: "Royal Laundry Co.", description: "Commercial laundry for hotels and restaurants.", city: "Siem Reap", phone: "+855 12 345 643", categories: ["laundry"] },

  { slug: "lotus-blossom-florist", name: "Lotus Blossom Florist", description: "Floral arrangements for hotel lobbies and restaurant tables, weekly.", city: "Phnom Penh", phone: "+855 12 345 644", categories: ["flowers-decoration"] },
  { slug: "angkor-floral-designs", name: "Angkor Floral Designs", description: "Weekly floral decoration service for hospitality venues.", city: "Siem Reap", phone: "+855 12 345 645", categories: ["flowers-decoration"] },

  { slug: "rights-licensing-cambodia", name: "Rights & Licensing Cambodia", description: "Public performance music licensing for commercial venues, annual.", city: "Phnom Penh", phone: "+855 12 345 646", categories: ["music-licensing"] },

  { slug: "paysmart-cambodia", name: "PaySmart Cambodia Payment Integrators", description: "Helps venues integrate card and QR payment acceptance with local banks.", city: "Phnom Penh", phone: "+855 12 345 647", categories: ["payment-services"] },

  { slug: "khpos-solutions", name: "KHPOS Solutions", description: "POS software subscription and on-site support for restaurants.", city: "Phnom Penh", phone: "+855 12 345 648", website: "https://khpos.example", categories: ["pos-software"] },
  { slug: "smarttill-pos", name: "SmartTill POS Cambodia", description: "Cloud POS system with monthly subscription and local support.", city: "Siem Reap", phone: "+855 12 345 649", categories: ["pos-software"] },

  { slug: "pixel-studio-marketing", name: "Pixel Studio Marketing", description: "Facebook ads, graphic design and photography for hospitality brands.", city: "Phnom Penh", phone: "+855 12 345 650", categories: ["marketing"] },
  { slug: "angkor-digital-agency", name: "Angkor Digital Agency", description: "Social media marketing and content photography for restaurants and hotels.", city: "Siem Reap", phone: "+855 12 345 651", categories: ["marketing"] },

  { slug: "goldenshield-insurance", name: "Golden Shield Insurance Brokers", description: "Property, liability and employee insurance for hospitality businesses.", city: "Phnom Penh", phone: "+855 12 345 652", categories: ["insurance"] },

  { slug: "guardian-security-services", name: "Guardian Security Services", description: "CCTV maintenance and security guard staffing, monthly contracts.", city: "Phnom Penh", phone: "+855 12 345 653", categories: ["security"] },
  { slug: "securewatch-cctv", name: "SecureWatch CCTV & Guards", description: "Security camera maintenance and guard services for hotels and restaurants.", city: "Siem Reap", phone: "+855 12 345 654", categories: ["security"] },
];

// Price comparison only applies to categories selling discrete, unit-priced
// products (Food & Beverage and Facility & Consumables). Service categories
// (insurance, POS software, security, etc.) are quoted as contracts, not
// per-unit prices, so they have no products here.
const products: ProductSeed[] = [
  { slug: "tomatoes", categorySlug: "fresh-produce", name: "Tomatoes", unit: "per kg" },
  { slug: "cucumber", categorySlug: "fresh-produce", name: "Cucumber", unit: "per kg" },

  { slug: "chicken-whole", categorySlug: "meat-poultry", name: "Whole chicken", unit: "per kg" },
  { slug: "beef-cut", categorySlug: "meat-poultry", name: "Beef (cut)", unit: "per kg" },

  { slug: "shrimp", categorySlug: "seafood", name: "Shrimp", unit: "per kg" },
  { slug: "squid", categorySlug: "seafood", name: "Squid", unit: "per kg" },

  { slug: "baguette", categorySlug: "bakery", name: "Baguette", unit: "per piece" },
  { slug: "burger-bun", categorySlug: "bakery", name: "Burger bun", unit: "per dozen" },

  { slug: "eggs-tray-30", categorySlug: "eggs-dairy", name: "Eggs", unit: "per tray of 30" },
  { slug: "butter-1kg", categorySlug: "eggs-dairy", name: "Butter", unit: "per kg" },

  { slug: "jasmine-rice-25kg", categorySlug: "dry-goods", name: "Jasmine rice", unit: "per 25kg bag" },
  { slug: "flour-1kg", categorySlug: "dry-goods", name: "Flour", unit: "per kg" },

  { slug: "bottled-water-case24", categorySlug: "beverages", name: "Bottled water", unit: "per case of 24" },
  { slug: "soft-drink-case24", categorySlug: "beverages", name: "Soft drink", unit: "per case of 24" },

  { slug: "local-beer-case24", categorySlug: "beer-alcohol", name: "Local beer", unit: "per case of 24" },
  { slug: "house-wine-bottle", categorySlug: "beer-alcohol", name: "House wine", unit: "per bottle" },

  { slug: "coffee-beans-1kg", categorySlug: "coffee-tea", name: "Coffee beans", unit: "per kg" },
  { slug: "tea-leaves-1kg", categorySlug: "coffee-tea", name: "Tea leaves", unit: "per kg" },

  { slug: "ice-cream-5l", categorySlug: "desserts", name: "Ice cream", unit: "per 5L tub" },
  { slug: "cake-slice-box", categorySlug: "desserts", name: "Cake slices", unit: "per box of 8" },

  { slug: "soy-sauce-5l", categorySlug: "condiments", name: "Soy sauce", unit: "per 5L" },
  { slug: "cooking-oil-5l", categorySlug: "condiments", name: "Cooking oil", unit: "per 5L" },

  { slug: "ice-block", categorySlug: "ice", name: "Ice block", unit: "per block" },
  { slug: "ice-bag-5kg", categorySlug: "ice", name: "Ice bag", unit: "per 5kg bag" },

  { slug: "dish-soap-5l", categorySlug: "cleaning-products", name: "Dish soap", unit: "per 5L" },
  { slug: "disposable-gloves-box100", categorySlug: "cleaning-products", name: "Disposable gloves", unit: "per box of 100" },

  { slug: "takeaway-box-100", categorySlug: "packaging", name: "Takeaway box", unit: "per 100 pcs" },
  { slug: "paper-bag-100", categorySlug: "packaging", name: "Paper bag", unit: "per 100 pcs" },

  { slug: "toilet-paper-case48", categorySlug: "consumables", name: "Toilet paper", unit: "per case of 48" },
  { slug: "napkins-case5000", categorySlug: "consumables", name: "Napkins", unit: "per case of 5000" },

  { slug: "lpg-cylinder-12kg", categorySlug: "gas-supplier", name: "LPG cylinder (12kg)", unit: "per cylinder" },
  { slug: "lpg-cylinder-45kg", categorySlug: "gas-supplier", name: "LPG cylinder (45kg)", unit: "per cylinder" },
];

const prices: PriceSeed[] = [
  { supplierSlug: "boeung-kak-fresh-produce", productSlug: "tomatoes", price: 1.2 },
  { supplierSlug: "angkor-veggie-co", productSlug: "tomatoes", price: 1.35 },
  { supplierSlug: "boeung-kak-fresh-produce", productSlug: "cucumber", price: 0.9 },
  { supplierSlug: "angkor-veggie-co", productSlug: "cucumber", price: 0.85 },

  { supplierSlug: "mekong-meat-supply", productSlug: "chicken-whole", price: 4.2 },
  { supplierSlug: "golden-duck-poultry", productSlug: "chicken-whole", price: 4.5 },
  { supplierSlug: "mekong-meat-supply", productSlug: "beef-cut", price: 9.8 },
  { supplierSlug: "golden-duck-poultry", productSlug: "beef-cut", price: 10.2 },

  { supplierSlug: "tonle-sap-seafood", productSlug: "shrimp", price: 8.5 },
  { supplierSlug: "sihanoukville-catch-co", productSlug: "shrimp", price: 7.9 },
  { supplierSlug: "tonle-sap-seafood", productSlug: "squid", price: 6.2 },
  { supplierSlug: "sihanoukville-catch-co", productSlug: "squid", price: 6.5 },

  { supplierSlug: "golden-crust-bakery", productSlug: "baguette", price: 0.35 },
  { supplierSlug: "pp-artisan-bread", productSlug: "baguette", price: 0.4 },
  { supplierSlug: "golden-crust-bakery", productSlug: "burger-bun", price: 2.4 },
  { supplierSlug: "pp-artisan-bread", productSlug: "burger-bun", price: 2.6 },

  { supplierSlug: "kampong-dairy-farm", productSlug: "eggs-tray-30", price: 3.6 },
  { supplierSlug: "fresh-egg-cambodia", productSlug: "eggs-tray-30", price: 3.4 },
  { supplierSlug: "kampong-dairy-farm", productSlug: "butter-1kg", price: 7.5 },
  { supplierSlug: "fresh-egg-cambodia", productSlug: "butter-1kg", price: 7.9 },

  { supplierSlug: "angkor-rice-grains", productSlug: "jasmine-rice-25kg", price: 22.0 },
  { supplierSlug: "mekong-dry-goods", productSlug: "jasmine-rice-25kg", price: 23.5 },
  { supplierSlug: "angkor-rice-grains", productSlug: "flour-1kg", price: 1.1 },
  { supplierSlug: "mekong-dry-goods", productSlug: "flour-1kg", price: 1.05 },

  { supplierSlug: "cambodia-beverage-distribution", productSlug: "bottled-water-case24", price: 5.5 },
  { supplierSlug: "pure-springs-water", productSlug: "bottled-water-case24", price: 5.2 },
  { supplierSlug: "cambodia-beverage-distribution", productSlug: "soft-drink-case24", price: 9.6 },
  { supplierSlug: "pure-springs-water", productSlug: "soft-drink-case24", price: 9.9 },

  { supplierSlug: "indochine-beverage-import", productSlug: "local-beer-case24", price: 14.5 },
  { supplierSlug: "khmer-craft-beer", productSlug: "local-beer-case24", price: 15.8 },
  { supplierSlug: "indochine-beverage-import", productSlug: "house-wine-bottle", price: 6.5 },
  { supplierSlug: "khmer-craft-beer", productSlug: "house-wine-bottle", price: 7.2 },

  { supplierSlug: "sen-monorom-coffee", productSlug: "coffee-beans-1kg", price: 9.0 },
  { supplierSlug: "kirirom-tea-traders", productSlug: "coffee-beans-1kg", price: 9.5 },
  { supplierSlug: "sen-monorom-coffee", productSlug: "tea-leaves-1kg", price: 6.0 },
  { supplierSlug: "kirirom-tea-traders", productSlug: "tea-leaves-1kg", price: 5.6 },

  { supplierSlug: "frosty-scoop-icecream", productSlug: "ice-cream-5l", price: 12.0 },
  { supplierSlug: "sweet-angkor-cakes", productSlug: "ice-cream-5l", price: 12.8 },
  { supplierSlug: "frosty-scoop-icecream", productSlug: "cake-slice-box", price: 9.5 },
  { supplierSlug: "sweet-angkor-cakes", productSlug: "cake-slice-box", price: 8.9 },

  { supplierSlug: "golden-soy-sauce-co", productSlug: "soy-sauce-5l", price: 6.8 },
  { supplierSlug: "spice-route-condiments", productSlug: "soy-sauce-5l", price: 7.1 },
  { supplierSlug: "golden-soy-sauce-co", productSlug: "cooking-oil-5l", price: 8.2 },
  { supplierSlug: "spice-route-condiments", productSlug: "cooking-oil-5l", price: 8.0 },

  { supplierSlug: "crystal-ice-pp", productSlug: "ice-block", price: 1.5 },
  { supplierSlug: "coolzone-ice-supply", productSlug: "ice-block", price: 1.4 },
  { supplierSlug: "crystal-ice-pp", productSlug: "ice-bag-5kg", price: 1.1 },
  { supplierSlug: "coolzone-ice-supply", productSlug: "ice-bag-5kg", price: 1.2 },

  { supplierSlug: "cleanpro-cambodia", productSlug: "dish-soap-5l", price: 5.5 },
  { supplierSlug: "hygieneplus-supplies", productSlug: "dish-soap-5l", price: 5.9 },
  { supplierSlug: "cleanpro-cambodia", productSlug: "disposable-gloves-box100", price: 3.2 },
  { supplierSlug: "hygieneplus-supplies", productSlug: "disposable-gloves-box100", price: 3.0 },

  { supplierSlug: "ecopack-cambodia", productSlug: "takeaway-box-100", price: 8.0 },
  { supplierSlug: "pp-packaging-co", productSlug: "takeaway-box-100", price: 7.5 },
  { supplierSlug: "ecopack-cambodia", productSlug: "paper-bag-100", price: 4.5 },
  { supplierSlug: "pp-packaging-co", productSlug: "paper-bag-100", price: 4.8 },

  { supplierSlug: "softline-paper-products", productSlug: "toilet-paper-case48", price: 18.0 },
  { supplierSlug: "daily-essentials-trading", productSlug: "toilet-paper-case48", price: 19.5 },
  { supplierSlug: "softline-paper-products", productSlug: "napkins-case5000", price: 22.0 },
  { supplierSlug: "daily-essentials-trading", productSlug: "napkins-case5000", price: 21.0 },

  { supplierSlug: "khmer-lpg-distribution", productSlug: "lpg-cylinder-12kg", price: 13.5 },
  { supplierSlug: "sokha-gas-supply", productSlug: "lpg-cylinder-12kg", price: 14.0 },
  { supplierSlug: "khmer-lpg-distribution", productSlug: "lpg-cylinder-45kg", price: 45.0 },
  { supplierSlug: "sokha-gas-supply", productSlug: "lpg-cylinder-45kg", price: 47.0 },
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

  console.log("Seeding products...");
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { name: product.name, unit: product.unit, category: { connect: { slug: product.categorySlug } } },
      create: {
        slug: product.slug,
        name: product.name,
        unit: product.unit,
        category: { connect: { slug: product.categorySlug } },
      },
    });
  }

  console.log("Seeding prices...");
  for (const priceEntry of prices) {
    const supplier = await prisma.supplier.findUniqueOrThrow({ where: { slug: priceEntry.supplierSlug } });
    const product = await prisma.product.findUniqueOrThrow({ where: { slug: priceEntry.productSlug } });
    await prisma.supplierPrice.upsert({
      where: { supplierId_productId: { supplierId: supplier.id, productId: product.id } },
      update: { price: priceEntry.price },
      create: { supplierId: supplier.id, productId: product.id, price: priceEntry.price },
    });
  }

  console.log(
    `Seeded ${categories.length} categories, ${suppliers.length} suppliers, ${products.length} products, ${prices.length} prices.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
