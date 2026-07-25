-- CreateTable
CREATE TABLE "SupplierSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "city" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "telegram" TEXT,
    "email" TEXT,
    "website" TEXT,
    "categories" TEXT[],
    "products" JSONB,
    "brands" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupplierSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SupplierSubmission_status_idx" ON "SupplierSubmission"("status");
