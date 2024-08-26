import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string")
    return new NextResponse("Invalid listing ID", { status: 500 });

  try {
    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
