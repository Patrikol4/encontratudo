import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteAnuncio, getAnuncios } from "~/models/anuncios.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.anuncioId, "anúncioId não foi encontrado");

  const anuncios = await getAnuncios({ id: params.anuncioId, userId });
  if (!anuncios) {
    throw new Response("Não encontrado", { status: 404 });
  }
  return json({ anuncios });
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.anuncioId, "anuncioId não encontrado");

  await deleteAnuncio({ id: params.anuncioId, userId });

  return redirect("/anuncios/");
};

export default function AnunciosDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.anuncios.nomeAnuncio}</h3>
      <p className="py-6">{data.anuncios.empresa}</p>
      <hr className="my-4" />
      <Form method="post">
      <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 focus:bg-orange-400"
        >
          Atualizar Anúncio
        </button>
        <button
          type="submit"
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400"
        >
          Deletar Anúncio
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>Um erro inesperado ocorreu : {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Erro desconhecido</h1>;
  }

  if (error.status === 404) {
    return <div>Anúncio não encontrado</div>;
  }

  return <div>Um erro inesperado ocorreu : {error.statusText}</div>;
}
