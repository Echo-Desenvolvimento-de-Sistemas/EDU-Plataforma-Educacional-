# Controllers — Camada HTTP

> Controllers organizados por papel de usuário. Cada sub-diretório corresponde a um role do sistema.

## Estrutura

```
Controllers/
├── Admin/                 # 25 controllers — Acesso total ao sistema
├── Api/                   # 1 controller — Endpoints REST (BNCC search)
├── Auth/                  # Autenticação (MagicLoginController)
├── Professor/             # 11 controllers — Gerência pedagógica
├── Public/                # 3 controllers — Rotas públicas (pré-matrícula, validação)
├── Responsavel/           # 1 controller — Dashboard do responsável
├── Secretaria/            # 5 controllers — Gestão escolar
├── Settings/              # Configurações de perfil
├── Student/               # 6 controllers — Portal do aluno
├── AgendaController.php   # Inbox multi-role (agenda digital user-facing)
├── FirstAccessController.php  # Troca de senha no primeiro acesso
├── GamificationAuthController.php  # SSO para gamificação
├── KanbanController.php   # Kanban boards (multi-role)
├── ManualController.php   # Página de manual
└── SchoolEventController.php  # Calendário escolar
```

---

## Admin Controllers (`Admin/`)

| Controller | Prefixo Rota | Responsabilidade |
|---|---|---|
| `DashboardController` | `/admin/dashboard` | Dashboard com métricas (alunos, turmas, professores, frequência) |
| `AcademicYearController` | `/admin/academic-years` | CRUD anos letivos + períodos de avaliação |
| `EducationLevelController` | `/admin/education-levels` | CRUD níveis de ensino |
| `GradeController` | `/admin/grades` | CRUD séries/anos |
| `SubjectController` | `/admin/subjects` | CRUD disciplinas |
| `ClassRoomController` | `/admin/class-rooms` | CRUD turmas |
| `EnsalamentoController` | `/admin/ensalamento` | Alocação professor↔turma↔disciplina |
| `ClassScheduleController` | `/admin/class-schedules` | Grade horária |
| `StudentController` | `/admin/students` | CRUD alunos com dados completos, guardians inline, geração de usuário |
| `GuardianController` | `/admin/guardians` | CRUD responsáveis, vínculo com alunos |
| `UserController` | `/admin/users` | CRUD usuários (todos os roles) |
| `AttendanceController` | `/admin/attendance` | Frequência: listagem, edição em lote, relatórios |
| `StudentGradeController` | `/admin/student-grades` | Visualização de notas e boletins |
| `AgendaController` | `/admin/agenda` | Agenda Digital: canais, mensagens, envio multi-aluno |
| `AgendaSettingController` | `/admin/agenda/*` | Configurações da agenda: canais, speakers, WhatsApp |
| `SettingController` | `/admin/settings` | Configurações globais da escola |
| `DocumentTemplateController` | `/admin/document-templates` | CRUD templates de documentos |
| `DocumentController` | `/admin/documents` | Emissão de documentos |
| `StudentDocumentController` | `/admin/students/{id}/documents` | Documentos do aluno |
| `LessonPlanController` | `/admin/planning` | Supervisão de planos de aula |
| `SubjectPerformanceController` | `/admin/subject-performance` | Analytics de desempenho por disciplina |
| `PreRegistrationController` | `/admin/pre-registrations` | Pré-matrículas + migração para aluno |
| `ImportController` | `/admin/secret-data-import` | Importação de dados em lote |
| `GradingPeriodController` | — (nested) | CRUD períodos dentro de ano letivo |
| `AdminSettingsController` | — | Configurações administrativas |

---

## Professor Controllers (`Professor/`)

| Controller | Prefixo Rota | Responsabilidade |
|---|---|---|
| `DashboardController` | `/professor/dashboard` | Dashboard com turmas alocadas e métricas |
| `ClassRoomController` | `/professor/classes` | Lista turmas, detalhe de turma, ficha do aluno |
| `AttendanceController` | `/professor/classes/{id}/attendance` | Chamada diária |
| `AssessmentController` | `/professor/classes/{id}/assessments` | CRUD avaliações |
| `GradeController` | `/professor/grades` | Lançamento de notas em grid |
| `ActivityController` | `/professor/activities` | CRUD atividades (questões interativas) |
| `QuestionBankController` | `/professor/question-banks` | Bancos de questões |
| `QuestionController` | `/professor/questions` | CRUD questões |
| `LessonPlanController` | `/professor/planning` | Planos de aula (criar, editar, submeter) |
| `ClassScheduleController` | `/professor/schedules` | Visualizar horários |
| `ReportController` | `/professor/reports` | Relatórios do professor |

---

## Student Controllers (`Student/`)

| Controller | Prefixo Rota | Responsabilidade |
|---|---|---|
| `DashboardController` | `/aluno/dashboard` | Dashboard com notas, frequência, atividades |
| `GradeController` | `/aluno/grades` | Boletim do aluno |
| `AttendanceController` | `/aluno/attendance` | Frequência do aluno |
| `DocumentController` | `/aluno/documents` | Solicitação/visualização de documentos |
| `ClassScheduleController` | `/aluno/schedules` | Horário de aulas |
| `PlayerController` | `/aluno/activities/{id}/play` | Player de atividades interativas |

---

## Secretaria Controllers (`Secretaria/`)

| Controller | Prefixo Rota | Responsabilidade |
|---|---|---|
| `DashboardController` | `/secretaria/dashboard` | Dashboard da secretaria |
| `UserController` | `/secretaria/users` | Gestão de usuários |
| `PreRegistrationController` | `/secretaria/pre-registrations` | Pré-matrículas |
| `GradeController` | `/secretaria/grades` | Visualização de notas |
| `BatchEnrollmentController` | `/secretaria/batch-enrollment` | Matrícula em lote |

> **Nota**: Secretaria reutiliza controllers do Admin para attendance, planning e subject-performance.

---

## Controllers Globais (sem prefixo de role)

| Controller | Rota | Responsabilidade |
|---|---|---|
| `AgendaController` | `/agenda/*` | Inbox da agenda digital (multi-role) |
| `KanbanController` | `/kanban/*` | Quadros Kanban (multi-role) |
| `SchoolEventController` | `/events/*` | Calendário escolar |
| `FirstAccessController` | `/first-access` | Troca de senha no primeiro login |
| `GamificationAuthController` | `/gamification/sso` | SSO para plataforma de gamificação |
| `ManualController` | `/manual` | Página de manual do sistema |

## Controllers Públicos (`Public/`)

| Controller | Rota | Responsabilidade |
|---|---|---|
| `PreRegistrationController` | `/pre-matricula/{token}` | Formulário público de pré-matrícula |
| `DocumentValidationController` | `/validate-document/{uuid}` | Validação de documentos via QR Code |
| `UserController` | `/public/users` | Edição de perfil público |
