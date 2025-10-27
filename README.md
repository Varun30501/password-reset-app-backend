# 🔐 Password Reset App — Backend (Node.js + Express + MongoDB)

This is the **backend server** for the Password Reset App.  
It provides secure user authentication, password reset via email verification, and role-based access (User/Admin).

---

## ⚙️ Tech Stack

- **Node.js + Express** — Backend framework  
- **MongoDB + Mongoose** — Database and ORM  
- **Nodemailer + SendGrid** — Email delivery  
- **JWT (JSON Web Token)** — Secure authentication  
- **BcryptJS** — Password hashing  
- **dotenv** — Environment variables

---

## 🚀 Features

✅ User Signup / Login  
✅ Admin Dashboard with User Management  
✅ Forgot Password — sends a reset link via email  
✅ Secure Password Reset with token verification  
✅ Role-based routes (`admin` / `user`)  
✅ Automatic link expiration (15 minutes)  
✅ Email sending works locally **and** on Render  

---

## 📁 Folder Structure

password-reset-app-backend/
│
├── controllers/
│ └── authController.js # All authentication logic
│
├── models/
│ └── user.js # Mongoose schema for users
│
├── routes/
│ └── authRoutes.js # All API endpoints
│
├── utils/
│ └── sendEmail.js # Email sending via Nodemailer + SendGrid
│
├── config/
│ └── db.js # MongoDB connection
│
├── server.js # Express app entry point
├── .env # Environment variables
└── package.json


---

## ⚡ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/password-reset-app.git
cd password-reset-app/password-reset-app-backend
node server.js


### The deployed server is development server. So the mails are sent to developer specified email account. If you want to change it then change the DEV_EMAIL to your required mail. Or if you want this to be productuion based then change the NODE_ENV to production and change the EMAIL_OVERDRIVE to false so that it will be production level and emails will be sent to your respective email accounts.