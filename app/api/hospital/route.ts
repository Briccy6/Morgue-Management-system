import { NextResponse } from "next/server";
import prisma from "../db";
import catchAsync from "@/utils/shared/catchAsync";

export const GET = catchAsync(async () => {
  return NextResponse.json(
    {
      message: "List of all hospitals",
      data: await prisma.hospital.findMany({
        select: {
          id: true,
          user: {
            select: {
              id: true,
              names: true,
              email: true,
              location: true,
            },
          },
        },
      }),
    },
    { status: 200 },
  );
});
