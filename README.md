
#   Documentação do Jogo de Memória

Esta documentação fornece uma visão geral dos arquivos e da estrutura de código para o jogo "Memory Match". O jogo é implementado usando HTML, CSS e JavaScript.

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
-   **Funções:**
    -   `playSong(key)`: Reproduz um arquivo de áudio específico com base na chave fornecida.
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
    -   `hitCardCombination()`: Anima uma combinação de cartas correspondentes.

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

Divirta-se jogando o Memory Match!