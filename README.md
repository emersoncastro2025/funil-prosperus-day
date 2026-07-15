# Funil de Agendamento — Prosperus Day · Raquel Mendes

Funil conversacional com sistema de indicação viral para o evento **Prosperus Day** (06/08/2025, Alphaville, SP).

## Rodando localmente

```bash
npm install
npm run dev
# Abre em http://localhost:5173
```

## Configurações principais

### 1. Foto da Raquel

Substitua o arquivo `public/raquel.jpg` pela foto desejada.
Mantenha o nome `raquel.jpg` ou atualize a referência em `src/components/Avatar.tsx` e `src/screens/LandingScreen.tsx`.

### 2. Webhook para receber os leads

Crie um arquivo `.env` na raiz do projeto (baseado em `.env.example`):

```env
VITE_WEBHOOK_URL=https://hook.eu1.make.com/seu-endpoint
```

O payload enviado tem este formato:

```json
{
  "nome": "Maria Silva",
  "faturamento_mensal": "R$ 10 mil – R$ 30 mil",
  "patrimonio_investido": "R$ 100 mil – R$ 500 mil",
  "whatsapp": "+55 (11) 99999-8888",
  "instagram": "@mariasilva",
  "indicado_por": "joao1234",
  "origem": "referido",
  "data_hora": "2025-08-01T14:30:00.000Z"
}
```

Se `VITE_WEBHOOK_URL` não estiver definida, os dados são apenas logados no console do browser.

O ponto de integração fica em `src/utils/webhook.ts` — fácil de adaptar para qualquer endpoint.

### 3. Sistema de indicação (`?ref=`)

Cada confirmado recebe um link no formato:

```
https://seu-dominio.com/?ref=maria8888
```

O slug é gerado em `src/utils/slugify.ts` a partir do primeiro nome + 4 últimos dígitos do WhatsApp.

Para **testar localmente** com indicação:

```
http://localhost:5173/?ref=joao1234
```

A landing exibirá: "Você foi convidado(a) por **Joao**".

O `ref` é enviado no payload como `indicado_por` para rastreamento.

### 4. Textos e perguntas do chat

Edite `src/components/ChatFunnel.tsx` — array `STEPS` — para ajustar perguntas, opções de chips ou mensagens de boas-vindas.

### 5. Build para produção

```bash
npm run build
# Saída em /dist — suba para Vercel, Netlify, etc.
```
