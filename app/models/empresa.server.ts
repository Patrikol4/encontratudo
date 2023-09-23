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
  cidadeEmpresa,
  negocioEmpresa,
  descricaoEmpresa,
  userId,
}: Pick<Empresa, "nomeEmpresa" | "enderecoEmpresa" | "cidadeEmpresa" | "negocioEmpresa" | "descricaoEmpresa"> & {
  userId: User["id"];
}) {
  return prisma.empresa.create({
    data: {
      nomeEmpresa,
      enderecoEmpresa,
      cidadeEmpresa,
      negocioEmpresa,
      descricaoEmpresa,
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
  nomeEmpresa,
  enderecoEmpresa,
  cidadeEmpresa,
  negocioEmpresa,
  descricaoEmpresa,

}: Pick<Empresa, "id" | "nomeEmpresa" | "enderecoEmpresa" | "cidadeEmpresa" | "negocioEmpresa" | "descricaoEmpresa"> & {
  userId: User["id"];
}) {
  return prisma.empresa.update({
    where: { id },
    data: {
      nomeEmpresa,
      enderecoEmpresa,
      cidadeEmpresa,
      negocioEmpresa,
      descricaoEmpresa,

      user: {
        connect: {
          id: id,
        },
      },
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
