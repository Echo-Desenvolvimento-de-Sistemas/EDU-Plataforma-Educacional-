# Sistema de Pré-Matrícula e Rematrícula

Este documento descreve o funcionamento do módulo de Pré-Matrícula do sistema escolar.

## Visão Geral

O módulo permite que a secretaria gere links únicos para cadastro de novos alunos ou atualização de dados de alunos existentes (rematrícula). O processo é dividido em duas partes: **Administrativa** (geração e gestão) e **Pública** (preenchimento pelos responsáveis).

---

## 1. Área Administrativa (Secretaria)

Acesse o menu **Pré-Matrículas** no painel administrativo.

### Gerar Novo Link

No formulário "Gerar Novo Link", você tem as seguintes opções:

#### Tipo de Matrícula
*   **Aluno Novo**: Para estudantes que ainda não existem no sistema.
*   **Rematrícula (Aluno Existente)**: Para atualizar dados de alunos já cadastrados.

#### Campos Adicionais
*   **Nome de Referência (Aluno Novo)**: Um nome para identificar o link (ex: "Família Silva"). Opcional.
*   **Selecione o Aluno (Rematrícula)**: Obrigatório para rematrículas. O link será vinculado a este aluno específico.
*   **Turma de Destino (Opcional)**:
    *   **Aluno Novo**: Se selecionada, o aluno será automaticamente enturmado nesta classe ao finalizar o cadastro.
    *   **Rematrícula**: Indica a intenção de vaga para o próximo ano. **Não** move o aluno da turma atual imediatamente.

### Gerenciamento de Links

Na tabela "Links Gerados", você pode:
*   **Copiar Link**: Ícone de cópia. Envie este link para o responsável (WhatsApp, E-mail, etc.).
*   **Visualizar (Olho)**: Ver detalhes do link, incluindo aluno vinculado e turma de destino.
*   **Excluir (Lixeira)**: Remove o link. Se o cadastro já foi concluído, o registro do aluno **não** é apagado, apenas o link de pré-matrícula.

---

## 2. Área Pública (Responsável)

O responsável recebe o link e o acessa pelo navegador (celular ou computador).

### Aluno Novo
1.  O formulário abre em branco.
2.  O responsável preenche dados Pessoais, Endereço (com busca por CEP), Saúde e Responsáveis.
3.  Ao enviar, um novo cadastro de aluno é criado no sistema.
4.  Se uma **Turma de Destino** foi definida pela secretaria, o aluno já entra nela.

### Rematrícula
1.  O formulário abre **já preenchido** com os dados atuais do aluno.
2.  O responsável confere e atualiza as informações (ex: mudou de telefone ou endereço).
3.  Ao enviar, os dados do aluno são **atualizados** no sistema.
4.  O aluno **permanece na turma atual**. A turma de destino fica registrada apenas no histórico da pré-matrícula para organização da secretaria.

---

## Fluxo de Dados

| Ação | Aluno Novo | Rematrícula |
| :--- | :--- | :--- |
| **Criação de Registro** | Cria novo `Student` | Atualiza `Student` existente |
| **Enturmação** | Entra na Turma de Destino (se houver) | Mantém Turma Atual |
| **Dados do Responsável** | Cria novos `Guardians` | Atualiza ou cria vínculos |
| **Status do Link** | Muda para "Concluído" | Muda para "Concluído" |
