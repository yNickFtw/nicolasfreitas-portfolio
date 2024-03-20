-- CreateTable
CREATE TABLE "TechnologiesLinker" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "TechnologiesLinker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnologiesLinker_projectId_key" ON "TechnologiesLinker"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnologiesLinker_languageId_key" ON "TechnologiesLinker"("languageId");

-- AddForeignKey
ALTER TABLE "TechnologiesLinker" ADD CONSTRAINT "TechnologiesLinker_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologiesLinker" ADD CONSTRAINT "TechnologiesLinker_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
