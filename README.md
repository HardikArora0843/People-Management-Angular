# 👥 People Management App

- List Of All People in Dark Mode
  
![DarkMode](https://github.com/user-attachments/assets/a912ffce-869c-4e3d-b485-018b8aee887e)

---

- List Of All People in Light Mode

![LightMode](https://github.com/user-attachments/assets/79e2ae71-a62e-43bc-9f30-b44b57e6f305)

---

- Edit Person
  
![EditPerson](https://github.com/user-attachments/assets/9148caf6-f6b8-4bd7-81bc-beb8a62b98ae)

---

- Add Person

![AddPerson](https://github.com/user-attachments/assets/dd308d69-8de7-4fcc-b1c8-7ec0f3f87f56)

---

- Edit Person In Dark Mode

![EditPersonDarkMode](https://github.com/user-attachments/assets/6dc90a84-3838-4327-85bb-8538c9b2e567)



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
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)


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
