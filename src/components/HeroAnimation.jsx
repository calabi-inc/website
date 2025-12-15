import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleStream = () => {
    const pointsRef = useRef();

    // Configuration
    const PARTICLE_COUNT = 7000;
    const WORLD_WIDTH = 40;
    const X_START = -20;
    const SPEED = 2.0;          // Slower speed (was 2.5)

    // Generate Initial Data
    const { initialPositions, randomValues } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const randoms = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() * WORLD_WIDTH) + X_START;

            // Order Structure: A cylinder
            const radius = 2.5;
            const angle = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random()) * radius;

            const y = r * Math.sin(angle);
            const z = r * Math.cos(angle);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Randoms for Chaos
            randoms[i * 3] = (Math.random() - 0.5) * 2.0;
            randoms[i * 3 + 1] = (Math.random() - 0.5) * 2.0;
            randoms[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
        }
        return { initialPositions: positions, randomValues: randoms };
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uWorldWidth: { value: WORLD_WIDTH },
        uStartX: { value: X_START },
        uSpeed: { value: SPEED }
    }), []);

    const vertexShader = `
        uniform float uTime;
        uniform float uWorldWidth;
        uniform float uStartX;
        uniform float uSpeed;
        
        attribute vec3 aRandom; 
        
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            // 1. Flow x
            float currentX = mod(position.x + uTime * uSpeed - uStartX, uWorldWidth) + uStartX;
            
            // 2. Transition Zones
            // We want a very tight "Laser Beam" in the center.
            // Center is at X=0
            
            float distToCenter = abs(currentX);
            
            // Transition parameter t: 0 (Chaos) -> 1 (Order)
            // Shift transition slightly to right so center is handled explicitly
            float t = smoothstep(-5.0, 5.0, currentX); 

            // --- CHAOS (Left) ---
            vec3 chaosPos = vec3(currentX, position.y, position.z);
            // Scatter widely
            chaosPos.y += aRandom.y * 8.0; 
            chaosPos.z += aRandom.z * 8.0;
            // Noise
            chaosPos.y += sin(uTime * 2.0 + currentX) * 1.5;

            // --- ORDER (Right) ---
            // Structured Geometric Grid (Hexagonal Data Tunnel)
            
            // Polar coordinates
            float r = length(vec2(position.y, position.z));
            float a = atan(position.z, position.y);
            
            // 1. Quantize Angle -> 6 segments (Hexagon structure)
            float segments = 6.0; 
            float qa = floor(a / (6.2831 / segments) + 0.5) * (6.2831 / segments);
            
            // 2. Quantize Radius -> 3 shells
            float layers = 3.0;
            float qr = (floor(r / 2.5 * layers) + 0.5) * (2.5 / layers);
            
            // Base structured coordinates
            float sy = qr * cos(qa);
            float sz = qr * sin(qa);
            
            // 3. Apply Data Stream Flow (Wavy Motion)
            // Create a corkscrew path flow to simulate active data transmission
            float waveFreq = 0.5;
            float waveSpeed = 2.0;
            float waveAmp = 0.4;
            
            sy += sin(currentX * waveFreq - uTime * waveSpeed) * waveAmp;
            sz += cos(currentX * waveFreq - uTime * waveSpeed) * waveAmp;
            
            // 4. Spiral Twist along X (Dynamic Cable)
            float twist = currentX * 0.15 + uTime * 0.3;
            
            float twistY = sy * cos(twist) - sz * sin(twist);
            float twistZ = sy * sin(twist) + sz * cos(twist);
            
            vec3 orderPos = vec3(currentX, twistY, twistZ);

            // --- LASER BEAM (Center) ---
            // Tighter compression. 
            // We want particles to snap to y=0, z=0 rapidly near center.
            
            float beamWidth = 2.5; // Width of the zone where beam effect happens
            float beamIntensity = 1.0 - smoothstep(0.0, beamWidth, distToCenter);
            
            // "Pinch" factor: 
            // If we are in the beam, we want positions close to 0.
            // But we interpolate from Chaos -> Beam -> Order.
            
            // Let's mix explicitly:
            // Final = mix(Chaos, Order, t);
            vec3 mixedPos = mix(chaosPos, orderPos, t);
            
            // Apply Beam Compression
            // If we are near center, squash Y and Z to 0
            // Ultra-tight squash
            float squash = 1.0 - (pow(beamIntensity, 0.5) * 0.95); // Squashes down to 5% size at peak
            
            mixedPos.y *= squash;
            mixedPos.z *= squash;
            
            // Add "Laser Speed" streak effect?
            // Stretch X slightly in center to look fast? (Optional, skipping to avoid gaps)

            vec3 finalPos = mixedPos;
            
            // --- COLORS ---
            // Chaos: Raw Orange/Gold (No purple)
            vec3 colorChaos = vec3(1.0, 0.6, 0.1); 
            
            // Order: Emerald Green / Cyan
            vec3 colorOrder = vec3(0.0, 1.0, 0.6); 
            
            // Beam Center: Mild White
            vec3 colorBeam = vec3(1.0, 1.0, 1.0); 
            
            // Base mix
            vec3 baseColor = mix(colorChaos, colorOrder, t);
            
            // Apply Beam override
            float core = pow(beamIntensity, 3.0); 
            vColor = mix(baseColor, colorBeam, core);

            // --- ALPHA / SIZE ---
            vAlpha = 1.0; // Restore full brightness for edges
            
            // Dim the center specifically to allow reading text
            // 0 at center, 1 at distance 6
            float centerClear = smoothstep(0.0, 6.0, distToCenter);
            // Don't go to 0, just dim it to 30%
            float alphaMod = 0.3 + (centerClear * 0.7);
            
            vAlpha *= alphaMod;

            float edgeFade = 1.0 - smoothstep(16.0, 20.0, distToCenter);
            vAlpha *= edgeFade;

            vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
            
            // Size
            // Chaos/Order sizes restored
            float size = 80.0;
            if (beamIntensity > 0.0) {
                 // Center glow is reduced
                 size += beamIntensity * 60.0; 
            } else {
                 // Chaos/Order normal size
                 size = mix(100.0, 60.0, t); 
            }
            
            gl_PointSize = size / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            if(dist > 0.5) discard;
            
            // Laser glow falloff
            float strength = 1.0 - (dist * 2.0);
            strength = pow(strength, 2.0); // Sharper
            
            gl_FragColor = vec4(vColor, vAlpha * strength);
        }
    `;

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={initialPositions.length / 3}
                    array={initialPositions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    count={randomValues.length / 3}
                    array={randomValues}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const HeroAnimation = () => {
    return (
        <div className="w-full h-full bg-black relative">
            <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
                <color attach="background" args={['#000000']} />
                <ParticleStream />
            </Canvas>
        </div>
    );
};
