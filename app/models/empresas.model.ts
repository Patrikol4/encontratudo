export interface Empresas {
    id: string;
    nomeEmpresa: string;
    enderecoEmpresa: string; // relation table empresas
    cidade: string; // relation table cidades
    categoria: string; // relation table categorias
    descricaoEmpresa: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string; // relation table users
}