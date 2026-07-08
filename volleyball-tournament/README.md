# 🏐 Volleyball Tournament 2026

A production-grade volleyball tournament registration and management platform built with Next.js 15, TypeScript, Tailwind CSS, and PostgreSQL.

## 📸 Screenshots

![Homepage](public/hero-poster.png)

## ✨ Features

### 🌐 Public Website
- **Premium Landing Page** - Hero section with animations, countdown timer, parallax effects
- **Tournament Details** - Prize pool, schedule, venue, rules, FAQ
- **Mobile-First Registration** - 5-step wizard optimized for mobile devices
- **Auto-Save** - Form data persists even if browser crashes or user switches apps
- **Payment Integration** - eSewa QR code and bank transfer support
- **Image Upload** - Cloudinary integration for team logos, player photos, payment screenshots
- **Email Notifications** - Resend API for registration confirmation and updates

### 🔒 Admin Dashboard
- **OTP Authentication** - Secure login with email OTP verification
- **Dashboard Analytics** - Real-time stats, charts, and metrics
- **Team Management** - View, approve, reject, delete teams
- **Player Management** - View all player details, photos, documents
- **Payment Verification** - View screenshots, approve/reject payments
- **Email System** - Send announcements to teams
- **PDF Export** - Download team details with player photos
- **Responsive Admin** - Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Animation** | Framer Motion |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **Auth** | JWT + OTP (Jose) |
| **Email** | Resend |
| **Uploads** | Cloudinary |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Deployment** | Vercel |

## 📁 Project Structure
volleyball-tournament/
├── prisma/
│ ├── schema.prisma # Database schema
│ └── seed.ts # Seed data
├── public/
│ ├── hero-poster.png # Hero background
│ ├── dangolai.png # Footer logo
│ └── images/
│ └── esewa-qr.png # eSewa QR code
├── src/
│ ├── app/
│ │ ├── layout.tsx # Root layout
│ │ ├── page.tsx # Homepage
│ │ ├── register/ # Registration pages
│ │ ├── admin/ # Admin dashboard
│ │ └── api/ # API routes
│ ├── components/
│ │ ├── home/ # Homepage sections
│ │ ├── registration/ # Registration wizard
│ │ ├── admin/ # Admin components
│ │ ├── layout/ # Navbar, Footer
│ │ └── ui/ # Shadcn UI components
│ ├── hooks/ # Custom hooks
│ ├── lib/ # Utilities
│ ├── schemas/ # Zod schemas
│ └── providers/ # React providers
├── .env.example # Environment variables template
├── next.config.ts # Next.js config
├── tailwind.config.ts # Tailwind config
├── vercel.json # Vercel deployment config
└── package.json

text

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Cloudinary account
- Resend account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/volleyball-tournament.git
cd volleyball-tournament

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
Environment Variables
Create a .env.local file with:

env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/db?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-at-least-32-characters"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

# Resend (Email)
RESEND_API_KEY="re_xxxxxxxxxxxx"

# Admin
ADMIN_EMAIL="admin@example.com"
ADMIN_PHONE="9800000000"

# Public
NEXT_PUBLIC_ADMIN_PHONE="9800000000"
NEXT_PUBLIC_ADMIN_EMAIL="admin@example.com"
Database Setup
bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database (creates tournament + admin user)
npm run db:seed
Create Admin User (Manual SQL)
sql
INSERT INTO "Admin" (id, email, password, name, role, "isActive") 
VALUES ('admin-001', 'your-email@gmail.com', 'YourPassword123', 'Admin Name', 'admin', true);
Run Development Server
bash
npm run dev
Visit:

Website: http://localhost:3000

Register: http://localhost:3000/register

Admin Login: http://localhost:3000/admin/login

📦 Available Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push Prisma schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
npm run db:migrate   # Run database migrations
🗄️ Database Models
Model	Description
Admin	Admin users with authentication
Tournament	Tournament configuration (yearly)
Team	Registered teams
Player	Team players (10 per team)
Payment	Payment records
OTP	One-time passwords for admin login
Announcement	Public announcements
AuditLog	Admin activity tracking
RateLimit	API rate limiting
🔐 Security Features
JWT-based admin authentication

OTP verification via email

Rate limiting on login and registration

Zod validation on all inputs

Cloudinary secure uploads

SQL injection protection (Prisma)

Security headers configured

📱 Mobile Responsiveness
The entire platform is designed mobile-first:

Registration form optimized for phones

Admin dashboard responsive on all devices

Touch-friendly buttons and inputs

Auto-save prevents data loss on mobile

🚢 Deployment
Deploy to Vercel
bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
Environment Variables on Vercel
Add all variables from .env.local to Vercel project settings.

📄 License
This project is licensed under the MIT License.

👨‍💻 Developer
Developed by DANGOL AI

📞 Support
For support, contact:

📱 Phone: 9803977546

📧 Email: www.bishaltolami049@gmail.com

Built with ❤️ in Nepal 🇳🇵

