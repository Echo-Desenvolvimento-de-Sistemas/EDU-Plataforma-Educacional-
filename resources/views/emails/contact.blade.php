<x-mail::message>
# Novo Contato Recebido

**Nome:** {{ $data['name'] }}
**E-mail:** {{ $data['email'] }}
**Assunto:** {{ $data['subject'] }}

**Mensagem:**
{{ $data['message'] }}

Obrigado,<br>
{{ config('app.name') }}
</x-mail::message>
