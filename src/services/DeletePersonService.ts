// Importando o cliente do Prisma para interagir com o banco de dados
import prismaClient from "../prisma";

// Interface que define o formato dos dados para a exclusão de uma pessoa
interface IDeletePerson {
    id: string; // ID da pessoa que será excluída
}

// Classe responsável pelo serviço de exclusão de pessoas
export class DeletePersonService {
    // Método assíncrono que executa a exclusão de uma pessoa no banco de dados
    async execute({ id }: IDeletePerson) {        
        // Verificando se o ID foi fornecido
        if (!id) {
            throw new Error("ID inválido");
        }

        // Buscando a pessoa no banco de dados usando o ID fornecido
        const findPerson = await prismaClient.person.findUnique({
            where: {
                id: id,
            }
        });

        // Se a pessoa não for encontrada, lança um erro
        if (!findPerson) {
            throw new Error("Pessoa não encontrada");
        }
        
        // Excluindo a pessoa do banco de dados
        await prismaClient.person.delete({
            where: {
                id: findPerson.id, // ID da pessoa a ser excluída
            }
        });
    }
}
