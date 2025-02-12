-- CreateTable
CREATE TABLE "Hospital" (
    "id" STRING NOT NULL,
    "names" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "location" STRING NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mortality" (
    "id" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "location" STRING NOT NULL,
    "dateOn" TIMESTAMP(3) NOT NULL,
    "registeredOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" STRING NOT NULL DEFAULT 'pending',
    "hospitalId" STRING NOT NULL,

    CONSTRAINT "Mortality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relative" (
    "id" STRING NOT NULL,
    "names" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "location" STRING NOT NULL,
    "relationship" STRING NOT NULL,
    "mortalityId" STRING NOT NULL,

    CONSTRAINT "Relative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" STRING NOT NULL,
    "amount" FLOAT8 NOT NULL,
    "method" STRING NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pickUpDate" TIMESTAMP(3) NOT NULL,
    "relativeId" STRING NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mortality" ADD CONSTRAINT "Mortality_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relative" ADD CONSTRAINT "Relative_mortalityId_fkey" FOREIGN KEY ("mortalityId") REFERENCES "Mortality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_relativeId_fkey" FOREIGN KEY ("relativeId") REFERENCES "Relative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
