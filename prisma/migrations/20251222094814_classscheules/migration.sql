/*
  Warnings:

  - You are about to drop the column `date` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `maxSlots` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymPolicy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MembershipPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trainer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `capacity` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `className` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrolledCount` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainer` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "ClassCategory" AS ENUM ('StrengthTraining', 'Cardio', 'Yoga', 'Pilates', 'CrossFit', 'Boxing', 'HIIT', 'FunctionalFitness');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClassSchedule" DROP CONSTRAINT "ClassSchedule_programId_fkey";

-- DropForeignKey
ALTER TABLE "ClassSchedule" DROP CONSTRAINT "ClassSchedule_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "ClassSchedule" DROP COLUMN "date",
DROP COLUMN "maxSlots",
DROP COLUMN "programId",
DROP COLUMN "time",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "category" "ClassCategory" NOT NULL,
ADD COLUMN     "className" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "enrolledCount" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "level" "FitnessLevel" NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "schedule" JSONB NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "trainer" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" JSONB,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "GymPolicy";

-- DropTable
DROP TABLE "MembershipPlan";

-- DropTable
DROP TABLE "Program";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "Trainer";
