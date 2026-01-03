# Flux Dashboard

A modern, open-source Admin Dashboard template built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18+-61DAFB.svg?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-5+-3178C6.svg?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-6+-646CFF.svg?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4+-38B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/react_router-7+-CA4245.svg?style=flat&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-5+-orange.svg?style=flat)

## Features

- ⚡ **Lightning Fast Development**: Powered by Vite.
- 🎨 **Modern UI/UX**: Built with Tailwind CSS and highly customized Ant Design components.
- 🌗 **Dark/Light Mode**: Fully supported with a dedicated theme provider and smooth transitions.
- 📱 **Responsive Design**: Mobile-friendly sidebar and layout adaptations.
- 🌐 **Internationalization (i18n)**: Built-in multi-language support (English/Spanish setup included).
- 📊 **Data Visualization**: Integrated ApexCharts for beautiful, responsive charts.
- 🧩 **Modular Components**:
  - **Dynamic Sidebar**: Collapsible menu with a sticky footer for settings/profile.
  - **Configurable Header**: Context-aware options depending on the layout mode (Sidebar vs Topbar).
  - **Reusable Widgets**: UserProfileMenu, StatCards, etc.

## Technologies

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [Lucide React](https://lucide.dev/) (Icons)
- [ApexCharts](https://apexcharts.com/)
- [i18next](https://www.i18next.com/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Binariado/flux-dashboard
   cd flux-dashboard
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. Build for production:
   ```bash
   yarn build
   ```

## Project Structure & Architecture

This template follows a scalable and modular folder structure designed for growth.

### 1. Theming System (`src/styles` & `src/providers`)
The theming logic is centralized in **`src/providers/ThemeProvider.tsx`** and style definitions in **`src/styles/`**.

*   **`ThemeProvider.tsx`**:
    *   Acts as the bridge between **Tailwind CSS** (dark mode class strategy) and **Ant Design** (JavaScript tokens).
    *   Automatically syncs the Ant Design ConfigProvider tokens (like `colorPrimary`, `colorBgContainer`) with the current theme state (`light`, `dark`, or `system`).
    *   Listens to system preferences (`prefers-color-scheme`) for auto-switching.

*   **`src/styles/`**:
    *   **`globals.css`**: Defines CSS variables (`:root`) for the color palette (`--bg-primary`, `--text-primary`, etc.). These are the source of truth for colors.
    *   **`theme.css`**: Maps Tailwind utility classes (e.g., `bg-bg-secondary`) to the CSS variables defined in globals.
    *   **`tailwind.css`**: Entry point for Tailwind imports.

### 2. Component Architecture (`src/components`)
Components are organized by domain and reusability:

*   **`layout/`**: Structural components for the application shell.
    *   `Sidebar.tsx`: The main navigation menu. It includes a sticky footer for seamless access to settings and user profiles.
    *   `Header.tsx`: The top navigation bar, which adapts its content based on the layout mode (Sidebar vs Topbar).
    *   `DashboardLayout.tsx`: The main wrapper that orchestrates the Sidebar and Header.
*   **`ui/`**: Generic, reusable UI atoms (buttons, cards, inputs) and wrappers for Ant Design components.
*   **`dashboard/`**: Specific widgets and charts used in the dashboard views (e.g., ApexCharts integrations).

### 3. Routing (`src/routers`)
Routing is handled via `react-router` and centralized in `src/routers/index.tsx`.
*   **Protected Routes**: The `ProtectedRoute.tsx` wrapper ensures that only authenticated users can access dashboard pages, redirecting unauthenticated traffic to the login page.

### 4. State Management (`src/stores`)
We use **Zustand** for lightweight and performant global state management:
*   **`uiStore.ts`**: Handles UI-related state such as:
    *   `theme` ('light' | 'dark' | 'system').
    *   `sidebarCollapsed` (boolean).
    *   `navType` (sidebar vs topbar preference).
*   **`authStore.ts`**: Manages authentication state (user tokens, login/logout actions).

### 5. API Layer (`src/api`)
*   **`axios.config.ts`**: A pre-configured Axios instance with interceptors for handling request headers (Authorization) and standardized error responses.

## Customization Guide

### Sidebar Configuration

You can customize the Sidebar menu items in `src/hooks/useMenuItems.tsx`.

### User Profile Customization

The user profile component (`UserProfileMenu`) depends on `bgClassName` prop to match different backgrounds (header vs sidebar):

```tsx
// Example usage in Sidebar (dark background)
<UserProfileMenu bgClassName="bg-white dark:bg-bg-primary" />

// Example usage in Header (transparent background)
<UserProfileMenu bgClassName="bg-white dark:bg-transparent" />
```

### Footer Customization

The footer text ("Flux Dashboard ©2026...") is located in `src/components/layout/MainLayout.tsx`. You can freely change this to match your company's branding.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Brayan Salgado**
