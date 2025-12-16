# Servis-Hub - Frontend Architecture Documentation

## 🏗️ Arsitektur Sistem

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     SERVIS-HUB FRONTEND                      │
│                  (React 18 + Vite + Tailwind)                │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
    ┌─────▼─────┐      ┌──────▼──────┐    ┌──────▼──────┐
    │  PUBLIC   │      │  PROTECTED  │    │   CONTEXT   │
    │  ROUTES   │      │   ROUTES    │    │   LAYER     │
    └───────────┘      └─────────────┘    └─────────────┘
          │                   │                   │
    ┌─────▼─────┐      ┌──────▼──────┐    ┌──────▼──────┐
    │  Landing  │      │  Customer   │    │    Auth     │
    │   Login   │      │ Technician  │    │  Context    │
    │  Register │      │   Admin     │    └─────────────┘
    └───────────┘      └─────────────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
              ┌─────▼───┐ ┌───▼────┐ ┌─▼──────┐
              │ RBAC    │ │ 3D     │ │ UI     │
              │ Guards  │ │ Engine │ │ Layer  │
              └─────────┘ └────────┘ └────────┘
```

---

## 📂 Folder Structure Details

### `/src/app/context/`

**AuthContext.jsx** - State Management untuk Authentication
- Manages user session
- Role-based permissions
- localStorage persistence
- Login/Logout functions

```jsx
// Usage:
import { useAuth } from '../context/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();
```

---

### `/src/app/components/`

#### **ProtectedRoute.jsx** - Route Guard Component

**Purpose:** Implementasi RBAC (Role-Based Access Control)

**Logic Flow:**
```
User Request → Check isAuthenticated → Check allowedRoles → Grant/Deny Access
     │                    │                      │
     │                    │                      ├─> Match: Render Component
     │                    │                      └─> No Match: Access Denied
     │                    └─> Not Auth: Redirect to /login
     └─> Continue
```

**Props:**
- `allowedRoles: string[]` - Array of roles yang diizinkan
- `children: ReactNode` - Component yang akan diprotect

**Example:**
```jsx
<ProtectedRoute allowedRoles={['customer', 'admin']}>
  <CustomerDashboard />
</ProtectedRoute>
```

---

#### **DeviceDigitalTwin.jsx** - 3D Visualization Component

**Architecture:**

```
DeviceDigitalTwin (Parent)
    │
    ├─> Canvas (React Three Fiber)
    │     │
    │     ├─> Camera Setup
    │     ├─> Lighting (Ambient + Directional + Point)
    │     ├─> Model3D Component
    │     │     │
    │     │     ├─> GLTFLoader
    │     │     ├─> Mesh Traversal
    │     │     └─> Dynamic Material Assignment
    │     │
    │     ├─> OrbitControls
    │     └─> GridHelper
    │
    └─> Legend UI (Damaged Parts Info)
```

**Pewarnaan Logic:**

```javascript
// 1. Load 3D Model
gltf = useLoader(GLTFLoader, modelUrl);

// 2. Traverse All Meshes
gltf.scene.traverse((child) => {
  if (child.isMesh) {
    const meshName = child.name.toLowerCase();
    
    // 3. Check if damaged
    const isDamaged = damagedParts.some(part => 
      meshName.includes(part.toLowerCase())
    );
    
    // 4. Apply Color
    if (isDamaged) {
      child.material = RED_MATERIAL;  // #ff0000
    } else {
      child.material = DEFAULT_MATERIAL;  // #888888
    }
  }
});
```

**Props Interface:**
```typescript
interface DeviceDigitalTwinProps {
  modelUrl: string;         // Path to .gltf/.glb file
  damagedParts?: string[];  // Array of damaged part names
}
```

**Features:**
- ✅ Auto-rotate camera
- ✅ Interactive controls (orbit, zoom, pan)
- ✅ Dynamic material swapping
- ✅ Professional lighting setup
- ✅ Visual legend for part status

---

## 🛣️ Routing Architecture

### Route Configuration

```jsx
<Routes>
  {/* PUBLIC */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  
  {/* CUSTOMER - Role: 'customer' */}
  <Route path="/customer/dashboard" element={
    <ProtectedRoute allowedRoles={['customer']}>
      <CustomerDashboard />
    </ProtectedRoute>
  } />
  
  {/* TECHNICIAN - Role: 'technician' */}
  <Route path="/tech/tasks" element={
    <ProtectedRoute allowedRoles={['technician']}>
      <TechnicianTasks />
    </ProtectedRoute>
  } />
  
  {/* ADMIN - Role: 'admin' */}
  <Route path="/admin/overview" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminOverview />
    </ProtectedRoute>
  } />
</Routes>
```

### Route Guards Matrix

| Route | Allowed Roles | Fallback |
|-------|--------------|----------|
| `/` | Public | - |
| `/login` | Public | - |
| `/customer/*` | `customer` | `/login` or Access Denied |
| `/tech/*` | `technician` | `/login` or Access Denied |
| `/admin/*` | `admin` | `/login` or Access Denied |

---

## 🎭 Role Permissions

### Customer
**Can Access:**
- View own service history
- Create new service booking
- View 3D device visualization
- Track service progress

**Cannot Access:**
- Other users' data
- Technician tools
- Admin dashboard

### Technician
**Can Access:**
- View assigned tasks
- Update task status
- Use AI Assistant for repair guidance
- View service details

**Cannot Access:**
- Customer booking creation
- Admin features
- Other technician's tasks (future: can be configured)

### Admin
**Can Access:**
- Full system overview
- User management (CRUD)
- Inventory management
- System analytics
- All reports

**Cannot Access:**
- Direct customer/technician role actions (should switch roles if needed)

---

## 🔐 Authentication Flow

```
┌─────────────┐
│ User Login  │
└──────┬──────┘
       │
       ▼
┌────────────────────┐
│ Validate Credentials│ (Mock: Always Success)
└─────────┬──────────┘
          │
          ▼
    ┌─────────────┐
    │ Create User │
    │   Object    │
    └──────┬──────┘
           │
           ▼
    ┌──────────────┐
    │ Save to      │
    │ localStorage │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Set Context  │
    │   State      │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Redirect to  │
    │ Role Dashboard│
    └──────────────┘
```

**Production Implementation:**

Replace mock authentication dengan real JWT:

```javascript
const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password
    });
    
    const { token, user } = response.data;
    
    // Save token
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setUser(user);
    return user;
  } catch (error) {
    throw new Error('Login failed');
  }
};
```

---

## 📊 State Management

### Current: Context API

```
AuthContext (Global)
    │
    ├─> user: User | null
    ├─> isAuthenticated: boolean
    ├─> login(email, password, role)
    ├─> logout()
    └─> checkAuth()
```

**Why Context API?**
- ✅ Simple untuk auth state
- ✅ No additional dependencies
- ✅ Built-in React
- ✅ Sufficient for small-medium apps

**Future: Consider Redux Toolkit if:**
- Complex shared state across many components
- Need time-travel debugging
- Multiple async actions
- Large team collaboration

---

## 🎨 UI/UX Architecture

### Design System

**Color Palette:**
```css
/* Primary */
--blue-600: #2563eb;    /* Customer theme */
--green-600: #16a34a;   /* Technician theme */
--purple-600: #9333ea;  /* Admin theme */

/* Status */
--red-500: #ef4444;     /* Error/Damaged */
--yellow-500: #eab308;  /* Warning/In Progress */
--green-500: #22c55e;   /* Success/Completed */

/* Neutrals */
--gray-50: #f9fafb;
--gray-900: #111827;
```

**Typography:**
- Default: System font stack (optimized for performance)
- Headings: text-xl to text-3xl
- Body: text-sm to text-base

**Spacing:**
- Base unit: 4px (0.25rem)
- Common: p-4, p-6, p-8, gap-4, gap-6

---

## 🚀 Performance Optimizations

### Current Implementations

1. **React Router Code Splitting**
```jsx
// Lazy load pages
const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard'));
```

2. **Three.js Optimization**
- Used `useLoader` for model caching
- OrbitControls dampening for smooth interactions
- Grid helper for spatial reference

3. **Tailwind Purging**
- Auto purge unused CSS in production

### Future Optimizations

```javascript
// 1. Memoization
const MemoizedDeviceTwin = memo(DeviceDigitalTwin);

// 2. Virtual Scrolling (for long lists)
import { FixedSizeList } from 'react-window';

// 3. Image Optimization
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// 4. API Request Caching
import { useQuery } from '@tanstack/react-query';
```

---

## 🔌 API Integration Pattern

### Current: Mock Data
```javascript
const [services, setServices] = useState(MOCK_DATA);
```

### Production Pattern

```javascript
// 1. Create API client
// /src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

// 2. Create service modules
// /src/services/serviceService.js
export const fetchServices = () => apiClient.get('/services');
export const createService = (data) => apiClient.post('/services', data);

// 3. Use in components
useEffect(() => {
  fetchServices()
    .then(res => setServices(res.data))
    .catch(err => console.error(err));
}, []);
```

---

## 🧪 Testing Strategy (Future)

### Unit Tests
```javascript
// Example: ProtectedRoute.test.jsx
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../components/ProtectedRoute';

test('redirects to login when not authenticated', () => {
  // ... test implementation
});
```

### Integration Tests
- Test routing flow
- Test RBAC enforcement
- Test 3D rendering

### E2E Tests (Playwright/Cypress)
- Full user journeys
- Login flow for all roles
- 3D interaction tests

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Mobile-First Approach
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Stack on mobile, 2 cols on tablet, 3 on desktop */}
</div>
```

---

## 🔮 Future Enhancements

### Phase 2
- [ ] WebSocket untuk real-time updates
- [ ] Push notifications
- [ ] Offline mode (PWA)
- [ ] Dark mode support

### Phase 3
- [ ] Multi-language (i18n)
- [ ] Advanced analytics dashboard
- [ ] Export reports (PDF/Excel)
- [ ] File upload dengan preview

### Phase 4
- [ ] AR visualization (WebXR)
- [ ] Voice commands
- [ ] Advanced AI diagnostics
- [ ] Blockchain untuk warranty tracking

---

## 🎯 Best Practices Implemented

✅ **Code Organization:** Clean folder structure
✅ **Component Reusability:** Modular design
✅ **Type Safety:** PropTypes (future: TypeScript)
✅ **Security:** RBAC implementation
✅ **Performance:** Lazy loading, memoization
✅ **UX:** Loading states, error handling
✅ **Accessibility:** Semantic HTML, ARIA labels
✅ **Documentation:** Comprehensive docs

---

## 📚 Resources

- [React Router Docs](https://reactrouter.com)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Manual](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Architecture:** Frontend-only (Backend integration ready)
