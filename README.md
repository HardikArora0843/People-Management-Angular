# 👥 People Management App


A modern, responsive **Single Page Application (SPA)** built with **Angular** to manage a list of people.  
It allows you to **list**, **edit**, and **delete** people using RESTful API endpoints. Clean component architecture, theme toggle, reusable dialogs, and notification services included.

---

## ✨ Features

- **People List View:** See all people in a paginated and responsive list.
- **Edit View:** Update person details with validation and instant UI updates.
- **Delete View:** Confirmation dialog before deletion with success/error notifications.
- **Theme Toggle:** Light/Dark theme support using a global theme service.
- **Reusable Components:** Confirm dialogs, loading spinners, and alerts.
- **Animations & Transitions:** Smooth UI animations for better UX.
- **Mobile Responsive:** Fully responsive layout using modern CSS.

---

## 🛠️ Tech Stack

- **Framework:** Angular
- **Language:** TypeScript
- **Styling:** CSS & Global Theme Variables
- **Icons:** SVG-based components
- **Package Manager:** npm
- **Build Tool:** Angular CLI

---

## 📦 Project Structure

people-management-app/

├── src/

│ ├── app/

│ │ ├── components/

│ │ │ ├── confirm-dialog/

│ │ │ ├── loading-spinner/

│ │ │ └── notifications/

│ │ ├── models/

│ │ ├── services/

│ │ ├── app.component.ts

│ │ ├── app.routes.ts

│ │ └── app.config.ts

│ ├── assets/

│ ├── global_styles.css

│ └── main.ts

├── angular.json

├── package.json

├── tsconfig.json

└── README.md



---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/HardikArora0843/People-Management-Angular.git
cd People-Management-Angular

```

### 2. **Install Dependencies**

```bash
npm install
```

### **3. Run the App Locally**

```bash
npm run dev
```

> The app will be available at: http://localhost:4200

---

## 📡 API Integration
The app fetches and manipulates data via external API endpoints:

- GET /people – Fetch list of people
- PUT /people/:id – Update a person's info
- DELETE /people/:id – Delete a person

These are integrated using Angular’s HttpClient in a reusable service class.

---

## 🧩 Views Implemented
✅ List People

✅ Edit Person

✅ Delete Person


Each view is linked via Angular's Router system.

---

## 🖌️ Design Highlights

- Component-Driven: Reusable UI pieces like dialogs and spinners for maintainability.
- Theme Support: Toggle between light and dark with a click.
- Service-Based Architecture: Centralized logic for APIs, themes, and notifications.
- Clean UX: Smooth navigation, helpful alerts, and keyboard accessibility.

---

## 🙌 Acknowledgments

- Angular
- RxJS
- TypeScript
- Node.js
- Angular CLI

---


> Thank you for checking out my project!
