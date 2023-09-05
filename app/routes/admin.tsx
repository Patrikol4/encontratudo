import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getCidadeListItems } from "~/models/cidades.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "EncontraTudo" }];


export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const cidadeListItems = await getCidadeListItems({ userId }); // a cidadeListItems sempre requere o userId do usuario, posteriormente será removido isso.
  return json({ cidadeListItems });
};

export default function AdminPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">EncontraTudo</Link>
        </h1>
        <p>Olá, {user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Sair
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Nova cidade
          </Link>

          <hr />

          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Nova categoria de usuário
          </Link>

          <hr />

          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Nova categoria de negócios
          </Link>

          <hr />

          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Nova Empresa
          </Link>

          <hr />

          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Novo anúncio
          </Link>



          {data.cidadeListItems.length === 0 ? (
            <p className="p-4">Nenhuma cidade ainda</p>
          ) : (
            <ol>
              {data.cidadeListItems.map((cidade) => (
                <li key={cidade.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={cidade.id}
                  >
                    📝 {cidade.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
