// Importando as interfaces do Fastify para tipos de requisição e resposta
import { FastifyRequest, FastifyReply } from "fastify";
// Importando o serviço que lida com a listagem de transações
import { ListTransactionService } from "../services/ListTransactionService";

// Classe responsável por controlar a listagem de transações
export class ListTransactionController {
    // Método assíncrono que manipula a requisição para listar as transações
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Criando uma instância do serviço de listagem de transações
        const listTransaction = new ListTransactionService();

        // Chamando o método 'execute' do serviço para obter todas as transações
        const transactions = await listTransaction.execute();

        // Respondendo com a lista de transações
        reply.send(transactions);
    }
}
