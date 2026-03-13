# Pages — Frontend React/Inertia

> Páginas React renderizadas via Inertia.js. Cada diretório corresponde a um role/módulo.

## Estrutura

```
Pages/
├── Admin/                 # 21 sub-diretórios — Painel administrativo completo
├── Agenda/                # Inbox e Chat — Agenda digital (multi-role)
├── Aluno/                 # Portal do aluno (5 áreas)
├── Calendar/              # Calendário escolar
├── Kanban/                # Quadros Kanban
├── Manual/                # Manual do sistema
├── Professor/             # Painel do professor (9 áreas)
├── Public/                # Páginas públicas (pré-matrícula)
├── Responsavel/           # Portal do responsável
├── Secretaria/            # Painel da secretaria (4 áreas)
├── Student/               # (Legacy, usar Aluno/)
├── auth/                  # Login, registro, recuperação de senha
├── settings/              # Configurações de perfil
├── dashboard.tsx          # Dashboard genérico (redireciona por role)
└── welcome.tsx            # Landing page / Login
```

---

## Admin Pages (`Admin/`)

| Diretório | Descrição | Componentes Chave |
|---|---|---|
| `AcademicYears/` | Gestão de anos letivos | Index, Create/Edit |
| `Agenda/` | Agenda digital admin | Index (tabs: canais, send, whatsapp), Components/ |
| `Attendance/` | Frequência admin | Index, Edit, Report |
| `ClassRooms/` | Turmas | Index, Create/Edit |
| `ClassSchedules/` | Grade horária | Index |
| `DocumentTemplates/` | Templates de documentos | Index, Create/Edit |
| `Documents/` | Emissão de documentos | Index, Create |
| `EducationLevels/` | Níveis de ensino | Index |
| `Ensalamento/` | Alocação professor-turma | Index |
| `Grades/` | Séries/Anos | Index |
| `Guardians/` | Responsáveis | Index, Create/Edit, Show |
| `Import/` | Importação de dados | Create |
| `Kanban/` | Kanban admin | Board |
| `Planning/` | Planos de aula (supervisão) | Index, Show |
| `PreRegistrations/` | Pré-matrículas | Index, Show |
| `Settings/` | Configurações da escola | Index |
| `StudentGrades/` | Notas admin | Index, Show, ReportCard |
| `Students/` | Gestão de alunos | Index, Create, Edit, Show |
| `SubjectPerformance/` | Analytics de disciplinas | Index, Show |
| `Subjects/` | Disciplinas | Index |
| `Users/` | Usuários do sistema | Index, Create/Edit |

### Admin/Agenda/ (Detalhado)

```
Agenda/
├── Index.tsx              # Página principal com 3 tabs (Canais, Enviar Mensagem, WhatsApp)
└── Components/
    ├── GroupManager.tsx    # Gerenciador de grupos/canais
    └── ComposeModal.tsx   # Modal de composição (admin)
```

**Tab "Canais"**: Separa visualmente em "📢 Listas de Transmissão" e "💬 Canais de Comunicação"
**Tab "WhatsApp"**: Conexão QR Code + configuração de intervalo de envio

### Admin/Students/ (Detalhado)

```
Students/
├── Index.tsx              # Lista paginada com busca e filtro por turma
├── Create.tsx             # Formulário multi-tab: Identificação, Documentos, Responsáveis, Endereço, Saúde, Acadêmico, Segurança
├── Edit.tsx               # Edição completa com mesma estrutura
└── Show.tsx               # Ficha detalhada com documentos e ações
```

**Tab "Responsáveis"**: Gestão dinâmica de guardians inline (add/remove), com geração automática de acesso.

---

## Agenda Pages (`Agenda/`)

```
Agenda/
├── Inbox.tsx              # Inbox com lista de canais e mensagens
├── Chat.tsx               # View de chat individual (canal específico)
└── Components/
    └── ComposeModal.tsx   # Modal: seleção multi-aluno, target audience, tipo mensagem
```

**Props recebidas**: `channels`, `messages`, `classes`, `students` (passadas pelo `AgendaController`).
**ComposeModal**: Multi-student checkboxes com busca, filtro por turma, seleção de destinatário (aluno/responsável/ambos).

---

## Professor Pages (`Professor/`)

| Diretório | Descrição |
|---|---|
| `Activities/` | CRUD de atividades interativas |
| `Attendance/` | Chamada diária |
| `ClassRoom/` | Detalhes da turma |
| `ClassSchedules/` | Horários do professor |
| `Classes/` | Lista de turmas alocadas |
| `Grades/` | Grid de lançamento de notas |
| `Planning/` | Planos de aula (CRUD + submit) |
| `QuestionBanks/` | Bancos de questões |
| `Questions/` | CRUD de questões |
| `Dashboard.tsx` | Dashboard com turmas e métricas |
| `Manual.tsx` | Manual do professor |
| `Reports.tsx` | Relatórios |

---

## Aluno Pages (`Aluno/`)

| Arquivo/Dir | Descrição |
|---|---|
| `Dashboard.tsx` | Dashboard com notas, frequência, atividades pendentes |
| `Attendance/` | Histórico de frequência |
| `Documents/` | Solicitação e download de documentos |
| `Grades/` | Boletim |
| `Schedule/` | Horário de aulas |

---

## Secretaria Pages (`Secretaria/`)

| Arquivo/Dir | Descrição |
|---|---|
| `Dashboard.tsx` | Dashboard da secretaria |
| `BatchEnrollment/` | Matrícula em lote |
| `Grades/` | Consulta de notas |
| `PreRegistrations/` | Pré-matrículas |
| `Users/` | Gestão de usuários |

---

## Components Compartilhados (`components/`)

```
components/
├── ui/                    # ShadCN/UI base (Button, Card, Dialog, Input, etc)
├── Activity/              # Componentes de atividades
├── Attendance/            # Componentes de frequência
├── Kanban/                # Componentes do Kanban
├── Pedagogical/           # Componentes de planejamento
├── Professor/             # Componentes do professor
├── app-sidebar.tsx        # Sidebar dinâmica por role (CRITICAL: define toda navegação)
├── app-header.tsx         # Header com busca e notificações
├── pagination.tsx         # Paginação reutilizável
└── student-registration-card.tsx  # Card de registro de aluno
```

### `app-sidebar.tsx` — Sidebar Principal

Este arquivo é **crítico**: contém toda a lógica de navegação do sistema. Define os itens de menu para cada role (admin, professor, aluno, secretaria, responsavel). Ao adicionar novos módulos, este arquivo deve ser atualizado.
