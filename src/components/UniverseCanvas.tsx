"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function UniverseCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // ── Scene Setup ────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Starfield ──────────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffd4b3, size: 0.08, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Orbit Planets ──────────────────────────────────────────────
    interface PlanetConfig { radius: number; orbitRadius: number; speed: number; color: number; emissive: number; wireframe?: boolean; }
    const planetConfigs: PlanetConfig[] = [
      { radius: 2.2, orbitRadius: 0,  speed: 0,     color: 0xFD7024, emissive: 0xFD7024 },  // center sun
      { radius: 0.7, orbitRadius: 6,  speed: 0.008, color: 0x60A5FA, emissive: 0x1d4ed8 },
      { radius: 1.1, orbitRadius: 10, speed: 0.005, color: 0xFD7024, emissive: 0x7c2d00 },
      { radius: 0.5, orbitRadius: 14, speed: 0.012, color: 0xC084FC, emissive: 0x6b21a8 },
      { radius: 0.9, orbitRadius: 18, speed: 0.003, color: 0x34d399, emissive: 0x064e3b },
    ];

    const planets: { mesh: THREE.Mesh; cfg: PlanetConfig; angle: number }[] = [];
    const orbitLines: THREE.Line[] = [];

    planetConfigs.forEach((cfg) => {
      const geo = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: cfg.orbitRadius === 0 ? 0.8 : 0.3,
        roughness: 0.4,
        metalness: 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      if (cfg.orbitRadius > 0) {
        mesh.position.x = cfg.orbitRadius;
      }
      scene.add(mesh);
      planets.push({ mesh, cfg, angle: Math.random() * Math.PI * 2 });

      // Orbit ring
      if (cfg.orbitRadius > 0) {
        const ringGeo = new THREE.RingGeometry(cfg.orbitRadius - 0.03, cfg.orbitRadius + 0.03, 80);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.04 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);
      }
    });

    // ── Lighting ───────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x1a1a2e, 2));
    const orangeLight = new THREE.PointLight(0xFD7024, 4, 40);
    orangeLight.position.set(0, 0, 0);
    scene.add(orangeLight);
    const blueLight = new THREE.PointLight(0x3B82F6, 2, 50);
    blueLight.position.set(15, 10, 5);
    scene.add(blueLight);

    // ── Connection Lines between planets ──────────────────────────
    const lineMat = new THREE.LineBasicMaterial({ color: 0xFD7024, transparent: true, opacity: 0.05 });
    for (let i = 1; i < planets.length - 1; i++) {
      const points = [planets[i].mesh.position, planets[i + 1].mesh.position];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      orbitLines.push(line);
    }

    // ── Mouse Parallax ─────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation Loop ─────────────────────────────────────────────
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(mount);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = performance.now() * 0.001;

      // Orbit planets
      planets.forEach(({ mesh, cfg, angle }, i) => {
        if (cfg.orbitRadius === 0) {
          mesh.rotation.y += 0.002;
          return;
        }
        planets[i].angle += cfg.speed;
        mesh.position.x = Math.cos(planets[i].angle) * cfg.orbitRadius;
        mesh.position.z = Math.sin(planets[i].angle) * cfg.orbitRadius;
        mesh.rotation.y += 0.005;
      });

      // Parallax
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Pulsate orange light
      orangeLight.intensity = 4 + Math.sin(t * 2) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
