# GDG-DIT Website - AI Agent Instructions

## About This Project
This is the official website for the GDG-DIT Chapter, built with Next.js 15 (App Router) and styled with Tailwind CSS. The primary goal is to inform, engage, and attract members by showcasing events, the team, and blog content.

## Key Project Structure & Patterns

1.  **App Router Structure**:
    - The application uses the Next.js App Router. All pages are located within the `app/` directory.
    - Each page route (e.g., `app/events/`) contains a `page.jsx` for the main content and a `layout.jsx` for its specific layout.

2.  **Component Organization**:
    - **Page-Specific Components**: Components used by a single page are co-located in `components/{page_name}/` (e.g., `components/home/HeroSection.jsx`).
    - **Shared/Common Components**: Components used across multiple pages are in `components/common/` (e.g., `components/common/Navbar.jsx`).
    - **Global Layout Components**: The main `Header` and `Footer` are located in `app/components/`.
    - **Base UI Primitives**: Low-level, reusable UI elements like `Button` and `Card` are in `components/ui/`.

3.  **Data Flow - Static JSON**:
    - All page content and data are sourced from static JSON files located in the `data/` directory.
    - For example, the team page (`app/team/page.jsx`) imports its content directly from `data/team.json`.
    - **To add or update content (e.g., a new team member or event), you must modify the corresponding JSON file in `/data`.**

4.  **Styling**:
    - Styling is done exclusively with Tailwind CSS.
    - The `utils/cn.js` utility is available for conditionally applying CSS classes.
    - Global styles are defined in `app/globals.css`.

5.  **Assets**:
    - All static assets like images, fonts, and documents are located in the `public/` directory.
    - Reference images directly by their path starting from `/` (e.g., `/images/home/hero.png`).

## Developer Workflow

- **Running the Development Server**: To start the local development environment, run the following command in the terminal:
  ```bash
  npm run dev
  ```
- **Creating New Pages**: To create a new page, add a new folder in the `app/` directory with `page.jsx` and `layout.jsx` files. Then, add any necessary data to a new JSON file in the `data/` directory.
