import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Architecture diagram. The moving diagonal is illustrative, not cycle-accurate.
export default function ArrayScene() {
  const host = useRef(null)
  const wrap = useRef(null)
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const pauseRef = useRef(paused)
  useEffect(() => { pauseRef.current = paused }, [paused])
  useEffect(() => {
    const target = host.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }) } catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setClearColor(0x12191c, 0)
    target.appendChild(renderer.domElement)
    wrap.current.classList.add('has-webgl')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100)
    camera.position.set(0, 11, 15)
    camera.lookAt(0, 0, 0)
    const array = new THREE.Group()
    array.rotation.y = -.57
    scene.add(array)
    const ambient = new THREE.AmbientLight(0xeaf4e5, 2.1)
    const key = new THREE.DirectionalLight(0xffdcbd, 3)
    key.position.set(4, 9, 5)
    scene.add(ambient, key)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .62, metalness: .22 })
    const geometry = new THREE.BoxGeometry(.28, .17, .28)
    const cells = new THREE.InstancedMesh(geometry, material, 256)
    const dummy = new THREE.Object3D()
    const normal = new THREE.Color(0x667e6d)
    const highlight = new THREE.Color(0xc78d5f)
    for (let r=0;r<16;r++) for (let c=0;c<16;c++) {
      dummy.position.set((c-7.5)*.39, .2, (r-7.5)*.39);dummy.updateMatrix()
      cells.setMatrixAt(r*16+c,dummy.matrix);cells.setColorAt(r*16+c, r+c===14 || r+c===15 ? highlight : normal)
    }
    array.add(cells)
    const baseGeo = new THREE.BoxGeometry(6.7,.13,6.7)
    const baseMat = new THREE.MeshStandardMaterial({ color:0x2f423e,roughness:.9,metalness:.15 })
    array.add(new THREE.Mesh(baseGeo,baseMat))
    const edgesGeo = new THREE.EdgesGeometry(baseGeo)
    const edgesMat = new THREE.LineBasicMaterial({color:0x9eb299,transparent:true,opacity:.5})
    array.add(new THREE.LineSegments(edgesGeo,edgesMat))
    const points=[]
    for(let i=0;i<16;i++) {
      const v=(i-7.5)*.39
      points.push(new THREE.Vector3(-3.75,.02,v),new THREE.Vector3(-3.38,.02,v),new THREE.Vector3(v,.02,-3.75),new THREE.Vector3(v,.02,-3.38),new THREE.Vector3(3.38,.02,v),new THREE.Vector3(3.75,.02,v),new THREE.Vector3(v,.02,3.38),new THREE.Vector3(v,.02,3.75))
    }
    const tracesGeo = new THREE.BufferGeometry().setFromPoints(points)
    const tracesMat = new THREE.LineBasicMaterial({color:0x9bab9b,transparent:true,opacity:.65})
    array.add(new THREE.LineSegments(tracesGeo,tracesMat))
    let pointerX=0,pointerY=0,visible=true,raf=0,lastTime=0,phase=14,lastStep=-1
    function renderOnce() { renderer.render(scene,camera) }
    function resize() {
      const w=target.clientWidth,h=target.clientHeight
      if(!w||!h) return
      renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=camera.aspect<1.25 ? 17 : 15;camera.updateProjectionMatrix();renderOnce()
    }
    const ro=new ResizeObserver(resize);ro.observe(target)
    const io=new IntersectionObserver(([entry]) => { visible=entry.isIntersecting }, {threshold:0});io.observe(target)
    function pointer(e) { const b=target.getBoundingClientRect();pointerX=(e.clientX-b.left)/b.width-.5;pointerY=(e.clientY-b.top)/b.height-.5 }
    function leave() { pointerX=0;pointerY=0 }
    target.addEventListener('pointermove',pointer);target.addEventListener('pointerleave',leave)
    function tick(time) {
      raf=requestAnimationFrame(tick)
      if(time-lastTime<40) return
      const dt=Math.min(time-lastTime,100);lastTime=time
      if(!visible||document.hidden||pauseRef.current) return
      phase=(phase+dt*.0028)%36
      const step=Math.floor(phase)
      if(step!==lastStep) {
        for(let r=0;r<16;r++) for(let c=0;c<16;c++) cells.setColorAt(r*16+c,(r+c===step||r+c===step-1) ? highlight : normal)
        cells.instanceColor.needsUpdate=true;lastStep=step
      }
      array.rotation.y+=(-.57+pointerX*.28-array.rotation.y)*.07;array.rotation.x+=(pointerY*.1-array.rotation.x)*.07
      renderOnce()
    }
    resize();raf=requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf);ro.disconnect();io.disconnect();target.removeEventListener('pointermove',pointer);target.removeEventListener('pointerleave',leave)
      geometry.dispose();material.dispose();baseGeo.dispose();baseMat.dispose();edgesGeo.dispose();edgesMat.dispose();tracesGeo.dispose();tracesMat.dispose();renderer.dispose();renderer.domElement.remove()
    }
  },[])
  return <div id="showcase" className="scene-wrap" ref={wrap}>
    <div className="scene-fallback" role="img" aria-label="Sixteen by sixteen processing element array architecture diagram"><svg viewBox="0 0 500 370"><g transform="translate(250 50) rotate(30) scale(1 .7) translate(-130 0)">{Array.from({length:256},(_,i)=><rect key={i} x={(i%16)*17} y={Math.floor(i/16)*17} width="12" height="12" rx="1" fill={(i%16)+Math.floor(i/16)===15 ? '#efad80' : '#6d8575'} />)}</g></svg></div>
    <div className="scene-canvas" ref={host} role="img" aria-label="Three-dimensional architectural visualization of a 16 by 16 systolic processing element array" />
    <span className="scene-description">ARCHITECTURAL VISUALIZATION</span><button className="scene-control" aria-pressed={paused} onClick={() => setPaused(!paused)} aria-label={paused ? 'Play array animation' : 'Pause array animation'}>{paused ? 'Play ↗' : 'Pause Ⅱ'}</button>
  </div>
}
