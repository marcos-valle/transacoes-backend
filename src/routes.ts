// Importando tipos do Fastify para utilizar na definição das rotas e das requisições
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

// Importando os controladores responsáveis pelo tratamento das requisições
import { CreatePersonController } from "./controllers/CreatePersonController";
import { CreateTransactionController } from "./controllers/CreateTransactionController";
import { ListPersonController } from "./controllers/ListPersonController";
import { ListTransactionController } from "./controllers/ListTransactionController";
import { DeletePersonController } from "./controllers/DeletePersonController";
import { TotalAmountController } from "./controllers/TotalAmountController";

// Função responsável por definir todas as rotas do servidor Fastify
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    // Rota POST para criação de uma nova pessoa, utilizando o controlador CreatePersonController
    fastify.post("/person", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePersonController().handle(request, reply);
    });
    
    // Rota GET para listar todas as pessoas cadastradas, utilizando o controlador ListPersonController
    fastify.get("/person-list", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListPersonController().handle(request, reply);
    });

    // Rota POST para criação de uma nova transação, utilizando o controlador CreateTransactionController
    fastify.post("/transaction", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateTransactionController().handle(request, reply);
    });

    // Rota GET para listar todas as transações registradas, utilizando o controlador ListTransactionController
    fastify.get("/transaction-list", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListTransactionController().handle(request, reply);
    });

    // Rota DELETE para excluir uma pessoa, utilizando o controlador DeletePersonController
    fastify.delete("/person", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeletePersonController().handle(request, reply);
    });

    // Rota GET para obter os totais gerais de receitas, despesas e saldo, utilizando o controlador TotalAmountController
    fastify.get("/totals", async (request: FastifyRequest, reply: FastifyReply) => {
        return new TotalAmountController().handle(request, reply);
    });
}
