import { useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three";

function ChipCanvas() {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth,
      H = el.clientHeight;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(44, W / H, 0.1, 100);
    cam.position.set(0, 1.5, 9);
    cam.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x112244, 2));
    const pl1 = new THREE.PointLight(0x00d4ff, 6, 22);
    pl1.position.set(5, 5, 5);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x7c3aed, 4, 22);
    pl2.position.set(-4, -3, 3);
    scene.add(pl2);
    const pl3 = new THREE.PointLight(0x10b981, 2.5, 18);
    pl3.position.set(0, -5, 4);
    scene.add(pl3);

    const grp = new THREE.Group();
    scene.add(grp);

    // PCB base
    grp.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 3.2, 0.34),
        new THREE.MeshStandardMaterial({
          color: 0x0f1a2e,
          metalness: 0.88,
          roughness: 0.14,
        }),
      ),
    );
    // Die
    const die = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 2.3, 0.17),
      new THREE.MeshStandardMaterial({
        color: 0x07111f,
        metalness: 0.92,
        roughness: 0.06,
      }),
    );
    die.position.z = 0.22;
    grp.add(die);

    // Traces
    const tMats = [
      new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.9,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.9,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.7,
      }),
    ];
    for (let i = -4; i <= 4; i++) {
      const h = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.022, 0.05),
        tMats[Math.abs(i) % 3],
      );
      h.position.set(0, i * 0.25, 0.32);
      grp.add(h);
      const v = new THREE.Mesh(
        new THREE.BoxGeometry(0.022, 2.1, 0.05),
        tMats[(Math.abs(i) + 1) % 3],
      );
      v.position.set(i * 0.25, 0, 0.32);
      grp.add(v);
    }
    // Sub-cores
    [
      [-0.65, 0.65],
      [0.65, 0.65],
      [-0.65, -0.65],
      [0.65, -0.65],
    ].forEach(([x, y], idx) => {
      const bm = new THREE.MeshStandardMaterial({
        color: 0x1a2f4d,
        metalness: 0.7,
        roughness: 0.3,
        emissive: idx % 2 === 0 ? 0x00d4ff : 0x7c3aed,
        emissiveIntensity: 0.12,
      });
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.78, 0.07), bm);
      b.position.set(x, y, 0.38);
      grp.add(b);
    });
    // Pins
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      metalness: 1,
      roughness: 0.06,
    });
    for (let s = 0; s < 4; s++) {
      for (let i = -4; i <= 4; i++) {
        const pin = new THREE.Mesh(
          new THREE.BoxGeometry(0.065, 0.065, 0.34),
          pinMat,
        );
        const o = 1.78,
          p = i * 0.31;
        if (s === 0) pin.position.set(o, p, 0);
        else if (s === 1) pin.position.set(-o, p, 0);
        else if (s === 2) {
          pin.position.set(p, o, 0);
          pin.rotation.z = Math.PI / 2;
        } else {
          pin.position.set(p, -o, 0);
          pin.rotation.z = Math.PI / 2;
        }
        grp.add(pin);
      }
    }

    // Orbit rings
    const r1 = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.018, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.22,
      }),
    );
    r1.rotation.x = Math.PI / 2;
    scene.add(r1);
    const r2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.18,
      }),
    );
    r2.rotation.x = Math.PI / 3;
    scene.add(r2);
    const orb1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff }),
    );
    scene.add(orb1);
    const orb2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed }),
    );
    scene.add(orb2);

    let tx = 0,
      ty = 0,
      t = 0;
    const onMM = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 1.4;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 1.1;
    };
    el.addEventListener("mousemove", onMM);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.012;
      grp.rotation.y += (tx - grp.rotation.y) * 0.045;
      grp.rotation.x += (ty - grp.rotation.x) * 0.045;
      grp.rotation.y += 0.004;
      r1.rotation.z += 0.006;
      r2.rotation.y += 0.009;
      orb1.position.set(Math.cos(t) * 3, 0, Math.sin(t) * 3);
      orb2.position.set(
        Math.cos(t + Math.PI) * 3.9 * Math.cos(0.7),
        Math.sin(t + Math.PI) * 3.9 * 0.4,
        Math.sin(t + Math.PI) * 3.9 * Math.sin(0.7),
      );
      pl1.intensity = 5 + Math.sin(t) * 1;
      renderer.render(scene, cam);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

export default ChipCanvas;
