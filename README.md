# Desafio DIO: Avaliação Crítica de IAs Generativas 🤖

Este repositório contém a entrega do desafio de exploração de IAs na geração de código (Front-end e Back-end). O objetivo principal não foi criar um código perfeito de primeira, mas sim **testar os limites, as "alucinações" visuais e a arquitetura** gerada por diferentes modelos (Claude, ChatGPT, Gemini e Raptor Mini).

## 🛠️ Tecnologias e Modelos Testados
* **Front-end:** HTML5 Canvas, Vanilla JS, CSS
* **Back-end:** Node.js, Express (Consumo de API Externa)
* **Modelos de IA:** Claude Haiku 4.5, ChatGPT, Gemini 1.5, Raptor mini.

## 📊 Resultados e Análise Crítica

Durante os testes de geração de interfaces visuais e lógica de física, os modelos apresentaram resultados muito peculiares quando não receberam instruções matemáticas exatas:

### 1. O Desafio da Roleta (Canvas)
Pedi a estruturação de um jogo de roleta com física e sistema de colisão:
* **Claude:** Estruturou muito bem os arquivos em POO, mas renderizou apenas um retângulo cinza sólido.
* **ChatGPT:** Entendeu o formato circular, mas desenhou apenas um aro pontilhado amarelo, sem preenchimento ou fatias.
* **Gemini:** Focou na estética premium solicitada no prompt, criando um fundo escuro com um botão bonito, mas gerou um círculo negro que parecia um "eclipse solar", ignorando a matemática para dividir a roleta em 37 fatias.

### 2. O Desafio do Flappy Bird
Testei o modelo experimental **Raptor mini (Preview)** para gerar um clone de Flappy Bird:
* **Resultado:** O modelo entregou o conceito mais minimalista possível. Criou o fundo azul e desenhou o contorno do Canvas (um retângulo branco vazado), falhando totalmente em instanciar os objetos do pássaro, gravidade ou canos.

### 3. O Desafio da API (Node.js + ViaCEP)
Solicitei a criação de um microsserviço limpo para buscar CEPs.
* **Análise:** Embora a IA tenha conseguido montar a estrutura base do Express e a rota GET, ela falhou em prever os "edge cases" (casos extremos). O tratamento de erros deixou a desejar, não validando corretamente o formato do CEP antes da requisição e não tratando o retorno específico de `{ "erro": true }` que a API do ViaCEP devolve em CEPs inexistentes.

## 💡 Conclusão
A experiência provou que modelos de IA são assistentes poderosos para estruturar projetos (boilerplate) e aplicar Clean Code. No entanto, para renderizações gráficas complexas (HTML5 Canvas) e tratamento de erros em APIs, o desenvolvedor ainda precisa guiar a ferramenta com extrema precisão lógica e matemática, ou refatorar o código final manualmente para garantir um sistema funcional e à prova de falhas.
