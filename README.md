
# Memory Tracer

Memory Tracer é uma ferramenta para análise de consumo de memória em dispositivos Android através de logs de bug reportados na fase de teste. O projeto é uma colaboração entre UFAM/IComp e Motorola Mobility.

## Visão Geral

A aplicação consiste em um frontend desenvolvido em React e um backend em Flask. O frontend exibe visualizações dos dados de consumo de memória processados pelo backend.

## Estrutura do Projeto


project-root/

├── backend/

│   ├── app.py

│   ├── requirements.txt

│   ├── scripts/

│   └── upload/

├── frontend/

│   ├── public/

│   ├── src/

│   ├── package.json

│   ├── package-lock.json

│   └── ...

├── Dockerfile

└── docker-compose.yml

```

## Instalação e Execução

### Pré-requisitos

- Docker

- Docker Compose

### Passos para Construir e Executar

1\. Clone o repositório:

   ```sh

   git clone girlanasouza/Integrando-MemoryTracer

   cd memory-tracer

   ```

2\. Construa os contêineres:

   ```sh

   docker-compose build

   ```

3\. Inicie os contêineres:

   ```sh

   docker-compose up

   ```

4\. Acesse a aplicação:

   Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## Configuração do Proxy no Frontend

Certifique-se de que seu `package.json` do frontend React contenha a configuração do proxy para redirecionar as chamadas de API para o backend Flask:

**frontend/package.json:**

```json

{

  "name": "memory-tracer",

  "version": "0.1.0",

  "private": true,

  "proxy": "http://backend:5000",

  "dependencies": {

    // suas dependências
  // resto do arquivo
    }

}

```

## Uso

### Upload de Logs

1\. Faça o upload dos logs no frontend. Os logs serão salvos no diretório `backend/upload`.

### Visualização dos Dados

1\. Após o upload, você poderá visualizar diversas métricas de consumo de memória, incluindo RSS e PSS por processo.

### Endpoints do Backend

- `/upload`: Endpoint para upload de arquivos de log.

- `/file`: Retorna o conteúdo do arquivo de log carregado.

- `/amPss`: Retorna dados de PSS e RSS dos processos.

- `/reasonDeath`: Retorna as razões de morte dos processos.

- `/TotalMemory`: Retorna o total de memória utilizada.

- `/amKill`: Retorna informações de processos terminados.

- `/CpuInfo`: Retorna informações da CPU.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Para mais informações, entre em contato com [Girlana Souza](https://github.com/girlanasouza).

---

© 2024 Memory Tracer | All Rights Reserved to [SWPERFI](https://swperfi.icomp.ufam.edu.br) Project, a partnership between UFAM/IComp and Motorola Mobility.

```
