'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Custom hook to detect theme without requiring next-themes Provider
function useProjectTheme() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
        };

        checkTheme();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkTheme();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return { theme };
}

export function DottedSurface({ className, ...props }) {
    const { theme } = useProjectTheme();

    const containerRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const SEPARATION = 150;
        const AMOUNTX = 40;
        const AMOUNTY = 60;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(theme === 'dark' ? 0x000000 : 0xffffff, 2000, 10000);

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );
        camera.position.set(0, 355, 1220);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.setClearColor(scene.fog.color, 0);

        containerRef.current.appendChild(renderer.domElement);

        // Create geometry
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                const y = 0;
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                positions.push(x, y, z);

                if (theme === 'dark') {
                    colors.push(0.8, 0.8, 0.8); // Normalized RGB for Three.js
                } else {
                    colors.push(0, 0, 0);
                }
            }
        }

        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3),
        );
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Create material
        const material = new THREE.PointsMaterial({
            size: 10, // Increased size
            vertexColors: true,
            transparent: true,
            opacity: 0.8, // Increased opacity
            sizeAttenuation: true,
        });

        // Create points object
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let count = 0;
        let animationId;

        // Animation function
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const positionAttribute = geometry.attributes.position;
            const positions = positionAttribute.array;

            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const index = i * 3;

                    // Animate Y position with sine waves
                    positions[index + 1] =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50;

                    i++;
                }
            }

            positionAttribute.needsUpdate = true;
            renderer.render(scene, camera);
            count += 0.05;
        };

        // Handle window resize
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set correct size

        // Start animation
        animate();

        // Store references
        sceneRef.current = {
            scene,
            camera,
            renderer,
            animationId,
        };

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);

            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId);

                sceneRef.current.scene.traverse((object) => {
                    if (object instanceof THREE.Points) {
                        object.geometry.dispose();
                        object.material.dispose();
                    }
                });

                sceneRef.current.renderer.dispose();

                if (containerRef.current && sceneRef.current.renderer.domElement) {
                    containerRef.current.removeChild(
                        sceneRef.current.renderer.domElement,
                    );
                }
            }
        };
    }, [theme]);

    return (
        <div
            ref={containerRef}
            className={cn('pointer-events-none absolute inset-0 z-0', className)}
            {...props}
        />
    );
}
