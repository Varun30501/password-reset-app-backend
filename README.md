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

## mailbox to check emails for password reset - testmail30501@getairmail.com

## To access the inbox
## Step 1: Go to inboxes.com
## Step 2: Click on get new inbox
## Step 3: Then enter testmail30501 as username and select the getairmail.com for mailbox domain.
## Step 4: After doing till step 3 you will see the inbox which is used for this Password Reset testing and can send reset mails for your accounts which you have registered through the app.

### IMPORTANT - Due to inactivity the server will take time to load up and then only will the action take place. It will take roughly 30 seconds maximum.

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