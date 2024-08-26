import { prisma } from "@/lib/db";

interface IParmas {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParmas) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) query.listingId = listingId;

    if (userId) query.userId = userId;

    if (authorId) query.listing = { userId: authorId };

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
      user: {
        name: reservation.user.name,
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
