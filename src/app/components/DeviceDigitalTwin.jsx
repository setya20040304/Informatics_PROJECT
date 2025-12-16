import { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

/**
 * Model3D Component
 * Komponen internal untuk load dan render 3D model dengan pewarnaan kondisi
 */
function Model3D({ modelUrl, damagedParts }) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const groupRef = useRef();

  useEffect(() => {
    if (gltf && groupRef.current) {
      // Traverse semua mesh di model
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const meshName = child.name.toLowerCase();
          
          // Cek apakah mesh termasuk damaged parts
          const isDamaged = damagedParts.some((part) =>
            meshName.includes(part.toLowerCase())
          );

          if (isDamaged) {
            // Ubah material menjadi merah untuk part yang rusak
            child.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0xff0000),
              metalness: 0.3,
              roughness: 0.7,
            });
          } else {
            // Pertahankan material asli atau gunakan warna default
            if (!child.material.color) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0x888888),
                metalness: 0.5,
                roughness: 0.5,
              });
            }
          }
        }
      });
    }
  }, [gltf, damagedParts]);

  return <primitive ref={groupRef} object={gltf.scene} scale={1.5} />;
}

/**
 * DeviceDigitalTwin Component
 * Komponen utama untuk visualisasi 3D device dengan highlight kondisi error
 * 
 * @param {string} modelUrl - Path ke file .gltf model 3D
 * @param {Array<string>} damagedParts - Array nama part yang rusak (akan diwarnai merah)
 * 
 * @example
 * <DeviceDigitalTwin 
 *   modelUrl="/models/smartphone.gltf"
 *   damagedParts={['battery', 'screen']}
 * />
 */
const DeviceDigitalTwin = ({ modelUrl, damagedParts = [] }) => {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-2xl">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* 3D Model */}
        <Model3D modelUrl={modelUrl} damagedParts={damagedParts} />
        
        {/* Grid Helper untuk reference */}
        <gridHelper args={[10, 10]} position={[0, -2, 0]} />
        
        {/* Camera Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Damaged Parts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Normal Parts</span>
        </div>
        {damagedParts.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-600">
            <p className="text-xs text-red-400">
              Issues: {damagedParts.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDigitalTwin;
