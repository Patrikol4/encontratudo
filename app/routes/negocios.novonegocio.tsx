import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Outlet, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createAnuncio } from "~/models/anuncios.server";

import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 },
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: "Body is required", title: null } },
      { status: 400 },
    );
  }

  const note = await createAnuncio({ body, title, userId });

  return redirect(`/anuncios/${note.id}`);
};

export default function NegocioNovoPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Nome do Anúncio </span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Selecionar empresa </span>
          <select name="cars" id="cars" className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose">
            <option value="volvo">Empresa 1</option>
            <option value="saab">Empresa 2</option>
            <option value="mercedes">Empresa 3</option>
            <option value="audi">Empresa 4</option>
          </select>
        </label>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Pacote de divulgação </span>
          <select name="cars" id="cars" className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </label>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>



      <div className="text-center">
        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 text-black hover:bg-green-600 focus:bg-green-400"
        >
          Criar Anúncio
        </button>
        <Outlet />
      </div>
    </Form>
  );
}
