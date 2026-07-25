-- AlterTable
ALTER TABLE "SupplierSubmission"
  ADD COLUMN "facebook" TEXT,
  ADD COLUMN "supplierType" TEXT,
  ADD COLUMN "areasServed" TEXT[],
  ADD COLUMN "nationwide" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "delivery" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "pickup" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "otherCategory" TEXT,
  ADD COLUMN "contactTelegram" TEXT,
  ADD COLUMN "consent" BOOLEAN NOT NULL DEFAULT false;
