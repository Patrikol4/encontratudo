import type { User, Anuncio, Empresa } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Anuncio, Empresa } from "@prisma/client";

export function getAnuncios({
  id,
  userId,
}: Pick<Anuncio, "id"> & {
  userId: User["id"];
}) {
  return prisma.anuncio.findFirst({
    select: { id: true, nomeAnuncio: true, empresa: true },
    where: { id, userId },
  });
}

export function getAnunciosListItems({ userId }: { userId: User["id"] }) {
  return prisma.anuncio.findMany({
    where: { userId },
    select: { id: true, nomeAnuncio: true, empresa: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createAnuncio({
  nomeAnuncio,
  empresa,
  userId,
}: Pick<Anuncio, "nomeAnuncio" | "empresa" > & {
  userId: User["id"];
}) {
  return prisma.anuncio.create({
    data: {
      nomeAnuncio,
      empresa,
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
  nomeAnuncio,
  empresa,
  userId,
}: Pick<Anuncio, "nomeAnuncio" | "empresa"> & {
  userId: User["id"]; id: Empresa["id"];
}) {
  return prisma.anuncio.update({
    where: { id },
    data: {
    nomeAnuncio,
    empresa,
      user: {
        connect: {
          id: userId,
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
