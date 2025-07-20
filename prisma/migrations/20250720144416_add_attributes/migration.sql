/*
  Warnings:

  - The values [compeleted] on the enum `State` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "State_new" AS ENUM ('completed', 'in_progress', 'not_started');
ALTER TABLE "lesson_progress" ALTER COLUMN "state" TYPE "State_new" USING ("state"::text::"State_new");
ALTER TYPE "State" RENAME TO "State_old";
ALTER TYPE "State_new" RENAME TO "State";
DROP TYPE "State_old";
COMMIT;

-- AlterTable
ALTER TABLE "lesson_progress" ALTER COLUMN "state" SET DEFAULT 'not_started';

-- AlterTable
ALTER TABLE "progress" ADD COLUMN     "lastQuestionAnswered" INTEGER NOT NULL DEFAULT 1;
