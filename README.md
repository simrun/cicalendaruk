# CICalendar.UK

UK Contact Improvisation Calendar

## Development

We use VSCode and have relevant settings checked into the repo under `.vscode/`.

1. Install VSCode extensions from `.vscode/extensions.json` using the `Extensions: Show Recommended Extensions` command
1. Add environment variables as `KEY=value` pairs in `.env.local`
1. Install nvm
1. Run `nvm install` to install the node version specified in `.nvmrc`
1. Run `npm install` to install dependencies
1. Run `npm run dev` to start the local development server

Open [http://localhost:3000](http://localhost:3000) with your browser.

Pages live in the `app` directory (NextJS app router). The development server auto-reloads as you edit.
