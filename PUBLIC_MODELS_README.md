# 3D Models Directory

## 📁 Struktur Folder

```
/public/
└── models/
    ├── smartphone.gltf       # Model smartphone generic
    ├── laptop.gltf           # Model laptop generic
    ├── tablet.gltf           # Model tablet
    ├── smartwatch.gltf       # Model smartwatch
    └── README.md             # File ini
```

## 🎨 Cara Menambahkan 3D Models

### 1. Download Free Models

**Recommended Sources:**
- [Sketchfab](https://sketchfab.com/search?features=downloadable&type=models) - Gratis dengan credit
- [Google Poly](https://poly.pizza/) - Free 3D assets
- [Free3D](https://free3d.com/)
- [TurboSquid Free](https://www.turbosquid.com/Search/3D-Models/free)

### 2. Format Requirements

**Supported Formats:**
- ✅ `.gltf` (preferred - JSON-based)
- ✅ `.glb` (binary version, smaller file size)

**Convert Other Formats:**
- Use Blender (free) to convert `.obj`, `.fbx`, `.stl` to `.gltf`
- Online converter: [https://products.aspose.app/3d/conversion](https://products.aspose.app/3d/conversion)

### 3. Model Naming Convention

**IMPORTANT:** Part names dalam model harus jelas untuk pewarnaan otomatis

**Example:**
```
smartphone.gltf
├─ Mesh: "body"         ← Badan device
├─ Mesh: "screen"       ← Layar (bisa damaged)
├─ Mesh: "battery"      ← Baterai (bisa damaged)
├─ Mesh: "camera"       ← Kamera
└─ Mesh: "buttons"      ← Tombol
```

**Naming Tips:**
- Gunakan lowercase
- Hindari spasi (gunakan underscore: `back_cover`)
- Nama harus descriptive: `battery`, bukan `part_03`

### 4. Optimization

**Before Upload:**
```bash
# Reduce poly count dengan Blender
# Target: < 50,000 polygons untuk mobile compatibility

# Compress textures
# Target: Textures < 1MB each

# Remove unused materials
```

**Recommended Settings:**
- Poly count: 10k - 50k triangles
- Texture resolution: 1024x1024 atau 2048x2048
- File size: < 5MB per model

### 5. Testing Model

**Test di DeviceDigitalTwin:**

```jsx
// 1. Save model ke /public/models/test-device.gltf

// 2. Test di component
<DeviceDigitalTwin 
  modelUrl="/models/test-device.gltf"
  damagedParts={[]} // Empty dulu untuk cek load
/>

// 3. Test pewarnaan
<DeviceDigitalTwin 
  modelUrl="/models/test-device.gltf"
  damagedParts={['screen', 'battery']} // Parts yang rusak
/>
```

**Check Console:**
```javascript
// Model harus load tanpa error
// Jika ada error "Unable to load", cek:
// 1. Path file benar?
// 2. Format .gltf/.glb valid?
// 3. File corrupt?
```

## 🎯 Current Usage Examples

### Smartphone
```jsx
<DeviceDigitalTwin 
  modelUrl="/models/smartphone.gltf"
  damagedParts={['battery', 'screen']}
/>
```

**Common Parts:**
- `screen` - Layar LCD/OLED
- `battery` - Baterai
- `back_cover` - Tutup belakang
- `camera` - Modul kamera
- `charging_port` - Port charging

### Laptop
```jsx
<DeviceDigitalTwin 
  modelUrl="/models/laptop.gltf"
  damagedParts={['keyboard', 'screen']}
/>
```

**Common Parts:**
- `screen` - Display laptop
- `keyboard` - Keyboard
- `trackpad` - Touchpad
- `battery` - Baterai
- `hinge` - Engsel

## 🔧 Troubleshooting

### Model Tidak Muncul
```
❌ Error: Unable to load model

✅ Solutions:
1. Check path: `/models/` bukan `/public/models/`
2. Verify file exists di /public/models/
3. Check console untuk error details
4. Try different browser (cache issue)
```

### Part Tidak Berubah Warna
```
❌ Part tetap abu-abu meskipun ada di damagedParts

✅ Solutions:
1. Cek nama mesh di Blender/3D viewer
2. Match exact name: 'Battery' ≠ 'battery'
3. Component auto-convert to lowercase, pastikan konsisten
4. Inspect model structure dengan Three.js Inspector
```

### Model Terlalu Besar/Kecil
```jsx
// Adjust scale di component
<primitive object={gltf.scene} scale={2.0} />  // Bigger
<primitive object={gltf.scene} scale={0.5} />  // Smaller
```

### Model Tidak Ada Texture
```
✅ Solutions:
1. Ensure textures exported with .gltf
2. Check relative paths in .gltf file
3. Use .glb (embedded textures) instead
```

## 📦 Create Custom Model dengan Blender

### Step-by-Step

1. **Install Blender** (Free)
   - Download: [https://www.blender.org/download/](https://www.blender.org/download/)

2. **Model Device**
   ```
   - File > New > General
   - Model device atau import existing
   - Name each part clearly
   ```

3. **Export to GLTF**
   ```
   File > Export > glTF 2.0 (.gltf/.glb)
   
   Settings:
   ✅ Include: Selected Objects
   ✅ Apply Modifiers
   ✅ Export Materials
   ✅ Compression: None (atau Draco for smaller size)
   ```

4. **Test in Servis-Hub**
   ```jsx
   <DeviceDigitalTwin 
     modelUrl="/models/custom-device.gltf"
     damagedParts={['part_name_in_blender']}
   />
   ```

## 🎨 Example Models Repository

**Sample Models untuk Testing:**

```bash
# Download sample smartphone model
wget https://example.com/models/phone-generic.gltf -O public/models/smartphone.gltf

# Or use placeholder:
# Create simple cube with proper naming for testing
```

## 📚 Resources

- **Blender Tutorial:** [https://www.youtube.com/blender](https://www.youtube.com/blender)
- **GLTF Validator:** [https://github.khronos.org/glTF-Validator/](https://github.khronos.org/glTF-Validator/)
- **Three.js GLTF Loader:** [https://threejs.org/docs/#examples/en/loaders/GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

## ⚠️ Important Notes

1. **Copyright:** Pastikan model punya license untuk commercial use
2. **Attribution:** Berikan credit ke creator jika required
3. **Optimization:** Compress models untuk web performance
4. **Naming:** Consistent naming convention untuk automation
5. **Testing:** Test di berbagai device (mobile/desktop)

---

**Need Help?**
Check `/ARCHITECTURE_DOCS.md` untuk technical details tentang 3D rendering pipeline.
