// Importando as interfaces do Fastify para tipos de requisição, resposta e plugins assíncronos
import { FastifyRequest, FastifyReply, FastifyPluginAsync } from "fastify";
// Importando o serviço que lida com a exclusão de uma pessoa
import { DeletePersonService } from "../services/DeletePersonService";

// Classe responsável por controlar a exclusão de uma pessoa
export class DeletePersonController {
    // Método assíncrono que manipula a requisição para deletar uma pessoa
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Desestruturando o id da pessoa a partir da query string
        const { id } = request.query as { id: string};

        // Criando uma instância do serviço de exclusão de pessoa
        const personService = new DeletePersonService();

        // Chamando o método 'execute' do serviço para excluir a pessoa
        await personService.execute({ id });

        // Respondendo com uma confirmação da exclusão
        reply.send({ message: "Pessoa excluída com sucesso" });
    }
}
