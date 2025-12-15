
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Simulated RTSM Objects placed within the "Floor Plan"
// Now with 'shape' property for diverse visualization
const MOCK_OBJECTS = [
    // --- Room A (Main Warehouse Floor) ---
    { id: '8f2a1b9c', label: 'Valve Assembly', score: 0.98, position: [-1.2, -0.8, -1.0], rotation: [0, 0.5, 0], status: 'confirmed', dims: [0.3, 0.4, 0.3], shape: 'box' },
    { id: '3e4d5f6g', label: 'Hydraulic Press', score: 0.95, position: [-2.2, -0.6, 1.2], rotation: [0, -0.2, 0], status: 'confirmed', dims: [0.6, 0.8, 0.6], shape: 'box' },
    { id: '7k8l9m0n', label: 'Safety Barrel', score: 0.92, position: [-0.3, -0.7, 0.8], rotation: [0, 0, 0], status: 'confirmed', dims: [0.4, 0.6, 0.4], shape: 'cylinder' },
    { id: '2p3q4r5s', label: 'Safety Barrel', score: 0.89, position: [-0.8, -0.7, 0.9], rotation: [0, 0, 0], status: 'confirmed', dims: [0.4, 0.6, 0.4], shape: 'cylinder' },
    { id: '5t6u7v8w', label: 'Inspection Drone', score: 0.65, position: [-1.0, 0.5, -0.5], rotation: [0.2, 0.5, 0], status: 'pending', dims: [0.3, 0.1, 0.3], shape: 'sphere' },
    // --- Room B (Corridor / Storage) ---
    // Split geometry: 1. The Pipe (long, thin), 2. The Plate (flat, wide)
    { id: '1a2b3c4d', label: 'Coolant Pipe', score: 0.72, position: [2.5, -0.9, 0.4], rotation: [0, 0, Math.PI / 2], status: 'confirmed', dims: [0.15, 2.0, 0.15], shape: 'cylinder' },
    { id: '6k7l8m9n', label: 'Access Cover', score: 0.68, position: [2.5, -0.95, 0.4], rotation: [0, 0, 0], status: 'confirmed', dims: [0.8, 0.05, 0.8], shape: 'cylinder' },
    { id: '9h8i7j6k', label: 'Debris', score: 0.45, position: [1.8, -0.95, -0.5], rotation: [0, 0.8, 0], status: 'pending', dims: [0.2, 0.15, 0.2], shape: 'box' },
    { id: '4x5y6z1a', label: 'Storage Crate', score: 0.88, position: [3.2, -0.7, -0.5], rotation: [0, 0, 0], status: 'confirmed', dims: [0.6, 0.6, 0.6], shape: 'box' },
    { id: '2b3c4d5e', label: 'Storage Crate', score: 0.81, position: [3.2, -0.2, -0.5], rotation: [0, 0.1, 0], status: 'confirmed', dims: [0.4, 0.4, 0.4], shape: 'box' },
    { id: '9f0g1h2i', label: 'Ventilation Unit', score: 0.76, position: [2.5, 0.8, 0.0], rotation: [0, 0, 0], status: 'pending', dims: [0.5, 0.3, 0.5], shape: 'box' }, // Ceiling
];

/**
 * Procedural L-Shaped Room Geometry
 * Room A: 4x4 centered roughly at [-1, 0]
 * Room B: 3x2 connected at [2, 0]
 */
function RoomStructure() {
    return (
        <group position={[0, -1, 0]}>
            {/* Floor Plan Mesh - Room A (Main) */}
            <mesh position={[-1, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[4, 4]} />
                <meshBasicMaterial color="#333" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            {/* Grid for Room A */}
            <gridHelper position={[-1, 0.06, 0]} args={[4, 8, 0x444444, 0x222222]} />

            {/* Floor Plan Mesh - Room B (Corridor) */}
            <mesh position={[2.5, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[3, 2]} />
                <meshBasicMaterial color="#333" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <gridHelper position={[2.5, 0.06, 0]} args={[3, 6, 0x444444, 0x222222]} />

            {/* Walls Wireframe (Visual suggestions of walls) */}
            {/* Back Wall A */}
            <mesh position={[-1, 1, -2]}>
                <planeGeometry args={[4, 2]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
            {/* Front Wall A */}
            <mesh position={[-1, 1, 2]}>
                <planeGeometry args={[4, 2]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
            {/* Left Wall A */}
            <mesh position={[-3, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[4, 2]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>

            {/* Connecting Corridor Walls */}
            {/* Back Wall B */}
            <mesh position={[2.5, 1, -1]}>
                <planeGeometry args={[3, 2]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
            {/* Front Wall B */}
            <mesh position={[2.5, 1, 1]}>
                <planeGeometry args={[3, 2]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
            {/* End Wall B */}
            <mesh position={[4, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>

            {/* Architectural Outline Lines */}
            <lineSegments position={[0, 0.02, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(4, 0, 4)]} />
                <lineBasicMaterial color="#555" />
            </lineSegments>
        </group>
    );
}

function PointCloud({ count = 8000 }) {
    const points = useRef();

    // Generate points on the surfaces of our L-shaped room
    const particles = useMemo(() => {
        const positions = [];
        const colors = [];
        const color = new THREE.Color();

        const addPoint = (x, y, z, r, g, b) => {
            positions.push(x, y, z);
            colors.push(r, g, b);
        };

        for (let i = 0; i < count; i++) {
            // Pick a room (A or B) based on area weight
            // Room A: 4x4 = 16, Room B: 3x2 = 6. Total 22.
            const inRoomA = Math.random() < (16 / 22);

            let x, y, z;
            // Floor (-1.0) vs Walls (-1 to 1) probability
            // Let's say 60% floor, 40% walls
            const isFloor = Math.random() < 0.6;

            if (inRoomA) {
                // Room A: x[-3, 1], z[-2, 2]
                if (isFloor) {
                    x = -3 + Math.random() * 4;
                    z = -2 + Math.random() * 4;
                    y = -1.0;
                } else {
                    // Walls of A
                    // Pick a wall: L, R, F, B? 
                    // Left (-3), Right (1), Back (-2), Front (2)
                    // Note: Right wall has hole for Room B
                    const wall = Math.floor(Math.random() * 4);
                    y = -1 + Math.random() * 2;
                    if (wall === 0) { x = -3; z = -2 + Math.random() * 4; } // Left
                    else if (wall === 1) { x = 1; z = -2 + Math.random() * 4; } // Right (some overlap with B)
                    else if (wall === 2) { z = -2; x = -3 + Math.random() * 4; } // Back
                    else { z = 2; x = -3 + Math.random() * 4; } // Front
                }
            } else {
                // Room B: x[1, 4], z[-1, 1]
                if (isFloor) {
                    x = 1 + Math.random() * 3;
                    z = -1 + Math.random() * 2;
                    y = -1.0;
                } else {
                    // Walls of B
                    const wall = Math.floor(Math.random() * 3); // Top, Bottom, Right (Left is open to A)
                    y = -1 + Math.random() * 2;
                    if (wall === 0) { z = -1; x = 1 + Math.random() * 3; } // Back
                    else if (wall === 1) { z = 1; x = 1 + Math.random() * 3; } // Front
                    else { x = 4; z = -1 + Math.random() * 2; } // Right End
                }
            }

            // Jitter
            x += (Math.random() - 0.5) * 0.05;
            y += (Math.random() - 0.5) * 0.02;
            z += (Math.random() - 0.5) * 0.05;

            // Color: "Lidar" style (height encoding + intensity)
            // Y is -1 to 1. 
            const nY = (y + 1) / 2; // 0 to 1
            // Floor is bluish, Walls turn slightly purple/cyan up high
            if (y < -0.9) {
                // Floor
                color.setHSL(0.6, 0.4, 0.3 + Math.random() * 0.2);
            } else {
                // Wall
                color.setHSL(0.55 + nY * 0.1, 0.6, 0.4 + Math.random() * 0.2);
            }

            addPoint(x, y, z, color.r, color.g, color.b);
        }

        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors)
        };
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            // Subtle breathing effect for the points
            points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particles.positions.length / 3} array={particles.positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={particles.colors.length / 3} array={particles.colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.015} vertexColors transparent opacity={0.7} sizeAttenuation />
        </points>
    );
}

function ObjectMarker({ data, isSelected, onClick }) {
    const isConfirmed = data.status === 'confirmed';
    const color = isConfirmed ? '#10b981' : '#fbbf24'; // Emerald vs Amber

    // Helper to render the specific shape geometry
    const Geometry = () => {
        switch (data.shape) {
            case 'cylinder':
                // Cylinder args: [radiusTop, radiusBottom, height, segments]
                // We map dims[0] to diameter (so radius is dims[0]/2) and dims[1] to length/height
                return <cylinderGeometry args={[data.dims[0] / 2, data.dims[0] / 2, data.dims[1], 16]} />;
            case 'sphere':
                return <sphereGeometry args={[data.dims[0] / 2, 16, 16]} />;
            case 'box':
            default:
                return <boxGeometry args={[data.dims[0], data.dims[1], data.dims[2]]} />;
        }
    };

    return (
        <group position={data.position} rotation={data.rotation || [0, 0, 0]}>
            {/* 1. Interactive Hit Target & Solid Inner Core */}
            <mesh onClick={(e) => { e.stopPropagation(); onClick(); }}>
                <Geometry />
                <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.4 : 0.1} depthWrite={false} />
            </mesh>

            {/* 2. Shape Outline 
               - For Box: EdgesGeometry looks best (clean lines)
               - For Sphere/Cyl: Wireframe looks better (mesh structure)
            */}
            {data.shape === 'box' ? (
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(data.dims[0], data.dims[1], data.dims[2])]} />
                    <lineBasicMaterial color={color} transparent opacity={0.3} />
                </lineSegments>
            ) : (
                <mesh>
                    <Geometry />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
                </mesh>
            )}

            {/* 3. Solid Core Indicator */}
            <mesh scale={[0.5, 0.5, 0.5]}>
                <Geometry />
                <meshBasicMaterial color={color} transparent opacity={0.7} />
            </mesh>

            {/* 4. SELECTION HIGHLIGHT: A distinct bright white box around the object */}
            {isSelected && (
                <group>
                    {/* Bounding Box corners/frame effect */}
                    <lineSegments>
                        <edgesGeometry args={[new THREE.BoxGeometry(data.dims[0] * 1.2, data.dims[1] * 1.2, data.dims[2] * 1.2)]} />
                        <lineBasicMaterial color="white" transparent opacity={0.6} />
                    </lineSegments>
                    {/* Pulsing fill */}
                    <mesh>
                        <boxGeometry args={[data.dims[0] * 1.2, data.dims[1] * 1.2, data.dims[2] * 1.2]} />
                        <meshBasicMaterial color="white" transparent opacity={0.05} depthWrite={false} side={THREE.DoubleSide} />
                    </mesh>
                </group>
            )}

            {/* Connecting line to floor (if flying, relative to its own rotated local space? No, usually simpler to do world space line. 
                But since we are inside a rotated group, drawing a line to -Y might be wrong if rotated. 
                Simple hack: Only draw drop-line if NOT significantly rotated in X/Z or if it's a known flying type.
                For now, let's keep it simple: drop line only if shape is sphere (drone) or box (floating), ignoring rotation for line logic.
            */}
            {data.position[1] > -0.9 && (
                <line>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            // This line is drawn in LOCAL space. If the object is rotated 90deg, (0,-1,0) is sideways.
                            // To draw a vertical world line, we'd need to inverse transform. 
                            // For simplicity, we'll skip the drop-line for rotated objects like pipes, keeping it for the drone.
                            array={new Float32Array([0, 0, 0, 0, -1.0, 0])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={color} transparent opacity={0.0} />
                    {/* Disabling drop line momentarily to avoid rotation artifacts, visual is clear enough */}
                </line>
            )}
        </group>
    );
}

function Scene({ selectedId, onSelect }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 4, 6]} fov={50} />
            <OrbitControls enablePan={true} minDistance={2} maxDistance={10} autoRotate autoRotateSpeed={0.5} target={[0.5, -0.5, 0]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 10, 5]} intensity={1} color="#4f46e5" />

            <RoomStructure />
            <PointCloud />

            {MOCK_OBJECTS.map((obj) => (
                <ObjectMarker
                    key={obj.id}
                    data={obj}
                    isSelected={selectedId === obj.id}
                    onClick={() => onSelect(obj.id === selectedId ? null : obj.id)}
                />
            ))}
        </>
    );
}

export const InteractiveVisual = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredObjects = useMemo(() => {
        if (!searchTerm) return MOCK_OBJECTS;
        const lowerTerm = searchTerm.toLowerCase();
        return MOCK_OBJECTS.filter(obj =>
            obj.label.toLowerCase().includes(lowerTerm) ||
            obj.id.toLowerCase().includes(lowerTerm) ||
            obj.status.toLowerCase().includes(lowerTerm)
        );
    }, [searchTerm]);

    // Auto-select effect when search term changes
    useMemo(() => {
        if (searchTerm && filteredObjects.length > 0) {
            setSelectedId(filteredObjects[0].id);
        } else if (!searchTerm) {
            setSelectedId(null);
        }
    }, [searchTerm, filteredObjects]);

    return (
        <div className="w-full min-h-[600px] relative bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 group">
            <div className="absolute inset-0">
                <Canvas dpr={[1, 2]}>
                    <Scene selectedId={selectedId} onSelect={setSelectedId} />
                </Canvas>
            </div>

            {/* HUD Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none z-10">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-mono text-green-400">RTSM LIVE STREAM</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">
                        Points: 8,000<br />
                        Objects: {MOCK_OBJECTS.length}<br />
                        Latency: 12ms
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-50">
                <div className="relative group/search">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-zinc-500 group-focus-within/search:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search objects..."
                        value={searchTerm}
                        className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-black/60 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-black/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 sm:text-sm backdrop-blur-md transition-all shadow-lg shadow-black/50"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Object List Panel */}
            <div className="absolute top-16 right-4 w-64 pointer-events-auto flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar z-10">
                {filteredObjects.map((obj) => (
                    <button
                        key={obj.id}
                        onClick={() => setSelectedId(selectedId === obj.id ? null : obj.id)}
                        className={`text-left p-3 rounded-lg border backdrop-blur-md transition-all duration-200 ${selectedId === obj.id ? 'bg-indigo-500/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'bg-zinc-900/80 border-white/10 hover:border-white/30 hover:bg-zinc-800'}`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-mono text-zinc-400">#{obj.id.slice(0, 4)}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold ${obj.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{obj.status}</span>
                        </div>
                        <div className="text-sm font-medium text-white">{obj.label}</div>
                        {selectedId === obj.id && (
                            <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-zinc-400 space-y-1">
                                <div className="flex justify-between"><span>Confidence</span><span className="text-white">{(obj.score * 100).toFixed(1)}%</span></div>
                                <div className="flex justify-between"><span>X,Y,Z</span><span className="font-mono">[{obj.position.map((n) => n.toFixed(1)).join(',')}]</span></div>
                            </div>
                        )}
                    </button>
                ))}

                {filteredObjects.length === 0 && (
                    <div className="p-4 text-center text-zinc-500 text-xs italic bg-zinc-900/50 rounded-lg border border-white/5">
                        No objects found matching "{searchTerm}"
                    </div>
                )}
            </div>

            {/* Bottom Controls Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5 pointer-events-none">
                LMB: ROTATE • RMB: PAN • SCROLL: ZOOM
            </div>
        </div>
    );
};
