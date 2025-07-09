# Claude Project Context (Claude.md)

## 1. Project Overview
This project is a cross-platform interactive app platform focused on two primary scenarios:
- Visual Novel app platform for story creation and experience
- Virtual Pet simulation app (e.g., lizard-raising)

The aim is to automate component/code generation and logic implementation using Claudia CC Agents for rapid prototyping and scalable development.

## 2. Core Features
- Scene and UI component generation for branching story structures
- State and progression logic for simulation/raising games (pet status, user interaction, events)
- Type-safe, maintainable code (TypeScript-first)
- Data-driven workflow (scenario logic and game states managed via JSON)
- Modular, reusable architecture for future platform expansion

## 3. Tech Stack & Platform Roadmap
- Initial development: Web application using **React (TypeScript)**
- Ultimate goal: Extend the codebase for **React Native** mobile apps (Android & iOS)
- State management: Redux Toolkit (or Zustand, MobX as needed)
- Styling: Styled-components, TailwindCSS, or React Native StyleSheet
- Component architecture follows Atomic Design principles
- **When designing code and architecture, prioritize reusability and cross-platform readiness**

## 4. Communication & Language Guidelines
- **All answers, explanations, code comments, and communication by CC Agents must be in Korean.**
  (코드 주석, 설명, 샘플 응답 등 반드시 한국어로 작성)
- If sample code or text contains non-Korean, always translate or annotate in Korean.

## 5. Folder/File Structure
- `src/components`: Presentational and container UI components
- `src/screens`: App screens (e.g., Main, Story, PetStatus)
- `src/store`: State management logic (Redux or equivalent)
- `assets/data/`: Scenario, pet status, and config JSON files

## 6. Coding Style Guidelines
- Follow Airbnb TypeScript lint rules
- PascalCase for components, camelCase for variables/functions
- All exported functions and components must have a JSDoc-style comment (in Korean)
- No business logic in presentational components
- Avoid code duplication; abstract repeated logic

## 7. Key Data Models (TypeScript)
```ts
interface Scene {
  id: string;
  title: string;
  text: string;
  choices: Choice[];
}
interface Choice {
  label: string;
  nextSceneId: string;
}

interface PetStatus {
  hunger: number;
  happiness: number;
  level: number;
  lastFed: Date;
}
```