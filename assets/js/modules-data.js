(function () {
  "use strict";

  /**
   * Contrato de módulo:
   * id, slug, titulo, duracaoMin, gancho, objetivos[], secoes[], exemplos[], quiz[], recap[], proximoId
   * Contrato de quiz:
   * id, pergunta, opcoes[], indiceCorreto, explicacao
   */
  const modules = [
    {
      id: "introducao",
      slug: "01-introducao",
      titulo: "Introdução ao Java Moderno 8→21",
      duracaoMin: 10,
      gancho: "Java não ficou só mais completo: ficou estrategicamente mais poderoso. Este arranque organiza o teu mapa mental para avançares com confiança técnica desde o primeiro módulo.",
      objetivos: [
        "Perceber a evolução do Java do paradigma clássico para um estilo híbrido OO+funcional.",
        "Reconhecer os blocos de funcionalidades que mais impactam produtividade e legibilidade.",
        "Definir um critério prático para decidir quando adotar sintaxe moderna."
      ],
      secoes: [
        {
          titulo: "Do Java verboso ao Java intencional",
          texto: [
            "Até Java 7, muita lógica útil ficava escondida em ruído sintático. Desde o Java 8, a linguagem reduz cerimónia sem abdicar de tipagem forte.",
            "A mudança não é cosmética: altera a forma de modelar pipelines de dados, APIs e domínios."
          ]
        },
        {
          titulo: "Três ondas de modernização",
          texto: [
            "Java 8 trouxe Lambdas, Streams, Optional e melhorias em Collections.",
            "Java 9–16 consolidou módulos, API HTTP, var, text blocks e switch expressions.",
            "Java 17–21 reforçou modelação de domínio e concorrência com records, sealed classes, pattern matching e virtual threads."
          ]
        },
        {
          titulo: "Como usar este percurso",
          texto: [
            "Segue a ordem recomendada. Cada módulo depende parcialmente do anterior.",
            "Foca em três perguntas por tema: quando usar, quando evitar e como validar impacto no código real."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Mudança de estilo: de loops a pipelines",
          antes: `List<String> resultado = new ArrayList<>();
for (String nome : nomes) {
  if (nome.startsWith("A")) {
    resultado.add(nome.toUpperCase());
  }
}`,
          moderno: `List<String> resultado = nomes.stream()
  .filter(nome -> nome.startsWith("A"))
  .map(String::toUpperCase)
  .toList();`,
          explicacao: "A intenção fica explícita: filtrar, transformar, materializar. Menos controlo manual, mais foco na regra."
        }
      ],
      erros: [
        "Adotar features novas sem um critério claro de legibilidade e manutenção.",
        "Misturar estilos antigo e moderno no mesmo bloco, dificultando leitura.",
        "Ignorar medição de impacto em performance e não considerar contexto do domínio."
      ],
      quiz: [
        {
          id: "intro_q1",
          pergunta: "Qual é o principal ganho ao migrar para idioms modernos do Java?",
          opcoes: [
            "Reduzir memória usada em qualquer cenário.",
            "Expressar intenção com menos ruído sintático e melhor legibilidade.",
            "Eliminar totalmente a necessidade de orientação a objetos.",
            "Substituir todas as APIs antigas automaticamente."
          ],
          indiceCorreto: 1,
          explicacao: "O ganho central é clareza e expressividade. Performance depende do contexto e do desenho."
        },
        {
          id: "intro_q2",
          pergunta: "A sequência mais consistente para estudar no manual é:",
          opcoes: [
            "Começar por virtual threads e voltar para Lambdas no fim.",
            "Começar por módulos Java 9 e ignorar Java 8.",
            "Começar por Java 8 (Lambdas/Streams) e evoluir para versões posteriores.",
            "Estudar apenas var e records porque cobrem todas as mudanças."
          ],
          indiceCorreto: 2,
          explicacao: "Os conceitos de Java 8 são a base de boa parte das melhorias seguintes."
        }
      ],
      recap: [
        "Java moderno é evolução de estilo, não ruptura total.",
        "Adoção gradual funciona melhor do que refatoração cega.",
        "Java 8 é base; Java 9–21 consolida capacidade e ergonomia.",
        "Legibilidade e intenção devem guiar decisões.",
        "Cada módulo seguinte traduz este princípio em prática."
      ],
      ponteProximo: "No próximo módulo, entras no mecanismo que iniciou a viragem funcional: as Expressões Lambda.",
      proximoId: "lambdas"
    },
    {
      id: "lambdas",
      slug: "02-lambdas",
      titulo: "Expressões Lambda",
      duracaoMin: 14,
      gancho: "Aqui começa a viragem real: menos ruído, mais intenção. Lambdas dão-te velocidade sem abdicar de tipagem forte.",
      objetivos: [
        "Identificar interfaces funcionais e mapear comportamento para lambdas.",
        "Converter classes anónimas em sintaxe lambda de forma segura.",
        "Evitar lambdas excessivas que reduzem legibilidade."
      ],
      secoes: [
        {
          titulo: "Sintaxe mínima com semântica clara",
          texto: [
            "Uma lambda representa implementação inline de um único método abstrato.",
            "Padrão: (parâmetros) -> expressão ou bloco."
          ]
        },
        {
          titulo: "Onde aplicar com maior retorno",
          texto: [
            "Callbacks, filtros, ordenação e transformação de dados.",
            "Integração forte com Streams e method references."
          ]
        },
        {
          titulo: "Quando recuar",
          texto: [
            "Se a lambda cresce demasiado, extrai para método nomeado.",
            "Nomear intenção continua a ser obrigatório quando o comportamento é complexo."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Thread: classe anónima vs lambda",
          antes: `Runnable tarefa = new Runnable() {
  @Override
  public void run() {
    System.out.println("Processar lote...");
  }
};
new Thread(tarefa).start();`,
          moderno: `Runnable tarefa = () -> System.out.println("Processar lote...");
new Thread(tarefa).start();`,
          explicacao: "A implementação fica focada no comportamento essencial do callback."
        },
        {
          titulo: "Comparator com menos ruído",
          antes: `Collections.sort(produtos, new Comparator<Produto>() {
  @Override
  public int compare(Produto a, Produto b) {
    return Double.compare(a.getPreco(), b.getPreco());
  }
});`,
          moderno: `produtos.sort((a, b) -> Double.compare(a.getPreco(), b.getPreco()));`,
          explicacao: "A operação de ordenação fica num único ponto sem boilerplate de classe anónima."
        }
      ],
      erros: [
        "Usar lambdas longas com múltiplas responsabilidades.",
        "Forçar efeitos colaterais dentro de pipelines funcionais.",
        "Esquecer que a interface alvo tem de ser funcional."
      ],
      quiz: [
        {
          id: "lambda_q1",
          pergunta: "Uma lambda em Java exige que o tipo alvo seja:",
          opcoes: [
            "Uma classe abstrata com dois métodos.",
            "Uma interface funcional com um método abstrato.",
            "Qualquer enum com método estático.",
            "Uma classe concreta com construtor vazio."
          ],
          indiceCorreto: 1,
          explicacao: "O compilador precisa de um contrato funcional único para inferir o tipo."
        },
        {
          id: "lambda_q2",
          pergunta: "Qual prática melhora legibilidade com lambdas?",
          opcoes: [
            "Colocar toda a lógica de negócio dentro da lambda.",
            "Usar lambdas mesmo quando o método nomeado seria mais claro.",
            "Extrair para método quando o bloco deixa de ser curto e óbvio.",
            "Evitar interfaces funcionais e usar Object."
          ],
          indiceCorreto: 2,
          explicacao: "Lambdas brilham em comportamento curto. Fluxos complexos pedem nomeação explícita."
        }
      ],
      recap: [
        "Lambdas reduzem boilerplate de classes anónimas.",
        "Interface funcional é pré-requisito técnico.",
        "Curto e expressivo ganha de longo e opaco.",
        "Method references são evolução natural quando a lambda só delega.",
        "Streams tornam-se muito mais poderosos com lambdas bem desenhadas."
      ],
      ponteProximo: "No próximo módulo, vais perceber como as interfaces evoluíram para suportar comportamento real sem quebrar compatibilidade.",
      proximoId: "interfaces"
    },
    {
      id: "interfaces",
      slug: "03-interfaces",
      titulo: "Interfaces no Java Moderno (8→17)",
      duracaoMin: 13,
      gancho: "Interfaces deixaram de ser só contrato. Neste módulo, vais dominar como elas passaram a carregar comportamento útil e modelação segura.",
      objetivos: [
        "Aplicar métodos default e static para evoluir APIs sem quebrar implementações antigas.",
        "Resolver conflitos de métodos default com override explícito e Interface.super.metodo().",
        "Usar private methods (Java 9) e sealed interfaces (Java 17) com critério de design."
      ],
      secoes: [
        {
          titulo: "Java 8: default + static em interfaces",
          texto: [
            "default methods permitem adicionar comportamento sem forçar implementação imediata em classes existentes.",
            "static methods na interface concentram utilitários do próprio domínio, evitando classes auxiliares genéricas."
          ]
        },
        {
          titulo: "Conflitos de default methods",
          texto: [
            "Quando duas interfaces oferecem o mesmo método default, a classe concreta precisa resolver explicitamente o conflito.",
            "A resolução pode usar implementação própria ou delegar para uma interface específica com Interface.super.metodo()."
          ]
        },
        {
          titulo: "Java 9 e Java 17",
          texto: [
            "Java 9 introduz private methods para reutilização interna entre default/static, reduzindo duplicação no contrato.",
            "Java 17 introduz sealed interfaces para limitar implementações permitidas com permits, sealed, final e non-sealed."
          ]
        },
        {
          titulo: "Interfaces e pattern matching",
          texto: [
            "Hierarquias seladas tornam o tratamento por tipo mais explícito e previsível.",
            "Em versões recentes, a combinação com switch por padrões melhora clareza em regras de domínio."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Interface evolutiva com default, static e private",
          antes: `interface Notificador {
  void enviar(String mensagem);
}`,
          moderno: `interface Notificador {
  default String prefixo() {
    return "[APP]";
  }

  static boolean emailValido(String email) {
    return email != null && email.contains("@");
  }

  default void info(String mensagem) {
    log("INFO", mensagem);
  }

  private void log(String nivel, String mensagem) {
    System.out.println(prefixo() + " " + nivel + ": " + mensagem);
  }
}`,
          explicacao: "A interface mantém contrato e passa a incluir comportamento reutilizável sem quebrar versões anteriores."
        },
        {
          titulo: "Sealed interface com implementações controladas",
          antes: `interface Resultado {}
class Sucesso implements Resultado {}
class Falha implements Resultado {}`,
          moderno: `sealed interface Resultado permits Sucesso, Falha {}

final class Sucesso implements Resultado {}
non-sealed class Falha implements Resultado {}
final class FalhaValidacao extends Falha {}

static String resumo(Resultado r) {
  return switch (r) {
    case Sucesso s -> "Operação concluída";
    case FalhaValidacao fv -> "Falha de validação";
    case Falha f -> "Falha genérica";
  };
}`,
          explicacao: "Com sealed interfaces, o conjunto de implementações passa a ser explícito e mais seguro para manutenção."
        }
      ],
      erros: [
        "Usar default methods para lógica pesada que deveria viver em serviço de domínio.",
        "Ignorar conflitos entre interfaces e deixar resolução implícita.",
        "Declarar sealed interface sem desenhar claramente as implementações permitidas."
      ],
      quiz: [
        {
          id: "int_q1",
          pergunta: "Qual vantagem principal dos métodos default em interfaces?",
          opcoes: [
            "Substituir classes concretas em todos os cenários.",
            "Evoluir interfaces mantendo compatibilidade com implementações existentes.",
            "Eliminar necessidade de testes unitários.",
            "Forçar herança múltipla de classes."
          ],
          indiceCorreto: 1,
          explicacao: "default methods permitem adicionar comportamento sem quebrar classes já implementadas."
        },
        {
          id: "int_q2",
          pergunta: "Como resolver conflito de default methods de duas interfaces?",
          opcoes: [
            "Não é possível, o compilador escolhe automaticamente.",
            "Remover uma das interfaces do código.",
            "Sobrescrever o método e, se necessário, usar Interface.super.metodo().",
            "Converter as interfaces em classes abstratas."
          ],
          indiceCorreto: 2,
          explicacao: "A classe concreta deve resolver explicitamente o conflito."
        },
        {
          id: "int_q3",
          pergunta: "Qual novidade do Java 17 em interfaces é correta?",
          opcoes: [
            "Interfaces passaram a permitir construtores públicos.",
            "Sealed interfaces permitem restringir implementações com permits.",
            "Interfaces deixaram de aceitar métodos static.",
            "Métodos private foram removidos."
          ],
          indiceCorreto: 1,
          explicacao: "sealed interfaces tornam a hierarquia explícita e controlada."
        }
      ],
      recap: [
        "default methods ajudam na evolução de API sem ruptura.",
        "static methods mantêm utilitários coesos na própria interface.",
        "Conflitos de default exigem resolução explícita.",
        "private methods reduzem duplicação interna da interface.",
        "sealed interfaces melhoram segurança e clareza de domínio."
      ],
      ponteProximo: "No próximo módulo, aplicas esta base de interfaces em pipelines com Streams e map/reduce.",
      proximoId: "streams"
    },
    {
      id: "streams",
      slug: "04-streams",
      titulo: "API de Streams e combinação map/reduce",
      duracaoMin: 18,
      gancho: "Se queres escrever código que parece engenharia e não burocracia, Streams é o salto. Vais pensar em fluxo de dados, não em controlo manual.",
      objetivos: [
        "Separar operações intermédias e terminais com precisão.",
        "Construir pipelines com filter/map/reduce sem efeitos colaterais.",
        "Avaliar quando usar stream sequencial vs paralelo."
      ],
      secoes: [
        {
          titulo: "Modelo mental de pipeline",
          texto: [
            "Origem de dados -> operações intermédias -> operação terminal.",
            "Intermédias são lazy; execução real só acontece na terminal."
          ]
        },
        {
          titulo: "map/reduce em problemas reais",
          texto: [
            "map transforma cada elemento para uma nova representação.",
            "reduce agrega toda a sequência num único resultado (soma, máximo, composição)."
          ]
        },
        {
          titulo: "Paralelismo com cautela",
          texto: [
            "parallelStream pode escalar em cargas CPU-bound, mas exige operações associativas e sem estado partilhado.",
            "Sem esses cuidados, o ganho de throughput pode virar regressão ou resultado incorreto."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Pipeline de limpeza e agregação",
          antes: `int total = 0;
for (Pedido p : pedidos) {
  if (p.estaPago()) {
    total += p.getItens().size();
  }
}`,
          moderno: `int total = pedidos.stream()
  .filter(Pedido::estaPago)
  .mapToInt(p -> p.getItens().size())
  .sum();`,
          explicacao: "O pipeline descreve o processo em etapas sem controlar manualmente índice e acumulador."
        },
        {
          titulo: "Map + Reduce",
          antes: `double soma = 0.0;
for (Produto produto : produtos) {
  soma += produto.getPreco() * produto.getQuantidade();
}`,
          moderno: `double soma = produtos.stream()
  .map(produto -> produto.getPreco() * produto.getQuantidade())
  .reduce(0.0, Double::sum);`,
          explicacao: "Primeiro transformas cada item em valor monetário. Depois reduzes para total."
        }
      ],
      erros: [
        "Usar forEach para mutar estado externo em vez de coletores apropriados.",
        "Executar operações pesadas em parallelStream sem benchmark.",
        "Confundir map (transformação) com peek (observação/debug)."
      ],
      quiz: [
        {
          id: "stream_q1",
          pergunta: "Qual afirmação está correta sobre streams?",
          opcoes: [
            "Operações intermédias executam sempre de imediato.",
            "A execução ocorre quando existe operação terminal.",
            "Streams alteram obrigatoriamente a coleção original.",
            "parallelStream garante ordem de processamento."
          ],
          indiceCorreto: 1,
          explicacao: "A execução é lazy até à operação terminal."
        },
        {
          id: "stream_q2",
          pergunta: "Em map + reduce, o map deve:",
          opcoes: [
            "Agregar resultados num único valor.",
            "Parar a execução do stream.",
            "Transformar cada elemento para novo valor.",
            "Ordenar elementos antes de reduzir."
          ],
          indiceCorreto: 2,
          explicacao: "A agregação é papel do reduce; map apenas converte elemento a elemento."
        },
        {
          id: "stream_q3",
          pergunta: "Quando parallelStream tende a ser opção razoável?",
          opcoes: [
            "Em listas pequenas com lógica leve.",
            "Quando há estado mutável partilhado.",
            "Em cargas pesadas e operações independentes após benchmark.",
            "Quando é obrigatório manter ordem exata com forEach."
          ],
          indiceCorreto: 2,
          explicacao: "Paralelismo só compensa quando custo de trabalho justifica overhead e não há dependências perigosas."
        }
      ],
      recap: [
        "Streams introduzem estilo declarativo para coleções.",
        "Intermédias são lazy; terminal dispara execução.",
        "map transforma; reduce agrega.",
        "Evita mutação externa dentro do pipeline.",
        "Paralelismo exige medição e desenho seguro."
      ],
      ponteProximo: "No próximo módulo, vais simplificar ainda mais lambdas com referências a métodos e construtores.",
      proximoId: "referencias"
    },
    {
      id: "referencias",
      slug: "05-referencias-metodos",
      titulo: "Referências a Métodos e Construtores",
      duracaoMin: 12,
      gancho: "Este módulo é sobre elegância com critério: quando o método já existe, referências limpam o código e aumentam leitura imediata.",
      objetivos: [
        "Distinguir os quatro tipos principais de referências.",
        "Converter lambdas delegadoras para referências equivalentes.",
        "Escolher entre lambda e referência com critério de clareza."
      ],
      secoes: [
        {
          titulo: "Os quatro formatos",
          texto: [
            "Classe::metodoEstatico, objeto::metodoInstancia, Classe::metodoInstancia e Classe::new.",
            "Todos preservam o mesmo contrato funcional da lambda equivalente."
          ]
        },
        {
          titulo: "Vantagem real",
          texto: [
            "Melhor leitura quando o nome do método já comunica intenção.",
            "Ótimo para pipelines e operações em coleções."
          ]
        },
        {
          titulo: "Limite prático",
          texto: [
            "Se precisas de adaptar argumentos, lógica condicional ou múltiplas chamadas, lambda explícita costuma ser melhor."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Impressão direta",
          antes: `nomes.forEach(nome -> System.out.println(nome));`,
          moderno: `nomes.forEach(System.out::println);`,
          explicacao: "A referência reduz ruído sem alterar comportamento."
        },
        {
          titulo: "Construção de objetos em stream",
          antes: `List<Aluno> alunos = nomes.stream()
  .map(nome -> new Aluno(nome))
  .toList();`,
          moderno: `List<Aluno> alunos = nomes.stream()
  .map(Aluno::new)
  .toList();`,
          explicacao: "Construtores também podem ser referenciados quando a assinatura coincide."
        }
      ],
      erros: [
        "Usar referência só para parecer moderno, mesmo quando piora compreensão.",
        "Confundir Classe::metodoInstancia com método estático.",
        "Perder contexto do argumento implícito (receiver) em streams."
      ],
      quiz: [
        {
          id: "ref_q1",
          pergunta: "Qual opção representa referência a construtor?",
          opcoes: [
            "Produto::criar",
            "new Produto::nome",
            "Produto::new",
            "Produto.new()"
          ],
          indiceCorreto: 2,
          explicacao: "A sintaxe correta para construtor é Classe::new."
        },
        {
          id: "ref_q2",
          pergunta: "Quando preferir lambda em vez de method reference?",
          opcoes: [
            "Quando só encaminha para um método já pronto.",
            "Quando requer lógica adicional para adaptar dados.",
            "Quando vais usar forEach simples.",
            "Quando queres reduzir verbosidade ao máximo sempre."
          ],
          indiceCorreto: 1,
          explicacao: "Se há transformação ou lógica extra, a lambda explicita melhor o comportamento."
        }
      ],
      recap: [
        "Method references são forma concisa de lambdas delegadoras.",
        "Há quatro padrões de referência principais.",
        "Clareza manda na escolha entre lambda e referência.",
        "Construtores integram bem com map.",
        "Evita dogma: usa o que comunica melhor."
      ],
      ponteProximo: "No próximo módulo, atacamos o problema clássico de null com Optional.",
      proximoId: "optional"
    },
    {
      id: "optional",
      slug: "06-optional",
      titulo: "Classe Optional",
      duracaoMin: 14,
      gancho: "Optional não é moda: é clareza de contrato. Vais reduzir ambiguidade e tornar o teu código muito mais previsível.",
      objetivos: [
        "Modelar ausência de valor explicitamente com Optional.",
        "Usar map/flatMap/orElse/orElseGet/orElseThrow em cadeia segura.",
        "Evitar abuso de Optional em campos e parâmetros inadequados."
      ],
      secoes: [
        {
          titulo: "Contrato explícito de ausência",
          texto: [
            "Optional comunica ao consumidor que o valor pode não existir.",
            "Substitui verificações manuais repetitivas por um fluxo explícito."
          ]
        },
        {
          titulo: "Operadores centrais",
          texto: [
            "map transforma o valor presente; flatMap evita Optional aninhado.",
            "orElseGet é preferível a orElse quando o fallback é caro."
          ]
        },
        {
          titulo: "Boas fronteiras",
          texto: [
            "Optional funciona bem em retornos de método.",
            "Evita usar em atributos de entidades persistentes ou em argumentos obrigatórios."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Acesso seguro a valor opcional",
          antes: `String nome = null;
if (utilizador != null && utilizador.getPerfil() != null) {
  nome = utilizador.getPerfil().getNome();
}
if (nome == null) {
  nome = "Visitante";
}`,
          moderno: `String nome = Optional.ofNullable(utilizador)
  .map(Utilizador::getPerfil)
  .map(Perfil::getNome)
  .orElse("Visitante");`,
          explicacao: "A cadeia expressa claramente o percurso até ao valor e o fallback."
        },
        {
          titulo: "Fallback eficiente",
          antes: `String token = optionalToken.isPresent()
  ? optionalToken.get()
  : gerarTokenPesado();`,
          moderno: `String token = optionalToken.orElseGet(this::gerarTokenPesado);`,
          explicacao: "orElseGet evita calcular fallback quando o valor já existe."
        }
      ],
      erros: [
        "Usar Optional#get sem validar presença.",
        "Devolver null dentro de Optional, quebrando o contrato.",
        "Aplicar Optional em campos de DTO/entidade sem necessidade."
      ],
      quiz: [
        {
          id: "opt_q1",
          pergunta: "Qual método evita executar fallback pesado desnecessariamente?",
          opcoes: [
            "orElse",
            "get",
            "orElseGet",
            "ifPresent"
          ],
          indiceCorreto: 2,
          explicacao: "orElseGet recebe Supplier e executa apenas se Optional estiver vazio."
        },
        {
          id: "opt_q2",
          pergunta: "Uso mais recomendado de Optional é em:",
          opcoes: [
            "Parâmetros obrigatórios de método.",
            "Retornos onde ausência é válida.",
            "Todos os atributos de entidades JPA.",
            "Constantes estáticas."
          ],
          indiceCorreto: 1,
          explicacao: "Retorno opcional deixa explícito o contrato de ausência sem poluir modelos."
        }
      ],
      recap: [
        "Optional torna ausência de valor explícita.",
        "map/flatMap evitam ifs aninhados.",
        "orElseGet é melhor para fallback caro.",
        "Optional#get direto é fonte de erro.",
        "Usa Optional com critério de design de API."
      ],
      ponteProximo: "A seguir, aplicamos esse estilo moderno às coleções e mapas do Java 8.",
      proximoId: "colecoes"
    },
    {
      id: "colecoes",
      slug: "07-colecoes-java8",
      titulo: "Melhorias na API de Coleções (Java 8)",
      duracaoMin: 13,
      gancho: "Aqui transformas operações comuns em código direto e confiante. Coleções modernas dão-te produtividade sem sacrificar controlo.",
      objetivos: [
        "Aplicar forEach, removeIf, replaceAll e computeIfAbsent corretamente.",
        "Combinar Collections com Streams sem mutações perigosas.",
        "Distinguir coleções mutáveis de imutáveis em APIs."
      ],
      secoes: [
        {
          titulo: "Operações in-place mais legíveis",
          texto: [
            "Métodos novos evitam loops mecânicos para tarefas comuns.",
            "A semântica fica no nome da operação, não no controlo manual."
          ]
        },
        {
          titulo: "Mapas mais inteligentes",
          texto: [
            "computeIfAbsent simplifica inicialização condicional de listas e caches.",
            "merge e compute ajudam em agregações incrementais."
          ]
        },
        {
          titulo: "Imutabilidade como padrão de saída",
          texto: [
            "Quando devolves dados para consumo externo, coleções imutáveis reduzem bugs e efeitos colaterais."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "removeIf em vez de loop manual",
          antes: `Iterator<String> it = tags.iterator();
while (it.hasNext()) {
  if (it.next().isBlank()) {
    it.remove();
  }
}`,
          moderno: `tags.removeIf(String::isBlank);`,
          explicacao: "Código curto e intenção imediata."
        },
        {
          titulo: "computeIfAbsent para indexar por chave",
          antes: `if (!indice.containsKey(categoria)) {
  indice.put(categoria, new ArrayList<>());
}
indice.get(categoria).add(produto);`,
          moderno: `indice.computeIfAbsent(categoria, c -> new ArrayList<>())
  .add(produto);`,
          explicacao: "A inicialização preguiçosa da coleção fica encapsulada na API do Map."
        }
      ],
      erros: [
        "Misturar mutação direta e streams no mesmo fluxo sem necessidade.",
        "Assumir que List.of (Java 9+) é mutável.",
        "Usar computeIfAbsent com funções que têm efeitos colaterais inesperados."
      ],
      quiz: [
        {
          id: "col_q1",
          pergunta: "Qual método do Map evita o padrão containsKey + put?",
          opcoes: [
            "replaceAll",
            "computeIfAbsent",
            "forEach",
            "sorted"
          ],
          indiceCorreto: 1,
          explicacao: "computeIfAbsent cria valor apenas quando a chave não existe."
        },
        {
          id: "col_q2",
          pergunta: "Qual é uma vantagem de devolver coleção imutável em API?",
          opcoes: [
            "Aumenta automaticamente performance em todos os cenários.",
            "Impede mudanças externas acidentais no estado.",
            "Permite adicionar elementos sem validação.",
            "Substitui testes unitários."
          ],
          indiceCorreto: 1,
          explicacao: "Imutabilidade limita efeitos colaterais e facilita manutenção."
        }
      ],
      recap: [
        "Java 8 trouxe operações diretas para coleções e mapas.",
        "removeIf/replaceAll reduzem loops técnicos.",
        "computeIfAbsent simplifica inicialização por chave.",
        "Coleções imutáveis ajudam a proteger contratos de API.",
        "Semântica clara vale mais do que micro-otimização prematura."
      ],
      ponteProximo: "No próximo módulo, tratamos um detalhe que gera muitos warnings: gestão do Scanner e recursos.",
      proximoId: "scanner"
    },
    {
      id: "scanner",
      slug: "08-scanner-recursos",
      titulo: "Scanner, Warnings e try-with-resources",
      duracaoMin: 9,
      gancho: "Detalhes de recursos separam código robusto de código frágil. Este módulo afina decisões que evitam bugs silenciosos em produção.",
      objetivos: [
        "Distinguir cenários onde Scanner deve ser fechado explicitamente.",
        "Aplicar try-with-resources em fontes que exigem ciclo de vida controlado.",
        "Evitar fechar System.in sem intenção explícita."
      ],
      secoes: [
        {
          titulo: "Fechar quando há recurso real",
          texto: [
            "Scanner sobre ficheiros, sockets ou streams dedicadas deve ser fechado.",
            "try-with-resources reduz erro humano e deixa ciclo de vida explícito."
          ]
        },
        {
          titulo: "System.in é caso especial",
          texto: [
            "Fechar Scanner ligado a System.in fecha também a entrada padrão.",
            "Em aplicações interativas, isso pode quebrar leitura posterior."
          ]
        },
        {
          titulo: "Política de projeto",
          texto: [
            "Define convenção: quem cria recurso, fecha recurso.",
            "Documenta exceções no código quando decides não fechar."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Leitura de ficheiro com fechamento seguro",
          antes: `Scanner sc = new Scanner(new File("dados.txt"));
while (sc.hasNextLine()) {
  processar(sc.nextLine());
}
sc.close();`,
          moderno: `try (Scanner sc = new Scanner(new File("dados.txt"))) {
  while (sc.hasNextLine()) {
    processar(sc.nextLine());
  }
}`,
          explicacao: "try-with-resources garante close mesmo com exceções."
        },
        {
          titulo: "System.in com cuidado",
          antes: `Scanner sc = new Scanner(System.in);
String nome = sc.nextLine();
sc.close(); // pode encerrar entrada global`,
          moderno: `Scanner sc = new Scanner(System.in);
String nome = sc.nextLine();
// não fechar aqui se a aplicação continuar a ler do teclado`,
          explicacao: "A decisão depende do ciclo de vida global da aplicação."
        }
      ],
      erros: [
        "Ignorar warnings sem avaliar tipo de recurso.",
        "Fechar System.in cedo e quebrar fluxos seguintes.",
        "Duplicar responsabilidades de fecho em camadas diferentes."
      ],
      quiz: [
        {
          id: "scan_q1",
          pergunta: "Quando try-with-resources é especialmente recomendado?",
          opcoes: [
            "Scanner sobre ficheiro ou stream dedicado.",
            "Sempre que houver variável local de texto.",
            "Quando queres evitar usar exceções.",
            "Apenas em métodos estáticos."
          ],
          indiceCorreto: 0,
          explicacao: "Recursos reais devem ter ciclo de vida explícito e seguro."
        },
        {
          id: "scan_q2",
          pergunta: "Qual risco de fechar Scanner ligado a System.in?",
          opcoes: [
            "Nenhum, é sempre obrigatório fechar.",
            "Apenas perda de performance.",
            "Encerrar entrada padrão e bloquear futuras leituras.",
            "Mudar encoding default da JVM."
          ],
          indiceCorreto: 2,
          explicacao: "Fechar System.in afeta toda a aplicação."
        }
      ],
      recap: [
        "Warnings de Scanner exigem análise de contexto.",
        "try-with-resources é padrão seguro para recursos dedicados.",
        "System.in deve ser tratado com cautela.",
        "Responsabilidade de fecho deve ser clara entre camadas.",
        "Boa política evita leaks e bugs de I/O."
      ],
      ponteProximo: "A seguir, revemos o operador diamond e como reduzir verbosidade com segurança de tipos.",
      proximoId: "diamond"
    },
    {
      id: "diamond",
      slug: "09-operador-diamond",
      titulo: "Operador Diamond (<>)",
      duracaoMin: 8,
      gancho: "Pequena sintaxe, grande efeito cumulativo. Diamond remove fricção diária e deixa a intenção genérica mais limpa.",
      objetivos: [
        "Aplicar diamond em construções genéricas seguras.",
        "Identificar limites de inferência em contextos complexos.",
        "Evitar ambiguidades que degradam legibilidade."
      ],
      secoes: [
        {
          titulo: "Redução de repetição",
          texto: [
            "Antes do Java 7, era comum duplicar o tipo genérico na declaração e no construtor.",
            "Com <>, o compilador infere tipos a partir do lado esquerdo."
          ]
        },
        {
          titulo: "Benefícios práticos",
          texto: [
            "Menos ruído visual e menor probabilidade de inconsistência entre tipos.",
            "Melhor leitura em estruturas aninhadas de coleções."
          ]
        },
        {
          titulo: "Restrições e clareza",
          texto: [
            "Há casos onde declarar tipo explicitamente continua mais claro, sobretudo em APIs muito genéricas."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Declaração de mapa",
          antes: `Map<String, List<Integer>> mapa = new HashMap<String, List<Integer>>();`,
          moderno: `Map<String, List<Integer>> mapa = new HashMap<>();`,
          explicacao: "Mesmo tipo, menos redundância."
        },
        {
          titulo: "Coleção com inferência local",
          antes: `List<String> nomes = new ArrayList<String>();`,
          moderno: `List<String> nomes = new ArrayList<>();`,
          explicacao: "Padrão esperado em código Java moderno."
        }
      ],
      erros: [
        "Achar que diamond resolve qualquer caso de inferência complexa.",
        "Ocultar tipo quando isso dificulta leitura de equipa.",
        "Misturar raw types com diamond."
      ],
      quiz: [
        {
          id: "dia_q1",
          pergunta: "O principal benefício do operador <> é:",
          opcoes: [
            "Permitir cast implícito inseguro.",
            "Reduzir verbosidade mantendo segurança de tipos.",
            "Substituir interfaces genéricas.",
            "Eliminar necessidade de compilação."
          ],
          indiceCorreto: 1,
          explicacao: "O ganho é sintático e de manutenção, sem perder tipagem forte."
        },
        {
          id: "dia_q2",
          pergunta: "Qual prática deve ser evitada com diamond?",
          opcoes: [
            "Usar com generics tipados.",
            "Combinar com raw types.",
            "Aplicar em new HashMap<>().",
            "Usar em listas e mapas comuns."
          ],
          indiceCorreto: 1,
          explicacao: "Raw type elimina garantias de tipo e aumenta risco de runtime errors."
        }
      ],
      recap: [
        "Diamond remove duplicação desnecessária em generics.",
        "Segurança de tipos é mantida.",
        "Nem toda inferência é ideal em contexto complexo.",
        "Legibilidade continua critério principal.",
        "Evita raw types no código moderno."
      ],
      ponteProximo: "No próximo módulo, fazemos uma travessia rápida das melhorias mais relevantes entre Java 9 e 16.",
      proximoId: "java9_16"
    },
    {
      id: "java9_16",
      slug: "10-java9-16",
      titulo: "Java 9 a Java 16: Melhorias Principais",
      duracaoMin: 16,
      gancho: "Entre Java 9 e 16 tens melhorias que mudam o dia a dia de equipa. Vais aprender onde está o retorno mais imediato para produção.",
      objetivos: [
        "Mapear as melhorias de maior impacto prático entre Java 9 e 16.",
        "Decidir quais features adotar primeiro em projetos existentes.",
        "Evitar adoções superficiais sem estratégia de compatibilidade."
      ],
      secoes: [
        {
          titulo: "Java 9 e 11: base de plataforma",
          texto: [
            "Java 9: módulos (Project Jigsaw), coleções imutáveis de fábrica e melhorias de API.",
            "Java 11: API HTTP moderna e métodos úteis em String."
          ]
        },
        {
          titulo: "Java 10 a 16: ergonomia da linguagem",
          texto: [
            "var para inferência local com cuidado de legibilidade.",
            "Switch expressions e text blocks reduzem ruído em lógica e strings multilinha."
          ]
        },
        {
          titulo: "Adoção por valor",
          texto: [
            "Prioriza features com retorno imediato: API HTTP, text blocks, switch expressions.",
            "Mede impacto em clareza de código e manutenção de equipas."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "HTTP Client (Java 11)",
          antes: `URL url = new URL("https://api.exemplo.com");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");`,
          moderno: `HttpClient client = HttpClient.newHttpClient();
HttpRequest req = HttpRequest.newBuilder()
  .uri(URI.create("https://api.exemplo.com"))
  .GET()
  .build();
HttpResponse<String> rsp = client.send(req, BodyHandlers.ofString());`,
          explicacao: "API moderna substitui fluxos antigos verbosos e propensos a erro."
        },
        {
          titulo: "Switch expression",
          antes: `String nivel;
switch (score) {
  case 1:
  case 2:
    nivel = "Básico";
    break;
  default:
    nivel = "Avançado";
}`,
          moderno: `String nivel = switch (score) {
  case 1, 2 -> "Básico";
  default -> "Avançado";
};`,
          explicacao: "Menos fallthrough acidental e atribuição mais direta."
        }
      ],
      erros: [
        "Ativar features novas sem rever baseline de versão no build.",
        "Usar var em nomes de variável pobres que escondem tipo real.",
        "Ignorar impacto de módulos na organização de dependências."
      ],
      quiz: [
        {
          id: "j916_q1",
          pergunta: "Qual feature pertence ao Java 11 e tem alto impacto prático?",
          opcoes: [
            "Records finais.",
            "HTTP Client API padrão.",
            "Virtual threads.",
            "Sealed classes."
          ],
          indiceCorreto: 1,
          explicacao: "A API HTTP tornou o consumo de serviços mais limpo já no Java 11."
        },
        {
          id: "j916_q2",
          pergunta: "Qual cuidado é importante ao usar var?",
          opcoes: [
            "Só funciona com tipos primitivos.",
            "Dispensa compilador com tipos.",
            "Exigir nomes claros para manter legibilidade.",
            "Substituir todos os tipos explícitos automaticamente."
          ],
          indiceCorreto: 2,
          explicacao: "Inferência não elimina necessidade de código legível."
        }
      ],
      recap: [
        "Java 9–16 trouxe modularidade, ergonomia e APIs modernas.",
        "HTTP Client, switch expressions e text blocks são ganhos concretos.",
        "var deve melhorar leitura, não escondê-la.",
        "Compatibilidade de versão deve ser planeada no build.",
        "Adota por valor real, não por moda."
      ],
      ponteProximo: "No próximo módulo, focamos as grandes funcionalidades estáveis e impactantes de Java 17 a 21.",
      proximoId: "java17_21"
    },
    {
      id: "java17_21",
      slug: "11-java17-21",
      titulo: "Java 17 a 21: Features de Alto Impacto",
      duracaoMin: 18,
      gancho: "Este bloco é de impacto alto: domínio mais explícito e concorrência mais escalável. É aqui que o Java moderno mostra força total.",
      objetivos: [
        "Aplicar records, sealed classes e pattern matching em modelação de domínio.",
        "Entender o ganho de virtual threads para workloads concorrentes.",
        "Avaliar estratégia de migração para LTS recente."
      ],
      secoes: [
        {
          titulo: "Modelação mais explícita",
          texto: [
            "Records reduzem boilerplate de dados imutáveis.",
            "Sealed classes definem fronteiras de hierarquia de forma controlada."
          ]
        },
        {
          titulo: "Pattern matching em switch",
          texto: [
            "switch ganha expressividade para tipos, reduzindo casts manuais e if/else extensos."
          ]
        },
        {
          titulo: "Virtual threads",
          texto: [
            "Permitem alto número de tarefas concorrentes com custo mais baixo por thread em cenários I/O-bound.",
            "Não substituem análise de arquitetura, mas simplificam bastante o modelo de concorrência."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "Record para DTO imutável",
          antes: `public final class ClienteDto {
  private final String nome;
  private final String email;

  public ClienteDto(String nome, String email) {
    this.nome = nome;
    this.email = email;
  }

  public String getNome() { return nome; }
  public String getEmail() { return email; }
}`,
          moderno: `public record ClienteDto(String nome, String email) {}`,
          explicacao: "Menos código, contrato de dados explícito."
        },
        {
          titulo: "Pattern matching em switch",
          antes: `String msg;
if (evento instanceof Erro) {
  msg = ((Erro) evento).mensagem();
} else if (evento instanceof Aviso) {
  msg = ((Aviso) evento).mensagem();
} else {
  msg = "Sem detalhe";
}`,
          moderno: `String msg = switch (evento) {
  case Erro e -> e.mensagem();
  case Aviso a -> a.mensagem();
  default -> "Sem detalhe";
};`,
          explicacao: "Elimina casts repetidos e deixa regras de decisão centralizadas."
        }
      ],
      erros: [
        "Migrar para virtual threads sem observar limites de I/O, pools e drivers.",
        "Usar record em modelos que exigem forte mutabilidade de estado.",
        "Ignorar versões de framework que suportam (ou não) features recentes."
      ],
      quiz: [
        {
          id: "j1721_q1",
          pergunta: "Qual feature ajuda a reduzir boilerplate de classes de dados?",
          opcoes: [
            "Text blocks",
            "Records",
            "Diamond operator",
            "removeIf"
          ],
          indiceCorreto: 1,
          explicacao: "Records encapsulam estrutura de dados imutável com sintaxe compacta."
        },
        {
          id: "j1721_q2",
          pergunta: "Virtual threads tendem a destacar-se em:",
          opcoes: [
            "Cargas I/O-bound com muitas operações concorrentes.",
            "Qualquer cálculo CPU-bound sem limite.",
            "Cenários sem operações bloqueantes.",
            "Substituição direta de todas as bibliotecas de concorrência."
          ],
          indiceCorreto: 0,
          explicacao: "Ganham especialmente quando há muitas tarefas bloqueantes de I/O."
        },
        {
          id: "j1721_q3",
          pergunta: "Sealed classes servem para:",
          opcoes: [
            "Aumentar automaticamente throughput de rede.",
            "Controlar quais classes podem estender uma hierarquia.",
            "Eliminar a necessidade de testes de domínio.",
            "Converter classes em records."
          ],
          indiceCorreto: 1,
          explicacao: "Definem fronteiras de herança, útil para modelação e segurança de domínio."
        }
      ],
      recap: [
        "Java 17–21 melhora modelação de domínio e concorrência.",
        "Records e sealed classes aumentam clareza sem boilerplate.",
        "Pattern matching reduz casting manual.",
        "Virtual threads ampliam concorrência I/O-bound com menor custo.",
        "Migração deve considerar suporte de frameworks e infraestrutura."
      ],
      ponteProximo: "Último módulo: uso estratégico de var para legibilidade sem ambiguidade.",
      proximoId: "var"
    },
    {
      id: "var",
      slug: "12-var",
      titulo: "Inferência de Tipos com var",
      duracaoMin: 11,
      gancho: "Fechamos com maturidade de estilo: var bem aplicado acelera leitura; mal aplicado destrói contexto. Vais sair com critério sólido.",
      objetivos: [
        "Aplicar var em contextos onde o tipo é óbvio.",
        "Evitar var em locais que exigem explicitação do domínio.",
        "Definir guideline de equipa consistente para inferência local."
      ],
      secoes: [
        {
          titulo: "O que var faz de facto",
          texto: [
            "var permite inferência de tipo em variáveis locais com inicialização obrigatória.",
            "Não é tipagem dinâmica: o tipo continua estático em compile-time."
          ]
        },
        {
          titulo: "Cenários bons",
          texto: [
            "Inicializações com tipo evidente: new HashMap<String, Integer>(), resposta de método muito claro, loops simples."
          ]
        },
        {
          titulo: "Cenários a evitar",
          texto: [
            "Quando a expressão é ambígua ou longa e esconde tipo relevante para entendimento do domínio."
          ]
        }
      ],
      exemplos: [
        {
          titulo: "var que ajuda",
          antes: `Map<String, Integer> stockPorSku = new HashMap<>();`,
          moderno: `var stockPorSku = new HashMap<String, Integer>();`,
          explicacao: "O tipo é claro no lado direito; legibilidade mantém-se."
        },
        {
          titulo: "var que atrapalha",
          antes: `var resultado = processador.executar(configuracao, contexto, parametros);`,
          moderno: `ResultadoValidacao resultado = processador.executar(configuracao, contexto, parametros);`,
          explicacao: "Quando o retorno não é óbvio, tipo explícito reduz carga cognitiva."
        }
      ],
      erros: [
        "Substituir tipos explícitos em massa sem revisão de legibilidade.",
        "Assumir que var reduz qualidade de tipagem (não reduz).",
        "Usar nomes vagos de variável e perder contexto semântico."
      ],
      quiz: [
        {
          id: "var_q1",
          pergunta: "Qual afirmação sobre var é correta?",
          opcoes: [
            "var torna Java dinamicamente tipado.",
            "var só funciona em campos de classe.",
            "var infere tipo local em compile-time.",
            "var elimina necessidade de inicialização."
          ],
          indiceCorreto: 2,
          explicacao: "A inferência é local e estática, com validação em compilação."
        },
        {
          id: "var_q2",
          pergunta: "Quando preferir tipo explícito em vez de var?",
          opcoes: [
            "Quando o tipo do retorno não é evidente para quem lê.",
            "Quando há qualquer uso de collections.",
            "Sempre que estiveres num método curto.",
            "Nunca, porque var é sempre melhor."
          ],
          indiceCorreto: 0,
          explicacao: "O objetivo é legibilidade. Se var esconder informação relevante, usa tipo explícito."
        }
      ],
      recap: [
        "var é inferência local estática, não tipagem dinâmica.",
        "Funciona melhor quando o tipo é evidente no contexto.",
        "Tipo explícito continua essencial em pontos ambíguos.",
        "Guideline de equipa evita inconsistência.",
        "Boa legibilidade supera preferência pessoal de sintaxe."
      ],
      ponteProximo: "Percurso concluído. Revê os módulos com menor pontuação de quiz para consolidar domínio total.",
      proximoId: null
    }
  ];

  const byId = Object.create(null);
  modules.forEach((module, index) => {
    module.ordem = index + 1;
    byId[module.id] = module;
  });

  function getById(id) {
    return byId[id] || null;
  }

  function getIndex(id) {
    return modules.findIndex((mod) => mod.id === id);
  }

  function getPrevId(id) {
    const index = getIndex(id);
    if (index <= 0) {
      return null;
    }
    return modules[index - 1].id;
  }

  function getNextId(id) {
    const index = getIndex(id);
    if (index < 0 || index >= modules.length - 1) {
      return null;
    }
    return modules[index + 1].id;
  }

  window.JavaModerno = {
    modules: modules,
    byId: byId,
    getById: getById,
    getPrevId: getPrevId,
    getNextId: getNextId
  };
})();
