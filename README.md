<div align="center">

# 💬 CAA App

**Comunicação Aumentativa e Alternativa de forma simples, acessível e previsível.**

[![Expo](https://img.shields.io/badge/Expo-SDK%2057-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=111827)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Android](https://img.shields.io/badge/Android-plataforma%20principal-3DDC84?logo=android&logoColor=white)](https://www.android.com/)

</div>

## Sobre o projeto

O **CAA App** é um aplicativo Android de Comunicação Aumentativa e Alternativa voltado inicialmente para crianças autistas não verbais ou com comunicação oral limitada.

A criança seleciona pictogramas para construir uma frase e reproduzi-la em voz alta:

```text
[EU] [QUERO] [BEBER] [ÁGUA]

🔊 "Eu quero beber água."
```

O projeto está em desenvolvimento como MVP, priorizando comunicação, acessibilidade, previsibilidade da interface e funcionamento offline.

## Funcionalidades atuais

- Construção de frases com pictogramas.
- Reprodução em português do Brasil com `expo-speech`.
- Mensagens rápidas com fala imediata.
- Remoção do último item e limpeza completa da frase.
- Barra de comunicação com rolagem horizontal.
- Seções de vocabulário com navegação horizontal.
- Biblioteca inicial com aproximadamente 66 pictogramas.
- Layout responsivo para celular e tablet, em portrait e landscape.
- Modo compacto para celulares em landscape com pouca altura.
- Safe Area e atualização automática durante a rotação.
- Emojis como pictogramas temporários, com suporte preparado para imagens reais.
- Fallback visual pela primeira letra quando não existe imagem ou emoji.

## Como a comunicação funciona

Cada pictograma possui um dos seguintes comportamentos:

| Comportamento | Resultado |
| --- | --- |
| `sentence` | Adiciona o pictograma à barra sem falar automaticamente. |
| `immediate` | Fala imediatamente e nunca altera a frase em construção. |

O botão **Falar** reproduz apenas os pictogramas `sentence` presentes na barra e limpa a frase após disparar a reprodução.

## Vocabulário inicial

| Seção | Conteúdo |
| --- | --- |
| ⭐ Favoritos | Preparada no modelo; vazia enquanto não há persistência. |
| ⚡ Mensagens rápidas | Sim, Não, Pare, Preciso de ajuda e outras mensagens imediatas. |
| 💬 Essenciais | Eu, Você, Quero, Mais, Aqui, Ali, Fazer, Ir e outras palavras frequentes. |
| 🏃 Ações | Comer, Beber, Brincar, Dormir, Abrir e Fechar. |
| 🍎 Alimentos | Arroz, Pão, Maçã, Banana, Bolacha e Macarrão. |
| 🥤 Bebidas | Água, Leite e Suco. |
| 😊 Sentimentos | Feliz, Triste, Bravo, Com medo e Cansado. |
| 🩹 Corpo/Dor | Cabeça, Barriga, Boca, Ouvido, Mão e Dor. |
| 👥 Pessoas | Mãe, Pai, Vovó, Professor e Terapeuta. |
| 🎯 Atividades | Desenhar, Assistir, Ouvir música e Passear. |
| 📍 Lugares | Casa, Escola, Banheiro e Parque. |
| 🧸 Objetos | Celular, Brinquedo, Bola e Livro. |

## Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Speech](https://docs.expo.dev/versions/v57.0.0/sdk/speech/)
- [TypeScript](https://www.typescriptlang.org/)

Não existe backend, autenticação, banco remoto ou dependência de rede no fluxo principal atual.

## Executando o projeto

### Pré-requisitos

- Node.js compatível com o Expo SDK 57.
- npm.
- Android Studio com um emulador configurado ou dispositivo Android físico.

### Instalação

```bash
git clone https://github.com/JTresoldi/caa-app.git
cd caa-app
npm install
```

Inicie o projeto:

```bash
npm start
```

Para abrir diretamente no Android:

```bash
npm run android
```

> A reprodução offline depende de uma voz `pt-BR` instalada no mecanismo de síntese de voz do dispositivo Android.

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento do Expo. |
| `npm run android` | Inicia o Expo e abre o aplicativo no Android. |
| `npm run ios` | Inicia o aplicativo no simulador iOS, quando disponível. |
| `npm run web` | Executa a versão web. |
| `npx tsc --noEmit` | Verifica os tipos TypeScript sem gerar arquivos. |

## Estrutura principal

```text
src/
├── app/
│   ├── _layout.tsx              # Layout raiz do Expo Router
│   └── index.tsx                # Tela principal e regras de comunicação
├── components/
│   ├── PictogramButton.tsx      # Card interativo do pictograma
│   ├── PictogramVisual.tsx      # Imagem, emoji e fallback visual
│   └── SentenceBar.tsx          # Barra de frase e ações
├── data/
│   └── pictograms.ts            # Seções, tipos e biblioteca inicial
└── hooks/
    └── use-responsive-layout.ts # Breakpoints e métricas responsivas
```

## Responsividade

O layout usa `useWindowDimensions` e considera largura, altura e orientação separadamente.

| Cenário | Grade aproximada |
| --- | ---: |
| Celular portrait | 3 colunas |
| Celular landscape | 4 colunas |
| Tablet landscape | 6 colunas |

Celulares em landscape com pouca altura recebem um layout compacto, preservando espaço vertical para a grade sem reduzir excessivamente os pictogramas.

Os breakpoints ficam centralizados em [`src/hooks/use-responsive-layout.ts`](./src/hooks/use-responsive-layout.ts).

## Estado do MVP

### Implementado

- Comunicação básica e mensagens rápidas.
- Responsividade inicial.
- Modelo tipado de pictogramas.
- Biblioteca inicial e fallback visual.

### Próximas etapas

- Substituir emojis por pictogramas reais devidamente licenciados.
- Validar acessibilidade com usuários e profissionais.
- Implementar persistência local e favoritos.
- Criar modo responsável e gerenciamento do vocabulário.
- Preparar builds Android para testes reais.

O planejamento completo está em [`PLANO_MVP_CAA.md`](./PLANO_MVP_CAA.md).

## Referências visuais

As imagens em [`docs/`](./docs/) são referências de layout usadas durante o desenvolvimento, não capturas finais do aplicativo.

## Princípios do projeto

1. Comunicação da criança.
2. Acessibilidade.
3. Simplicidade e previsibilidade.
4. Responsividade.
5. Funcionamento offline.
6. Manutenibilidade.

## Licença

Este repositório contém um arquivo [`LICENSE`](./LICENSE) com os termos aplicáveis ao projeto.
