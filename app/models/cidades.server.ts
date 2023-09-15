import type { User, Cidades } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Cidades } from "@prisma/client";

export function getCidade({
  id,
  userId,
}: Pick<Cidades, "id"> & {
  userId: User["id"];
}) {
  return prisma.cidades.findFirst({
    select: { id: true, nomeCidade: true },
    where: { id, userId },
  });
}

export function getCidadeListItems({ userId }: { userId: User["id"] }) {
  return prisma.cidades.findMany({
    where: { userId }, // esse where pode ser excluído depois, para que o adm tenha acesso a TODAS as cidades cadastradas no sistema.
    select: { id: true, nomeCidade: true },
    //orderBy: { updatedAt: "desc" },
  });
}

export function createCidade({
  nomeCidade,
  userId,
}: Pick<Cidades, "nomeCidade"> & {
  userId: User["id"];
}) {
  return prisma.cidades.create({
    data: {
      nomeCidade,
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
}: Pick<Cidades, "id"> & { userId: User["id"] }) {
  return prisma.cidades.deleteMany({
    where: { id, userId },
  });
}
