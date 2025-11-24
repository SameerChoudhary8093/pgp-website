-- CreateEnum
CREATE TYPE "CommitteeType" AS ENUM ('CWC', 'APC', 'PPC', 'SSP');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'CWCPresident';
ALTER TYPE "Role" ADD VALUE 'CWCMember';
ALTER TYPE "Role" ADD VALUE 'ExtendedMember';

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "vidhansabhaId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "localUnitId" INTEGER;

-- CreateTable
CREATE TABLE "Committee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CommitteeType" NOT NULL,
    "localUnitId" INTEGER NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeMember" (
    "userId" INTEGER NOT NULL,
    "committeeId" INTEGER NOT NULL,
    "role" "Role",
    "isPresident" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommitteeMember_pkey" PRIMARY KEY ("userId","committeeId")
);

-- CreateIndex
CREATE INDEX "Committee_localUnitId_idx" ON "Committee"("localUnitId");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_name_localUnitId_type_key" ON "Committee"("name", "localUnitId", "type");

-- CreateIndex
CREATE INDEX "CommitteeMember_committeeId_idx" ON "CommitteeMember"("committeeId");

-- CreateIndex
CREATE INDEX "Election_vidhansabhaId_idx" ON "Election"("vidhansabhaId");

-- CreateIndex
CREATE INDEX "User_localUnitId_idx" ON "User"("localUnitId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_localUnitId_fkey" FOREIGN KEY ("localUnitId") REFERENCES "LocalUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Election" ADD CONSTRAINT "Election_vidhansabhaId_fkey" FOREIGN KEY ("vidhansabhaId") REFERENCES "Vidhansabha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_localUnitId_fkey" FOREIGN KEY ("localUnitId") REFERENCES "LocalUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
