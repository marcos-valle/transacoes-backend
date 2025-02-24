// Importando as interfaces do Fastify para tipos de requisição e resposta
import { FastifyRequest, FastifyReply } from "fastify";
// Importando o serviço que lida com a criação de uma transação
import { CreateTransactionService } from "../services/CreateTransactionService";

// Classe responsável por controlar a criação de uma transação
export class CreateTransactionController {
    // Método assíncrono que manipula a requisição de criação de transação
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Desestruturando os dados da transação a partir do corpo da requisição
        const { description, amount, type, person_id } = request.body as {description: string, amount: number, type: "RECEITA" | "DESPESA", person_id: string};
        
        // Criando uma instância do serviço de criação de transação
        const transactionService = new CreateTransactionService();
        // Chamando o método 'execute' do serviço para criar a transação
        const transaction = await transactionService.execute({ description, amount, type, person_id });

        // Respondendo com os dados da transação criada
        reply.send(transaction);
    }
}
