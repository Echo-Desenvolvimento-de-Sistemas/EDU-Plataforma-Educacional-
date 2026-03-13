# Observers — Observadores de Modelos

> Observers que reagem a eventos de criação/atualização de models para sincronização com sistemas externos.

## UserObserver

**Arquivo**: `UserObserver.php`
**Evento**: `created`, `updated`
**Ação**: Dispara `SyncUserToGamification` job para sincronizar dados com plataforma externa de gamificação.

## ClassRoomObserver

**Arquivo**: `ClassRoomObserver.php`
**Evento**: `created`, `updated`
**Ação**: Dispara `SyncClassRoomToGamification` job.

## AllocationObserver

**Arquivo**: `AllocationObserver.php`
**Evento**: `created`, `updated`
**Ação**: Dispara `SyncAllocationToGamification` job.

---

## Registrados em

Os observers são registrados no `AppServiceProvider` ou via atributo `#[ObservedBy]` nos models.
