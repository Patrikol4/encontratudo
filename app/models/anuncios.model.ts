export interface Anuncios {
    id: string;
    nomeAnuncio: string;
    empresa: string; // relation table empresas
    status: string; // status do anuncio, se ele está ativo ou não
    createdAt: Date;
    updatedAt: Date;
    userId: string; // relation table users
}