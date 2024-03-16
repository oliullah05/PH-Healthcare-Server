/*
  Warnings:

  - Made the column `isDeleted` on table `admins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "isDeleted" SET NOT NULL;
