-- CreateEnum
CREATE TYPE "LocalUnitType" AS ENUM ('Ward', 'GramPanchayat');

-- CreateTable
CREATE TABLE "Loksabha" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Loksabha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vidhansabha" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "loksabhaId" INTEGER NOT NULL,

    CONSTRAINT "Vidhansabha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalUnit" (
    "id" SERIAL NOT NULL,
    "vidhansabhaId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LocalUnitType" NOT NULL,

    CONSTRAINT "LocalUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Loksabha_name_key" ON "Loksabha"("name");

-- CreateIndex
CREATE INDEX "Vidhansabha_loksabhaId_idx" ON "Vidhansabha"("loksabhaId");

-- CreateIndex
CREATE UNIQUE INDEX "Vidhansabha_loksabhaId_name_key" ON "Vidhansabha"("loksabhaId", "name");

-- CreateIndex
CREATE INDEX "LocalUnit_vidhansabhaId_type_idx" ON "LocalUnit"("vidhansabhaId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "LocalUnit_vidhansabhaId_name_type_key" ON "LocalUnit"("vidhansabhaId", "name", "type");

-- AddForeignKey
ALTER TABLE "Vidhansabha" ADD CONSTRAINT "Vidhansabha_loksabhaId_fkey" FOREIGN KEY ("loksabhaId") REFERENCES "Loksabha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalUnit" ADD CONSTRAINT "LocalUnit_vidhansabhaId_fkey" FOREIGN KEY ("vidhansabhaId") REFERENCES "Vidhansabha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
