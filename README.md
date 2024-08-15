# CICalendar.UK

UK Contact Improvisation Calendar

## Development

We use VSCode and have relevant settings checked into the repo under `.vscode/`.

1. Install VSCode extensions from `.vscode/extensions.json` using the `Extensions: Show Recommended Extensions` command
1. Add environment variables as `KEY=value` pairs in `.dev.vars` (use this instead of `.env.local`)
1. Install nvm
1. Run `nvm install` to install the node version specified in `.nvmrc`
1. Run `npm install` to install dependencies
1. Run `npm run dev` to start the local development server
1. Open `http://localhost:3000` with your browser.

Pages live in `src/app/` (NextJS app router). The development server auto-reloads as you edit.

## Deployment

The app is deployed on Cloudflare Pages. To build and test locally against the Cloudflare Worker runtime:

1. Run `npx @cloudflare/next-on-pages` to build
1. Preview using `npx wrangler pages dev .vercel/output/static`

If environment variables change, update them in [Cloudflare dashboard > Workers & Pages > cicalendaruk > Settings > Environment variables](https://dash.cloudflare.com/?to=/:account/pages/view/cicalendaruk/settings/environment-variables).
