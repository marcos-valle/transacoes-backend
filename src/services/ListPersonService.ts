// Importando o cliente do Prisma para interagir com o banco de dados
import prismaClient from "../prisma";

// Classe responsável por listar as pessoas no banco de dados
export class ListPersonService {
    // Método assíncrono que retorna uma lista de pessoas do banco de dados
    async execute() {
        // Buscando todas as pessoas no banco de dados
        const persons = await prismaClient.person.findMany();

        // Retornando a lista de pessoas
        return persons;
    }
}
