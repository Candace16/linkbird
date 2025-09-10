# LinkBird - LinkedIn Automation Platform

A comprehensive LinkedIn automation and lead generation platform built with Next.js 14, featuring campaign management, lead tracking, and automated outreach capabilities.

## 🚀 Features

- **Campaign Management**: Create, manage, and track LinkedIn outreach campaigns
- **Lead Management**: Import, organize, and track lead interactions
- **LinkedIn Integration**: Multiple account management with usage tracking
- **Analytics & Reporting**: Response rates, conversion tracking, and performance metrics
- **Authentication**: Secure login with email/password and Google OAuth
- **Real-time Updates**: Live campaign progress and lead status updates

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **UI**: Radix UI components with Tailwind CSS
- **State Management**: Zustand + React Query
- **Styling**: Tailwind CSS v4

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Google Cloud Console account (for OAuth)

## 🔧 Installation & Setup

### 1. Clone and Install
\`\`\`bash
git clone <repository-url>
cd linkbird
npm install
\`\`\`

### 2. Environment Setup
Create `.env.local` file:
\`\`\`env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/linkbird

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3. Database Setup
\`\`\`bash
# Create database
createdb linkbird

# Run migrations
psql -d linkbird -f scripts/001-create-tables.sql

# Seed data (optional)
psql -d linkbird -f scripts/002-seed-data.sql
\`\`\`

### 4. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

\`\`\`
linkbird/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── campaigns/         # Campaign management
│   ├── leads/            # Lead management
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── campaigns/        # Campaign components
│   └── leads/            # Lead components
├── lib/                  # Utilities and configurations
│   ├── db.ts            # Database configuration
│   ├── auth.ts          # Authentication setup
│   └── queries/         # Database queries
├── scripts/             # Database scripts
└── public/             # Static assets
\`\`\`

## 🔑 Key Features

### Campaign Management
- Create and configure outreach campaigns
- Set daily limits and automation rules
- Track progress and performance metrics
- Pause/resume campaigns as needed

### Lead Management
- Import leads from CSV or manual entry
- Track interaction history and status
- Filter and search capabilities
- Automated follow-up sequences

### Analytics
- Response rate tracking
- Conversion metrics
- Campaign performance insights
- Lead activity monitoring

## 🚀 Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
\`\`\`

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide

---

Built with ❤️ using Next.js and modern web technologies.
