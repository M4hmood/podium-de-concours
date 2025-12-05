# Podium de Concours

A full-stack competition podium application with real-time leaderboards.

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or hosted)

### Setup Steps

1. **Install dependencies**
```cmd
npm install
```

2. **Set up environment variables**

Copy the example file and configure your environment:
```cmd
copy .env.example .env
```

Edit `.env` and add your database URL:
```env
DATABASE_URL=postgresql://username:password@host:5432/database_name
NODE_ENV=development
SESSION_SECRET=your-random-secret-key
```

**Database Options:**
- Local PostgreSQL
- [Neon](https://neon.tech) (free tier available)
- [Supabase](https://supabase.com) (free tier available)
- [Railway](https://railway.app) (free trial available)

3. **Initialize the database**
```cmd
npm run db:push
```

4. **Start the development server**
```cmd
npm run dev
```

The application will be available at `http://localhost:5000`

## 📦 Deploying to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
```cmd
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables in the Vercel dashboard:
     - `DATABASE_URL`: Your production PostgreSQL URL
     - `SESSION_SECRET`: A strong random string
     - `NODE_ENV`: production (usually auto-set)

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically run the build and push database schema

### Option 2: Vercel CLI

1. **Install Vercel CLI**
```cmd
npm install -g vercel
```

2. **Login**
```cmd
vercel login
```

3. **Set environment variables**
```cmd
vercel env add DATABASE_URL
vercel env add SESSION_SECRET
```

4. **Deploy**
```cmd
vercel
```

For production deployment:
```cmd
vercel --prod
```

### Important Notes

- **Database**: Ensure your production database is accessible from Vercel's servers
- **Environment Variables**: Never commit `.env` file to git
- **Build Process**: The `vercel-build` script will automatically build and migrate the database
- **First Deploy**: May take a few minutes as it installs dependencies and builds the project

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run db:push` - Push database schema changes
- `npm run check` - Type check with TypeScript

## 📝 Environment Variables

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secret key for session encryption
- `NODE_ENV` - Environment mode (development/production)

Optional:
- `PORT` - Server port (default: 5000)

## 🔧 Tech Stack

- **Frontend**: React, TailwindCSS, Shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite, TypeScript
- **Deployment**: Vercel

## 📄 License

MIT
