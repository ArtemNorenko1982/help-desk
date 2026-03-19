# 🛠 Help Desk Web Platform

Enterprise-ready Help Desk dashboard platform built with:

- Angular
- Nx Monorepo
- Chart.js
- TailwindCSS + SCSS
- Modular feature-driven architecture
- Designed for Azure deployment

---

# 🎯 Project Vision

This repository represents the foundation of a scalable Help Desk platform.

The system is designed to:

- Provide real-time operational visibility
- Monitor ticket lifecycle metrics
- Support multi-role architecture

This is structured for long-term product evolution.

---

# 🏗 Architecture Overview

 apps/

  - helpdesk-web/ → Main Angular application

- libs/shared/ui/

  - src/
    - features/
      - auth/
      - tickets/
      - .../
    - lib/
      - components, directives, services, models

---

# 🚀 Local Development

Install dependencies:

    npm install

Run development server:

    npx nx serve helpdesk-web

App runs at:
http://localhost:4200

---

# 🏗 Production Build

    npx nx build helpdesk-web

Output directory:
dist/apps/helpdesk-web

---

# 🔎 Nx Targets

Inspect available targets:

    npx nx show project helpdesk-web

Common targets:

- serve → Run dev server
- build → Production build
- test → Run unit tests
- lint → Lint project
- preview → Preview production build (if configured)

---

# 🧪 Testing

    npx nx test helpdesk-web

---

# 🧹 Linting

    npx nx lint helpdesk-web

---

# 🌍 Environment Configuration

Located in:

apps/helpdesk-web/src/environments/

Example:

    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000/api',
    };

---

# ☁ Azure Deployment

## Azure Static Web Apps (Recommended)

Build:

    npx nx build helpdesk-web --configuration=production

Deploy via Azure CLI or GitHub Actions.

## Azure App Service

Build:

    npx nx build helpdesk-web --configuration=production

Deploy:

    az webapp up --name helpdesk-web --resource-group my-resource-group --runtime "NODE:20-lts"

---

# 🐳 Docker Deployment (Optional)

Example Dockerfile:

    FROM nginx:alpine
    COPY dist/apps/helpdesk-web /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]

Build:

    docker build -t helpdesk-web .

Run:

    docker run -p 8080:80 helpdesk-web

---

# 🔐 Security Roadmap

- RBAC
- JWT / Azure AD integration
- HTTP interceptors
- Centralized error handling
- Secure production build

---

# 📈 Future Roadmap

- Backend integration
- Multi-tenant support
- SLA monitoring
- Real-time updates
- CI/CD with Azure
- Observability (App Insights)

---

# 📌 Tech Stack

- Angular
- Nx
- TypeScript/C#
- Chart.js
- TailwindCSS
- SCSS
- Signals

---

# 📄 License

Proprietary – Internal Product Foundation.
