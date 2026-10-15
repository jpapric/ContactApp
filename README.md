# ContactApp

A simple React application for signing in and managing contacts. Authentication
is for demonstration purposes only (there is no server-side authentication),
and the user session and contacts are stored in the browser's `localStorage`.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Getting Started

Run the following commands from the project root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal (usually
`http://localhost:5173`).

## Test Login Credentials

Sign in from the home page using:

Username : `user`  
Password : `password`

After signing in, you can view the contact list and add new contacts. Your
session and contacts remain stored in the same browser.

## Production Build

To create a production build, run:

```bash
npm run build
```

To preview the built application locally, run `npm run preview`.
