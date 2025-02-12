import { type NextRequest, NextResponse } from "next/server";

type ApiHandler = (req: NextRequest, params?: any) => Promise<NextResponse>;

const catchAsync =
  (handler: ApiHandler) => async (req: NextRequest, params?: any) => {
    try {
      return await handler(req, params);
    } catch (error) {
      console.error("API Error:", error);

      if (error instanceof Error) {
        return NextResponse.json(
          { message: error.message || "An unexpected error occurred." },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: "An unexpected error occurred." },
        { status: 500 },
      );
    }
  };

export default catchAsync;
