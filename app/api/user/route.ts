import { type NextRequest, NextResponse } from "next/server";
import prisma from "../db";
import catchAsync from "@/utils/shared/catchAsync";
import type { IRegister } from "@/utils/types/auth";
import passwordUtils from "@/utils/shared/passwordUtils";

export const POST = catchAsync(async (request: NextRequest) => {
  const body = await request.json();
  const data: IRegister = body;
  const isUserExist = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (isUserExist)
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 },
    );

  const createdUser = await prisma.user.create({
    data: {
      ...data,
      password: await passwordUtils.encryptPassword(data.password),
    },
  });
  if (!createdUser)
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  return NextResponse.json(
    {
      message: "Registered successfully",
      data: createdUser,
    },
    { status: 201 },
  );
});
