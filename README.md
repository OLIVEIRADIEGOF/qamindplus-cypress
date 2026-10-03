# QAmindPlus Cypress

Projeto de testes E2E com Cypress e TypeScript para validar os laboratórios da plataforma QAmindPlus.

## Requisitos

- Node.js 24.x e npm.
- Acesso à internet para instalar dependências e executar os testes contra o `baseUrl` configurado em `cypress.config.ts` (`https://qamindplus.com.br`).
- Para executar os scripts de navegador específico, instale o navegador correspondente. O Cypress também pode usar o Electron incluído.

Confira as versões instaladas:

```bash
node --version
npm --version
```

Instale as dependências na raiz do projeto:

```bash
npm install
```

## Estrutura

```text
cypress/
  e2e/          # Specs E2E, nomeados *.cy.ts
  fixtures/     # Dados de teste em JSON
  page/         # Page objects e seletores da interface
  support/      # Hooks globais e comandos Cypress
  types/        # Tipos compartilhados pelos testes
cypress.config.ts
tsconfig.json
```

O spec `cypress/e2e/demo-dashboard.cy.ts` usa o fixture `cypress/fixtures/cards.json`. O tipo compartilhado `ChallengeCard` está em `cypress/types/challenge-card.ts`.

## Conversão de JavaScript para TypeScript

O projeto já foi convertido. Estes são os passos usados, úteis ao adicionar ou migrar outros arquivos:

1. Instale o compilador TypeScript e as definições do Node compatíveis com o runtime:

	```bash
	npm install --save-dev typescript @types/node@^24
	```

2. Configure o `tsconfig.json` na raiz. Este projeto inclui o config do Cypress e os arquivos dentro de `cypress/`, usa `strict` para detectar tipos ausentes e `noEmit` para não gerar JavaScript compilado.

3. Renomeie os arquivos `.js` para `.ts`, preservando a organização. O Cypress espera specs E2E no padrão `*.cy.ts`; imports locais podem continuar sem a extensão.

4. Tipifique parâmetros e dados de fixtures. Por exemplo, use `ChallengeCard[]` ao carregar `cards.json`. Fixtures JSON continuam `.json`; não é necessário convertê-las em arquivos TypeScript.

5. Valide primeiro os tipos e depois os testes:

	```bash
	npm run typecheck
	npm run cy:run
	```

## Executar os testes

Verifique os tipos sem gerar arquivos:

```bash
npm run typecheck
```

Abra a interface do Cypress:

```bash
npm run cy:open
```

Execute todos os specs em modo headless:

```bash
npm run cy:run
```

Execute somente o spec do dashboard:

```bash
npm run cy:run -- --spec cypress/e2e/demo-dashboard.cy.ts
```

Também existem comandos para rodar no Chrome, Firefox ou Edge, desde que o navegador esteja instalado:

```bash
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

Os testes acessam o site remoto configurado em `cypress.config.ts`. Uma falha de rede ou indisponibilidade do site pode causar falhas mesmo que o código do teste esteja correto.

## Padrões e boas práticas

- **Specs focados:** descreva cenários observáveis pelo usuário e nomeie os arquivos como `*.cy.ts`.
- **Page objects:** mantenha seletores e interações da página em `cypress/page/`. Coloque comportamentos realmente compartilhados em `BasePage` e os específicos do dashboard em `DemoDashboardPage`.
- **Asserções Cypress:** prefira `.should(...)`, que aguarda automaticamente a condição. Evite esperas fixas com `cy.wait(tempo)`; use-as apenas quando estiver aguardando um alias de rede ou uma condição bem definida.
- **Seletores estáveis:** prefira atributos dedicados como `data-testid` a classes de estilo ou posições frágeis no DOM.
- **Dados e tipos:** mantenha dados variáveis em fixtures; compartilhe interfaces em `cypress/types/` quando forem usadas por mais de um spec. Evite `any` e prefira `import type` para imports usados somente como tipo.
- **Testes independentes:** cada teste deve preparar seu próprio estado e não depender da ordem de execução dos outros testes.
- **Typecheck antes dos E2E:** execute `npm run typecheck` para detectar erros de tipos antes de abrir o navegador.
- **Credenciais:** não versione chaves do Cypress Dashboard nem outros tokens. Forneça segredos por variáveis de ambiente, como `CYPRESS_RECORD_KEY`, no ambiente de execução ou no CI.

## Fluxo recomendado

1. Instale dependências com `npm install`.
2. Escreva ou atualize o spec e os page objects necessários.
3. Execute `npm run typecheck`.
4. Execute o spec específico durante o desenvolvimento.
5. Execute `npm run cy:run` antes de enviar as alterações.
