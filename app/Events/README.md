# Events — Eventos do Sistema

> Eventos de broadcast para funcionalidades real-time (WebSocket).

## Kanban Events

Todos os eventos são disparados pelo `KanbanController` e transmitidos via canal privado.

| Event | Trigger | Dados |
|---|---|---|
| `KanbanCardCreated` | Novo card criado | `card`, `column_id`, `board_id` |
| `KanbanCardUpdated` | Card editado | `card`, `board_id` |
| `KanbanCardMoved` | Card movido entre colunas | `card_id`, `from_column`, `to_column`, `board_id` |
| `KanbanCardDeleted` | Card removido | `card_id`, `column_id`, `board_id` |

Todos implementam `ShouldBroadcast` e transmitem no canal `kanban.{board_id}`.

## Configuração

Canal de broadcast configurado em `routes/channels.php`. O Laravel Reverb ou Pusher pode ser usado como driver.
