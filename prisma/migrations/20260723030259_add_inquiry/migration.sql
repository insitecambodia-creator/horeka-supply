-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "buyerEmail" TEXT NOT NULL,
    "buyerName" TEXT,
    "business" TEXT,
    "item" TEXT,
    "quantity" TEXT,
    "notes" TEXT,
    "suppliersSent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Inquiry_categoryId_idx" ON "Inquiry"("categoryId");

-- CreateIndex
CREATE INDEX "Inquiry_buyerEmail_categoryId_idx" ON "Inquiry"("buyerEmail", "categoryId");

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
