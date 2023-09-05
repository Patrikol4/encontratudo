import type { User, Cidades } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Cidades } from "@prisma/client";

export function getCidade({
  id,
  userId,
}: Pick<Cidades, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getCidadeListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId }, // esse where pode ser excluído depois, para que o adm tenha acesso a TODAS as cidades cadastradas no sistema.
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createCidade({
  body,
  title,
  userId,
}: Pick<Cidades, "body" | "title"> & {
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

export function deleteCidade({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
