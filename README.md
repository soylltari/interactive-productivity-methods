# Interactive Productivity Methods

An interactive Next.js project where users take a short test to find the productivity method (Eat the Frog, Eisenhower Matrix, etc.) that suits them best, and then practice it through interactive tools. Designed and developed from scratch — UI/UX, logic, and components.

![Project Preview](/public/screenshots/home-page.png)

Live Demo: [Vercel](https://interactive-productivity-methods.vercel.app/)

## Features

- Personality-like test with a point-based system that suggests the most suitable productivity method
- Dedicated pages for each productivity method generated statically or on-demand.
- Interactive productivity tools:
  - ✅ Eat the Frog (enforces a strict limit of 2 tasks and uses default text logic via the reusable task hook)
  - ✅ Eisenhower Matrix (tasks are categorized into 4 quadrants, with persistence and dynamic urgency assignment)
  - ✅ Pomodoro Timer Pomodoro Timer (features a custom CSS visual dial that rotates to represent remaining time)
  - ✅ Ivy Lee Method (enforces a strict limit of 6 tasks and uses a non-shifting, auto-incrementing order ID for permanent prioritization)
  - ✅ Time Blocking (interactive timeline that uses calculated minute-to-pixel positioning and prevents time slot overlaps with validation logic)
- Results are URL-based (?tags=...), allowing users to share their specific test outcomes easily.
- LocalStorage support: tasks stay saved between sessions
- Responsive UI (mobile + desktop)

## Tech stack

- [Next.js](https://nextjs.org/) -Framework & Routing
- [React](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/)- Styling
- [Vitest](https://vitest.dev/) - Testing

## Design

All UI/UX design was created by me from scratch using [Figma](https://figma.com).  
The project demonstrates both coding and design skills.

## Installation and tests

1. Clone the repository

```bash
git clone https://github.com/soylltari/interactive-productivity-methods.git
```

2. Navigate to the project directory

```bash
cd interactive-productivity-methods
```

3. Install dependencies

```bash
npm install
```

4. Start the application

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

Run the test suite:

```bash
npm test
```

## Deployment

Deployed with Vercel. CI/CD auto-builds on push to main branch.

## What I Learned

- Project Architecture & Setup — built the project from scratch: planned feature flow, created reusable UI components, organized routes and state logic, and implemented a scalable folder structure.
- App Router & Server Components — Migrated from Vite to Next.js App Router, applying best practices.
- React Hooks — practiced `useState` and `useEffect`, and created a custom hook `useLocalStorage` and the reusable `useTaskManagement`.
- Advanced State Management — designed and implemented a generic custom hook (`useTaskManagement`) to standardize core logic across five different productivity methods, handling varied business rules (max limits, default values, urgency). Replaced internal React state with URL Query Parameters (useSearchParams) for the results page, making user results shareable and persistent across reloads.
- Local Storage — learned how to persist user data in a simple web application.
- Responsive Design — built consistent UI using a mobile-first approach with Tailwind CSS.
- CSS Geometry & Animations — used pure CSS techniques (translateX/rotate and transform-origin with specific coordinates) to create responsive timeline and dynamic dial visuals.
- Component Testing — wrote tests with Vitest and React Testing Library.

## Future Improvements

- [ ] Add more productivity methods (Getting Things Done, Kanban, etc.)
- [ ] Add dark mode
- [ ] Improve UI/UX design

## Screenshots

#### Desktop

![Library page](/public/screenshots/library-page.png)

#### Mobile

| Eat the Frog                                                       | Result Page                                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| <img src="/public/screenshots/eat-the-frog-page.png" width="200"/> | <img src="/public/screenshots/result-page-mobile.png" width="200"/> |
