// Importando as interfaces do Fastify para tipos de requisição e resposta
import { FastifyRequest, FastifyReply } from "fastify";
// Importando o serviço que lida com o cálculo do total de valores (receitas, despesas, saldo)
import { TotalAmountService } from "../services/TotalAmountService";

// Classe responsável por controlar o cálculo e retorno dos totais de receitas, despesas e saldo
export class TotalAmountController {
    // Método assíncrono que manipula a requisição para calcular e retornar os totais
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Criando uma instância do serviço de cálculo de totais
        const totalAmountService = new TotalAmountService();
        
        // Chamando o método 'execute' do serviço para calcular os totais
        const totalAmount = await totalAmountService.execute();

        // Respondendo com os totais calculados (receitas, despesas, saldo)
        reply.send(totalAmount);
    }
}
