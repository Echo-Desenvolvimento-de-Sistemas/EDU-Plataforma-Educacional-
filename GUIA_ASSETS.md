# Guia de Assets - Laravel

## 📁 Estrutura de Pastas

No Laravel, todos os assets públicos (CSS, JS, imagens, fontes) devem ser colocados na pasta `public/`:

```
public/
├── css/              # Arquivos CSS
│   ├── bootstrap.min.css
│   ├── style.css
│   ├── responsive.css
│   └── ...
├── js/               # Arquivos JavaScript
│   ├── vendor/
│   │   └── jquery-3.6.0.min.js
│   ├── main.js
│   └── ...
├── img/              # Imagens
│   ├── logo/
│   ├── slider/
│   ├── bg/
│   └── ...
├── fontawesome/      # Font Awesome
│   └── css/
│       └── all.min.css
├── font-flaticon/    # Fontes Flaticon
│   └── flaticon.css
└── favicon.ico
```

## 🔗 Como Referenciar Assets no Blade

### Opção 1: Usando o helper `asset()` (Recomendado)

```blade
<!-- CSS -->
<link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
<link rel="stylesheet" href="{{ asset('css/style.css') }}">

<!-- JavaScript -->
<script src="{{ asset('js/vendor/jquery-3.6.0.min.js') }}"></script>
<script src="{{ asset('js/main.js') }}"></script>

<!-- Imagens -->
<img src="{{ asset('img/logo/logo.png') }}" alt="Logo">

<!-- Favicon -->
<link rel="shortcut icon" href="{{ asset('img/favicon.ico') }}">
```

### Opção 2: Usando caminho absoluto com `/`

```blade
<!-- CSS -->
<link rel="stylesheet" href="/css/bootstrap.min.css">

<!-- JavaScript -->
<script src="/js/main.js"></script>

<!-- Imagens -->
<img src="/img/logo/logo.png" alt="Logo">
```

## ✅ Vantagens do `asset()`

- Funciona mesmo se a aplicação estiver em uma subpasta
- Gera URLs absolutas corretas
- Melhor para produção

## 📝 Exemplo Completo

```blade
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <img src="{{ asset('img/logo/logo.png') }}" alt="Logo">
    <script src="{{ asset('js/main.js') }}"></script>
</body>
</html>
```

