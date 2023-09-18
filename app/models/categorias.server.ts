import type { User, Categoria } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Categoria, Empresa } from "@prisma/client";

export function getCategorias({
  id,
  userId,
}: Pick<Categoria, "id"> & {
  userId: User["id"];
}) {
  return prisma.categoria.findFirst({
    select: { id: true},
    where: { id, userId },
  });
}

export function getCategoriasListItems({ userId }: { userId: User["id"] }) {
  return prisma.categoria.findMany({
    where: { userId },
    select: { id: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createCategoria({
  nomeCategoria,
  descricaoCategoria,
  userId,
}: Pick<Categoria, "nomeCategoria" | "descricaoCategoria"> & {
  userId: User["id"];
}) {
  return prisma.categoria.create({
    data: {
      nomeCategoria,
      descricaoCategoria,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function updateCategoria({
  id,
  nomeCategoria,
  descricaoCategoria,
}: Pick<Categoria, "id" | "nomeCategoria" | "descricaoCategoria"> & {
  userId: User["id"];
}) {
  return prisma.categoria.update({
    where: { id },
    data: {
      nomeCategoria,
      descricaoCategoria,
      user: {
        connect: {
          id: id,
        }
      }
    }
  })
}

export function deleteCategoria({
  id,
  userId,
}: Pick<Categoria, "id"> & { userId: User["id"] }) {
  return prisma.categoria.deleteMany({
    where: { id, userId },
  });
}
