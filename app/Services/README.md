# Services — Serviços de Negócio

> Serviços que encapsulam lógica de negócio complexa, separada dos controllers.

## AccessControlService

**Arquivo**: `AccessControlService.php`

Gera contas de usuário para alunos e responsáveis.

- **Entrada**: `Student` ou `Guardian` model
- **Lógica**: Cria `User` com `role` apropriado (aluno/responsavel), login = CPF (números), senha = CPF (números)
- **Utilizado por**: `StudentController::store()`, `GuardianController::createUser()`
- **Importante**: Marca `first_access = true` para forçar troca de senha no primeiro login

## DocumentGeneratorService

**Arquivo**: `DocumentGeneratorService.php`

Gera PDFs de documentos oficiais (declarações, fichas).

- **Entrada**: `DocumentTemplate` + dados do aluno
- **Lógica**: Substitui variáveis no template (ex: `{{nome_aluno}}`, `{{turma}}`) e gera PDF
- **Saída**: PDF com QR Code de validação (UUID público)
- **Utilizado por**: `Admin/DocumentController::store()`

## EvolutionService

**Arquivo**: `EvolutionService.php`

Integração com Evolution API para WhatsApp Business.

- **Métodos**: `connectInstance()`, `getConnectionState()`, `logoutInstance()`, `sendTextMessage()`, `sendMediaMessage()`
- **Config**: Lê `EVOLUTION_API_URL` e `EVOLUTION_API_KEY` do `.env`
- **Utilizado por**: `AgendaSettingController` (conexão), `SendWhatsAppNotification` job (envio)

## GamificationService

**Arquivo**: `GamificationService.php`

Sincroniza dados com plataforma de gamificação externa.

- **Métodos**: `syncUser()`, `syncClassRoom()`, `syncAllocation()`
- **Config**: `gamification_url` e `gamification_secret` do `settings`
- **Utilizado por**: `SyncUserToGamification`, `SyncClassRoomToGamification`, `SyncAllocationToGamification` jobs
- **SSO**: Gera token JWT para login automático na plataforma

## GradeCalculationService

**Arquivo**: `GradeCalculationService.php`

Calcula médias e resultados acadêmicos.

- **Métodos**: `calculatePeriodAverage()`, `calculateFinalResult()`
- **Lógica**: Pondera notas por peso da avaliação, aplica arredondamento
- **Utilizado por**: `Professor/GradeController::storeBatch()`

## LessonPlanService

**Arquivo**: `LessonPlanService.php`

Lógica de planos de aula e habilidades BNCC.

- **Métodos**: `create()`, `update()`, `submit()`, `approve()`, `requestChanges()`
- **Fluxo**: Professor cria → submete → Admin/Secretaria aprova ou solicita mudanças
- **Utilizado por**: `Professor/LessonPlanController`, `Admin/LessonPlanController`

## WhatsAppService

**Arquivo**: `WhatsAppService.php`

Camada de abstração para envio de WhatsApp.

- **Métodos**: `sendMessage()`, `sendMagicLink()`
- **Lógica**: Gera magic link assinado para login rápido e envia via EvolutionService
- **Utilizado por**: `SendWhatsAppNotification` job
