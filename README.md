# Interactive Copyright Tools — Deployment Guide

This project is a fully front-end, high-performance interactive SPA (Single Page Application) built with **React**, **Vite**, and **Tailwind CSS**. It is fully optimized for static web hosting platforms like **Cloudflare Pages**, **GitHub Pages**, or **Netlify**.

---

## 💻 How to Export the Code from Google Studio

You can export this code as a clean, ready-to-use package directly from the Studio user interface:

1. Look at the **right-hand settings panel** (or the main application menu/header) in the Google Studio interface.
2. Click on the **Export** or **Settings / Three-Dots** menu.
3. Select either:
   - **Export to GitHub**: This will authorize with your GitHub account and automatically create a new, private or public repository containing this entire codebase.
   - **Download as ZIP**: This will package the files and download a `.zip` archive to your local computer, which you can extract or upload directly.

---

## ⚡ Deploying to Cloudflare Pages

Cloudflare Pages provides blazing-fast, free hosting for static sites with build integrations for GitHub. Here is how to configure it:

### Option A: Via GitHub Integration (Recommended for Continuous Deployment)

This is the easiest path, as Cloudflare Pages will automatically rebuild and deploy your site every time you push changes to GitHub.

1. **Push your code to GitHub**:
   - If you used the **Export to GitHub** feature in Google Studio, your code is already in a repository!
   - If you downloaded a **ZIP**, extract it, initialize a git repository, and push it to your GitHub account:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/your-username/your-repo-name.git
     git branch -M main
     git push -u origin main
     ```
2. **Log into Cloudflare**:
   - Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
3. **Create a Pages Project**:
   - Click on **Create** -> **Pages** -> **Connect to Git**.
   - Select your GitHub account and find the repository.
4. **Configure Build Settings**:
   * **Framework Preset**: Choose `Vite` (or leave as `None / Custom`).
   * **Build Command**: `npm run build`
   * **Build Output Directory**: `dist`
5. **Environment Variable Security (Optional)**:
   - Since this is optimized as a static site, all computations run locally in the client browser. No backend secrets are required!
6. **Click Save and Deploy**:
   - Cloudflare will build your application and provide you with a default `*.pages.dev` subdomain.

---

## 🔗 Setup a Custom Subdomain on Cloudflare

To deploy this on a custom subdomain (e.g., `tools.libraryfutures.net` or similar):

1. Once your pages project is created, navigate to the **Custom Domains** tab inside your Pages project in the Cloudflare Dashboard.
2. Click **Set up a custom domain**.
3. Enter your custom domain or subdomain (e.g., `tools.yourdomain.org` or `custom.libraryfutures.net`).
4. **DNS Settings**:
   - If your domain's nameservers are managed by Cloudflare, it will automatically offer to configure the CNAME record for you.
   - If managed elsewhere, Cloudflare will display a CNAME record that you need to add to your external DNS registrar (pointing your subdomain to your `*.pages.dev` domain).
5. Click **Activate**. Cloudflare will automatically provision an SSL/TLS certificate, and your static interactive tools will be live!
