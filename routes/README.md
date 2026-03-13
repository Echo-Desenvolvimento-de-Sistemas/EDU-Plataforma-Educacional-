# Routes — Roteamento

> Todas as rotas do sistema estão em `web.php`. O arquivo `settings.php` contém rotas de perfil.

## Organização de `web.php`

O arquivo segue esta estrutura hierárquica:

```
1. Health Check (Docker)         → GET /api/health
2. Home/Login                    → GET /
3. Magic Login                   → GET /magic-login/{user} (signed)
4. Agenda (multi-role)           → /agenda/* (middleware: auth)
5. Rotas autenticadas            → middleware: auth + verified
   ├── First Access              → /first-access
   ├── Gamification SSO          → /gamification/sso
   ├── Dashboard redirect        → /dashboard
   ├── Events                    → /events (resource)
   ├── Manual                    → /manual
   ├── BNCC Search               → /bncc/search
   ├── Kanban                    → /kanban/*
   │
   ├── Secretaria                → /secretaria/* (middleware: role:secretaria)
   ├── Professor                 → /professor/* (middleware: role:professor)
   ├── Aluno                     → /aluno/* (middleware: role:aluno)
   ├── Responsável               → /responsavel/* (middleware: role:responsavel)
   └── Admin                     → /admin/* (middleware: role:admin)
6. Rotas Públicas
   ├── Pré-matrícula             → /pre-matricula/{token}
   ├── Validação de documentos   → /validate-document/{uuid}
   └── Public Users              → /public/users
```

## Convenções de Nomenclatura

- **Resource routes**: seguem padrão Laravel `resource()` (index, create, store, show, edit, update, destroy)
- **Named routes**: `{role}.{resource}.{action}` (ex: `admin.students.index`)
- **API-like dentro do web**: `/admin/api/classes/{id}/students` para AJAX

## Middleware `role:{role}`

Definido em `app/Http/Middleware/`. Verifica `auth()->user()->role` contra o role esperado. Redireciona para dashboard correto se não autorizado.

## Reuso de Controllers

A **Secretaria** reutiliza controllers do Admin em vários módulos:
- Attendance → `Admin\AttendanceController`
- Planning → `Admin\LessonPlanController`  
- Subject Performance → `Admin\SubjectPerformanceController`

O **Professor** também usa `Admin\AgendaController::sendMessage` para enviar mensagens pela agenda.
