import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Outlet, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createAnuncio } from "~/models/anuncios.server";

import { requireUserId } from "~/session.server";

export const meta: V2_MetaFunction = () => [{ title: "EncontraTudo : Novo Anúncio" }];


export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const nomeAnuncio = formData.get("nomeAnuncio");
  const empresa = formData.get("empresa");
  const pacoteDivulgacao = formData.get("pacoteDivulgacao");
  const formaPagamento = formData.get("formaPagamento");

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

  if (typeof nomeAnuncio != "string" || nomeAnuncio.length === 0) {
    return json(
      { errors: { body: null, title: null, nomeAnuncio: "É necessário colocar um nome no anúncio." } },
      { status: 400 },
    );
  }

  if (typeof empresa != "string" || empresa.length === 0) {
    return json(
      { errors: { body: null, title: null, empresa: "É necessário selecionar a empresa." } },
      { status: 400 },
    );
  }


  if (typeof pacoteDivulgacao != "string" || pacoteDivulgacao.length === 0) {
    return json(
      { errors: { body: null, title: null, empresa: null, pacoteDivulgacao: "É necessário escolher um pacote de divulgação para o anúncio." } },
      { status: 400 },
    );
  }


  if (typeof formaPagamento != "string" || formaPagamento.length === 0) {
    return json(
      { errors: { body: null, title: null, empresa: null, formaPagamento: "Escolha uma forma de pagamento." } },
      { status: 400 },
    );
  }

  const note = await createAnuncio({ body, title, userId });

  return redirect(`/anuncios/${note.id}`);
};

export default function AnuncioNovoPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const nomeAnuncioRef = useRef<HTMLInputElement>(null);
  const empresaRef = useRef<HTMLSelectElement>(null);
  const pacoteDivulgacaoRef = useRef<HTMLSelectElement>(null);
  const formaPagamentoRef = useRef<HTMLSelectElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors) {
      switch (actionData) {
        case titleRef:
          titleRef.current?.focus();
          break;
        case nomeAnuncioRef:
          nomeAnuncioRef.current?.focus();
          break;
        case empresaRef:
          empresaRef.current?.focus();
          break;
        case pacoteDivulgacaoRef:
          pacoteDivulgacaoRef.current?.focus();
          break;
        case formaPagamentoRef:
          formaPagamentoRef.current?.focus();
          break;

      }
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  // useEffect(() => {
  //   if (actionData?.errors?.title) {
  //     titleRef.current?.focus();
  //   } else if (actionData?.errors?.body) {
  //     bodyRef.current?.focus();
  //   }
  // }, [actionData]);

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
        <label className="flex flex-col">
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
          <select name="empresa" ref={empresaRef} id="empresa" className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose">
            <option value="volvo">Empresa 1</option>
            <option value="saab">Empresa 2</option>
            <option value="mercedes">Empresa 3</option>
            <option value="audi">Empresa 4</option>
          </select>
        </label>
        {actionData?.errors?.empresa ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.empresa}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Pacote de divulgação </span>
          <select name="pacoteDivulgacao" id="pacoteDivulgacao" className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </label>
        {actionData?.errors?.pacoteDivulgacao ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.pacoteDivulgacao}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Forma de Pagamento </span>
          <select name="formaPagamento" id="formaPagamento" className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose">
            <option value="volvo">PIX</option>
            <option value="saab">Boleto</option>
            <option value="mercedes">Cartão de Crédito</option>
            <option value="audi">Depósito Bancário</option>
          </select>
        </label>
        {actionData?.errors?.formaPagamento ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.formaPagamento}
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
