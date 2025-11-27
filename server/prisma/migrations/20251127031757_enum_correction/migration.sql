/*
  Warnings:

  - Changed the type of `appointmentType` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AppointmentTypes" AS ENUM ('Checkup', 'Retorno', 'PrimeiraConsulta', 'Vacinacao');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointmentType",
ADD COLUMN     "appointmentType" "AppointmentTypes" NOT NULL;

-- DropEnum
DROP TYPE "appointmentTypes";
