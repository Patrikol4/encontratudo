import type { User, Empresa } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Empresa } from "@prisma/client";

export function getEmpresa({
  id,
  userId,
}: Pick<Empresa, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getEmpresaListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createEmpresa({
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

export function updateEmpresa({
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

export function deleteEmpresa({
  id,
  userId,
}: Pick<Empresa, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
