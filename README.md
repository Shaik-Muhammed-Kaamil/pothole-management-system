# Pothole & Road Damage Reporting System

A comprehensive web application for reporting and managing road damage complaints with role-based access control.

## 🚀 Overview

This system allows citizens to report potholes and road damage, officers to manage assigned complaints, and administrators to oversee system-wide operations including zone statistics, SLA breach monitoring, and user management.

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons
- **Backend**: Node.js (Express) + TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT-based Role-Based Access Control (RBAC)

## ✨ Features

### M10: Role-Based Access Control
- Secure login system with JWT authentication
- Three user roles: Citizen, Officer, Admin
- Role-based routing and dashboard access

### M9: Dashboards & Reports
- **Zone Statistics**: Department-wise complaint distribution
- **SLA Breach Monitoring**: Real-time tracking of overdue complaints
- **Hotspot Maps**: Placeholder for location-based complaint density visualization

### Officer Portal
- View assigned complaints by department
- Complaint status tracking
- Zone-based complaint management

### Admin Panel
- System-wide user and complaint statistics
- Department management
- SLA compliance oversight
- User activity monitoring

### Database Features
- Prisma ORM with SQLite database
- Seeded data for development
- Efficient query optimization
- Audit logging for status changes

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shaik-Muhammed-Kaamil/pothole-management-system.git
   cd pothole-management-system
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install

   # Return to root
   cd ..
   ```

3. **Database setup**
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx ts-node prisma/seed.ts
   ```

4. **Environment configuration**
   - Backend `.env` is already configured for SQLite
   - Default ports: Frontend (5173), Backend (5002)

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5002`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on `http://localhost:5173`

3. **Access the application**
   - Open `http://localhost:5173` in your browser
   - Login with test accounts (see below)

## 👥 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@pothole.com` | `password123` |
| Officer | `officer@city.gov` | `password123` |

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login with email/password

### Admin Endpoints
- `GET /api/admin/overview` - System statistics and reports
- `GET /api/health` - Health check

### Officer Endpoints
- `GET /api/officer/assigned?userId={id}` - Assigned complaints

## 🗄️ Database Schema

- **Users**: Authentication and role management
- **Departments**: Zone-based organization
- **Complaints**: Road damage reports with status tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Coding Standards

- Use Functional Components in React
- Prisma ORM for all database interactions
- Strict error handling and audit logging
- TypeScript for type safety

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Shaik Muhammed Kaamil**

---

*Built with ❤️ for efficient road maintenance management*</content>
<parameter name="filePath">c:\Users\USER\Desktop\PROJECT_potholes\README.md