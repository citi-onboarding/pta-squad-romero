-- CreateEnum
CREATE TYPE "appointmentTypes" AS ENUM ('Checkup', 'Retorno', 'PrimeiraConsulta', 'Vacinacao');

-- CreateEnum
CREATE TYPE "petSpecies" AS ENUM ('Cachorro', 'Gato', 'Cavalo', 'Ovelha', 'Vaca', 'Pig');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "appointmentType" "appointmentTypes" NOT NULL,
    "appointmentDate" TEXT NOT NULL,
    "appointmentTime" TEXT NOT NULL,
    "doctorName" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "petName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "petAge" INTEGER NOT NULL,
    "petSpecies" "petSpecies" NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
