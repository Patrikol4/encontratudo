import type { User, Anuncios, Empresa } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Anuncios, Empresa } from "@prisma/client";

export function getAnuncios({
  id,
  userId,
}: Pick<Anuncios, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getAnunciosListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createAnuncio({
  body,
  title,
  userId,
}: Pick<Empresa, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
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
}: Pick<Empresa, "id" | "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.note.update({
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
}: Pick<Empresa, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
