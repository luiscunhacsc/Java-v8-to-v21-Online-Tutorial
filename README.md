# Java Moderno 8->21
Plataforma educacional open-source para estudar Java moderno (8 a 21) com percurso guiado, exemplos praticos e checkpoints de retencao.

## English summary
Open-source educational website to learn modern Java (8 to 21) through a guided 12-module path, practical examples, mini quizzes, and local progress tracking.

## Estado do projeto
- Entrypoint oficial: `index.html`
- Site estatico (sem backend)
- Foco desktop-first: Full HD, 1440p e 4K
- A versao "all-in-one page" foi descontinuada e nao faz parte da experiencia atual

## Quick start
Sem dependencias de build.

```bash
python -m http.server 5500
```

Abrir no browser:

- `http://localhost:5500/`
- `http://localhost:5500/index.html`

## Funcionalidades principais
- 12 modulos em sequencia pedagogica
- Estrutura por modulo: gancho, objetivos, explicacao em blocos, exemplo "antes vs moderno", anti-padroes, checkpoint e recap
- Mini quizzes com feedback imediato
- Progresso global e pontuacao persistidos em `localStorage`
- Navegacao por indice + anterior/seguinte

## Mapa de modulos
1. [Introducao ao Java Moderno 8->21](modulos/01-introducao.html)
2. [Expressoes Lambda](modulos/02-lambdas.html)
3. [Interfaces no Java Moderno (8->17)](modulos/03-interfaces.html)
4. [API de Streams e combinacao map/reduce](modulos/04-streams.html)
5. [Referencias a Metodos e Construtores](modulos/05-referencias-metodos.html)
6. [Classe Optional](modulos/06-optional.html)
7. [Melhorias na API de Colecoes (Java 8)](modulos/07-colecoes-java8.html)
8. [Scanner, Warnings e try-with-resources](modulos/08-scanner-recursos.html)
9. [Operador Diamond (<>)](modulos/09-operador-diamond.html)
10. [Java 9 a Java 16: Melhorias Principais](modulos/10-java9-16.html)
11. [Java 17 a Java 21: Features de Alto Impacto](modulos/11-java17-21.html)
12. [Inferencia de Tipos com var](modulos/12-var.html)

## Estrutura do repositorio
```text
.
|-- index.html
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   `-- js/
|       |-- common.js
|       |-- index.js
|       |-- module-page.js
|       |-- modules-data.js
|       `-- storage.js
`-- modulos/
    |-- 01-introducao.html
    |-- 02-lambdas.html
    |-- 03-interfaces.html
    |-- 04-streams.html
    |-- 05-referencias-metodos.html
    |-- 06-optional.html
    |-- 07-colecoes-java8.html
    |-- 08-scanner-recursos.html
    |-- 09-operador-diamond.html
    |-- 10-java9-16.html
    |-- 11-java17-21.html
    `-- 12-var.html
```

## Contratos tecnicos (frontend)
### Contrato de modulo (`assets/js/modules-data.js`)
```json
{
  "id": "string",
  "slug": "string",
  "titulo": "string",
  "duracaoMin": 0,
  "objetivos": ["string"],
  "secoes": [{ "titulo": "string", "texto": ["string"] }],
  "exemplos": [{
    "titulo": "string",
    "antes": "string",
    "moderno": "string",
    "explicacao": "string"
  }],
  "quiz": [{
    "id": "string",
    "pergunta": "string",
    "opcoes": ["string"],
    "indiceCorreto": 0,
    "explicacao": "string"
  }],
  "recap": ["string"],
  "proximoId": "string|null"
}
```

### Persistencia local (`localStorage`)
- `javaModerno.v1.progress`
- `javaModerno.v1.quizScores`
- `javaModerno.v1.quizAnswers`
- `javaModerno.v1.totalScore`

## Contribuicao
1. Abrir issue com contexto e objetivo.
2. Criar branch curta e descritiva.
3. Manter consistencia pedagogica e estilo do projeto.
4. Submeter PR com descricao clara das alteracoes.

## Creditos e licenca
- Materiais-base: **Luis Simoes da Cunha (2025)**
- Licenca de referencia dos materiais: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
- Repositorio de apoio: [java-features-from-v8-to-now](https://github.com/luiscunhacsc/java-features-from-v8-to-now)
