
# Locadora — Projeto pronto para rodar (Node.js + MySQL + HTML/CSS/JS)

Duas formas de rodar:

## Opção A) Docker (recomendado) — **um comando**
1. Instale Docker e Docker Compose.
2. No diretório deste projeto, rode:
   ```bash
   docker compose up -d
   ```
3. Acesse **http://localhost:3000** no navegador.

- O MySQL sobe com senha `example` e aplica automaticamente `database.sql`.
- O backend (Express) serve o frontend no mesmo endereço.

Para parar:
```bash
docker compose down
```

## Opção B) Sem Docker (local)
1. Instale Node.js LTS e MySQL.
2. Crie o banco executando `database.sql` no MySQL:
   ```bash
   mysql -u root -p < database.sql
   ```
3. Configure o `.env` em `server/.env` (um já está pronto com valores padrão localhost).
4. Na pasta `server/`:
   ```bash
   npm install
   npm run dev
   ```
5. Acesse **http://localhost:3000** no navegador.

## Estrutura
```
server/ (Node/Express) -> serve API em /api e o frontend estático em /
web/ (HTML/CSS/JS)     -> páginas e scripts
```

## Endpoints
- Clientes:       `GET/POST /api/clientes`, `PUT/DELETE /api/clientes/:id`
- Funcionários:   `GET/POST /api/funcionarios`, `PUT/DELETE /api/funcionarios/:id`
- Carros:         `GET/POST /api/carros`, `PUT/DELETE /api/carros/:id`
- Aluguéis:       `GET/POST /api/alugueis`, `DELETE /api/alugueis/:id`

## Observações
- A tabela `aluguel` armazena os nomes (`nome_cliente`, `nome_funcionario`, `nome_carro`) e `valor_hora_total` calculado a partir de `horas * valor_hora` do carro, conforme o requisito.
- Se quiser a versão totalmente normalizada (só IDs e consulta via JOIN), posso fornecer outro pacote.
