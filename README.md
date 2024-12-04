
# Multi-Backend API: Node.js & Flask

Este repositório contém dois backends, um em **Node.js** e outro em **Flask**, que se comunicam via API REST para realizar o processamento de arquivos Excel (.xlsx ou .xls) e gerar scripts SQL para um banco de dados MySQL.

---

## Funcionalidades

1. **Servidor Node.js**:
   - Recebe arquivos Excel via requisição POST.
   - Salva o arquivo recebido em uma pasta temporária.
   - Envia o caminho do arquivo para o servidor Flask através de uma API REST.

2. **Servidor Flask**:
   - Recebe o caminho do arquivo Excel enviado pelo servidor Node.js.
   - Lê o arquivo Excel e gera um script SQL para inserir registros em uma tabela no MySQL.
     - O nome da tabela é baseado no nome da planilha (sheet).
     - Os atributos das colunas do Excel são transformados em colunas do banco de dados.
   - Retorna o script SQL como uma string para o servidor Node.js.

3. **Interface final**:
   - Exibe o script SQL gerado em um campo de texto para visualização e cópia.

---

## Pré-requisitos

### Node.js Server
- Node.js (v16 ou superior)
- NPM ou Yarn

### Flask Server
- Python 3.8 ou superior
- MySQL (opcional, apenas para teste do script gerado)

---

## Como Configurar

### Passo 1: Configurar o Servidor Node.js
1. Navegue até a pasta `nodejs`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

### Passo 2: Configurar o Servidor Flask
1. Navegue até a pasta `flask`.
2. Instale as dependências:
   ```bash
   pip install pandas
   pip install flask
   pip install openpyxl  
   ```
3. Inicie o servidor:
   ```bash
   python main.py
   ```

---

## Fluxo de Uso

1. **Envio de Arquivo**: Envie um arquivo Excel para o endpoint do servidor Node.js (`/`).
2. **Processamento no Node.js**:
   - O arquivo será salvo na pasta temporária padrão do Express.
   - O caminho do arquivo será enviado para o servidor Flask.
3. **Processamento no Flask**:
   - O Flask processa o arquivo Excel e gera um script SQL.
   - O script é retornado ao servidor Node.js.
4. **Exibição**: O servidor Node.js exibe o script SQL em um campo de texto para o usuário.

---

## Endpoints

### Node.js Server

#### `POST /`
- **Descrição**: Recebe um arquivo Excel para processamento.
- **Body**: Arquivo Excel no formato `multipart/form-data`.
- **Retorno**: Script SQL gerado.

#### Exemplo de Requisição:
```bash
curl -X POST http://localhost:3000/ \
-F "file=@caminho/para/exemplo.xlsx"
```

---

### Flask Server

#### `POST /upload`
- **Descrição**: Gera o script SQL baseado no arquivo Excel.
- **Body**: 
  ```json
  {
    "path": "/caminho/para/temp/exemplo.xlsx"
  }
  ```
- **Retorno**: String com o script SQL gerado.