# Servis-Hub - Platform Manajemen Servis Elektronik

## 📋 Overview

**Servis-Hub** adalah platform manajemen servis elektronik modern dengan tracking real-time dan visualisasi 3D menggunakan Three.js (React Three Fiber). Platform ini mendukung 3 role pengguna: Customer, Technician, dan Admin.

## 🛠 Tech Stack Frontend

- **React 18.3** (Vite)
- **Tailwind CSS 4.1**
- **React Router DOM 7.10**
- **Three.js / React Three Fiber** (3D Visualization)
- **Axios** (HTTP Client)
- **Lucide React** (Icons)

## 📁 Struktur Folder

```
/src/app/
├── components/
│   ├── DeviceDigitalTwin.jsx    # Komponen 3D visualisasi
│   └── ProtectedRoute.jsx       # RBAC guard component
├── context/
│   └── AuthContext.jsx          # Authentication & role management
├── pages/
│   ├── LandingPage.jsx          # Public landing page
│   ├── LoginPage.jsx            # Login dengan quick test
│   ├── customer/
│   │   ├── CustomerDashboard.jsx   # Dashboard pelanggan + 3D
│   │   └── NewBooking.jsx          # Form booking servis baru
│   ├── technician/
│   │   ├── TechnicianTasks.jsx     # Daftar task teknisi
│   │   └── AIAssistant.jsx         # Chatbot Gemini AI
│   └── admin/
│       ├── AdminOverview.jsx       # Dashboard admin
│       ├── UserManagement.jsx      # Manajemen user
│       └── InventoryManagement.jsx # Manajemen inventory
├── assets/
│   └── models/                  # Folder untuk 3D models (.gltf)
└── App.jsx                      # Main routing & auth wrapper
```

## 🚀 Setup Awal

### 1. Install Dependencies

```bash
# Jika menggunakan npm
npm install three @react-three/fiber @react-three/drei axios react-router-dom

# Jika menggunakan yarn
yarn add three @react-three/fiber @react-three/drei axios react-router-dom

# Jika menggunakan pnpm
pnpm add three @react-three/fiber @react-three/drei axios react-router-dom
```

### 2. Start Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

## 🔐 Role-Based Access Control (RBAC)

### Routing Structure

#### **Public Routes**
- `/` atau `/landing` - Landing page
- `/login` - Login page
- `/register` - Register page (currently redirects to login)

#### **Customer Routes** (Role: `customer`)
- `/customer/dashboard` - View service status dengan 3D visualization
- `/customer/new-booking` - Create new service booking

#### **Technician Routes** (Role: `technician`)
- `/tech/tasks` - List of assigned tasks
- `/tech/ai-assistant` - AI chatbot (Gemini integration)

#### **Admin Routes** (Role: `admin`)
- `/admin/overview` - Admin dashboard dengan analytics
- `/admin/users` - User management
- `/admin/inventory` - Spare parts inventory management

### Protected Route Implementation

Komponen `ProtectedRoute` melindungi routes berdasarkan role:

```jsx
<Route
  path="/customer/dashboard"
  element={
    <ProtectedRoute allowedRoles={['customer']}>
      <CustomerDashboard />
    </ProtectedRoute>
  }
/>
```

**Logika:**
1. Jika belum login → redirect ke `/login`
2. Jika role tidak sesuai → tampilkan "Access Denied"
3. Jika authorized → render children component

## 🎨 Komponen DeviceDigitalTwin

### Usage

```jsx
import DeviceDigitalTwin from './components/DeviceDigitalTwin';

<DeviceDigitalTwin 
  modelUrl="/models/smartphone.gltf"
  damagedParts={['battery', 'screen']}
/>
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `modelUrl` | string | Yes | Path ke file 3D model (.gltf/.glb) |
| `damagedParts` | string[] | No | Array nama part yang rusak (akan merah) |

### Logika Pewarnaan

1. **Model Loading:** Menggunakan `GLTFLoader` dari Three.js
2. **Traversal:** Scan semua mesh dalam model
3. **Matching:** Cek apakah nama mesh ada dalam `damagedParts`
4. **Coloring:**
   - ✅ Match → Warna **MERAH** (#ff0000)
   - ❌ No Match → Warna **ASLI** atau default grey

### Features

- ✨ Auto-rotate camera
- 🖱️ Interactive controls (zoom, pan, rotate)
- 📊 Legend untuk status parts
- 🎯 Dynamic highlighting damaged parts
- 💡 Professional lighting setup

## 🔑 Quick Test Login

Di LoginPage, tersedia tombol quick login untuk testing:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| **Customer** | customer@test.com | customer123 | `/customer/dashboard` |
| **Technician** | tech@test.com | tech123 | `/tech/tasks` |
| **Admin** | admin@test.com | admin123 | `/admin/overview` |

## 📝 Mock Data & API Integration

### Current Implementation
Semua data menggunakan **mock/stub data** di local state.

### Production Integration
Untuk production, replace dengan Axios calls:

```jsx
// Example: Fetch services
useEffect(() => {
  axios.get('/api/services')
    .then(res => setServices(res.data))
    .catch(err => console.error(err));
}, []);
```

### Recommended API Endpoints

```
GET    /api/services          # List all services
POST   /api/services          # Create new service
GET    /api/services/:id      # Get service detail
PUT    /api/services/:id      # Update service
DELETE /api/services/:id      # Delete service

GET    /api/users             # User management
POST   /api/users             # Create user
PUT    /api/users/:id         # Update user

GET    /api/inventory         # Inventory list
POST   /api/inventory         # Add inventory item
PUT    /api/inventory/:id     # Update inventory
```

## 🎯 Fitur Utama

### 1. Customer Dashboard
- ✅ List semua service yang dimiliki
- ✅ View detail dengan progress bar
- ✅ **3D Digital Twin** untuk visualisasi device
- ✅ Real-time status tracking
- ✅ Highlighted damaged parts (merah)

### 2. Technician Panel
- ✅ Task list dengan priority levels
- ✅ Status management (Pending, In Progress, Completed)
- ✅ **AI Assistant** powered by Gemini
- ✅ Quick access to repair procedures

### 3. Admin Dashboard
- ✅ Overview analytics
- ✅ User management dengan CRUD operations
- ✅ Inventory tracking
- ✅ System status monitoring

## 🤖 AI Assistant Integration

Current: Mock responses based on keywords

**Production Gemini Integration:**

```jsx
import axios from 'axios';

const sendToGemini = async (message) => {
  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    {
      contents: [{
        parts: [{ text: message }]
      }]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`
      }
    }
  );
  
  return response.data.candidates[0].content.parts[0].text;
};
```

## 🎨 3D Models

### Recommended Format
- **GLB** (binary GLTF) - Preferred
- **GLTF** (JSON + binaries)

### Model Requirements
1. **Naming Convention:** Part names harus jelas (e.g., "battery", "screen", "camera")
2. **Optimization:** Keep poly count reasonable (<50k triangles)
3. **Materials:** PBR materials supported
4. **Size:** Compress models (<5MB recommended)

### Where to Get Models
- [Sketchfab](https://sketchfab.com) (Free 3D models)
- [CGTrader](https://www.cgtrader.com)
- [TurboSquid](https://www.turbosquid.com)
- Create custom with Blender

### Example Model Structure
```
smartphone.gltf
├─ mesh: "body"
├─ mesh: "screen"
├─ mesh: "battery"
├─ mesh: "camera"
└─ mesh: "buttons"
```

## 🚧 Next Steps untuk Production

1. **Backend Integration**
   - [ ] Connect to real API
   - [ ] Implement JWT authentication
   - [ ] Add WebSocket for real-time updates

2. **3D Models**
   - [ ] Add more device models
   - [ ] Implement model caching
   - [ ] Add model loading states

3. **AI Integration**
   - [ ] Integrate real Gemini API
   - [ ] Add conversation history
   - [ ] Implement context awareness

4. **Enhancements**
   - [ ] Add notifications system
   - [ ] Implement file upload for photos
   - [ ] Add export reports (PDF)
   - [ ] Multi-language support

## 📄 License

This is a demonstration project for frontend architecture.

## 👤 Author

Senior Frontend Architect & UI/UX Designer

---

**Note:** Proyek ini adalah template arsitektur frontend. Semua data adalah mock data untuk demo purposes. Untuk production, integrasikan dengan backend API yang sesuai.
