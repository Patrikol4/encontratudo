import type { User, Empresa } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Empresa } from "@prisma/client";

export function getEmpresa({
  id,
  userId,
}: Pick<Empresa, "id"> & {
  userId: User["id"];
}) {
  return prisma.empresa.findFirst({
    select: { id: true, nomeEmpresa: true, enderecoEmpresa: true, descricaoEmpresa: true },
    where: { id, userId, },
  });
}

export function getEmpresaListItems({ userId }: { userId: User["id"] }) {
  return prisma.empresa.findMany({
    where: { userId },
    select: { id: true, nomeEmpresa: true, enderecoEmpresa: true, descricaoEmpresa: true },
    orderBy: {nomeEmpresa: "asc"},
  });
}

export function createEmpresa({
  nomeEmpresa,
  enderecoEmpresa,
  descricaoEmpresa,
  cidadeId,
  negocioId,
  userId,
}: Pick<Empresa, "nomeEmpresa" | "enderecoEmpresa" | "descricaoEmpresa" | "cidadeId" | "negocioId"> & {
  userId: User["id"];
}) {
  return prisma.empresa.create({
    data: {
      nomeEmpresa,
      enderecoEmpresa,
      descricaoEmpresa,
      user: {
        connect: {
          id: userId,
        },
      },
      cidadeId,
      negocioId,
    },
  });
}

export function updateEmpresa({
  id,
  nomeEmpresa,
  enderecoEmpresa,
  cidadeId,
  negocioId,
  descricaoEmpresa,

}: Pick<Empresa, "id" | "nomeEmpresa" | "enderecoEmpresa" | "cidadeId" | "negocioId" | "descricaoEmpresa"> & {
  userId: User["id"];
}) {
  return prisma.empresa.update({
    where: { id },
    data: {
      nomeEmpresa,
      enderecoEmpresa,
      descricaoEmpresa,

      user: {
        connect: {
          id: id,
        },
      },
      cidadeId: id,
    }
  })
}

export function deleteEmpresa({
  id,
  userId,
}: Pick<Empresa, "id"> & { userId: User["id"] }) {
  return prisma.empresa.deleteMany({
    where: { id, userId },
  });
}
