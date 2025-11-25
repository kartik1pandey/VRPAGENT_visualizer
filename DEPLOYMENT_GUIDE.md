# 🚀 Deployment Guide - Vercel

Complete guide to deploy your VRPAgent application to Vercel with a working public URL.

---

## 📋 Prerequisites

1. **GitHub Account** - [Sign up](https://github.com)
2. **Vercel Account** - [Sign up](https://vercel.com) (use GitHub to sign in)
3. **Git installed** - [Download](https://git-scm.com/)

---

## 🎯 Deployment Strategy

We'll deploy in two parts:
1. **Backend** → Vercel Serverless Functions
2. **Frontend** → Vercel Static Site

---

## 📦 Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - VRPAgent application"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `vrp-agent-visualizer`
3. **Don't** initialize with README (we already have files)
4. Click "Create repository"

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/vrp-agent-visualizer.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## 🔧 Step 2: Deploy Backend to Vercel

### 2.1 Install Vercel CLI (Optional but recommended)

```bash
npm install -g vercel
```

### 2.2 Deploy Backend via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

```
Project Name: vrp-agent-backend
Framework Preset: Other
Root Directory: backend
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: npm install
```

5. Click **"Deploy"**

### 2.3 Get Your Backend URL

After deployment completes, you'll get a URL like:
```
https://vrp-agent-backend-abc123.vercel.app
```

**Save this URL!** You'll need it for the frontend.

### 2.4 Test Backend

Visit these URLs to verify:
- `https://your-backend-url.vercel.app/api/health`
- Should return: `{"status":"ok","message":"VRP Agent Backend is running"}`

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Update Environment Variable

Edit `.env.production`:

```env
VITE_API_URL=https://your-backend-url.vercel.app
```

Replace with your actual backend URL from Step 2.3.

### 3.2 Commit the Change

```bash
git add .env.production
git commit -m "Update production API URL"
git push
```

### 3.3 Deploy Frontend via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import the **same** GitHub repository
4. Configure the project:

```
Project Name: vrp-agent-frontend
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. **Add Environment Variable:**
   - Click "Environment Variables"
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.vercel.app`
   - Click "Add"

6. Click **"Deploy"**

### 3.4 Get Your Frontend URL

After deployment, you'll get a URL like:
```
https://vrp-agent-frontend-abc123.vercel.app
```

**This is your public URL!** 🎉

---

## ✅ Step 4: Verify Deployment

### 4.1 Test the Application

1. Open your frontend URL
2. Select a VRP type (CVRP, PCVRP, or VRPTW)
3. Choose an algorithm
4. Adjust parameters
5. Click "Run Algorithm"
6. Verify visualization appears

### 4.2 Check Browser Console

Press F12 and check for errors. If you see CORS errors, continue to Step 5.

---

## 🔧 Step 5: Fix CORS (If Needed)

If you get CORS errors, update backend CORS settings:

### 5.1 Update `backend/server.js`

Find the CORS configuration and update:

```javascript
// Update CORS to allow your frontend domain
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://vrp-agent-frontend-abc123.vercel.app', // Your frontend URL
    'https://*.vercel.app' // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

### 5.2 Redeploy Backend

```bash
cd backend
git add server.js
git commit -m "Update CORS for production"
git push
```

Vercel will automatically redeploy.

---

## 🎯 Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain to Frontend

1. Go to your frontend project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `vrp-agent.yourdomain.com`)
4. Follow DNS configuration instructions

### 6.2 Update Backend CORS

Add your custom domain to the CORS whitelist in `backend/server.js`.

---

## 📊 Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Vercel
- [ ] Backend URL obtained
- [ ] Frontend environment variable updated
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL obtained
- [ ] Application tested and working
- [ ] CORS configured (if needed)
- [ ] Custom domain added (optional)

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" error

**Solution:**
1. Check backend is deployed and running
2. Visit backend health endpoint: `https://your-backend-url.vercel.app/api/health`
3. Verify CORS is configured correctly
4. Check browser console for specific error

### Issue: Backend returns 404

**Solution:**
1. Verify `backend/vercel.json` exists
2. Check routes configuration in `vercel.json`
3. Redeploy backend

### Issue: Environment variable not working

**Solution:**
1. Verify variable name starts with `VITE_` for frontend
2. Check it's added in Vercel dashboard
3. Redeploy after adding variables

### Issue: Build fails

**Solution:**
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`

---

## 🔄 Continuous Deployment

Once set up, Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel automatically deploys!
```

---

## 📈 Monitoring

### Vercel Dashboard

Monitor your deployments:
- **Analytics**: View traffic and performance
- **Logs**: Check function logs
- **Deployments**: See deployment history

### Backend Logs

View backend logs in Vercel:
1. Go to backend project
2. Click **"Functions"**
3. Click on a function to see logs

---

## 💰 Pricing

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ✅ Preview deployments

**Perfect for this project!**

---

## 🎓 Alternative: Deploy Backend Elsewhere

If you prefer, deploy backend to:

### Railway.app
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up
```

### Render.com
1. Connect GitHub repository
2. Select `backend` folder
3. Set build command: `npm install`
4. Set start command: `npm start`

### Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create vrp-agent-backend

# Deploy
cd backend
git subtree push --prefix backend heroku main
```

---

## 📝 Environment Variables Reference

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.vercel.app
```

### Backend (Vercel Dashboard)
```
NODE_ENV=production
```

---

## 🚀 Quick Deploy Commands

### Using Vercel CLI

**Deploy Backend:**
```bash
cd backend
vercel --prod
```

**Deploy Frontend:**
```bash
vercel --prod
```

---

## 🎉 Success!

Your VRPAgent application is now live and accessible worldwide!

**Share your URLs:**
- Frontend: `https://your-frontend-url.vercel.app`
- Backend API: `https://your-backend-url.vercel.app/api/health`

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Test backend API directly
4. Verify environment variables

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Node.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)

---

**Happy Deploying! 🚀**
