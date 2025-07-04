# ClubRoom - Inventory & Member Management App

**ClubRoom** is a Node.js web application for managing club members, messages, and roles (admin, member, guest). Built using Express.js, PostgreSQL, Passport.js, and EJS templating, it provides a secure and structured system for authenticating users and controlling access to private routes.

---

## 🚀 Features

- 🔐 User authentication with Passport (local strategy)
- 🧾 Role-based access (Admin, Member, Guest)
- 📨 Message board with form validation
- 📋 Admin passcode and member join codes
- ⚙️ PostgreSQL database integration
- 🖼️ Server-side rendering with EJS templates
- 🌐 Flash messages and session handling

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Passport.js, bcrypt
- **Templating**: EJS
- **Validation**: express-validator
- **Environment**: dotenv
- **Session Management**: express-session, connect-flash

---

## 🗃️ Project Structure

clubRoom/
│
├── app.js # Main application file
├── .env # Environment variables
├── package.json # Project metadata and scripts
│
├── config/ # DB and Passport configuration
├── controllers/ # Route logic (auth, messages)
├── middleware/ # Custom auth middleware
├── models/ # Database query logic
├── routes/ # Route definitions
├── views/ # EJS templates
│ └── partials/ # Reusable EJS components
├── public/ # Static assets
│ └── css/
└── schema.sql # Optional: SQL structure for DB
