
#   Documentação do Jogo de Memória

Esta documentação fornece uma visão geral dos arquivos e da estrutura de código para o jogo "Memory Match". O jogo é implementado usando HTML, CSS e JavaScript.

![Memory Mach](https://github.com/jorgekania/memory-match/blob/jk/images/screnshot-game.png)
![Memory Mach](https://github.com/jorgekania/memory-match/blob/jk/images/screnshot-game-2.png)

## Arquivos

### 1. `index.html`

Este arquivo contém a estrutura HTML do jogo Memory Match. Ele define a estrutura do documento, inclui meta tags necessárias, links para folhas de estilo externas e scripts, e configura a interface do jogo.

#### Estrutura HTML

-   **Declaração DOCTYPE:** Especifica o tipo e a versão do documento.
-   **Elemento HTML:** Elemento raiz do documento.
-   **Seção Head:** Contém metadados, incluindo conjunto de caracteres, configurações de viewport e título da página.
-   **Seção Body:** Contém os elementos do jogo, incluindo cartas, configurações, modais e elementos de áudio.

### 2. `scripts.js`

Este arquivo JavaScript contém a lógica para o jogo Memory Match. Ele lida com interações de cartas, mecânicas do jogo, cronômetros e modais.

#### Lógica JavaScript

-   **Declarações de Variáveis:** Define variáveis para armazenar vários elementos e estado do jogo.
-   **Constantes:** Define constantes para o valor inicial do temporizador, erros máximos e atraso de reprodução.
-   **Ouvintes de Eventos:** Configura ouvintes de eventos para cliques em botões e viradas de cartas.
-   **Listas:**
    -   `songs`: Lista de sons a serem executados durante o jogo.
    -   `combinations`: Lista de combinações possíveis das cartas.
-   **Funções:**
    -   `createCards()`: Cria a listagem de cartas iniciais na tela.
    -   `playSong(key)`: Reproduz um arquivo de áudio específico com base na chave fornecida.
    -   `updateCurrentTime()`: Atualiza o tempo decorrido do jogo atual.
    -   `calculateResult(cardOne, cardTwo)`: Verifica se as cartas selecionadas formam um par correspondente.
    -   `configureCard(index, addHoverClass)`: Configura elementos de cartas com efeitos de hover.
    -   `showAllCards()`: Exibe todas as cartas brevemente no início do jogo.
    -   `updateTimer()`: Atualiza o cronômetro e verifica condições de fim de jogo.
    -   `updateErrors()`: Atualiza a contagem de escolhas incorretas.
    -   `startTimer()`: Inicia o cronômetro do jogo.
    -   `startGame()`: Inicializa e inicia o jogo.
    -   `verifyPlaying()`: Alterna o estado do jogo e a aparência do botão.
    -   `manualStart()`: Inicia o jogo manualmente.
    -   `sort(oldArray)`: Embaralha o array de IDs das cartas.
    -   `rotateCard(ev)`: Manipula rotações e interações de cartas.
    -   `endGame()`: Encerra o jogo, exibe modais e lida com cenários de fim de jogo.
    -   `restartGame()`: Reinicia o jogo após clicar nos botões dos modais.

### 3. `style.css`

Este arquivo CSS define os estilos para o jogo Memory Match, incluindo layout, cores, animações e efeitos de hover.

#### Estilos CSS

-   **Estilos para Body e HTML:** Define estilos básicos para o corpo do documento e elementos HTML.
-   **Estilos para Container:** Define estilos para o contêiner do jogo, incluindo largura e margem.
-   **Estilos para Configurações:** Estiliza as configurações do jogo, cronômetro e exibição de erros.
-   **Estilos para Cartas:** Estiliza cartas individuais, incluindo tamanho, borda e efeitos de hover.
-   **Estilos para Modais:** Estiliza sobreposições modais, botões e texto.
-   **Estilos para Botões:** Define estilos para vários botões no jogo.
-   **Estilos para Imagens:** Estiliza as imagens do jogo, incluindo animações e transições.
-   **Estilo Unclickable:** Estiliza o estado de não clicável para certos elementos do jogo.

## Como Jogar

1.  Clique no botão "JOGAR" para iniciar o jogo manualmente.
2.  Memorize as posições das cartas durante a exibição inicial.
3.  Vire as cartas clicando nelas.
4.  Combine pares de cartas com a mesma imagem para pontuar.
5.  Evite exceder o número máximo de erros permitidos.
6.  Complete o jogo combinando todos os pares ou enfrente o fim do jogo se os erros atingirem o limite.

## Implementações que podem ainda serem feitas

1.  Criar um sistema de pontuação
2.  Salvar o sistema de pontos do jogador
3.  Salvar o melhor tempo do jogador
4.  Salvar a melhor pontuação do jogador
5.  Tornar o jogo responsivo
6.  Levar o jogo para Node.js podendo usar um framework como React.js e TailwindCSS

Divirta-se jogando o Memory Match!
Contribua com o jogo melhorando-o