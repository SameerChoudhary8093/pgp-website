/*
  Warnings:

  - The values [SeniorMember,ChiefWorker,Member,CWCPresident,ALCPresident,SLCPresident] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[districtId,name]` on the table `GramPanchayat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `districtId` to the `GramPanchayat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CouncilLevel" ADD VALUE 'APC';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('Admin', 'Founder', 'SSP', 'PPC', 'APC', 'CWC', 'Worker');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CWC';
COMMIT;

-- DropIndex
DROP INDEX "GramPanchayat_name_key";

-- AlterTable
ALTER TABLE "Election" ADD COLUMN     "districtId" INTEGER,
ADD COLUMN     "zoneNumber" INTEGER;

-- AlterTable
ALTER TABLE "GramPanchayat" ADD COLUMN     "districtId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authUserId" TEXT,
ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ALTER COLUMN "role" SET DEFAULT 'CWC';

-- AlterTable
ALTER TABLE "Ward" ADD COLUMN     "zoneNumber" INTEGER;

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "District_name_key" ON "District"("name");

-- CreateIndex
CREATE INDEX "Election_districtId_idx" ON "Election"("districtId");

-- CreateIndex
CREATE INDEX "Election_zoneNumber_idx" ON "Election"("zoneNumber");

-- CreateIndex
CREATE INDEX "GramPanchayat_districtId_idx" ON "GramPanchayat"("districtId");

-- CreateIndex
CREATE UNIQUE INDEX "GramPanchayat_districtId_name_key" ON "GramPanchayat"("districtId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "User_authUserId_key" ON "User"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_memberId_key" ON "User"("memberId");

-- CreateIndex
CREATE INDEX "Ward_zoneNumber_idx" ON "Ward"("zoneNumber");

-- AddForeignKey
ALTER TABLE "GramPanchayat" ADD CONSTRAINT "GramPanchayat_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Election" ADD CONSTRAINT "Election_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;
