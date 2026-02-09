# FIT_TRACK 🏋️‍♂️

**FIT_TRACK** is a modern, Gen-Z style fitness tracking web application built with a neon UI, smooth onboarding flow, and personalized workout planning.  
The goal of this project is to combine **clean UX**, **modern frontend architecture**, and **real-world state management** into a production-ready app.

---

## 🚀 Why FIT_TRACK?

Most fitness apps are either:
- visually boring  
- overly complex  
- or locked behind paywalls  

FIT_TRACK focuses on:
- a **beautiful onboarding experience**
- **personalized workouts** based on user data
- a **clean, scalable codebase** suitable for real products

This project is built as a **portfolio-grade application**, not a demo.

---

## ✨ Key Features

### 🔐 Onboarding Flow
- Multi-step onboarding wizard
- Collects:
  - age, height, weight
  - fitness goal
  - available equipment
  - daily workout time
- Validated step-by-step (cannot skip required data)
- State persisted using **Zustand**

### 🎨 UI / UX
- Gen-Z inspired **neon + glassmorphism design**
- Dark-mode first UI
- Gradient buttons with high-contrast text
- Smooth animations using **Framer Motion**

### 🧠 Personalization
- Workout plans generated based on:
  - user goal
  - fitness level
  - available time
  - equipment access
- Centralized workout logic for scalability

### 🧩 Architecture
- Modular folder structure
- Separation of concerns:
  - UI components
  - state management
  - utilities
  - domain logic

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| State Management | Zustand |
| Animations | Framer Motion |
| Icons | Lucide React |
| Version Control | Git & GitHub |

---

## 📂 Project Structure

```text
fittrack/
├── src/
│   ├── app/              # App router pages & layouts
│   ├── components/       # Reusable UI components
│   ├── onboarding/       # Onboarding wizard
│   ├── dashboard/        # Dashboard views
│   ├── store/            # Zustand stores
│   ├── lib/              # Utilities & workout logic
│   └── styles/           # Global styles
├── public/               # Static assets
├── package.json
├── next.config.ts
└── README.md
