import type { User, Empresa, Cidades, Categoria } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Empresa } from "@prisma/client";

export function getEmpresa({
  id,
  userId,
}: Pick<Empresa, "id" | "nomeEmpresa"> & {
  userId: User["id"]; cidadeId: Cidades["id"]; negocioId: Categoria["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true },
    where: { id, userId },
  });
}

export function getEmpresaListItems({ userId }: { userId: User["id"] }) {
  return prisma.empresa.findMany({
    where: { userId },
    select: { id: true },
  });
}

export function createEmpresa({
  nomeEmpresa,
  enderecoEmpresa,
  cidadeId,
  negocioId,
  descricaoEmpresa,
  userId,
}: Pick<Empresa, "nomeEmpresa" | "enderecoEmpresa" | "descricaoEmpresa"> & {
  userId: User["id"]; cidadeId: Cidades["id"]; negocioId: ["id"];
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
