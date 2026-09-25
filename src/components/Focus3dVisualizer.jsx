import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 🪐 Focus3dVisualizer
 * 
 * Multi-engine Interactive Visualizer:
 * - 'crystal_3d': Three.js WebGL sacred polyhedra with 3D stardust & volumetric breathing.
 * - 'flow_field': Algorithmic vector flow field with continuous particle trails.
 * - 'quantum_waves': Harmonic sinusoidal brainwave interference ribbons.
 * - 'constellations': Celestial node constellation network with mouse gravity.
 * - 'none': Disabled (minimal battery saver).
 */
export default function Focus3dVisualizer({ 
  mode = 'crystal_3d',
  accentColor = '#E11D48',
  isBreathing = false,
  breathingPhase = 'inhale', // 'inhale' | 'hold1' | 'exhale' | 'hold2'
  opacity = 0.6
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mode === 'none') return;

    let isDisposed = false;
    let animId = null;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Mouse coordinates for parallax & interactivity
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      mouse.targetX = Math.max(-1, Math.min(1, x));
      mouse.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Tab Visibility to prevent battery drain
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // =========================================================================
    // 🪐 MODE 1: THREE.JS 3D SACRED CRYSTAL SANCTUARY (WebGL)
    // =========================================================================
    if (mode === 'crystal_3d') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Color parsing
      const primaryThreeColor = new THREE.Color(accentColor || '#E11D48');
      const secondaryThreeColor = new THREE.Color('#38BDF8'); // Sky cyan contrast

      // 1. Outer Polyhedron: Wireframe Icosahedron
      const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
      const outerMat = new THREE.MeshBasicMaterial({
        color: primaryThreeColor,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      scene.add(outerMesh);

      // 2. Inner Polyhedron: Dodecahedron
      const innerGeo = new THREE.DodecahedronGeometry(1.4, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: secondaryThreeColor,
        wireframe: true,
        transparent: true,
        opacity: 0.45
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerMesh);

      // 3. Glowing Radiant Center Sphere
      const coreGeo = new THREE.SphereGeometry(0.65, 24, 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: false,
        transparent: true,
        opacity: 0.25
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      scene.add(coreMesh);

      // 4. Stardust Particles Cloud
      const particleCount = 450;
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
        scales[i] = Math.random() * 0.05 + 0.02;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.06,
        transparent: true,
        opacity: 0.4
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Ambient Point Light
      const pointLight = new THREE.PointLight(primaryThreeColor, 2, 20);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      // Animation loop
      let clock = new THREE.Clock();

      const animate3d = () => {
        if (isDisposed) return;
        animId = requestAnimationFrame(animate3d);
        if (!isTabVisible) return;

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Mouse lerp smoothing
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Camera parallax tilt
        camera.position.x = mouse.x * 0.75;
        camera.position.y = mouse.y * 0.5;
        camera.lookAt(scene.position);

        if (!prefersReducedMotion) {
          // Rotations
          outerMesh.rotation.x += delta * 0.15;
          outerMesh.rotation.y += delta * 0.2;
          outerMesh.rotation.z += delta * 0.05;

          innerMesh.rotation.x -= delta * 0.25;
          innerMesh.rotation.y -= delta * 0.18;

          particles.rotation.y += delta * 0.04;
          particles.rotation.x -= delta * 0.02;

          // Harmonic Volumetric Breathing
          let breathFactor = 1.0;
          if (isBreathing) {
            // Box breathing sync or harmonic 16s cycle
            const cycle = (time % 16) / 16;
            if (cycle < 0.25) {
              // Inhale (0 -> 4s): Expands smoothly
              breathFactor = 0.9 + (cycle / 0.25) * 0.3;
            } else if (cycle < 0.5) {
              // Hold full (4s -> 8s): Maximum expansion
              breathFactor = 1.2;
            } else if (cycle < 0.75) {
              // Exhale (8s -> 12s): Contracts smoothly
              const t = (cycle - 0.5) / 0.25;
              breathFactor = 1.2 - t * 0.3;
            } else {
              // Hold empty (12s -> 16s): Calm state
              breathFactor = 0.9;
            }
          } else {
            // Soft ambient sinusoidal breathing
            breathFactor = 1.0 + Math.sin(time * 0.8) * 0.08;
          }

          outerMesh.scale.set(breathFactor, breathFactor, breathFactor);
          innerMesh.scale.set(breathFactor * 0.95, breathFactor * 0.95, breathFactor * 0.95);
          coreMesh.scale.set(breathFactor * 1.05, breathFactor * 1.05, breathFactor * 1.05);
        }

        renderer.render(scene, camera);
      };

      animate3d();

      // Resize listener
      const handleResize = () => {
        if (!container || isDisposed) return;
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup Three.js
      return () => {
        isDisposed = true;
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);

        outerGeo.dispose();
        outerMat.dispose();
        innerGeo.dispose();
        innerMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        renderer.dispose();

        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    // =========================================================================
    // 🌌 2D CANVAS ENGINES (Flow Field, Quantum Waves, Constellations)
    // =========================================================================
    const canvas = document.createElement('canvas');
    canvas.width = width * Math.min(window.devicePixelRatio, 2);
    canvas.height = height * Math.min(window.devicePixelRatio, 2);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const scale = Math.min(window.devicePixelRatio, 2);
    ctx.scale(scale, scale);

    let time = 0;

    // -------------------------------------------------------------------------
    // 🌌 MODE 2: COSMIC VECTOR FLOW FIELD (Algorithmic Art)
    // -------------------------------------------------------------------------
    if (mode === 'flow_field') {
      const numParticles = Math.min(1000, Math.floor((width * height) / 900));
      const particles = [];

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          speed: Math.random() * 1.5 + 0.8,
          hue: Math.random() * 60 + 330, // Rose to Purple
          life: Math.random() * 200
        });
      }

      const animateFlow = () => {
        if (isDisposed) return;
        animId = requestAnimationFrame(animateFlow);
        if (!isTabVisible) return;

        time += 0.006;
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Trail fade for persistence
        ctx.fillStyle = 'rgba(11, 15, 25, 0.08)';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Harmonic vector field calculation
          const angle = (Math.sin(p.x * 0.003 + time) * Math.cos(p.y * 0.003 + time) * Math.PI * 2)
                      + (mouse.x * 0.4);

          p.vx = Math.cos(angle) * p.speed;
          p.vy = Math.sin(angle) * p.speed;

          const prevX = p.x;
          const prevY = p.y;

          p.x += p.vx;
          p.y += p.vy;
          p.life++;

          // Wrap around edges or reset
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.life > 300) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.life = 0;
            continue;
          }

          // Draw luminous trail
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `hsla(${p.hue}, 85%, 65%, 0.45)`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      };

      animateFlow();
    }

    // -------------------------------------------------------------------------
    // 🌊 MODE 3: QUANTUM BRAINWAVE HARMONICS (Algorithmic Art)
    // -------------------------------------------------------------------------
    else if (mode === 'quantum_waves') {
      const wavesCount = 5;

      const animateWaves = () => {
        if (isDisposed) return;
        animId = requestAnimationFrame(animateWaves);
        if (!isTabVisible) return;

        time += 0.015;
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        ctx.clearRect(0, 0, width, height);

        const centerY = height * 0.5;

        for (let w = 0; w < wavesCount; w++) {
          const waveOffset = w * 0.8;
          const freq = 0.003 + w * 0.001;
          const amp = 45 + w * 25 + Math.sin(time * 0.5) * 15;

          ctx.beginPath();
          ctx.moveTo(0, centerY);

          for (let x = 0; x <= width; x += 15) {
            const harmonic = Math.sin(x * freq + time + waveOffset) 
                           * Math.cos(x * 0.0015 - time * 0.4) 
                           * amp;
            const mouseInfluence = Math.exp(-Math.pow((x - (mouse.x + 1) * 0.5 * width) / 180, 2)) * 30;
            const y = centerY + harmonic + mouseInfluence;

            ctx.lineTo(x, y);
          }

          ctx.strokeStyle = w % 2 === 0 
            ? `rgba(225, 29, 72, ${0.15 + w * 0.07})` 
            : `rgba(56, 189, 248, ${0.12 + w * 0.06})`;
          ctx.lineWidth = 2.0;
          ctx.stroke();
        }
      };

      animateWaves();
    }

    // -------------------------------------------------------------------------
    // ✨ MODE 4: CELESTIAL CONSTELLATION NETWORK
    // -------------------------------------------------------------------------
    else if (mode === 'constellations') {
      const nodeCount = Math.min(100, Math.floor((width * height) / 10000));
      const nodes = [];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1
        });
      }

      const animateConstellations = () => {
        if (isDisposed) return;
        animId = requestAnimationFrame(animateConstellations);
        if (!isTabVisible) return;

        time += 0.01;
        ctx.clearRect(0, 0, width, height);

        const mouseAbsX = (mouse.targetX + 1) * 0.5 * width;
        const mouseAbsY = (-mouse.targetY + 1) * 0.5 * height;

        // Update & Draw Nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Mouse gravity pull
          const dxMouse = mouseAbsX - n.x;
          const dyMouse = mouseAbsY - n.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 180) {
            n.x += (dxMouse / distMouse) * 0.4;
            n.y += (dyMouse / distMouse) * 0.4;
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fill();

          // Connect adjacent nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.28;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(225, 29, 72, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      };

      animateConstellations();
    }

    // Resize Handler for 2D Canvas
    const handleCanvasResize = () => {
      if (!container || isDisposed) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);
    };

    window.addEventListener('resize', handleCanvasResize);

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleCanvasResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [mode, accentColor, isBreathing, breathingPhase]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-700"
      style={{ opacity, zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
