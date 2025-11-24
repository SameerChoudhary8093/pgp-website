/*
  Warnings:

  - You are about to drop the column `zoneNumber` on the `Election` table. All the data in the column will be lost.
  - You are about to drop the column `zoneNumber` on the `Ward` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[electionId,voterUserId,candidateUserId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Election_zoneNumber_idx";

-- DropIndex
DROP INDEX "Vote_electionId_voterUserId_key";

-- DropIndex
DROP INDEX "Ward_zoneNumber_idx";

-- AlterTable
ALTER TABLE "Election" DROP COLUMN "zoneNumber";

-- AlterTable
ALTER TABLE "Ward" DROP COLUMN "zoneNumber";

-- CreateTable
CREATE TABLE "BallotSubmission" (
    "id" SERIAL NOT NULL,
    "electionId" INTEGER NOT NULL,
    "voterUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BallotSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BallotSubmission_electionId_voterUserId_key" ON "BallotSubmission"("electionId", "voterUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_electionId_voterUserId_candidateUserId_key" ON "Vote"("electionId", "voterUserId", "candidateUserId");

-- AddForeignKey
ALTER TABLE "BallotSubmission" ADD CONSTRAINT "BallotSubmission_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BallotSubmission" ADD CONSTRAINT "BallotSubmission_voterUserId_fkey" FOREIGN KEY ("voterUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
