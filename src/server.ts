import Fastify from 'fastify'; // Importando o framework Fastify para criação do servidor
import cors from '@fastify/cors'; // Importando o plugin CORS para permitir requisições entre diferentes origens
import { routes } from './routes'; // Importando as rotas definidas para o servidor

// Inicializando o servidor Fastify com o log habilitado
const server = Fastify({ logger: true });

// Função assíncrona para iniciar o servidor
const start = async () => {

    // Registrando o plugin CORS para habilitar a política de acesso entre diferentes origens
    await server.register(cors);
    
    // Registrando as rotas importadas do arquivo 'routes'
    await server.register(routes);
    
    try {
        // Iniciando o servidor na porta 3333
        server.listen({
            port: Number(process.env.PORT) || 3333,
            host: "0.0.0.0."
        });
    } catch (error) {
        // Caso haja um erro ao tentar iniciar o servidor, o processo será encerrado
        process.exit(1);
    }

}

// Chama a função de inicialização do servidor
start();
