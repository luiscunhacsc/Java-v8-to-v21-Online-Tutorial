# Java Moderno 8→21
Plataforma educacional open-source, desktop-first, para estudar a evolução do Java (8 a 21) com foco em prática, clareza e retenção.

## English summary
This is an open-source educational website (desktop-first) to learn modern Java from 8 to 21 through a guided 12-module path, practical examples, mini quizzes, and local progress tracking via `localStorage`.

## Visão geral
Este repositório contém duas formas de publicação:

- `index.html` (recomendado): percurso modular completo, com navegação, quizzes e progresso.
- `index-completo-java8a21.html` (alternativo): conteúdo total numa única página para publicação rápida.

## Demo local
Entrypoints disponíveis:

- Principal: `index.html`
- Alternativo: `index-completo-java8a21.html`

## Quick start
Sem dependências de build.

```bash
python -m http.server 5500
```

Depois abre no browser:

- `http://localhost:5500/` (homepage)
- `http://localhost:5500/index.html`
- `http://localhost:5500/index-completo-java8a21.html`

## Funcionalidades principais
- 12 módulos em sequência pedagógica guiada.
- Estrutura didática por módulo: gancho, objetivos, explicação por blocos, exemplo “antes vs moderno”, anti-padrões, checkpoint e recap.
- Mini quizzes com feedback e pontuação.
- Progresso global e pontuação total persistidos em `localStorage`.
- Layout desktop-first otimizado para Full HD, 1440p e 4K.
- Navegação por índice lateral + anterior/seguinte nos módulos.

## Arquitetura pedagógica
Cada módulo foi desenhado para aprendizagem ativa:

- Gancho motivacional para contextualização.
- Objetivos concretos (3 a 5).
- Conteúdo em blocos curtos (chunking).
- Exemplo comparativo “antes vs moderno”.
- Erros comuns para prevenção de regressões.
- Checkpoint rápido para retenção.
- Recap em 5 pontos + ponte para o próximo módulo.

## Mapa dos 12 módulos
1. [Introdução ao Java Moderno 8→21](modulos/01-introducao.html) · 10 min  
2. [Expressões Lambda](modulos/02-lambdas.html) · 14 min  
3. [Interfaces no Java Moderno (8→17)](modulos/03-interfaces.html) · 13 min  
4. [API de Streams e combinação map/reduce](modulos/04-streams.html) · 18 min  
5. [Referências a Métodos e Construtores](modulos/05-referencias-metodos.html) · 12 min  
6. [Classe Optional](modulos/06-optional.html) · 14 min  
7. [Melhorias na API de Coleções (Java 8)](modulos/07-colecoes-java8.html) · 13 min  
8. [Scanner, Warnings e try-with-resources](modulos/08-scanner-recursos.html) · 9 min  
9. [Operador Diamond (<>)](modulos/09-operador-diamond.html) · 8 min  
10. [Java 9 a Java 16: Melhorias Principais](modulos/10-java9-16.html) · 16 min  
11. [Java 17 a Java 21: Features de Alto Impacto](modulos/11-java17-21.html) · 18 min  
12. [Inferência de Tipos com var](modulos/12-var.html) · 11 min

## Estrutura do repositório
```text
.
├── index.html
├── index-completo-java8a21.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── common.js
│       ├── index.js
│       ├── module-page.js
│       ├── modules-data.js
│       └── storage.js
├── modulos/
│   ├── 01-introducao.html
│   ├── 02-lambdas.html
│   ├── 03-interfaces.html
│   ├── 04-streams.html
│   ├── 05-referencias-metodos.html
│   ├── 06-optional.html
│   ├── 07-colecoes-java8.html
│   ├── 08-scanner-recursos.html
│   ├── 09-operador-diamond.html
│   ├── 10-java9-16.html
│   ├── 11-java17-21.html
│   └── 12-var.html
└── docs/
    └── images/
        ├── cover-home.png
        ├── module-view.png
        └── progress-view.png
```

## Secção visual
> As imagens em `docs/images/` podem ser substituídas pelas capturas finais do projeto.

![Capa da homepage](docs/images/cover-home.png)
*Capa da experiência principal (`index.html`).*

![Vista de módulo](docs/images/module-view.png)
*Exemplo de layout de um módulo com conteúdo e checkpoint.*

![Vista de progresso](docs/images/progress-view.png)
*Progresso e leitura de evolução do percurso.*

## Interfaces técnicas públicas
Não existe API backend pública. O contrato técnico central está no frontend.

### Contrato de módulo (`assets/js/modules-data.js`)
```json
{
  "id": "string",
  "slug": "string",
  "titulo": "string",
  "duracaoMin": 0,
  "objetivos": ["string"],
  "secoes": [
    { "titulo": "string", "texto": ["string"] }
  ],
  "exemplos": [
    {
      "titulo": "string",
      "antes": "string",
      "moderno": "string",
      "explicacao": "string"
    }
  ],
  "quiz": [
    {
      "id": "string",
      "pergunta": "string",
      "opcoes": ["string"],
      "indiceCorreto": 0,
      "explicacao": "string"
    }
  ],
  "recap": ["string"],
  "proximoId": "string|null"
}
```

### Contrato de quiz
```json
{
  "id": "string",
  "pergunta": "string",
  "opcoes": ["string"],
  "indiceCorreto": 0,
  "explicacao": "string"
}
```

### Persistência (`localStorage`)
- `javaModerno.v1.progress`
- `javaModerno.v1.quizScores`
- `javaModerno.v1.quizAnswers`
- `javaModerno.v1.totalScore`

## Roadmap
- Versão mobile-first complementar (mantendo desktop premium).
- Exportação opcional de progresso local (backup/restauro).
- Blocos de “desafio prático” por módulo com validação guiada.
- Métricas opcionais (privacidade-first) para análise de conclusão.
- Mais módulos avançados (concorrência, JVM tuning, observabilidade).

## Contribuição
Contribuições são bem-vindas.

1. Abre uma issue com contexto e proposta.
2. Cria uma branch curta e descritiva.
3. Mantém o idioma PT-PT e consistência pedagógica.
4. Evita alterar lógica de progresso/quiz sem justificar impacto.
5. Submete PR com descrição clara do que mudou e porquê.

Boas práticas para conteúdo:
- Preferir exemplos curtos e executáveis.
- Explicar “quando usar” e “quando evitar”.
- Incluir anti-padrões e recap objetivo.

## Créditos e licença
- Materiais-base: **Luís Simões da Cunha (2025)**.
- Licença de referência nos materiais: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).
- Exemplos de apoio: [java-features-from-v8-to-now](https://github.com/luiscunhacsc/java-features-from-v8-to-now).

> Este repositório mantém a atribuição e a orientação não-comercial indicadas nos materiais de origem.
