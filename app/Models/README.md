# Models — Modelos de Dados

> Modelos Eloquent que representam as tabelas do banco de dados.

## Hierarquia Acadêmica

| Model | Tabela | Descrição | Relações Chave |
|---|---|---|---|
| `AcademicYear` | `academic_years` | Ano letivo (2025, 2026) | hasMany GradingPeriod |
| `GradingPeriod` | `grading_periods` | Períodos avaliativos (1° Bimestre) | belongsTo AcademicYear |
| `EducationLevel` | `education_levels` | Nível de ensino (Infantil, Fundamental) | hasMany Grade |
| `Grade` | `grades` | Série/Ano (1° Ano, 2° Ano) | belongsTo EducationLevel, hasMany ClassRoom |
| `ClassRoom` | `class_rooms` | Turma (1° Ano A) | belongsTo Grade, hasMany Student, hasMany Allocation, hasOne Channel |
| `Subject` | `subjects` | Disciplina (Matemática, Português) | — |
| `Allocation` | `allocations` | Vínculo professor ↔ turma ↔ disciplina | belongsTo User, ClassRoom, Subject |
| `ClassSchedule` | `class_schedules` | Grade de horários | belongsTo ClassRoom, Subject |

## Alunos e Responsáveis

| Model | Tabela | Descrição | Relações Chave |
|---|---|---|---|
| `Student` | `students` | Aluno com dados pessoais | hasOne Address/Health/User, belongsToMany Guardian, belongsTo ClassRoom |
| `StudentAddress` | `student_addresses` | Endereço do aluno | belongsTo Student |
| `StudentHealth` | `student_healths` | Ficha de saúde | belongsTo Student |
| `Guardian` | `guardians` | Responsável legal | belongsToMany Student, hasOne User |
| `User` | `users` | Usuário do sistema (login) | Roles: admin, secretaria, professor, aluno, responsavel |

**Pivot `guardian_student`**: `kinship`, `is_financial_responsible`, `is_pedagogic_responsible`, `resides_with`

## Notas e Frequência

| Model | Tabela | Descrição |
|---|---|---|
| `Assessment` | `assessments` | Avaliações (prova, trabalho) — vinculada a turma/disciplina/período |
| `StudentGrade` | `student_grades` | Nota do aluno em uma avaliação |
| `PeriodResult` | `period_results` | Resultado consolidado por período |
| `Attendance` | `attendances` | Registro de presença diário |
| `AbsenceJustification` | `absence_justifications` | Justificativa de falta |
| `ClassDiary` | `class_diaries` | Diário de classe do professor |

## Comunicação (Agenda Digital)

| Model | Tabela | Descrição |
|---|---|---|
| `Channel` | `channels` | Canal de comunicação (type: BROADCAST/CLASS/DIRECT, can_reply: bool) |
| `Message` | `messages` | Mensagem (body, type, attachments, card_data) |
| `MessageRecipient` | `message_recipients` | Destinatário + status de leitura (read_at) |

**Pivot `channel_user`**: speakers autorizados a enviar mensagens no canal.
**Polimorfismo**: `Channel.related_type/related_id` → pode referenciar `ClassRoom`.

## Atividades e Questões

| Model | Tabela | Descrição |
|---|---|---|
| `QuestionBank` | `question_banks` | Banco de questões do professor |
| `Question` | `questions` | Questão com tipo (multiple_choice, true_false, essay), BNCC tags |
| `QuestionOption` | `question_options` | Opções de resposta (para múltipla escolha) |
| `Activity` | `activities` | Atividade montada com questões |
| `ActivityQuestion` | `activity_questions` | Pivot questão ↔ atividade (ordem, pontuação) |
| `StudentAttempt` | `student_attempts` | Tentativa do aluno em uma atividade |
| `AttemptAnswer` | `attempt_answers` | Resposta do aluno a cada questão |

## Outros

| Model | Tabela | Descrição |
|---|---|---|
| `Setting` | `settings` | Configurações globais (key/value) |
| `SchoolEvent` | `school_events` | Eventos do calendário escolar |
| `PreRegistration` | `pre_registrations` | Pré-matrículas (formulário público) |
| `DocumentTemplate` | `document_templates` | Templates de documentos (declarações) |
| `IssuedDocument` | `issued_documents` | Documentos emitidos (com UUID para validação) |
| `LessonPlan` | `lesson_plans` | Planos de aula do professor |
| `PlanFeedback` | `plan_feedbacks` | Feedback de supervisão sobre planos |
| `BnccSkill` | `bncc_skills` | Habilidades da BNCC (referência) |

## Modelos do Kanban

Localizados em `app/Models/Kanban/`:

| Model | Descrição |
|---|---|
| `Board` | Quadro Kanban (multi-user) |
| `Column` | Coluna do quadro (ordenável) |
| `Card` | Card com título, descrição, cor, due_date |
