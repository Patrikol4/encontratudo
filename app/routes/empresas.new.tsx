import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createEmpresa } from "~/models/empresa.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const enderecoEmpresa = formData.get("enderecoEmpresa");
  const cidadeEmpresa = formData.get("cidadeEmpresa");
  const tipoNegocio = formData.get("tipoNegocio");
  const imagemDestacada = formData.get("imagemDestacada");
  const miniaturaEmpresa = formData.get("miniaturaEmpresa");
  const galeria1 = formData.get("galeria1");
 // const galeria2 = formData.get("galeria2");
 // const galeria3 = formData.get("galeria3");
  //const galeria4 = formData.get("galeria4");
  // Pesquisar depois com cuidado sobre galeria de imagens && disponibilidade. 
  // ver se consigo implementar cloudflare para imagens.
// ver alternativas grátis



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

  if(typeof enderecoEmpresa !== "string" || enderecoEmpresa.length === 0){
    return json(
      { errors: { body: null, title: null, enderecoEmpresa: "Endereço da Empresa precisa ser informado." } },
      { status: 400 },
    )
  }
// cidadeEmpresa NÃO É STRING, mas sim puxa um ID correspondente ao select que listará as opções buscadas diretamente de dentro do banco.
  if(typeof cidadeEmpresa !== "string" || cidadeEmpresa.length === 0){
    return json(
      { errors: { body: null, title: null, enderecoEmpresa: null, cidadeEmpresa: "Cidade da Empresa precisa ser informada." } },
      { status: 400 },
    )
  }

  if(typeof tipoNegocio !== "string" || tipoNegocio.length === 0){
    return json(
      { errors: { body: null, title: null, enderecoEmpresa: null, cidadeEmpresa: null, tipoNegocio: "Tipo de Negócio precisa ser informado."} },
      { status: 400 },
    )
  }
// Esse ImagemDestacada deverá ser visto com atenção, pois mexerá com manipulação e upload de arquivos. Portanto, estudar essa parte com cuidado.
  if(typeof imagemDestacada !== "string" || imagemDestacada.length === 0){
    return json(
      { errors: { body: null, title: null, enderecoEmpresa: null, cidadeEmpresa: null, tipoNegocio: null, imagemDestacada: "URL da imagem destacada precisa ser informada."} },
      { status: 400 },
    )
  }
// Ainda estou pensando se vou ou não colocar como obrigatório o upload da miniatura da empresa.
  if(typeof miniaturaEmpresa !== "string" || miniaturaEmpresa.length === 0){
    return json(
      { errors: { body: null, title: null, enderecoEmpresa: null, cidadeEmpresa: null, tipoNegocio: null, imagemDestacada: null, miniaturaEmpresa: "É necessário colocar uma foto de miniatura da empresa"} },
      { status: 400 },
    )
  }
  if(typeof galeria1 !== "string" || galeria1.length === 0){
    return json(
      { errors: { body: null, title: null, enderecoEmpresa: null, cidadeEmpresa: null, tipoNegocio: null, imagemDestacada: null, miniaturaEmpresa: null, galeria1: "Insira pelo menos uma imagem para aparecer na galeria."} },
      { status: 400 },
    )
  }

  const note = await createEmpresa({ body, title, userId });

  return redirect(`/minha-empresa/${note.id}`);
};

export default function NewNotePage() {
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
          <span>Nome da Empresa: </span>
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
          <span>Conteúdo: </span>
          <textarea
            ref={bodyRef}
            name="body"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.body ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.body}
          </div>
        ) : null}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Criar
        </button>
      </div>
    </Form>
  );
}
