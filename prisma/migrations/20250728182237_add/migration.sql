/*
  Warnings:

  - A unique constraint covering the columns `[isSubscribed]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_isSubscribed_key" ON "user"("isSubscribed");
