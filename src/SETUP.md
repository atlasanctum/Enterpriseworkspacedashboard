# Enterprise Workspace - Setup Guide

## 🚀 Quick Start (Development Mode)

The app is configured to work immediately without database setup for development purposes.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access the Application

Open [http://localhost:3000](http://localhost:3000)

The app will automatically redirect you to the dashboard with a mock user session.

## 📋 Available Pages

All pages are now fully functional in the Next.js app:

- **Dashboard** - `/` - Main overview with metrics and charts
- **Multi-Country Deployments** - `/deployments` - 23 country deployment status
- **Beneficiary Management** - `/beneficiaries` - Manage 12.4M beneficiaries
  - Beneficiary Details - `/beneficiaries/[id]` - Individual beneficiary records
- **Fraud Detection** - `/fraud-detection` - AI-powered fraud analysis
- **Compliance Framework** - `/compliance` - Global compliance management
- **Audit Trails** - `/audit-trails` - Complete audit history
- **Workflow Automation** - `/workflows` - Automation studio
- **Predictive Analytics** - `/analytics` - AI forecasting and crisis prediction
- **Reporting Engine** - `/reporting` - Generate compliance reports
- **Inter-Agency Chat** - `/messaging` - Secure collaboration
- **AI Governance Assistant** - `/ai-assistant` - AI-powered insights

## 🔐 Authentication (Development)

**Mock Credentials:**
- Email: `admin@un-operations.org`
- Password: `admin123`
- Role: Admin

The app is currently configured with mock authentication for easy development. Authentication is **disabled** by default in `middleware.ts`.

## 🗄️ Database Setup (Optional - For Production)

### Option 1: Vercel Postgres (Recommended)

1. **Link to Vercel:**
   ```bash
   vercel link
   vercel env pull
   ```

2. **Run Database Migrations:**
   ```bash
   psql $POSTGRES_URL < scripts/seed.sql
   ```

3. **Enable Real Authentication:**
   - Uncomment the production implementation in `/middleware.ts`
   - Update `/app/(dashboard)/layout.tsx` to use `getServerSession`
   - Update `/lib/auth.ts` to use real database queries

### Option 2: Local PostgreSQL

1. **Create Local Database:**
   ```bash
   createdb enterprise_workspace
   ```

2. **Update `.env.local`:**
   ```env
   POSTGRES_URL="postgresql://localhost:5432/enterprise_workspace"
   ```

3. **Run Migrations:**
   ```bash
   psql enterprise_workspace < scripts/seed.sql
   ```

## 🎨 Styling

The app uses **Tailwind CSS v4** with a custom design system:
- Color tokens in `/styles/globals.css`
- Dark mode support
- Typography system with consistent sizing
- Custom chart colors

## 📦 Key Dependencies

- **Next.js 14** - App Router with Server Components
- **React 18** - Latest React features
- **Tailwind CSS v4** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **NextAuth.js** - Authentication (optional)
- **Vercel Postgres** - Database (optional)
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Zod** - Schema validation

## 🛠️ Development Tools

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📱 Features

✅ **Server Components** - Fast initial page loads
✅ **Client Components** - Interactive UI where needed
✅ **URL-based State** - Search, filters, pagination in URL
✅ **Streaming** - Progressive rendering with Suspense
✅ **Error Handling** - Custom error and 404 pages
✅ **Metadata** - SEO-optimized with Open Graph
✅ **Mock Data** - Works without database
✅ **Role-based Access** - Ready for production auth
✅ **Responsive Design** - Mobile-friendly layouts

## 🔄 Switching to Production

1. Set up Vercel Postgres database
2. Run migrations from `/scripts/seed.sql`
3. Update environment variables in `.env.local`
4. Uncomment production auth in:
   - `/middleware.ts`
   - `/app/(dashboard)/layout.tsx`
   - `/lib/auth.ts`
5. Deploy to Vercel: `vercel deploy`

## 📝 File Structure

```
/app
  ├── (auth)          # Authentication pages
  ├── (dashboard)     # Protected dashboard pages
  ├── api/auth        # NextAuth API routes
  └── layout.tsx      # Root layout with metadata

/components
  ├── dashboard/      # Dashboard-specific components
  ├── beneficiaries/  # Beneficiary management
  ├── fraud/          # Fraud detection
  ├── analytics/      # Predictive analytics
  └── ui/             # Reusable UI components

/lib
  ├── actions/        # Server Actions
  ├── data/           # Data fetching functions
  └── auth.ts         # NextAuth configuration
```

## 🎯 Next Steps

1. **Customize**: Update branding and colors in `/styles/globals.css`
2. **Add Data**: Connect to real database or add more mock data
3. **Extend**: Add new pages or features
4. **Deploy**: Push to GitHub and deploy on Vercel

## 🆘 Support

For issues or questions:
- Check the main `README.md`
- Review component documentation
- Check Next.js docs: https://nextjs.org/docs

---

**Status**: ✅ Ready for development
**Last Updated**: October 12, 2025
