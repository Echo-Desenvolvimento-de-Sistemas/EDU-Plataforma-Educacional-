# Database — Migrations

> 61 migrations que definem o esquema do banco de dados. Todas cronológicas.

## Grupos de Tabelas

### Core (base)
| Migration | Tabela | Descrição |
|---|---|---|
| `000000_create_users_table` | `users`, `password_resets`, `sessions` | Users com roles (admin, secretaria, professor, aluno, responsavel) |
| `000001_create_cache_table` | `cache` | Cache do Laravel |
| `000002_create_jobs_table` | `jobs`, `failed_jobs` | Fila de jobs |

### Estrutura Acadêmica
| Tabelas | Descrição |
|---|---|
| `academic_years` | Anos letivos |
| `education_levels` | Níveis de ensino |
| `grades` | Séries (belongsTo education_level) |
| `subjects` | Disciplinas |
| `class_rooms` | Turmas (belongsTo grade) |
| `allocations` | Professor ↔ Turma ↔ Disciplina |
| `class_schedules` | Horários |

### Alunos e Responsáveis
| Tabelas | Descrição |
|---|---|
| `students` | Dados pessoais completos |
| `student_addresses` | Endereço |
| `student_healths` | Ficha de saúde |
| `guardians` | Responsáveis legais |
| `guardian_student` | Pivot com kinship, responsabilidades |

### Avaliação
| Tabelas | Descrição |
|---|---|
| `grading_periods` | Bimestres (belongsTo academic_year) |
| `assessments` | Avaliações |
| `student_grades` | Notas |
| `period_results` | Resultados consolidados |

### Frequência
| Tabelas | Descrição |
|---|---|
| `attendances` | Registros de presença (status: P/F/FJ/T) |
| `class_diaries` | Diário de classe |
| `absence_justifications` | Justificativas de falta |

### Comunicação (Agenda Digital)
| Tabelas | Descrição |
|---|---|
| `channels` | type (BROADCAST/CLASS/DIRECT), can_reply, related_type/id |
| `channel_user` | Speakers autorizados |
| `messages` | Corpo, tipo, attachments, card_data |
| `message_recipients` | Destinatários + read_at |

### Atividades
| Tabelas | Descrição |
|---|---|
| `question_banks` | Bancos de questões |
| `questions` | Questões com tipo e metadados BNCC |
| `question_options` | Opções de resposta |
| `activities` | Atividades montadas |
| `activity_questions` | Pivot questão↔atividade |
| `student_attempts` | Tentativas do aluno |
| `attempt_answers` | Respostas |

### Outros
| Tabelas | Descrição |
|---|---|
| `settings` | Key/value global |
| `school_events` | Calendário escolar |
| `pre_registrations` | Pré-matrículas |
| `document_templates` | Templates de documentos |
| `issued_documents` | Documentos emitidos |
| `lesson_plans` | Planos de aula |
| `bncc_skills` | Habilidades BNCC |
| `kanban_boards/columns/cards` | Kanban |

## Executar Migrations

```bash
php artisan migrate          # Executar pendentes
php artisan migrate:fresh    # Recriar do zero (⚠️ apaga dados)
php artisan migrate:status   # Verificar status
```
