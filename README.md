# Interactive Productivity Methods

An interactive React + TypeScript project where users take a short test to find the productivity method (Eat the Frog, Eisenhower Matrix, etc.) that suits them best, and then practice it through interactive tools. Designed and developed from scratch — UI/UX, logic, and components.

![Project Preview](/src/assets/screenshots/home-page.png)

Live Demo: [Vercel](https://interactive-productivity-methods.vercel.app/)

Currently a work in progress — implemented Quiz and Eat the Frog method, with more methods coming later.

## Features

- Personality-like test with a point-based system that suggests the most suitable productivity method
- Detailed results with scores for each method
- Interactive productivity tools:
  - ✅ Eat the Frog (choose up to 2 critical tasks per day)
  - Eisenhower Matrix (coming soon)
  - Pomodoro Timer (coming soon)
  - Ivy Lee Method (coming soon)
  - Time Blocking (coming soon)
- LocalStorage support: tasks stay saved between sessions
- Responsive UI (mobile + desktop)

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for navigation
- [Vitest](https://vitest.dev/) for testing

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

5. Open [http://localhost:5173](http://localhost:5173) in your browser

Run the test suite:

```bash
npm test
```

## Deployment

Deployed with Vercel. CI/CD auto-builds on push to main branch.

## What I Learned

- Project Architecture & Setup — built the project from scratch: planned feature flow, created reusable UI components, organized routes and state logic, and implemented a scalable folder structure.
- React Hooks — practiced `useState` and `useEffect`, and created a custom hook `useLocalStorage`.
- Local Storage — learned how to persist user data in a simple web application.
- TypeScript Integration — migrated the project from JavaScript to TypeScript, adding type safety to components, custom hooks, and state structures.
- Responsive Design — built consistent UI using a mobile-first approach with Tailwind CSS.
- Component Testing — wrote tests with Vitest and React Testing Library.

## Future Improvements

- [ ] Add remaining productivity tools:
  - [ ] Eisenhower Matrix
  - [ ] Pomodoro Timer
  - [ ] Ivy Lee Method
  - [ ] Time Blocking
- [ ] Add more productivity methods (Getting Things Done, Kanban, etc.)
- [ ] Add dark mode
- [ ] Improve UI/UX design

## Screenshots

#### Desktop

![Library page](/src/assets/screenshots/library-page.png)

#### Mobile

| Eat the Frog                                                            | Result Page                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| <img src="./src/assets/screenshots/eat-the-frog-page.png" width="200"/> | <img src="./src/assets/screenshots/result-page-mobile.png" width="200"/> |
