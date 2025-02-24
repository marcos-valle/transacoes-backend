// Importando o cliente do Prisma para interagir com o banco de dados
import prismaClient from "../prisma"

// Classe responsável por listar as transações no banco de dados
export class ListTransactionService {
    // Método assíncrono que retorna uma lista de transações do banco de dados
    async execute() {
        // Buscando todas as transações no banco de dados
        const transactions = await prismaClient.transaction.findMany();
        
        // Retornando a lista de transações
        return transactions;
    }
}
