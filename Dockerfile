# Estágio 1: Construção do frontend
FROM node:16 AS build

# Diretório de trabalho do contêiner
WORKDIR /app

# Copiar package.json e package-lock.json
COPY frontend/package*.json ./frontend/

# Instalar dependências do frontend
RUN cd frontend && npm install

# Copiar código fonte do frontend
COPY frontend ./frontend

# Construir o frontend
RUN cd frontend && npm run build

# Estágio 2: Configuração do backend
FROM python:3.9

# Diretório de trabalho do contêiner
WORKDIR /app

# Instalar dependências do backend
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Copiar código fonte do backend
COPY backend ./backend

# Criar diretório para uploads
RUN mkdir -p /app/backend/upload

# Definir a variável de ambiente para o Flask
ENV FLASK_APP=backend/app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expor a porta usada pelo Flask
EXPOSE 3000
EXPOSE 5000

# Comando para iniciar o Flask
CMD ["flask", "run"]
