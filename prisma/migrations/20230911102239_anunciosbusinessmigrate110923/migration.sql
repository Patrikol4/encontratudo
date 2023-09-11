-- CreateTable
CREATE TABLE "Cidades" (
    "id" TEXT NOT NULL,
    "nomeCidade" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nomeCategoria" TEXT NOT NULL,
    "descricaoCategoria" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nomeEmpresa" TEXT NOT NULL,
    "enderecoEmpresa" TEXT NOT NULL,
    "descricaoEmpresa" TEXT NOT NULL,
    "imagemDestacada" TEXT NOT NULL,
    "miniaturaImgempresa" TEXT NOT NULL,
    "galeriaum" TEXT NOT NULL,
    "galeriadois" TEXT NOT NULL,
    "galeriatres" TEXT NOT NULL,
    "galeriaquatro" TEXT NOT NULL,
    "cidadeId" TEXT NOT NULL,
    "negocioId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TiposNegocios" (
    "id" TEXT NOT NULL,
    "tipoNegocio" TEXT NOT NULL,
    "descricaoTipoNegocio" TEXT NOT NULL,

    CONSTRAINT "TiposNegocios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaUsuario" (
    "id" TEXT NOT NULL,
    "nomeCategoriaUser" TEXT NOT NULL,
    "descricaoCatUser" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CategoriaUsuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cidades" ADD CONSTRAINT "Cidades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "TiposNegocios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaUsuario" ADD CONSTRAINT "CategoriaUsuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
