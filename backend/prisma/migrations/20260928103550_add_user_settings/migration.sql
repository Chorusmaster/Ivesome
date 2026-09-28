-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publicProfile" BOOLEAN NOT NULL DEFAULT true,
    "showEmail" BOOLEAN NOT NULL DEFAULT true,
    "notifyProject" BOOLEAN NOT NULL DEFAULT true,
    "notifyParticipationRequest" BOOLEAN NOT NULL DEFAULT true,
    "notifyComment" BOOLEAN NOT NULL DEFAULT true,
    "notifyConversation" BOOLEAN NOT NULL DEFAULT true,
    "notifyReport" BOOLEAN NOT NULL DEFAULT true,
    "notifyOther" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
