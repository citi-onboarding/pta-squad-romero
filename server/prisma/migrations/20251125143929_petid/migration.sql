/*
  Warnings:

  - Changed the type of `petSpecies` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetSpecies" AS ENUM ('Cachorro', 'Gato', 'Cavalo', 'Ovelha', 'Vaca', 'Porco');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "petSpecies",
ADD COLUMN     "petSpecies" "PetSpecies" NOT NULL;

-- DropEnum
DROP TYPE "petSpecies";
