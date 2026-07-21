import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";

const prisma = new PrismaClient();

// Runs automatically on every deploy (see package.json "build" script).
// Only touches categories, which are structural and rarely change — supplier
// data now comes from the Google Sheet sync endpoint, not from seeding, so
// this must never touch the Supplier table or it would clobber sheet edits.
async function main() {
  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { ...category, sortOrder: index },
      create: { ...category, sortOrder: index },
    });
  }
  console.log(`Seeded ${categories.length} categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
