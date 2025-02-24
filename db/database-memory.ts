// import { Person, Transaction } from "../src/server";

interface Person {
    id: number;
    name: string;
    age: number;
}

interface Transaction {
    id: number;
    person_id: number;
    description: string;
    amount: number;
    type: "RECEITA" | "DESPESA";
}

export class databaseMemory {
    #personList = new Map<number, Person>();
    #transactionsList = new Map<number, Transaction>();
    #person_id_counter = 1;
    #transaction_id_counter = 1;

    createPerson(person: Person) {
        const person_id = this.#person_id_counter++;
        this.#personList.set(person_id, person);
    }

    listPerson(): Person[] {
        return Array.from(this.#personList.values());
    }

    deletePerson(person_id: number) {
        this.#personList.delete(person_id);
    }

    createTransaction(transaction: Transaction) {
        if (!this.#personList.has(transaction.person_id)) {
            throw new Error("Pessão não encontrada!");
        }

        const transaction_id = this.#transaction_id_counter++;
        this.#transactionsList.set(transaction_id, transaction);
    }

    listTransactions(): Transaction[] {
        return Array.from(this.#transactionsList.values());
    }

    listTransactionsByPerson(person_id: number): Transaction[] {
        return Array.from(this.#transactionsList.values()).filter(transaction => transaction.person_id === person_id);
    }
    
    balance(person_id: number): number {
        return this.listTransactionsByPerson(person_id).reduce((acc, transaction) => {
                return acc + transaction.amount;
        }, 0);
    }
}