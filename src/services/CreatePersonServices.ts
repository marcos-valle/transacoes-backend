// Importando o cliente do Prisma para interagir com o banco de dados
import prismaClient from "../prisma";

// Interface que define o formato dos dados para criação de uma pessoa
interface ICreatePerson {
    name: string;
    age: number;
}

// Classe responsável pelo serviço de criação de uma pessoa
export class CreatePersonServices {
    // Método assíncrono que executa a criação de uma pessoa no banco de dados
    async execute({ name, age }: ICreatePerson) {
        // Verificando se os campos 'name' e 'age' foram preenchidos
        if(!name || !age) {
            throw new Error("Preencha todos os campos");
        }

        // Criando uma nova pessoa no banco de dados usando Prisma
        const person = await prismaClient.person.create({
            data: {
                name,  // Nome da pessoa
                age,   // Idade da pessoa
            }
        })

        // Retornando o objeto 'person' criado
        return person;
    }
}
