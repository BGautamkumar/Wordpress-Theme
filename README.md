# Aspire WooCommerce Theme - Landing Page

A premium, modern, and lightning-fast landing page designed for the Aspire WooCommerce theme. Built with **Vite.js**, **Tailwind CSS**, and **Vanilla JavaScript** to achieve a perfect 99/100 Core Web Vitals score.

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
Starts the local dev server with hot module replacement (HMR).
```bash
npm run dev
```
*By default, your app will be running at `http://localhost:3000`*

### 3. Build for Production
Compiles, optimizes, and minifies the project for deployment. The output will be generated in the `dist/` directory.
```bash
npm run build
```

### 4. Preview Production Build
Run a local web server to preview your built `dist/` folder before deploying it to production.
```bash
npm run preview
```

## 📁 Project Structure

This project uses a Multi-Page Application (MPA) setup. All pages are bundled and optimized automatically via Vite.

```text
aspire-landing/
├── index.html            # Main landing page
├── pages/                # Additional website pages (Features, Pricing, Templates, etc.)
├── src/                  
│   ├── scripts/          # Vanilla JS modules (main.js, auth.js)
│   └── styles/           # Tailwind & custom CSS (main.css)
├── public/               # Static assets (images, icons)
├── vite.config.js        # Vite configuration & Multi-page routing setup
└── tailwind.config.js    # Design system & theme configuration
```

## 🛠️ Tech Stack

- **Build Tool:** [Vite.js](https://vitejs.dev/) - Next-generation frontend tooling.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- **Logic:** Vanilla JavaScript (ES modules) - Zero heavy framework dependencies for maximum performance.

## 🎨 Design System

- **Colors:** Premium Dark mode (`#1C1C2E`) accented with a vibrant Primary Green (`#6DC04B`).
- **Typography:** *Plus Jakarta Sans* for bold headings & *Inter* for readable body text.
- **Aesthetic:** Modern SaaS feel featuring glassmorphism (`glass-nav`), smooth hover transitions, and responsive grid layouts.

## 📝 How to Edit the Project

1. **Adding New Pages:** 
   - Create a new `.html` file in the `pages/` directory.
   - Register the new page in `vite.config.js` under the `build.rollupOptions.input` object.
2. **Styling Elements:** 
   - Use Tailwind utility classes directly in your HTML files. 
   - For global or custom CSS rules, edit `src/styles/main.css`.
3. **Writing JavaScript:** 
   - Write your logic in `src/scripts/` (e.g., `main.js`).
   - Import it into your HTML file right before the closing `</head>` tag using `<script type="module" src="/src/scripts/main.js"></script>`.

---
*Built for maximum conversion, scalability, and speed.*
