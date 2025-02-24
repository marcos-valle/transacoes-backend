// Importando o cliente do Prisma para interagir com o banco de dados
import prismaClient from "../prisma";

// Classe responsável por calcular o total de receitas, despesas e saldo das pessoas
export class TotalAmountService {
    // Método assíncrono que calcula o total de receitas, despesas e saldo para todas as pessoas
    async execute() {
        // Buscando todas as pessoas no banco de dados, incluindo as transações relacionadas
        const findPeople = await prismaClient.person.findMany({
            include: {
                Transaction: true, // Incluindo transações associadas a cada pessoa
            }
        });

        // Inicializando variáveis para armazenar os totais gerais
        let totalAmount = 0;
        let totalIncome = 0;
        let totalExpense = 0;

        // Mapeando cada pessoa para calcular seus totais individuais
        const result = findPeople.map((person) => {
            let personIncome = 0;
            let personExpense = 0;

            // Iterando sobre as transações de cada pessoa para calcular a receita e despesa
            person.Transaction.forEach(transaction => {
                if(transaction.type === "DESPESA") {
                    personExpense += transaction.amount; // Somando despesas
                } else {
                    personIncome += transaction.amount; // Somando receitas
                }
            });

            // Calculando o saldo total de cada pessoa (receita + despesa)
            const personTotalAmount = personIncome + personExpense;

            // Somando as receitas, despesas e saldo total de todas as pessoas
            totalIncome += personIncome;
            totalExpense += personExpense;
            totalAmount += personTotalAmount;

            // Retornando o total individual de cada pessoa
            return {
                person_id: person.id,
                person_name: person.name,
                person_income: personIncome,
                person_expense: personExpense,
                person_total_amount: personTotalAmount,
            };
        });

        // Retornando os totais gerais e individuais
        return {
            people_total: result, // Total por pessoa
            total_income: totalIncome, // Total de receitas
            total_expense: totalExpense, // Total de despesas
            total_amount: totalAmount, // Total geral (receitas + despesas)
        };
    }
}
