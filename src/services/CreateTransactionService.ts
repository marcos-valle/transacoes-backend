// Importando o cliente do Prisma para interagir com o banco de dados
import prismaClient from "../prisma";

// Interface que define o formato dos dados para a criação de uma transação
interface ICreateTransaction {
    description: string; // Descrição da transação
    amount: number;      // Valor da transação
    type: "DESPESA" | "RECEITA"; // Tipo da transação (DESPESA ou RECEITA)
    person_id: string;  // ID da pessoa associada à transação
}

// Classe responsável pelo serviço de criação de transações
export class CreateTransactionService {
    // Método assíncrono que executa a criação de uma transação no banco de dados
    async execute({ description, amount, type, person_id }: ICreateTransaction) {
        // Verificando se todos os campos obrigatórios foram preenchidos
        if(!description || !amount || !type || !person_id) {
            throw new Error("Preencha todos os campos");
        }

        // Buscando a pessoa no banco de dados usando o ID fornecido
        const person = await prismaClient.person.findUnique({
            where: {
                id: person_id,
            }
        });

        // Se a pessoa não for encontrada, lança um erro
        if(!person) {
            throw new Error("Pessoa não encontrada");
        }

        // Verificando se a pessoa é menor de 18 anos e tentando registrar uma receita
        if( person.age < 18 && type === "RECEITA") {
            throw new Error("Menores de 18 anos não podem ter receitas");
        }

        // Se for uma despesa, o valor será negativo
        if(type === "DESPESA") {
            amount = -Math.abs(amount);  // Garante que o valor da despesa seja negativo
        }

        // Criando a transação no banco de dados
        const transaction = await prismaClient.transaction.create({
            data: {
                description, // Descrição da transação
                amount,      // Valor da transação
                type,        // Tipo da transação (RECEITA ou DESPESA)
                person_id,   // ID da pessoa associada à transação
            }
        });

        // Retorna a transação criada
        return transaction;
    }
}
