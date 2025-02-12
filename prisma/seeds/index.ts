import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import dotenv from "dotenv";
import { MortalityStatusEnum, UserRoleEnum } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const password = process.env.DEFAULT_PASSWORD || "Password@123";
  // Create Users
  const users = await Promise.all([
    createUser(
      "Admin User",
      "admin@gmail.com",
      password,
      UserRoleEnum.ADMIN,
      "Kigali",
    ),
    createUser(
      "Hospital User 1",
      "hospital1@gmail.com",
      password,
      UserRoleEnum.HOSPITAL,
      "Kigali",
    ),
    createUser(
      "Hospital User 2",
      "hospital2@gmail.com",
      password,
      UserRoleEnum.HOSPITAL,
      "Gisenyi",
    ),
    createUser(
      "Relative User 1",
      "relative1@gmail.com",
      password,
      UserRoleEnum.RELATIVE,
      "Kigali",
    ),
    createUser(
      "Relative User 2",
      "relative2@gmail.com",
      password,
      UserRoleEnum.RELATIVE,
      "Butare",
    ),
  ]);

  // Create Hospitals
  const hospitals = await Promise.all([
    createHospital(users[1].id),
    createHospital(users[2].id),
  ]);

  // Create Relatives
  const relatives = await Promise.all([
    createRelative(users[3].id),
    createRelative(users[4].id),
  ]);

  // Create Mortalities
  const mortalities = await Promise.all([
    createMortality(
      "1234567890",
      "John",
      "Doe",
      "Kigali",
      new Date("1980-01-01"),
      hospitals[0].id,
    ),
    createMortality(
      "2345678901",
      "Jane",
      "Smith",
      "Gisenyi",
      new Date("1985-05-05"),
      hospitals[0].id,
    ),
    createMortality(
      "3456789012",
      "Alice",
      "Johnson",
      "Butare",
      new Date("1990-10-10"),
      hospitals[1].id,
    ),
    createMortality(
      "4567890123",
      "Bob",
      "Brown",
      "Kigali",
      new Date("1975-12-25"),
      hospitals[1].id,
    ),
    createMortality(
      "5678901234",
      "Charlie",
      "Davis",
      "Gisenyi",
      new Date("1988-07-07"),
      hospitals[0].id,
    ),
  ]);

  // Create Claims
  await Promise.all([
    createClaim(
      10000,
      "Bank Transfer",
      new Date("2024-08-01"),
      "Sibling",
      relatives[0].id,
      mortalities[0].id,
    ),
    createClaim(
      15000,
      "Cash",
      new Date("2024-08-15"),
      "Child",
      relatives[1].id,
      mortalities[1].id,
    ),
    createClaim(
      12000,
      "Bank Transfer",
      new Date("2024-09-01"),
      "Spouse",
      relatives[0].id,
      mortalities[2].id,
    ),
    createClaim(
      18000,
      "Cash",
      new Date("2024-09-15"),
      "Parent",
      relatives[1].id,
      mortalities[3].id,
    ),
    createClaim(
      11000,
      "Bank Transfer",
      new Date("2024-10-01"),
      "Sibling",
      relatives[0].id,
      mortalities[4].id,
    ),
  ]);

  console.log("Seed data inserted successfully.");
}

async function createUser(
  names: string,
  email: string,
  password: string,
  role: UserRoleEnum,
  location: string,
) {
  const hashedPassword = await hash(password, 10);
  return prisma.user.create({
    data: { names, email, password: hashedPassword, role, location },
  });
}

async function createHospital(userId: string) {
  return prisma.hospital.create({
    data: { userId },
  });
}

async function createRelative(userId: string) {
  return prisma.relative.create({
    data: {
      nid: Math.random().toString().slice(2, 12),
      tel: `+250${Math.random().toString().slice(2, 11)}`,
      userId,
    },
  });
}

async function createMortality(
  nid: string,
  firstName: string,
  lastName: string,
  location: string,
  dob: Date,
  hospitalId: string,
) {
  return prisma.mortality.create({
    data: {
      nid,
      firstName,
      lastName,
      location,
      dob,
      diedOn: new Date(),
      status: MortalityStatusEnum.UNCLAIMED,
      hospitalId,
    },
  });
}

async function createClaim(
  amount: number,
  method: string,
  pickUpDate: Date,
  relationship: string,
  relativeId: string,
  mortalityId: string,
) {
  return prisma.claim.create({
    data: {
      amount,
      method,
      paidAt: new Date(),
      pickUpDate,
      relationship,
      relativeId,
      mortalityId,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
