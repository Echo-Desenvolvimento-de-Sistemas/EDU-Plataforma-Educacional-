# Guia de Deploy (VPS)

Este guia descreve o fluxo de deploy automatizado via GitHub Actions e script no servidor.

## Configuração Inicial (Apenas na primeira vez)

1.  **Acesse sua VPS via SSH**.
2.  **Clone o projeto**:
    ```bash
    git clone https://github.com/Echo-Desenvolvimento-de-Sistemas/EDU-Plataforma-Educacional-.git /var/www/edu
    cd /var/www/edu
    ```
3.  **Configure o ambiente**:
    ```bash
    cp .env.production.example .env
    nano .env
    # Edite as variáveis de ambiente (Domínio, Banco de Dados, etc)
    ```
4.  **Dê permissão de execução ao script**:
    ```bash
    chmod +x deploy.sh
    ```
5.  **Faça o login no Registry do GitHub (GHCR)**:
    ```bash
    # Você precisará de um Personal Access Token (PAT) do GitHub com permissão de 'read:packages'
    echo $CR_PAT | docker login ghcr.io -u SEU_USUARIO_GITHUB --password-stdin
    ```

## Fluxo de Deploy (Dia a Dia)

O processo de atualização é simples e automatizado:

1.  **No seu computador**:
    *   Faça as alterações no código.
    *   Envie para o GitHub (`git push origin main`).
    *   Aguarde a **GitHub Action** finalizar (ela constrói e envia a imagem Docker).

2.  **No Servidor VPS**:
    *   Acesse a pasta do projeto e execute o script de deploy:
    ```bash
    cd /var/www/edu
    ./deploy.sh
    ```

### O que o script faz?
1.  Baixa a versão mais recente da imagem Docker (`docker compose pull`).
2.  Recria os containers (`docker compose up -d`).
3.  Otimiza caches (`php artisan optimize`).
4.  Roda migrações de banco de dados pendentes (`php artisan migrate`).

---

## Solução de Problemas

*   **Permissões negadas**: Se o script falhar ao escrever em pastas, rode:
    ```bash
    docker compose exec app chown -R www-data:www-data /var/www/html/storage
    ```
*   **Imagem antiga**: Se o script não baixar a nova versão, verifique se a Action no GitHub foi concluída com sucesso.
