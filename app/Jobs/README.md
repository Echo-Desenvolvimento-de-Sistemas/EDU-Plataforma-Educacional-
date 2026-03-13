# Jobs — Tarefas Assíncronas

> Jobs processados pela fila do Laravel. Driver: `database` (tabela `jobs`).

## SendWhatsAppNotification

**Arquivo**: `SendWhatsAppNotification.php`

Envia mensagens WhatsApp para destinatários da agenda digital.

- **Input**: `message_id`, `recipient_ids[]`, `instance_name`
- **Anti-bloqueio**: Delay configurável entre envios (setting `whatsapp_send_interval`, padrão 3s, min 1s, max 30s)
- **Batch splitting**: Lotes > 50 destinatários são divididos em sub-lotes com delay extra
- **Retry**: 3 tentativas com backoff [10s, 30s, 60s]
- **Magic Link**: Inclui link assinado para login rápido

## SendCommunicationJob

**Arquivo**: `SendCommunicationJob.php`

Despacha comunicações da agenda digital (via sistema interno e/ou WhatsApp).

- **Input**: `channel_id`, `message_id`, `target_audience`
- **Lógica**: Resolve destinatários baseado no tipo de canal e público-alvo, depois despacha `SendWhatsAppNotification` se WhatsApp configurado

## SyncUserToGamification

**Arquivo**: `SyncUserToGamification.php`

Sincroniza dados de usuário com plataforma de gamificação.

- **Trigger**: `UserObserver` (created/updated)
- **Lógica**: Envia dados do usuário via `GamificationService`

## SyncClassRoomToGamification

**Arquivo**: `SyncClassRoomToGamification.php`

Sincroniza turmas com gamificação.

- **Trigger**: `ClassRoomObserver` (created/updated)

## SyncAllocationToGamification

**Arquivo**: `SyncAllocationToGamification.php`

Sincroniza alocações professor↔turma com gamificação.

- **Trigger**: `AllocationObserver` (created/updated)

---

## Como executar jobs

```bash
# Processar fila (foreground)
php artisan queue:work

# Processar fila (background, produção)
php artisan queue:work --daemon --sleep=3
```
