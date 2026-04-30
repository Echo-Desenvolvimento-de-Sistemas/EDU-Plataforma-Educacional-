# Guia Detalhado de Implantação (Deploy) - EDU Platform

Este documento descreve o processo passo a passo para realizar o deploy da plataforma EDU, garantindo que as alterações locais cheguem ao servidor de produção de forma segura.

---

## 1. Preparação Local

Antes de subir as alterações, é essencial garantir que o código compila corretamente e que os ativos (assets) de frontend estão prontos.

1.  **Gere o Build de Produção:**
    ```bash
    npm run build
    ```
    *Isso garante que o Vite processe o React, Tailwind e as imagens da Landing Page.*

2.  **Verifique o arquivo `.env.production`:**
    Certifique-se de que as variáveis como `APP_URL` e `DB_DATABASE` estão corretas para o servidor de destino.

---

## 2. Enviando para o Repositório

O servidor geralmente puxa o código do GitHub. Envie suas alterações:

```bash
git add .
git commit -m "Ajustes finais de UI e preparação para deploy"
git push origin main
```

---

## 3. Executando no Servidor (VPS)

O processo no servidor é automatizado pelo script `deploy.sh`.

1.  **Acesse o servidor via SSH:**
    ```bash
    ssh usuario@echo.dev.br
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd /clientes/rosa/app/edu  # Ou o caminho configurado no seu servidor
    ```

3.  **Atualize o código local do servidor:**
    ```bash
    git pull origin main
    ```

4.  **Execute o script de deploy:**
    ```bash
    chmod +x deploy.sh  # Apenas se for a primeira vez
    ./deploy.sh
    ```

### O que o `deploy.sh` faz?
- Constrói a imagem Docker localmente usando o `Dockerfile`.
- Configura o arquivo `.env` caso ele não exista.
- Gera a `APP_KEY` se necessário.
- Sobe a stack no **Docker Swarm** (serviços `app`, `redis`, etc.).
- Realiza as migrações do banco de dados automaticamente.

---

## 4. Verificação Pós-Deploy

Após o script terminar, verifique se tudo está rodando:

1.  **Status dos Serviços:**
    ```bash
    docker stack services edu_demo
    ```

2.  **Logs em Tempo Real:**
    ```bash
    docker service logs edu_demo_app -f
    ```

3.  **Acesso Web:**
    Abra o navegador em [https://edu.echo.dev.br](https://edu.echo.dev.br) (ou a URL configurada) e teste a Landing Page e o login.

---

## 5. Dicas de Manutenção

- **Limpar Cache:** Se algo não estiver atualizando, rode dentro do container:
  ```bash
  docker exec $(docker ps -q -f name=edu_demo_app) php artisan optimize:clear
  ```
- **Backup do Banco:**
  ```bash
  docker exec $(docker ps -q -f name=database_mariadb) mysqldump -uroot -p[SENHA] edu > backup.sql
  ```

---

*Documento gerado em 30/04/2026 para auxílio na operação da plataforma.*
