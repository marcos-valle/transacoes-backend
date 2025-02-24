// Importando as interfaces do Fastify para tipos de requisição e resposta
import { FastifyRequest, FastifyReply } from "fastify";
// Importando o serviço que lida com a listagem de pessoas
import { ListPersonService } from "../services/ListPersonService";

// Classe responsável por controlar a listagem de pessoas
export class ListPersonController {
    // Método assíncrono que manipula a requisição para listar as pessoas
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Criando uma instância do serviço de listagem de pessoas
        const listPerson = new ListPersonService();

        // Chamando o método 'execute' do serviço para obter todas as pessoas
        const persons = await listPerson.execute();

        // Respondendo com a lista de pessoas
        reply.send(persons);
    }
}
