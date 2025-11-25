# ⚡ Quick Deploy to Vercel

Ultra-fast deployment guide - get your app live in 10 minutes!

---

## 🚀 Prerequisites (2 minutes)

1. Create accounts (if you don't have them):
   - [GitHub](https://github.com/signup) ✅
   - [Vercel](https://vercel.com/signup) ✅ (sign up with GitHub)

2. Install Git (if not installed):
   - Windows: [Download](https://git-scm.com/download/win)
   - Check: `git --version`

---

## 📦 Step 1: Push to GitHub (3 minutes)

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/vrp-agent.git
git branch -M main
git push -u origin main
```

---

## 🔧 Step 2: Deploy Backend (2 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Configure:
   - **Project Name**: `vrp-agent-backend`
   - **Root Directory**: `backend`
   - Click **Deploy**

4. **Copy the URL** (looks like: `https://vrp-agent-backend-xxx.vercel.app`)

---

## 🎨 Step 3: Deploy Frontend (3 minutes)

1. **Update `.env.production`** with your backend URL:
   ```env
   VITE_API_URL=https://vrp-agent-backend-xxx.vercel.app
   ```

2. **Commit and push:**
   ```bash
   git add .env.production
   git commit -m "Add production API URL"
   git push
   ```

3. Go to [vercel.com/new](https://vercel.com/new) again
4. Import the **same** repo
5. Configure:
   - **Project Name**: `vrp-agent-frontend`
   - **Root Directory**: `./` (leave as root)
   - **Framework**: Vite
   - **Environment Variables**:
     - Name: `VITE_API_URL`
     - Value: `https://vrp-agent-backend-xxx.vercel.app`
   - Click **Deploy**

---

## ✅ Step 4: Test (1 minute)

1. Open your frontend URL: `https://vrp-agent-frontend-xxx.vercel.app`
2. Select algorithm
3. Click "Run Algorithm"
4. See results! 🎉

---

## 🐛 If Something Goes Wrong

### Backend not responding?
```bash
# Visit this URL in browser:
https://your-backend-url.vercel.app/api/health

# Should see: {"status":"ok","message":"VRP Agent Backend is running"}
```

### CORS error?
Update `backend/server.js` line 11:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://*.vercel.app'],
  credentials: true
}));
```

Then push:
```bash
git add backend/server.js
git commit -m "Fix CORS"
git push
```

---

## 🎯 Your Live URLs

After deployment, you'll have:

- **Frontend**: `https://vrp-agent-frontend-xxx.vercel.app` 🌐
- **Backend**: `https://vrp-agent-backend-xxx.vercel.app` ⚙️

**Share the frontend URL with anyone!**

---

## 🔄 Update Your App

Make changes and push:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel automatically redeploys! ✨

---

## 💡 Pro Tips

1. **Custom Domain**: Add in Vercel → Settings → Domains
2. **View Logs**: Vercel Dashboard → Your Project → Functions
3. **Rollback**: Vercel Dashboard → Deployments → Promote to Production

---

## 📊 What You Get (Free!)

✅ Automatic HTTPS  
✅ Global CDN  
✅ Automatic deployments  
✅ Preview deployments for PRs  
✅ 100GB bandwidth/month  
✅ Serverless functions  

---

**That's it! Your app is live! 🚀**

For detailed instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
