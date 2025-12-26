# Sistema de Gestão Escolar (Edu) - Rosa de Sharon

Este é um sistema completo de gestão escolar desenvolvido para atender às necessidades administrativas, pedagógicas e de comunicação de uma instituição de ensino. O projeto utiliza uma stack moderna de tecnologias para oferecer uma experiência fluida e responsiva (Single Page Application - SPA) para todos os perfis de usuários.

## 🚀 Tecnologias Utilizadas

O projeto foi construído sobre uma base sólida utilizando:

*   **Backend**: [Laravel 11](https://laravel.com) (PHP)
*   **Frontend**: [React](https://react.dev) com [TypeScript](https://www.typescriptlang.org/)
*   **Fullstack Bridge**: [Inertia.js](https://inertiajs.com/) (permite construir SPAs usando roteamento e controllers clássicos do server-side)
*   **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/) (Radix UI) com [Lucide Icons](https://lucide.dev/)
*   **Banco de Dados**: MySQL / MariaDB (via Eloquent ORM)
*   **Build Tool**: Vite

## 📚 Módulos e Funcionalidades

O sistema é dividido em diversos portais, cada um com funcionalidades específicas para seu público-alvo:

### 1. 🏛️ Adminstração Geral
Painel completo para gestão da instituição.
*   **Gestão de Usuários**: Controle total de Administradores, Professores, Funcionários, Alunos e Responsáveis.
*   **Gestão Acadêmica**: Criação e edição de Cursos, Turmas, Disciplinas e Anos Letivos.
*   **Kanban de Projetos**: Ferramenta integrada de gestão de tarefas e projetos internos.
*   **Financeiro**: Visualização de fluxo de caixa e gestão básica (expansível).
*   **Configurações do Sistema**: Personalização de logo, nome da escola, e parâmetros globais (Whitelabel).

### 2. 📝 Secretaria
Focado no atendimento e processos burocráticos.
*   **Matrículas e Pré-Matrículas**: Sistema de cadastro de interessados e efetivação de matrículas com geração de fichas em PDF.
*   **Gestão de Alunos**: Acesso rápido a fichas cadastrais, documentos e histórico.
*   **Agenda Digital (Inbox)**: Comunicação centralizada com responsáveis e alunos via sistema de mensagens interno (estilo WhatsApp).
*   **Impressão de Relatórios**: Boletins, fichas de matrícula e relatórios de frequência.

### 3. 👨‍🏫 Painel do Professor
Ferramentas essenciais para o dia a dia em sala de aula.
*   **Minhas Turmas**: Visão geral das turmas atribuídas.
*   **Chamada Online**: Registro rápido de presença/falta por aula ou dia.
*   **Lançamento de Notas**: Diário de classe digital para lançamento de avaliações.
*   **Banco de Questões e Atividades**: Criação e gerenciamento de provas e tarefas.
*   **Relatórios de Desempenho**: Visualização gráfica do progresso dos alunos por disciplina.

### 4. 👨‍👩‍👧‍👦 Portal do Aluno e Responsável
Acesso transparente às informações escolares.
*   **Cronograma de Aulas**: Visualização dos horários das aulas.
*   **Boletim Online**: Acesso às notas e faltas em tempo real.
*   **Agenda Digital**: Recebimento de comunicados e troca de mensagens com a escola.
*   **Financeiro (Responsável)**: Acesso a boletos e histórico de pagamentos (se integrado).

## ✨ Destaques do Projeto

*   **Agenda Digital "WhatsApp-First"**: Um sistema de mensagens interno projetado para substituir grupos de WhatsApp, permitindo comunicação oficial, segregada por canais (Turmas, Individual) e com confirmação de leitura.
*   **Impressão Otimizada**: Layouts específicos para impressão de fichas de matrícula e boletins, garantindo documentos oficiais limpos e organizados.
*   **Tema Escuro (Dark Mode)**: Interface totalmente compatível com modos claro e escuro.
*   **Responsividade**: Design mobile-first, funcionando perfeitamente em celulares, tablets e desktops.

## 🛠️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos
*   PHP 8.2+
*   Composer
*   Node.js & NPM
*   Servidor MySQL/MariaDB

### Passo a Passo

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/seu-usuario/edu.git
    cd edu
    ```

2.  **Instale as dependências do Backend (PHP)**
    ```bash
    composer install
    ```

3.  **Instale as dependências do Frontend (Node)**
    ```bash
    npm install
    ```

4.  **Configure o ambiente**
    Copie o arquivo de exemplo e configure suas credenciais de banco de dados.
    ```bash
    cp .env.example .env
    # Edite o arquivo .env com suas configurações de DB (DB_DATABASE, DB_USERNAME, etc.)
    ```

5.  **Gere a chave da aplicação**
    ```bash
    php artisan key:generate
    ```

6.  **Execute as migrações e seeders**
    Isso criará as tabelas e populará o banco com dados iniciais (usuários admin padrão, etc).
    ```bash
    php artisan migrate --seed
    ```

7.  **Inicie o servidor de desenvolvimento**
    Você precisará de dois terminais rodando simultaneamente:

    *   Terminal 1 (Laravel Server):
        ```bash
        php artisan serve
        ```
    *   Terminal 2 (Vite Dev Server):
        ```bash
        npm run dev
        ```

8.  **Acesse o projeto**
    Abra seu navegador em `http://localhost:8000`.

## 📦 Deploy em Produção

Para preparar o projeto para produção:

1.  No servidor, execute os passos de instalação padrão.
2.  Configure o arquivo `.env` com `APP_ENV=production` e `APP_DEBUG=false`.
3.  Compile os assets do frontend:
    ```bash
    npm run build
    ```
4.  Otimize o cache do Laravel:
    ```bash
    php artisan optimize
    ```
