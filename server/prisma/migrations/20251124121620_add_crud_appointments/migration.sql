/*
  Warnings:

  - The values [Pig] on the enum `petSpecies` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "petSpecies_new" AS ENUM ('Cachorro', 'Gato', 'Cavalo', 'Ovelha', 'Vaca', 'Porco');
ALTER TABLE "Pet" ALTER COLUMN "petSpecies" TYPE "petSpecies_new" USING ("petSpecies"::text::"petSpecies_new");
ALTER TYPE "petSpecies" RENAME TO "petSpecies_old";
ALTER TYPE "petSpecies_new" RENAME TO "petSpecies";
DROP TYPE "petSpecies_old";
COMMIT;
