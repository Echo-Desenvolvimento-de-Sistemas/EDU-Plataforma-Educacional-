# EDU — Arquitetura do Sistema

> Documentação técnica para agentes de desenvolvimento. Descreve a estrutura, módulos, papéis e convenções do sistema.

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Backend** | Laravel 11 (PHP 8.2+), Fortify (auth), Inertia.js (bridge) |
| **Frontend** | React 18 + TypeScript, Vite, ShadCN/UI, Tailwind CSS |
| **Banco** | MySQL 8 |
| **Filas** | Laravel Queues (database driver) |
| **WhatsApp** | Evolution API (integração externa) |
| **Gamificação** | API externa via SSO (configurável via Settings) |
| **Deploy** | Docker + Traefik (ver `DEPLOY.md`) |

---

## Papéis de Usuário (Roles)

O sistema possui 5 roles. Cada role tem um prefix de rota, middleware e dashboards dedicados:

| Role | Prefixo | Middleware | Dashboard |
|---|---|---|---|
| `admin` | `/admin` | `role:admin` | `Admin/Dashboard.tsx` |
| `secretaria` | `/secretaria` | `role:secretaria` | `Secretaria/Dashboard.tsx` |
| `professor` | `/professor` | `role:professor` | `Professor/Dashboard.tsx` |
| `aluno` | `/aluno` | `role:aluno` | `Aluno/Dashboard.tsx` |
| `responsavel` | `/responsavel` | `role:responsavel` | `Responsavel/Dashboard.tsx` |

O login redireciona automaticamente para o dashboard correto via `$role . '.dashboard'`.

---

## Estrutura de Diretórios

```
edu/
├── app/
│   ├── Actions/Fortify/       # Ações do Laravel Fortify (auth)
│   ├── Console/               # Comandos Artisan customizados
│   ├── Events/                # Eventos (Kanban real-time)
│   ├── Http/Controllers/      # Controllers por role (ver seção abaixo)
│   ├── Jobs/                  # Jobs assíncronos (WhatsApp, Gamificação)
│   ├── Models/                # 37 Eloquent Models
│   ├── Observers/             # Model Observers (sincronização)
│   ├── Providers/             # Service Providers
│   └── Services/              # 7 Business Services
├── config/                    # Configs Laravel (fortify, inertia, etc)
├── database/migrations/       # 61 migrations (cronológicas)
├── resources/js/
│   ├── components/            # Componentes reutilizáveis (ShadCN + custom)
│   ├── layouts/               # Layouts (AppLayout, GuestLayout)
│   └── Pages/                 # Páginas por role (ver seção abaixo)
├── routes/
│   ├── web.php                # Todas as rotas web (principal)
│   ├── settings.php           # Rotas de configurações do usuário
│   └── channels.php           # Broadcast channels
└── public/                    # Assets públicos
```

---

## Módulos Principais

### 1. Gestão Acadêmica (`app/Http/Controllers/Admin/`)
Hierarquia: **Ano Letivo → Nível → Série → Turma → Disciplina**

| Controller | Responsabilidade |
|---|---|
| `AcademicYearController` | CRUD de anos letivos e períodos de avaliação |
| `EducationLevelController` | Níveis de ensino (Infantil, Fundamental, Médio) |
| `GradeController` | Séries/Anos (1° ano, 2° ano, etc) |
| `ClassRoomController` | Turmas vinculadas a séries |
| `SubjectController` | Disciplinas |
| `GradingPeriodController` | Períodos avaliativos (bimestres) |
| `EnsalamentoController` | Alocação de professores em turmas/disciplinas |
| `ClassScheduleController` | Grade horária por turma |

### 2. Gestão de Alunos (`app/Http/Controllers/Admin/StudentController`)
- CRUD completo com dados pessoais, endereço, saúde e documentos
- Sistema de criação inline de **responsáveis (guardians)** com geração automática de acesso
- Vínculo `Guardian ↔ Student` via pivot com parentesco/responsabilidades
- Toggle de status (active/cancelled/transferred/graduated)
- Geração de documentos (declarações, fichas)

### 3. Agenda Digital (`app/Http/Controllers/Admin/AgendaController` + `AgendaController`)
Dois controllers: **Admin** (gerencia canais e envia mensagens) e **User** (inbox genérica).

- **Canais** (`Channel` model): BROADCAST (lista de transmissão), CLASS (turma), DIRECT (individual)
- **Mensagens** (`Message` model): suporte a texto, imagens, card rico
- **Destinatários** (`MessageRecipient`): rastreamento de leitura
- **`can_reply`**: distingue canais interativos vs. broadcast
- **Target Audience**: envio para aluno, responsável ou ambos
- **WhatsApp**: envio via `SendWhatsAppNotification` job com anti-blocking (delay configurável)

### 4. Notas e Avaliações
| Controller | Responsabilidade |
|---|---|
| `Professor/GradeController` | Lançamento de notas (grid por turma/disciplina) |
| `Professor/AssessmentController` | CRUD de avaliações |
| `Admin/StudentGradeController` | Visualização administrativa das notas |
| `Student/GradeController` | Boletim do aluno |

Serviço: `GradeCalculationService` — calcula médias e resultados por período.

### 5. Frequência (`AttendanceController`)
- Admin e Secretaria: relatórios e lançamento em lote
- Professor: chamada diária por turma
- Aluno: consulta própria

### 6. Planejamento Pedagógico
| Controller | Responsabilidade |
|---|---|
| `Professor/LessonPlanController` | CRUD de planos de aula (professor cria e submete) |
| `Admin/LessonPlanController` | Supervisão: aprovação ou solicitação de mudanças |

Serviço: `LessonPlanService` — habilidades BNCC, validação.

### 7. Atividades & Banco de Questões
- Professor cria **bancos de questões** e **questões** (múltipla escolha, V/F, dissertativa)
- Cada questão pode ter tags BNCC
- **Atividades** são montadas com questões do banco
- Aluno responde via **PlayerController** (`/aluno/activities/{id}/play`)

### 8. Kanban (`KanbanController`)
- Quadros compartilhados com colunas e cards
- Eventos real-time: `KanbanCardCreated/Updated/Moved/Deleted`
- Boards com acesso multi-usuário

### 9. Documentos
- **Templates** (`DocumentTemplateController`): modelos de declaração com variáveis
- **Emissão** (`DocumentController`): gera PDF com dados do aluno
- **Validação** (`Public/DocumentValidationController`): QR Code público para validar autenticidade

### 10. Pré-Matrícula (`PreRegistrationController`)
- Formulário público (` /pre-matricula/{token}`)
- Admin/Secretaria: lista, visualiza e migra pré-matrículas para alunos regulares

### 11. Calendário Escolar (`SchoolEventController`)
- CRUD de eventos escolares (feriados, reuniões, provas)
- Target audience (admin, alunos, professores)

---

## Services (Business Logic)

| Serviço | Arquivo | Responsabilidade |
|---|---|---|
| `AccessControlService` | `app/Services/AccessControlService.php` | Gera usuários para alunos/responsáveis (login=CPF, senha=CPF) |
| `DocumentGeneratorService` | `app/Services/DocumentGeneratorService.php` | Gera PDFs de documentos a partir de templates |
| `EvolutionService` | `app/Services/EvolutionService.php` | Integração com Evolution API (WhatsApp) |
| `GamificationService` | `app/Services/GamificationService.php` | Sincronização com plataforma de gamificação externa |
| `GradeCalculationService` | `app/Services/GradeCalculationService.php` | Cálculo de médias e resultados acadêmicos |
| `LessonPlanService` | `app/Services/LessonPlanService.php` | Lógica de planos de aula e habilidades BNCC |
| `WhatsAppService` | `app/Services/WhatsAppService.php` | Envio de mensagens WhatsApp (camada de abstração) |

---

## Jobs (Processamento Assíncrono)

| Job | Responsabilidade |
|---|---|
| `SendWhatsAppNotification` | Envia mensagens WhatsApp com delay anti-bloqueio (3-30s), retry e batch splitting |
| `SendCommunicationJob` | Despacho de comunicações da agenda digital |
| `SyncUserToGamification` | Sincroniza dados de usuário com plataforma de gamificação |
| `SyncClassRoomToGamification` | Sincroniza turmas com gamificação |
| `SyncAllocationToGamification` | Sincroniza alocações professor-turma com gamificação |

---

## Observers

| Observer | Responsabilidade |
|---|---|
| `UserObserver` | Dispara `SyncUserToGamification` ao criar/atualizar usuário |
| `ClassRoomObserver` | Dispara `SyncClassRoomToGamification` ao criar/atualizar turma |
| `AllocationObserver` | Dispara `SyncAllocationToGamification` ao alocar professor |

---

## Modelos de Dados (Models)

### Hierarquia Acadêmica
```
AcademicYear → GradingPeriod (bimestres)
EducationLevel → Grade (série) → ClassRoom (turma)
Subject (disciplina)
Allocation (professor ↔ turma ↔ disciplina)
ClassSchedule (horários)
```

### Alunos e Responsáveis
```
Student → StudentAddress, StudentHealth
Student ↔ Guardian (pivot: kinship, responsibilities)
Student → User (1:1 opcional)
Guardian → User (1:1 opcional)
```

### Notas e Frequência
```
Assessment → StudentGrade → PeriodResult
ClassDiary (diário de classe)
Attendance (student, date, status, class)
AbsenceJustification
```

### Comunicação
```
Channel → Message → MessageRecipient
Channel ↔ User (speakers, via pivot)
Channel →|related| ClassRoom (polymorphic)
```

### Atividades
```
QuestionBank → Question → QuestionOption
Activity → ActivityQuestion (pivot)
StudentAttempt → AttemptAnswer
```

### Outros
```
Setting (key/value genérico)
SchoolEvent (calendario escolar)
PreRegistration (pré-matrícula)
DocumentTemplate → IssuedDocument
LessonPlan → PlanFeedback
BnccSkill (habilidades BNCC)
Kanban/Board → Column → Card
```

---

## Convenções Importantes

### Autenticação
- **Fortify** com suporte a 2FA
- Login via CPF ou email
- **Magic Link**: login sem senha via link assinado (WhatsApp)
- **First Access**: troca obrigatória de senha no primeiro login

### Roteamento
- Todas as rotas em `routes/web.php` (monolito Inertia)
- Prefixo por role com middleware `role:{role}`
- Secretaria reutiliza controllers do Admin (attendance, planning, subject-performance)

### Frontend
- Páginas em `resources/js/Pages/{Role}/` seguem convenção Inertia
- Componentes compartilhados em `resources/js/components/`
- ShadCN/UI para componentes base (`components/ui/`)
- Sidebar dinâmica por role em `app-sidebar.tsx`

### Settings
- Tabela `settings` (key/value) para configurações globais
- Keys relevantes: `school_name`, `school_cnpj`, `whatsapp_instance_name`, `whatsapp_send_interval`, `gamification_url`, `gamification_secret`
