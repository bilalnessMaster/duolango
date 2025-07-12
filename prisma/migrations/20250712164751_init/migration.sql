/*
  Warnings:

  - Added the required column `state` to the `lesson_progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lesson_progress" ADD COLUMN     "state" "State" NOT NULL;
