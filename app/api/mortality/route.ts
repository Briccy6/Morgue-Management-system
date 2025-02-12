import { NextResponse } from "next/server";
import prisma from "../db";
import catchAsync from "@/utils/shared/catchAsync";

export const GET = catchAsync(async () => {
  return NextResponse.json(
    {
      message: "List of all mortalities",
      data: await prisma.mortality
        .findMany({
          select: {
            id: true,
            nid: true,
            firstName: true,
            lastName: true,
            location: true,
            dob: true,
            diedOn: true,
            registeredOn: true,
            status: true,
            hospital: {
              select: {
                id: true,
                user: {
                  select: {
                    names: true,
                    email: true,
                    location: true,
                  },
                },
              },
            },
            claim: {
              select: {
                id: true,
                amount: true,
                method: true,
                paidAt: true,
                pickUpDate: true,
                relationship: true,
                relative: {
                  select: {
                    id: true,
                    nid: true,
                    tel: true,
                    user: {
                      select: {
                        names: true,
                        email: true,
                        location: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .then((mortalities) =>
          mortalities.map((mortality) => ({
            ...mortality,
            hospital: {
              id: mortality.hospital.id,
              ...mortality.hospital.user,
            },
            claim: mortality.claim
              ? {
                  ...mortality.claim,
                  relative: {
                    ...mortality.claim.relative,
                    ...mortality.claim.relative.user,
                  },
                }
              : undefined,
          })),
        ),
    },
    { status: 200 },
  );
});

// const findMortalityByNID = async (nid: string): Promise<IResponse<IMortalityResponse | null>> => {
//     const mortality = await prisma.mortality.findUnique({
//         where: { nid },
//         select: {
//             id: true,
//             nid: true,
//             firstName: true,
//             lastName: true,
//             location: true,
//             dob: true,
//             diedOn: true,
//             registeredOn: true,
//             status: true,
//             hospital: {
//                 select: {
//                     id: true,
//                     user: {
//                         select: {
//                             names: true,
//                             email: true,
//                             location: true,
//                         }
//                     }
//                 }
//             },
//             claim: {
//                 select: {
//                     id: true,
//                     amount: true,
//                     method: true,
//                     paidAt: true,
//                     pickUpDate: true,
//                     relationship: true,
//                     relative: {
//                         select: {
//                             id: true,
//                             nid: true,
//                             tel: true,
//                             user: {
//                                 select: {
//                                     names: true,
//                                     email: true,
//                                     location: true,
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     });

//     const formattedMortality = mortality ? {
//         ...mortality,
//         hospital: {
//             id: mortality.hospital.id,
//             ...mortality.hospital.user
//         },
//         claim: mortality.claim ? {
//             ...mortality.claim,
//             relative: {
//                 ...mortality.claim.relative,
//                 ...mortality.claim.relative.user
//             }
//         } : undefined
//     } : null;

//     return createResponse({
//         status: !!mortality,
//         message: mortality ? "Mortality found" : "Mortality not found",
//         data: formattedMortality
//     });
// }
