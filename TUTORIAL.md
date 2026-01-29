# Manual Completo do Usuário - Edu Plataforma

Este documento detalha passo a passo todas as funcionalidades da plataforma Edu.

## Índice

1.  [Acesso ao Sistema](#1-acesso-ao-sistema)
2.  [Perfil: Administrador](#2-perfil-administrador)
3.  [Perfil: Secretaria](#3-perfil-secretaria)
4.  [Perfil: Professor](#4-perfil-professor)
5.  [Perfil: Aluno e Responsável](#5-perfil-aluno-e-responsável)

---

## 1. Acesso ao Sistema

Acesse a plataforma via navegador web e utilize suas credenciais (E-mail e Senha).

*   **Login**: Insira e-mail e senha.
*   **Recuperação**: Caso esqueça a senha, solicite a redefinição na tela de login (se habilitado).

---

## 2. Perfil Administrador

O administrador tem controle total sobre o ecossistema escolar.

### 2.1 Configuração Inicial (Setup)
Para que o sistema funcione, siga estritamente esta ordem de cadastro:
1.  **Anos Letivos**: Menu `Recursos > Anos Letivos`. Crie o ano vigente (ex: 2024) e marque-o como ATIVO/ABERTO.
2.  **Níveis de Ensino**: Defina os ciclos (ex: Infantil, Fundamental I, Médio).
3.  **Disciplinas**: Cadastre o catálogo de matérias (Matemática, História, etc.).
4.  **Cursos**: Crie os cursos e, dentro deles, configure a **Grade Curricular** (quais disciplinas pertencem a qual curso).
5.  **Turmas**: Menu `Recursos > Turmas`. Crie as salas, vinculando-as a um Ano Letivo e a um Curso.

### 2.2 Gestão de Pessoas
*   **Usuários**: Menu `Usuários`. Adicione Coordenadores, Assistentes ou outros Admins.
*   **Gestão de Perfis**: Defina o papel de cada usuário (Role) para limitar acessos.

### 2.3 Ensalamento (Grade Horária)
Defina quando ocorrem as aulas para permitir o controle de frequência correto.
1.  Vá em `Ensalamento`.
2.  Escolha o Ano Letivo e a Turma.
3.  Arraste as disciplinas da lista lateral para os dias da semana e horários correspondentes.

### 2.4 Agenda e Comunicação
*   **Configuração WhatsApp**: Em `Configurações > WhatsApp`, conecte o QR Code para habilitar envios automáticos.
*   **Mensagens**: Utilize a Agenda Digital para enviar comunicados massivos ou individuais.

---

## 3. Perfil Secretaria

Foco na vida acadêmica e burocracia.

### 3.1 Processo de Matrícula
*   **Novos Alunos (Pré-Matrícula)**: Verifique a lista de interessados em `Pré-Matrículas`. Analise documentos e aprove para criar o cadastro automaticamente.
*   **Matrícula Manual**: Em `Alunos > Novo`, preencha os dados cadastrais e vincule a uma turma.
*   **Rematrícula (Lote)**: Use a ferramenta de `Matrícula em Lote` para promover alunos de uma turma para a próxima (ex: 1º Ano A -> 2º Ano A).

### 3.2 Documentação
*   **Emissão**: No perfil de cada aluno, clique em `Documentos`.
*   **Modelos**: Selecione entre "Declaração de Matrícula", "Histórico Escolar" ou "Boletim".
*   **Validação**: Documentos gerados possuem QR Code que pode ser validado externamente na página pública de validação.

---

## 4. Perfil Professor

Ferramentas pedagógicas diárias.

### 4.1 Frequência (Chamada)
1.  No Painel, clique no card da **Turma**.
2.  Vá para a aba **Chamada**.
3.  O sistema lista todos os alunos. Por padrão, todos vêm com "Presença".
4.  Clique apenas nos alunos ausentes para alternar para "Falta".
5.  Salve.

### 4.2 Livro de Notas
O sistema não exige digitação de médias manuais. Você lança as **Avaliações**.
1.  Na Turma, vá para a aba **Notas**.
2.  Clique em **+ Nova Avaliação**.
3.  Nomeie (ex: "Prova Mensal"), defina data e Peso.
4.  A coluna aparece na planilha. Digite as notas. O salvamento é automático ao sair do campo (onBlur).

### 4.3 Banco de Questões
Crie seu repositório de perguntas para reutilizar em provas.
1.  Menu `Banco de Questões`.
2.  Crie questões objetivas ou discursivas.
3.  Use o menu `Atividades` para montar uma prova online selecionando essas questões.

---

## 5. Perfil Aluno e Responsável

### 5.1 Aluno
*   **Boletim**: Acesse o menu `Notas` para ver o desempenho detalhado.
*   **Aulas**: Veja seu horário no menu `Cronograma`.
*   **Atividades**: Responda provas e tarefas pendentes no menu `Atividades`.

### 5.2 Responsável
*   **Visão Multifilhos**: O dashboard mostra todos os dependentes.
*   **Financeiro**: (Se habilitado) Acesso a boletos e extratos.
*   **Comportamento**: Acompanhe ocorrências disciplinares na Agenda.
