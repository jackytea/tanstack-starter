## **Quick Start Development Guide**

### **1 .Prerequisites**

Ensure you have one of the following programs installed on your machine:

- [`docker`](https://www.docker.com/)
- [`node`](https://nodejs.org/)
- [`deno`](https://deno.com/)
- [`bun`](https://bun.sh/)

### **2. Environment**

Ensure you have your `.env` file configured, refer to the [`.env.example`](../../.env.example) for reference:

## **3. Database**

Ensure you have a [`postgres`](https://www.postgresql.org/) database instance running to ensure migrations are ran.

If you have [`docker`](https://www.docker.com/) installed, you can spin up a database with the following command:

```bash
docker compose -f docker-compose.yaml up --build -d
```

### **4. Running The App**

To get up and running with this template you can run one of the following commands:

**Unix Commands**:

If you are using [`npm`](https://www.npmjs.com/package/npm):
```bash
npm install && npx drizzle-kit migrate && npm run dev
```

If you are using [`pnpm`](https://www.npmjs.com/package/pnpm):
```bash
pnpm install  && pnpm exec drizzle-kit migrate && pnpm dev
```

If you are using [`deno`](https://www.npmjs.com/package/deno):
```bash
deno install && deno run -A npm:drizzle-kit migrate && deno task dev
```

If you are using [`bun`](https://www.npmjs.com/package/bun):
```bash
bun install && bunx drizzle-kit migrate && bun run dev
```

If you are using [`docker`](https://docker.com):
```bash
docker compose -f docker-compose.yaml up --build -d
```
> **Note For Docker:** You will still have to `install` dependencies and run `drizzle-kit migrate` with your package manager after.

**PowerShell Commands**:

If you are using [`npm`](https://www.npmjs.com/package/npm):
```powershell
npm install; if ($?) { npx drizzle-kit migrate }; if ($?) { npm run dev }
```

If you are using [`pnpm`](https://www.npmjs.com/package/pnpm):
```powershell
pnpm install; if ($?) { pnpm exec drizzle-kit migrate }; if ($?) { pnpm dev }
```

If you are using [`deno`](https://www.npmjs.com/package/deno):
```powershell
deno install; if ($?) { deno run -A npm:drizzle-kit migrate }; if ($?) { deno task dev }
```

If you are using [`bun`](https://www.npmjs.com/package/bun):
```powershell
bun install; if ($?) { bunx drizzle-kit migrate }; if ($?) { bun run dev }
```

If you are using [`docker`](https://docker.com):
```powershell
docker compose -f docker-compose.yaml up --build -d
```
> **Note For Docker:** You will still have to `install` dependencies and run `drizzle-kit migrate` with your package manager after.
