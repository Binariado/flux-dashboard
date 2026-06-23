# Flux Dashboard

Admin Dashboard template built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

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
- 🖼️ **Multi-Template Layouts**: Switch between visual templates (floating-card / edge-to-edge) by changing one CSS import.
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

### 1. Theming System (`src/config` & `src/styles`)

The theming logic is **centralized** to make customization easy and consistent across Ant Design and Tailwind CSS.

#### **Changing the Primary Color** (Brand Color)

To change the main brand color (e.g., from Blue `#2563eb` to Purple `#7c3aed`):

1.  **Edit `src/config/theme.ts`** (JS/TS Configuration):

    ```typescript
    export const themeConfig = {
      primary: '#7c3aed', // Update this Hex code
      // ...
    };
    ```

    - This updates the primary color for **Ant Design components** (Buttons, Tables, Menus).

2.  **Edit `src/styles/theme.css`** (CSS Variables):

    ```css
    :root {
      /* ... */
      /* USER CONFIGURATION START */
      --primary: #7c3aed; /* Update this Hex code */
      --primary-rgb: 124, 58, 237; /* Update RGB channels for opacity support */
      /* ... */
    }
    ```

    - This updates the primary color for **Tailwind/Shadcn components**.
    - Hover and Active states are **automatically calculated** based on this color.

#### **Dark Mode Customization**

The dark mode uses a "Slate" palette (Blue-Gray tones) for better ergonomics. To customize it:

- **Edit `src/config/theme.ts`**: Update the `dark` object.
- **Edit `src/styles/theme.css`**: Update the `.dark` class variables to match.

Both files must be kept in sync to ensure visual consistency between the different UI libraries used in the project.

- **`src/styles/globals.css`**: Consumes variables from `theme.css`. **Do not edit colors here directly**; it is designed to strictly follow the configuration in `theme.css`.

### 2. Multi-Template System (`src/styles/themes`)

Flux Dashboard supports **multiple visual templates** that can be switched by changing a single CSS import. Each template controls the layout styling (margins, borders, shadows, backgrounds) independently — components remain the same.

#### Available Templates

| Template            | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **`edge-to-edge`**  | Default. Flat, full-width components with border separators. Clean and minimal.           |
| **`floating-card`** | Rounded cards flotantes con sombras, márgenes, y backdrop blur. Estilo moderno y elevado. |

#### Switching Templates

Edit `src/styles/index.css` and change the active `@import`:

```css
/* Floating Card template */
@import './themes/floating-card/template.css';
/* @import './themes/edge-to-edge/template.css'; */

/* Edge-to-Edge template */
/* @import './themes/floating-card/template.css'; */
@import './themes/edge-to-edge/template.css';
```

#### Template File Structure

```
src/styles/
├── index.css                         ← Template switch (change 1 line)
├── fonts.css / tailwind.css / theme.css
├── globals.css                       ← Base styles shared by all templates
└── themes/
    ├── floating-card/
    │   └── template.css              ← Floating card styles (~280 lines)
    └── edge-to-edge/
        └── template.css              ← Edge-to-edge styles
```

#### How It Works

- **Components** use CSS classes like `template-header`, `template-sidebar`, `template-content`, `template-footer`, etc.
- **Each `template.css`** defines or overrides styles for those classes.
- The template CSS is imported **after** `globals.css`, so it naturally overrides base styles.
- The `floating-card` template uses `!important` on properties that compete with Tailwind utility classes (margins, borders, shadows).
- Template-specific positions (e.g., header toggle button) are also controlled per-template via classes like `template-header-toggle`.

#### Creating a New Template

1. Create a new directory under `src/styles/themes/`.
2. Create a `template.css` file with your custom styles.
3. Add the template classes to your components if they don't exist yet.
4. Update `index.css` to import your new template.

The component structure and logic remain untouched — only CSS changes.

### 3. Component Architecture (`src/components`)

Components are organized by domain and reusability:

- **`layout/`**: Structural components for the application shell.
  - `Sidebar.tsx`: The main navigation menu. It includes a sticky footer for seamless access to settings and user profiles.
  - `Header.tsx`: The top navigation bar, which adapts its content based on the layout mode (Sidebar vs Topbar).
  - `DashboardLayout.tsx`: The main wrapper that orchestrates the Sidebar and Header.
- **`ui/`**: Generic, reusable UI atoms (buttons, cards, inputs) and wrappers for Ant Design components.
- **`dashboard/`**: Specific widgets and charts used in the dashboard views (e.g., ApexCharts integrations).

### 4. Routing (`src/routers`)

Routing is handled via `react-router` and centralized in `src/routers/index.tsx`.

- **Protected Routes**: The `ProtectedRoute.tsx` wrapper ensures that only authenticated users can access dashboard pages, redirecting unauthenticated traffic to the login page.

### 5. State Management (`src/stores`)

We use **Zustand** for lightweight and performant global state management:

- **`uiStore.ts`**: Handles UI-related state such as:
  - `theme` ('light' | 'dark' | 'system').
  - `sidebarCollapsed` (boolean).
  - `navType` (sidebar vs topbar preference).
- **`authStore.ts`**: Manages authentication state (user tokens, login/logout actions).

### 6. API Layer (`src/api`)

- **`axios.config.ts`**: A pre-configured Axios instance with interceptors for handling request headers (Authorization) and standardized error responses.

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
