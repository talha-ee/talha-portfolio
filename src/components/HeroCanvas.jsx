import { useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three";

function HeroCanvas() {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth,
      H = el.clientHeight;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    cam.position.z = 28;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const pts = [];
    const sGeo = new THREE.SphereGeometry(0.1, 6, 6);
    for (let i = 0; i < 90; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x7c3aed : 0x00d4ff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.25,
      });
      const m = new THREE.Mesh(sGeo, mat);
      m.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 28,
      );
      m.userData.v = new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.01,
      );
      scene.add(m);
      pts.push(m);
    }

    const lMat = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.1,
    });
    const lGrp = new THREE.Group();
    scene.add(lGrp);
    let frame = 0;
    const rebuildLines = () => {
      while (lGrp.children.length) lGrp.remove(lGrp.children[0]);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          if (pts[i].position.distanceTo(pts[j].position) < 12) {
            const g = new THREE.BufferGeometry().setFromPoints([
              pts[i].position.clone(),
              pts[j].position.clone(),
            ]);
            lGrp.add(new THREE.Line(g, lMat));
          }
        }
      }
    };

    const gridGeo = new THREE.PlaneGeometry(65, 65, 20, 20);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x003366,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 3.2;
    grid.position.y = -20;
    scene.add(grid);

    let mx = 0,
      my = 0;
    const onMM = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMM);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      frame++;
      pts.forEach((p) => {
        p.position.add(p.userData.v);
        if (Math.abs(p.position.x) > 35) p.userData.v.x *= -1;
        if (Math.abs(p.position.y) > 25) p.userData.v.y *= -1;
        if (Math.abs(p.position.z) > 14) p.userData.v.z *= -1;
      });
      if (frame % 5 === 0) rebuildLines();
      cam.position.x += (mx * 4 - cam.position.x) * 0.025;
      cam.position.y += (-my * 3 - cam.position.y) * 0.025;
      cam.lookAt(0, 0, 0);
      grid.rotation.z += 0.0006;
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
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />;
}

export default HeroCanvas;
