# AGENTS.md

## Projeto

Este projeto é um aplicativo Android de Comunicação Aumentativa e Alternativa (CAA), voltado inicialmente para crianças autistas não verbais ou com comunicação oral limitada.

O objetivo principal do aplicativo é permitir que a criança se comunique utilizando pictogramas.

Fluxo principal:

1. A criança toca em pictogramas.
2. Os pictogramas são adicionados à barra de comunicação.
3. Os pictogramas podem formar uma frase.
4. A frase pode ser reproduzida em voz alta.
5. Alguns pictogramas podem possuir fala imediata.

Exemplo:

[EU] [QUERO] [BEBER] [ÁGUA]

Resultado falado:

"Eu quero beber água."

---

# Stack

A stack atual do projeto é:

* React Native
* Expo
* TypeScript
* Expo Router
* expo-speech
* Android como plataforma principal

Não existe backend no MVP atual.

Não adicionar backend, API, autenticação, banco remoto ou serviços em nuvem sem solicitação explícita.

---

# Prioridades do projeto

Ao tomar decisões de implementação, considere esta ordem de prioridade:

1. Comunicação da criança
2. Acessibilidade
3. Simplicidade de uso
4. Previsibilidade da interface
5. Responsividade
6. Funcionamento offline
7. Manutenibilidade do código
8. Aparência visual

Uma solução visualmente mais bonita não deve prejudicar acessibilidade ou comunicação.

---

# Regras para alterações

Ao receber uma tarefa:

* altere somente o necessário para atender à solicitação;
* preserve funcionalidades existentes que não fazem parte da tarefa;
* evite refatorações não relacionadas;
* não remova comportamentos existentes sem solicitação explícita;
* não altere estruturas públicas desnecessariamente;
* mantenha compatibilidade com o código existente;
* prefira mudanças pequenas e incrementais;
* verifique os arquivos relacionados antes de implementar uma solução.

Se uma mudança exigir alteração significativa de arquitetura, explique antes de realizá-la.

---

# Dependências

Não instalar novas bibliotecas quando React Native, Expo ou as dependências existentes já resolverem o problema adequadamente.

Antes de adicionar uma dependência:

1. verifique se a funcionalidade já existe no React Native ou Expo;
2. avalie se a biblioteca é realmente necessária;
3. prefira bibliotecas mantidas e compatíveis com a versão atual do Expo.

Não adicionar dependências apenas para resolver pequenos problemas de layout ou utilidades simples.

---

# TypeScript

Todo código novo deve utilizar TypeScript.

Evite:

* `any`;
* casts desnecessários;
* tipos excessivamente genéricos;
* duplicação de interfaces.

Prefira:

* tipos explícitos;
* interfaces reutilizáveis quando apropriado;
* unions para estados conhecidos;
* código simples e legível.

---

# Responsividade

O aplicativo deve funcionar em:

* celular portrait;
* celular landscape;
* tablet landscape.

O layout principal desejado para o produto final é tablet Android em landscape.

Entretanto, o aplicativo não deve quebrar em celulares.

Utilize `useWindowDimensions` quando decisões de layout dependerem das dimensões da tela.

Não assuma que landscape significa tela grande.

Considere separadamente:

* largura;
* altura;
* orientação;
* dispositivo compacto;
* tablet.

Breakpoints devem ficar centralizados e ser fáceis de alterar.

Como referência inicial:

* `isLandscape`: width > height
* `isTablet`: width >= 768
* `isCompactLandscape`: landscape, não tablet e height < 500

Esses valores podem ser ajustados conforme testes em dispositivos reais.

---

# Layout

Evite:

* larguras fixas desnecessárias;
* alturas fixas desnecessárias;
* `height: '100%'` quando flexbox resolver;
* valores mágicos espalhados;
* componentes saindo da viewport;
* layouts que dependam de um único tamanho de dispositivo.

Prefira:

* `flex`;
* `flex: 1`;
* `minHeight: 0` quando necessário;
* `aspectRatio`;
* `maxWidth`;
* ScrollView/FlatList quando o conteúdo puder crescer;
* constantes compartilhadas para breakpoints e espaçamentos.

---

# Tablet landscape

Tablet landscape é o principal layout alvo.

Nesse modo:

* aproveitar melhor o espaço horizontal;
* manter pictogramas grandes;
* evitar componentes exageradamente grandes;
* manter a barra de comunicação facilmente acessível;
* permitir mais colunas na grade quando apropriado.

Como referência inicial:

* celular portrait: aproximadamente 3 colunas;
* celular landscape: aproximadamente 4 colunas;
* tablet landscape: aproximadamente 6 colunas.

Esses números não são regras absolutas.

---

# Compact landscape

Celulares em landscape possuem bastante largura, mas pouca altura.

Nesse cenário:

* compactar a barra de comunicação;
* reduzir paddings verticais;
* manter ações na mesma linha quando possível;
* evitar barras com múltiplas linhas;
* categorias devem preferencialmente utilizar scroll horizontal;
* dedicar a maior parte da altura disponível à grade;
* permitir scroll vertical dos pictogramas.

Não diminuir excessivamente os pictogramas apenas para fazer todo o conteúdo caber simultaneamente.

---

# Barra de comunicação

A barra de comunicação é uma funcionalidade central.

Ela deve:

* exibir os pictogramas selecionados na ordem;
* permitir scroll horizontal quando necessário;
* possuir ação para falar;
* possuir ação para apagar o último item;
* possuir ação para limpar a frase;
* permanecer acessível em diferentes tamanhos de tela.

Não permitir que uma frase longa faça a barra crescer indefinidamente na vertical.

---

# Pictogramas

Os pictogramas devem:

* possuir área de toque grande;
* apresentar feedback visual ao toque;
* ser facilmente identificáveis;
* manter texto legível;
* manter espaçamento adequado;
* evitar botões excessivamente pequenos.

No estágio atual, emojis podem ser utilizados como placeholders.

A arquitetura deve permitir substituí-los futuramente por pictogramas reais sem reescrever a lógica de comunicação.

---

# Acessibilidade

Este é um aplicativo assistivo. Acessibilidade não é opcional.

Ao criar componentes interativos:

* utilizar áreas de toque confortáveis;
* manter contraste adequado;
* evitar elementos muito pequenos;
* evitar depender apenas de cores para transmitir significado;
* utilizar propriedades de acessibilidade do React Native quando apropriado;
* manter comportamento previsível;
* evitar animações desnecessárias;
* evitar mudanças automáticas de posição dos pictogramas.

Palavras essenciais de comunicação, como "Não", "Ajuda", "Pare" e equivalentes, não devem ser escondidas ou dificultadas sem uma razão explícita de produto.

---

# Orientação

Durante o desenvolvimento, o aplicativo deve permitir portrait e landscape para facilitar testes de responsividade.

A configuração Expo deve permanecer compatível com rotação automática enquanto essa decisão de produto não for alterada explicitamente.

Não bloquear a orientação sem solicitação.

---

# Offline first

As funcionalidades essenciais de comunicação devem ser projetadas para funcionar offline.

O usuário deve conseguir:

* visualizar pictogramas;
* selecionar pictogramas;
* formar frases;
* reproduzir voz;
* navegar pelas categorias;

sem conexão com internet.

Não introduzir dependência de rede no fluxo principal de comunicação.

---

# Estado atual do MVP

O MVP atual contém ou está sendo desenvolvido com:

* tela principal de comunicação;
* pictogramas;
* categorias;
* seleção de pictogramas;
* barra de frase;
* síntese de voz;
* fala imediata;
* apagar último pictograma;
* limpar frase;
* responsividade.

Funcionalidades futuras não devem ser implementadas antecipadamente sem solicitação.

---

# Fora do escopo atual

Não implementar sem solicitação explícita:

* backend;
* autenticação;
* cadastro/login;
* PostgreSQL;
* sincronização em nuvem;
* inteligência artificial;
* relatórios clínicos;
* prontuário;
* analytics de comunicação;
* chat;
* gamificação;
* rastreamento ocular;
* marketplace.

---

# Qualidade das alterações

Antes de considerar uma tarefa concluída:

* verificar erros de TypeScript;
* verificar imports;
* verificar componentes afetados;
* verificar se funcionalidades existentes continuam funcionando;
* verificar comportamento em diferentes dimensões quando a alteração envolver layout;
* evitar warnings novos.

Quando houver scripts disponíveis no projeto, executar as verificações apropriadas.

Não declarar que algo foi testado se não foi realmente executado.

---

# Comunicação das alterações

Após concluir uma tarefa, responder de forma curta informando:

1. o que foi alterado;
2. quais arquivos principais foram modificados;
3. qualquer decisão técnica relevante;
4. como testar a alteração.

Não explicar linha por linha, salvo quando solicitado.

---

# Princípio geral

Este projeto deve evoluir incrementalmente.

Prefira:

pequena alteração → testar → validar → commit → próxima alteração

em vez de grandes implementações que modifiquem várias partes do aplicativo simultaneamente.
