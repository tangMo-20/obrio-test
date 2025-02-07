This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Specific information

`assets/questionnaires/[questionnaireId].json` - a directory where questionnaires are stored. It's possible to implement a logic where the user would be able to select a questionnaire he wants to pass. Or we could programmatically manage which questionnaire would be used in each case. Each file here has a specific structure, that could be expanded by adding new fields to it.

`assets/answers/[questionnaireId]/[userId].json` - a directory where user answers are stored. Each file here represents answers of a specific user for a specific questionnaire and stores this information.
