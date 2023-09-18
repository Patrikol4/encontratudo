import type { User, Anuncio } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Anuncio, Empresa } from "@prisma/client";

export function getAnuncios({
  id,
  userId,
}: Pick<Anuncio, "id"> & {
  userId: User["id"];
}) {
  return prisma.anuncio.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getAnunciosListItems({ userId }: { userId: User["id"] }) {
  return prisma.anuncio.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createAnuncio({
  body,
  title,
  userId,
}: Pick<Anuncio, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.anuncio.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function updateAnuncio({
  id,
  body,
  title,
}: Pick<Anuncio, "id" | "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.anuncio.update({
    where: { id },
    data: {
      title,
      body,
      user: {
        connect: {
          id: id,
        }
      }
    }
  })
}

export function deleteAnuncio({
  id,
  userId,
}: Pick<Anuncio, "id"> & { userId: User["id"] }) {
  return prisma.anuncio.deleteMany({
    where: { id, userId },
  });
}
