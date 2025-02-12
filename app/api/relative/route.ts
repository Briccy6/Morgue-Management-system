import { NextResponse } from "next/server";
import prisma from "../db";
import catchAsync from "@/utils/shared/catchAsync";

export const GET = catchAsync(async () => {
  return NextResponse.json(
    {
      message: "List of all relatives",
      data: await prisma.relative.findMany({
        select: {
          id: true,
          tel: true,
          nid: true,
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
