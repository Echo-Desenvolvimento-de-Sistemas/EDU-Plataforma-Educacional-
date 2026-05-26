# Edu - Plataforma Escolar White-label
**Guia Completo de Funcionalidades para Vendas e Apresentações Comerciais**

O **Edu** é uma solução completa e *White-label* de gestão escolar, projetada para modernizar e simplificar a operação de instituições de ensino. Com uma arquitetura moderna (Single Page Application) e design responsivo, a plataforma oferece portais dedicados para todos os atores do ecossistema escolar: Administradores, Secretaria, Professores, Alunos e Responsáveis.

---

## 🌟 Diferenciais Exclusivos (Argumentos de Venda)

*   **100% White-label (Marca da Escola):** O sistema se adapta à identidade visual da instituição. Logo, cores, nome e painel de login são personalizados para fortalecer a marca da escola, não a da plataforma.
*   **Agenda Digital "WhatsApp-First":** Um módulo de comunicação revolucionário. Substitui os caóticos grupos de WhatsApp por canais oficiais integrados. Permite mensagens diretas, listas de transmissão, confirmação de leitura e até integração via API com o WhatsApp real.
*   **Acesso Simplificado:** Sistema inteligente de login. Pais e alunos podem acessar usando apenas o CPF. Suporte a "Magic Link" via WhatsApp (login sem senha) e painel integrado.
*   **Integração com Gamificação:** Preparado nativamente para sincronizar alunos, turmas e professores com plataformas externas de gamificação educacional.
*   **Experiência Premium (UX/UI):** Interface moderna com Tema Escuro (Dark Mode), navegação ultrarrápida (sem recarregar a página) e design *Mobile-First* (perfeito no celular, tablet e computador).

---

## 🏛️ 1. Módulo: Administração Geral
*Controle absoluto sobre a instituição de ensino, focado em diretores e gestores.*

*   **Dashboard Executivo:** Visão panorâmica dos indicadores da escola.
*   **Gestão da Estrutura Acadêmica:** Controle total da hierarquia (Anos Letivos → Níveis de Ensino → Séries → Turmas → Disciplinas).
*   **Gestão de Usuários (RBAC):** Controle de acesso rigoroso baseado em papéis (Admin, Secretaria, Professor, Aluno, Responsável).
*   **Ensalamento Avançado:** Alocação inteligente de professores às turmas e disciplinas.
*   **Gestão de Grade Horária:** Montagem e distribuição dos horários de aula por turma.
*   **Kanban de Projetos:** Ferramenta visual (estilo Trello) integrada para gestão de tarefas internas, processos e projetos da equipe pedagógica e administrativa.
*   **Configurações do Sistema:** Parametrização global, gestão de templates de documentos, configuração de feriados e calendário escolar.

---

## 📝 2. Módulo: Secretaria e Atendimento
*Focado em eficiência, redução de filas e automação de processos burocráticos.*

*   **Captação e Pré-Matrícula Online:** Link público e formulário digital para captação de novos alunos. A secretaria analisa e converte a pré-matrícula em matrícula definitiva com 1 clique.
*   **Gestão Completa de Alunos:** Prontuário digital com dados pessoais, endereço, informações de saúde (alergias, tipo sanguíneo) e documentação.
*   **Gestão de Responsáveis Financeiros/Pedagógicos:** Vínculo familiar detalhado, definindo o grau de parentesco e as responsabilidades de cada guardião.
*   **Emissão de Documentos e Relatórios:** Geração automatizada de fichas de matrícula, boletins, declarações e históricos em formato PDF, prontos para impressão oficial.
*   **Validador de Documentos (Anti-Fraude):** Documentos gerados recebem um QR Code público para validação de autenticidade (ex: Declaração de Matrícula).
*   **Inbox da Secretaria:** Central de atendimento via Agenda Digital para suporte a pais e alunos.

---

## 👨‍🏫 3. Módulo: Portal do Professor
*Ferramentas que otimizam o tempo do educador, focando no que importa: ensinar.*

*   **Minhas Turmas:** Visão geral e atalhos rápidos para as turmas alocadas ao professor.
*   **Chamada Digital Ágil:** Lançamento de frequência e faltas (por dia ou por disciplina) em poucos segundos, pelo celular ou computador.
*   **Diário de Classe e Notas:** Planilha digital inteligente para lançamento de notas de avaliações e cálculo automático de médias (bimestrais, semestrais).
*   **Planejamento Pedagógico:** Criação de Planos de Aula diretamente no sistema, com associação de **Habilidades da BNCC** e fluxo de aprovação pela coordenação.
*   **Banco de Questões:** Repositório pessoal do professor para criar e armazenar questões (Múltipla Escolha, Verdadeiro/Falso, Dissertativa) com tags BNCC.
*   **Criador de Atividades:** Montagem de provas e atividades puxando itens do Banco de Questões, disponibilizando-as digitalmente para os alunos.
*   **Métricas de Desempenho:** Gráficos e indicadores do rendimento da turma por disciplina.

---

## 👨‍👩‍👧‍👦 4. Módulo: Portal do Aluno e Responsável
*Transparência, engajamento familiar e autonomia para os estudantes.*

*   **Boletim Online (Tempo Real):** Acesso imediato a notas, médias e parciais assim que o professor realiza o lançamento.
*   **Consulta de Frequência:** Monitoramento de faltas e presenças consolidadas.
*   **Cronograma e Horários:** Visualização amigável da grade horária semanal da turma.
*   **Agenda Digital e Comunicados:** Recebimento de circulares, avisos de reuniões e troca de mensagens diretas com a secretaria ou professores (dependendo das permissões).
*   **Player de Atividades (Aluno):** Interface interativa e gamificada para responder às atividades e simulados criados pelos professores.
*   **Acesso Multi-Filhos (Responsável):** Um único login permite ao pai/mãe alternar facilmente entre os perfis de todos os seus filhos matriculados na escola.

---

## 🚀 5. Benefícios Técnicos e Operacionais (Para o TI / Gestão)

*   **Alta Performance:** Construído em React/Inertia, o sistema não recarrega a página ao navegar, entregando uma experiência semelhante a um aplicativo nativo.
*   **Segurança Avançada:** Senhas criptografadas, proteção contra ataques (CSRF/XSS), e suporte a Autenticação em Duas Etapas (2FA).
*   **Comunicação Assíncrona:** Envios em massa (mensagens, WhatsApp) processados em background (filas), garantindo que o sistema nunca trave para o usuário.
*   **Escalabilidade Cloud-Ready:** Arquitetura preparada (Docker) para rodar em nuvem (AWS, DigitalOcean, etc), suportando de pequenas escolas a grandes redes de ensino.
*   **Código Base Confiável:** Backend em Laravel 11, o framework PHP mais utilizado e seguro do mundo, garantindo manutenibilidade a longo prazo.
