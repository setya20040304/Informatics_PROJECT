# 🚀 QUICK START - Servis-Hub

## ⚡ Fastest Way to Run

```bash
# 1. Libraries sudah terinstall ✅
# 2. Start server
npm run dev

# 3. Open browser
http://localhost:5173
```

---

## 🎯 Quick Test (30 detik)

### 1. Buka Login Page
Click **"Quick Test Login"** buttons:

| Button | Role | Redirect To |
|--------|------|-------------|
| 🔵 **Customer** | customer | `/customer/dashboard` - **3D View** |
| 🟢 **Technician** | technician | `/tech/tasks` - Task List |
| 🟣 **Admin** | admin | `/admin/overview` - Dashboard |

### 2. Test Features

#### Customer Flow:
```
1. Click "Customer" button
2. ✅ See service list
3. ✅ View 3D device (merah = rusak)
4. ✅ Click "New Booking"
```

#### Technician Flow:
```
1. Click "Technician" button
2. ✅ View tasks
3. ✅ Click "AI Assistant"
4. ✅ Ask: "How to replace battery?"
```

#### Admin Flow:
```
1. Click "Admin" button
2. ✅ View stats
3. ✅ Click "Users" → See user list
4. ✅ Click "Inventory" → See parts
```

---

## 📁 File Locations

| Need | File Path |
|------|-----------|
| **Terminal Commands** | `/TERMINAL_COMMANDS.txt` |
| **Full Setup Guide** | `/SETUP_GUIDE.md` |
| **Architecture Docs** | `/ARCHITECTURE_DOCS.md` |
| **3D Models Guide** | `/PUBLIC_MODELS_README.md` |
| **Project Summary** | `/PROJECT_SUMMARY.md` |
| **This Quick Start** | `/QUICK_START.md` |

---

## 🎨 Test 3D Visualization

### Customer Dashboard:
1. Login as Customer
2. Lihat device card pertama (iPhone 14 Pro)
3. 3D model akan show dengan:
   - 🔴 **Red parts** = Damaged (battery, screen)
   - ⚪ **Grey parts** = Normal
4. Interact: Drag, zoom, rotate

**Note:** Model placeholder aktif. Untuk real models, add `.gltf` files ke `/public/models/`

---

## 🔐 Role Testing Matrix

| Feature | Customer | Technician | Admin |
|---------|----------|------------|-------|
| View Services | ✅ Own | ✅ Assigned | ✅ All |
| Create Booking | ✅ | ❌ | ❌ |
| 3D View | ✅ | ✅ | ❌ |
| AI Assistant | ❌ | ✅ | ❌ |
| User Management | ❌ | ❌ | ✅ |
| Inventory | ❌ | ❌ | ✅ |

**RBAC Test:**
```
Try accessing wrong role URL:
- Login as Customer
- Manual go to: /tech/tasks
- Result: ❌ "Access Denied" page
```

---

## 🛠️ Common Tasks

### Add New User (Mock):
```jsx
// Login page → Select role → Login
// Auto-creates mock user and stores in localStorage
```

### Change Role:
```
1. Logout (top right)
2. Login with different role
3. Will redirect to role-specific dashboard
```

### Clear Session:
```javascript
// Browser console:
localStorage.clear();
// or click Logout button
```

---

## 📱 Device Testing

### Desktop (Recommended):
- ✅ Full 3D controls
- ✅ All features visible
- ✅ Best experience

### Tablet:
- ✅ Responsive layout
- ✅ Touch controls for 3D
- ✅ Grid adapts

### Mobile:
- ✅ Mobile-first design
- ✅ Stack columns
- ⚠️ 3D may be heavy (optimize models)

---

## 🐛 Quick Troubleshooting

### Port Already in Use
```bash
# Vite will auto-assign new port
# or kill process:
npx kill-port 5173
```

### 3D Not Loading
```
✅ Check console for errors
✅ Model path correct? `/models/file.gltf`
✅ Browser supports WebGL?
```

### Login Not Working
```
✅ Use Quick Test buttons (always works)
✅ Check localStorage not full
✅ Clear cache
```

### Page Not Found
```
✅ Check URL spelling
✅ Ensure logged in with correct role
✅ Check ProtectedRoute allowedRoles
```

---

## 🎯 What to Explore

### 1. Customer (5 min)
- [ ] View service cards
- [ ] Check 3D model interaction
- [ ] Create new booking
- [ ] See progress bars

### 2. Technician (5 min)
- [ ] Browse task list
- [ ] Check priority badges
- [ ] Use AI Assistant
- [ ] Ask repair questions

### 3. Admin (5 min)
- [ ] View dashboard stats
- [ ] Browse users table
- [ ] Check inventory
- [ ] See system health

**Total:** ~15 min untuk full exploration

---

## 🚀 Deploy to Production

### Build:
```bash
npm run build
# Output: /dist folder
```

### Deploy Options:
```bash
# Vercel (Recommended)
vercel deploy

# Netlify
netlify deploy --prod

# GitHub Pages
npm run build
# Deploy /dist folder
```

---

## 📚 Learn More

### Want to understand code?
→ Read `/ARCHITECTURE_DOCS.md`

### Want to add 3D models?
→ Read `/PUBLIC_MODELS_README.md`

### Want full setup details?
→ Read `/SETUP_GUIDE.md`

### Want project overview?
→ Read `/PROJECT_SUMMARY.md`

---

## ⚡ TL;DR

```bash
# 1. Run
npm run dev

# 2. Open
http://localhost:5173

# 3. Click
"Quick Test Login" → Customer/Technician/Admin

# 4. Explore
All features working with mock data ✅
```

---

**Time to Full Demo:** < 1 minute  
**Complete Feature Test:** ~15 minutes  
**Status:** ✅ Ready to use NOW!  

---

Need help? Check other documentation files or test in browser! 🎉
