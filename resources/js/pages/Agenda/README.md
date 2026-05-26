# Módulo: Agenda Digital - Canais de Comunicação

Este módulo gerencia a comunicação oficial entre a instituição de ensino, alunos e responsáveis. Ele utiliza uma arquitetura baseada em canais segmentados e notificações inteligentes.

## 🏗️ Arquitetura e Modelagem

O sistema é centrado nos seguintes modelos (App\Models):

- **Channel**: Representa um canal ou "pasta" de comunicação.
  - `type`: `broadcast`, `communication`, `direct`, `class`.
  - `context_type/context_id`: Permite vincular o canal a uma Turma (`ClassRoom`) ou Aluno (`Student`).
  - `can_reply`: Define se o canal permite interação bidirecional.
- **Message**: Armazena o conteúdo da comunicação.
  - `content`: Campo JSON que suporta texto, títulos, anexos e imagens de capa.
- **MessageRecipient**: Rastreia a entrega e leitura de cada mensagem por usuário.
- **ChannelTarget**: Define o público-alvo de um canal (segmentação por Turma, Aluno ou Usuários específicos).

## 🚀 Fluxo de Comunicação

### 1. Composição e Segmentação
Professores e Gestores podem criar novas comunicações através do `ComposeModal`. O sistema permite segmentar por:
- **Canais Existentes**: Envio direto para inscritos.
- **Turmas**: O sistema resolve todos os alunos e responsáveis vinculados à turma.
- **Alunos**: Cria ou reutiliza um canal "Direto" específico para o aluno e seus responsáveis.

### 2. Notificações Externas (WhatsApp)
Ao enviar uma mensagem, o sistema dispara tarefas em segundo plano (`SendCommunicationJob` ou `SendWhatsAppNotification`):
- Integração com serviços de WhatsApp (via EvolutionAPI ou WhatsAppService).
- Utilização de **Magic Links**: Links assinados que permitem acesso direto sem necessidade de login manual, facilitando a visualização rápida pelos pais.

## 💻 Tecnologias Utilizadas

- **Backend**: Laravel (PHP), Jobs (Queues), Eloquent Polymorphic Relations.
- **Frontend**: React, Inertia.js, Tailwind CSS, Componentes UI (Lucide React, Radix UI).
- **Serviços**: `AgendaService` centraliza a lógica de criação de canais, sincronização de audiência e envio de mensagens.

## 📁 Localização dos Arquivos

- **Models**: `app/Models/Channel.php`, `app/Models/Message.php`, `app/Models/ChannelTarget.php`.
- **Controllers**: `app/Http/Controllers/AgendaController.php`.
- **Services**: `app/Services/AgendaService.php`.
- **Jobs**: `app/Jobs/SendCommunicationJob.php`, `app/Jobs/SendWhatsAppNotification.php`.
- **Frontend**: `resources/js/Pages/Agenda/`.

---
*Documentação gerada em 20 de Março de 2026.*
