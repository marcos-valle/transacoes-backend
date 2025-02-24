// Importando as interfaces do Fastify para tipos de requisição e resposta
import { FastifyRequest, FastifyReply } from "fastify";
// Importando o serviço que lida com a criação de uma pessoa
import { CreatePersonServices } from "../services/CreatePersonServices";

// Classe responsável por controlar a criação de uma pessoa
export class CreatePersonController {
    // Método assíncrono que manipula a requisição de criação de pessoa
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Desestruturando o nome e idade da pessoa a partir do corpo da requisição
        const { name, age } = request.body as {name: string, age: number};
        
        // Criando uma instância do serviço de criação de pessoa
        const personService = new CreatePersonServices();
        // Chamando o método 'execute' do serviço para criar a pessoa
        const person = await personService.execute({ name, age });

        // Respondendo com os dados da pessoa criada
        reply.send(person);
    }
}
