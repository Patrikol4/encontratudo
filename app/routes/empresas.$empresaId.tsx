import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteEmpresa, getEmpresa } from "~/models/empresa.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.empresaId, "Id da Empresa não encontrado.");

  const empresas = await getEmpresa({ id: params.empresaId, userId });
  if (!empresas) {
    throw new Response("Não encontrado", { status: 404 });
  }
  return json({ empresas });
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.empresaId, "empresaId não encontrada.");

  await deleteEmpresa({ id: params.empresaId, userId });

  return redirect("/empresas/");
};

export default function EmpresasIdPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.empresas.nomeEmpresa}</h3>
      <p>{data.empresas.descricaoEmpresa}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-red-500 px-4 py-2 text-black hover:bg-red-600 focus:bg-red-400"
        >
          Deletar Empresa
        </button>
        <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 text-black hover:bg-orange-600 focus:bg-orange-400"
        >
          Editar Empresa
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>Um erro inesperado ocorreu: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Erro desconhecido</h1>;
  }

  if (error.status === 404) {
    return <div>Empresa não encontrada.</div>;
  }

  return <div>Um erro inesperado aconteceu. Código : {error.statusText}</div>;
}
