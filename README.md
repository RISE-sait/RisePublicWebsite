# Rise Website

Welcome to the **Rise Website** project!  
This web application is built using [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and a modern developer stack. It is designed to be scalable, maintainable, and developer-friendly.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Branching & PR Workflow](#branching--pr-workflow)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

---

## Features

- **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)** via Next.js
- **Tailwind CSS** with a customizable configuration
- **TypeScript** for end-to-end type safety
- **Radix UI** and **Lucide Icons** for accessible, clean UI components
- **React Hook Form** for form management
- **Optimized Production Builds** with environment variable support

---

## Tech Stack

| Category              | Tool/Library                     |
|:----------------------|:----------------------------------|
| Framework             | [Next.js](https://nextjs.org/)    |
| Styling               | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components         | [Radix UI](https://www.radix-ui.com/) |
| Icons                 | [Lucide Icons](https://lucide.dev/) |
| Forms                 | [React Hook Form](https://react-hook-form.com/) |
| Language              | TypeScript |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-organization/rise-website.git
cd rise-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Then open your browser and navigate to:

```
http://localhost:3000
```

---

## Project Structure

```plaintext
rise-website/
├── .next/               # Next.js build output (ignored in Git)
├── app/                 # Application entry (pages and layouts)
│   ├── globals.css      # Global styles
│   └── ...              # Other app-specific files
├── components/          # Reusable UI components
├── lib/                 # Utility functions and libraries
├── hooks/               # Custom React hooks
├── public/              # Static assets (images, favicons, etc.)
├── styles/              # Additional global styles
├── tailwind.config.ts   # Tailwind CSS configuration
├── next.config.mjs      # Next.js configuration
└── package.json         # Project metadata and dependencies
```

---

## Branching & PR Workflow

We follow a simple Git flow:

- Always branch off `dev`.
- Use the following branch naming convention:
  - `feature/short-description`
  - `bugfix/short-description`
  - `hotfix/short-description`

**Examples:**
- `feature/connect-homepage-api`
- `bugfix/fix-navbar-hover`

### Opening a Pull Request (PR)

1. Push your feature branch.
2. Open a PR targeting the `dev` branch.
3. Fill out the PR template (auto-filled when opening a PR).
4. Assign a reviewer.
5. Address feedback, then merge when approved.

✅ Keep PRs small and focused (<300 lines ideally).
✅ Always test locally before opening a PR.

---

## Contributing Guidelines

- Follow the established coding patterns (TypeScript, Tailwind conventions).
- Reuse components wherever possible.
- Keep commits and PRs focused on one feature or fix at a time.
- Communicate blockers early.

---

## License

This project is licensed under [Rise Basketball Organization's internal license](https://risebasketball.com) (private repository — not for public distribution).

---

> "Build clean. Build fast. Build together." 🚀

---