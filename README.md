# QAmindPlus Cypress

Projeto de testes E2E com Cypress e TypeScript para validar os laboratórios da plataforma QAmindPlus.

## Requisitos

- Node.js 24.x e npm.
- Acesso à internet para instalar dependências e executar os testes contra o `baseUrl` configurado em `cypress.config.ts`.
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

Os specs atuais cobrem a página inicial (`welcome.cy.ts`) e o dashboard de demonstração (`demo-dashboard.cy.ts`). Eles usam os fixtures `services.json`, `links.json` e `cards.json`, com os tipos compartilhados correspondentes em `cypress/types/`.

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

O comando acima executa no Chrome em modo headless. Para abrir o navegador durante a execução:

```bash
npm run cy:run:headed
```

Execute somente o spec do dashboard:

```bash
npm run cy:run -- --spec cypress/e2e/demo-dashboard.cy.ts
```

Também existem comandos para abrir o Cypress ou executar os testes no Firefox e no Edge. Instale o navegador selecionado antes de usar o respectivo comando:

```bash
npm run cy:open
npm run cy:run:firefox
npm run cy:run:edge
```

`cy:open` e `cy:run` usam Chrome. Os comandos de execução podem receber opções do Cypress após `--`, por exemplo:

```bash
npm run cy:run -- --spec cypress/e2e/welcome.cy.ts
```

O `baseUrl` vem de `CYPRESS_BASE_URL`, definido em `cypress.config.ts`. Informe a URL completa do ambiente que contém a aplicação, incluindo protocolo e, se necessário, porta:

```bash
CYPRESS_BASE_URL=https://staging.example.com npm run cy:run
CYPRESS_BASE_URL=http://localhost:4200 npm run cy:run
```

O script `npm test` é uma alternativa para execução com `start-server-and-test`: ele tenta iniciar `my-server -p 4200`, aguarda a URL de `CYPRESS_BASE_URL` e então executa `cy:run`. O projeto não declara `my-server` como dependência nem inclui o servidor da aplicação; use esse script somente se esse comando estiver disponível e iniciar a aplicação na URL configurada.

O GitHub Actions executa em pull requests, usando Chrome e Firefox com duas instâncias paralelas por navegador e Cypress Cloud. Configure `CYPRESS_BASE_URL` como variável no ambiente `Staging` e `CYPRESS_PROJECT_ID` e `CYPRESS_RECORD_KEY` como secrets. O paralelismo requer a gravação no Cypress Cloud.

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
