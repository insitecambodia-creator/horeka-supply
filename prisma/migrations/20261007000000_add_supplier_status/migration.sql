-- AlterTable
ALTER TABLE "Supplier"
  ADD COLUMN "status" TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN "statusChangedAt" TIMESTAMP(3),
  ADD COLUMN "closureReason" TEXT,
  ADD COLUMN "internalNotes" TEXT;

-- CreateIndex
CREATE INDEX "Supplier_status_idx" ON "Supplier"("status");
