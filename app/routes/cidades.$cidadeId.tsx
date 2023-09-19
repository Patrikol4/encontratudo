import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteCidade, getCidade } from "~/models/cidades.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.cidadeId, "Id da Cidade não encontrado.");

  const note = await getCidade({ id: params.cidadeId, userId });
  if (!note) {
    throw new Response("Não encontrado", { status: 404 });
  }
  return json({ note });
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.cidadeId, "cidadeId não encontrado.");

  await deleteCidade({ id: params.cidadeId, userId });

  return redirect("/cidades/");
};

export default function CidadesIdPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.cidades.nomeCidade}</h3>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-red-500 px-4 py-2 text-black hover:bg-red-600 focus:bg-red-400"
        >
          Deletar Cidade
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
    return <div>Cidade não encontrada.</div>;
  }

  return <div>Um erro inesperado aconteceu. Código : {error.statusText}</div>;
}
