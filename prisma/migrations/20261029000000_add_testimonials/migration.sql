-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "reviewerName" TEXT,
    "restaurantName" TEXT NOT NULL,
    "restaurantUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_supplierId_restaurantName_key" ON "Testimonial"("supplierId", "restaurantName");

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
