import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const palette = {
  ink: 0x0e1618,
  board: 0x172528,
  edge: 0x3b5654,
  copper: 0xe9a36f,
  signal: 0x7fd6bc,
  pale: 0xbcd4c7,
}

function createLine(points, color, opacity = 1, linewidth = 1) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity, linewidth })
  const line = new THREE.Line(geometry, material)
  line.userData.dispose = () => { geometry.dispose(); material.dispose() }
  return line
}

export default function ChipScene() {
  const host = useRef(null)
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const pauseRef = useRef(paused)

  useEffect(() => { pauseRef.current = paused }, [paused])

  useEffect(() => {
    const target = host.current
    if (!target) return undefined
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65))
    renderer.setClearColor(palette.ink, 0)
    target.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(8.8, 8.9, 10.8)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.AmbientLight(0xa7cbbf, 1.8))
    const key = new THREE.DirectionalLight(0xffd8bc, 3.2)
    key.position.set(5, 10, 6)
    scene.add(key)
    const rim = new THREE.PointLight(palette.signal, 10, 22, 2)
    rim.position.set(-5, 4, -3)
    scene.add(rim)

    const root = new THREE.Group()
    root.rotation.set(-0.2, -0.5, 0)
    scene.add(root)

    const boardGeometry = new THREE.BoxGeometry(7.9, 0.22, 7.9)
    const boardMaterial = new THREE.MeshStandardMaterial({ color: palette.board, roughness: 0.58, metalness: 0.42 })
    const board = new THREE.Mesh(boardGeometry, boardMaterial)
    root.add(board)

    const boardEdges = new THREE.LineSegments(new THREE.EdgesGeometry(boardGeometry), new THREE.LineBasicMaterial({ color: palette.edge, transparent: true, opacity: 0.9 }))
    root.add(boardEdges)

    const cellGeometry = new THREE.BoxGeometry(0.34, 0.2, 0.34)
    const cellMaterial = new THREE.MeshStandardMaterial({ color: palette.pale, roughness: 0.5, metalness: 0.35 })
    const cells = new THREE.InstancedMesh(cellGeometry, cellMaterial, 144)
    const dummy = new THREE.Object3D()
    const cool = new THREE.Color(palette.pale)
    const warm = new THREE.Color(palette.copper)
    for (let row = 0; row < 12; row += 1) {
      for (let column = 0; column < 12; column += 1) {
        const i = row * 12 + column
        dummy.position.set((column - 5.5) * 0.52, 0.34, (row - 5.5) * 0.52)
        dummy.rotation.y = ((row + column) % 3) * 0.08
        dummy.updateMatrix()
        cells.setMatrixAt(i, dummy.matrix)
        cells.setColorAt(i, (row === 5 && column > 2 && column < 10) || (column === 6 && row > 2 && row < 9) ? warm : cool)
      }
    }
    cells.instanceColor.needsUpdate = true
    root.add(cells)

    const traces = new THREE.Group()
    const traceMaterials = []
    for (let i = 0; i < 12; i += 1) {
      const offset = (i - 5.5) * 0.52
      const color = i % 4 === 0 ? palette.copper : palette.signal
      const horizontal = createLine([new THREE.Vector3(-4.6, 0.28, offset), new THREE.Vector3(-3.95, 0.28, offset), new THREE.Vector3(3.95, 0.28, offset), new THREE.Vector3(4.6, 0.28, offset)], color, 0.24)
      const vertical = createLine([new THREE.Vector3(offset, 0.28, -4.6), new THREE.Vector3(offset, 0.28, -3.95), new THREE.Vector3(offset, 0.28, 3.95), new THREE.Vector3(offset, 0.28, 4.6)], color, 0.24)
      traces.add(horizontal, vertical)
      traceMaterials.push(horizontal.material, vertical.material)
    }
    root.add(traces)

    const perimeter = new THREE.Group()
    const pinGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.5)
    const pinMaterial = new THREE.MeshStandardMaterial({ color: palette.copper, roughness: 0.35, metalness: 0.72 })
    for (let i = 0; i < 18; i += 1) {
      const p = (i - 8.5) * 0.38
      const pinA = new THREE.Mesh(pinGeometry, pinMaterial)
      pinA.position.set(p, 0.03, 4.35)
      const pinB = new THREE.Mesh(pinGeometry, pinMaterial)
      pinB.position.set(p, 0.03, -4.35)
      pinB.rotation.y = Math.PI
      perimeter.add(pinA, pinB)
      const pinC = new THREE.Mesh(pinGeometry, pinMaterial)
      pinC.position.set(4.35, 0.03, p)
      pinC.rotation.y = Math.PI / 2
      const pinD = new THREE.Mesh(pinGeometry, pinMaterial)
      pinD.position.set(-4.35, 0.03, p)
      pinD.rotation.y = Math.PI / 2
      perimeter.add(pinC, pinD)
    }
    root.add(perimeter)

    const pulseGeometry = new THREE.SphereGeometry(0.12, 10, 10)
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: palette.copper })
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
    root.add(pulse)

    const ringGeometry = new THREE.RingGeometry(4.7, 4.72, 64)
    const ringMaterial = new THREE.MeshBasicMaterial({ color: palette.signal, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = -Math.PI / 2
    ring.position.y = -0.14
    root.add(ring)

    let pointerX = 0
    let pointerY = 0
    let visible = true
    let raf = 0
    let last = 0
    let phase = 0

    const render = () => renderer.render(scene, camera)
    const resize = () => {
      const width = target.clientWidth
      const height = target.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.position.z = camera.aspect < 1.2 ? 13 : 10.8
      camera.updateProjectionMatrix()
      render()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(target)
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    intersectionObserver.observe(target)
    const onPointerMove = (event) => {
      const bounds = target.getBoundingClientRect()
      pointerX = ((event.clientX - bounds.left) / bounds.width) - 0.5
      pointerY = ((event.clientY - bounds.top) / bounds.height) - 0.5
    }
    const onPointerLeave = () => { pointerX = 0; pointerY = 0 }
    target.addEventListener('pointermove', onPointerMove)
    target.addEventListener('pointerleave', onPointerLeave)

    const tick = (time) => {
      raf = requestAnimationFrame(tick)
      if (time - last < 32) return
      const delta = Math.min(time - last, 100)
      last = time
      if (!visible || document.hidden || pauseRef.current) return
      phase = (phase + delta * 0.0014) % 1
      root.rotation.y += (-0.5 + pointerX * 0.24 - root.rotation.y) * 0.06
      root.rotation.x += (-0.2 + pointerY * 0.16 - root.rotation.x) * 0.06
      ring.rotation.z = phase * Math.PI * 2
      const angle = phase * Math.PI * 2
      pulse.position.set(Math.cos(angle) * 3.35, 0.56, Math.sin(angle) * 3.35)
      pulse.scale.setScalar(0.85 + Math.sin(angle * 2) * 0.2)
      traceMaterials.forEach((material, index) => { material.opacity = 0.18 + ((Math.sin(angle + index * 0.42) + 1) * 0.08) })
      render()
    }

    resize()
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      target.removeEventListener('pointermove', onPointerMove)
      target.removeEventListener('pointerleave', onPointerLeave)
      boardGeometry.dispose()
      boardMaterial.dispose()
      boardEdges.geometry.dispose()
      boardEdges.material.dispose()
      cellGeometry.dispose()
      cellMaterial.dispose()
      traces.children.forEach((line) => line.userData.dispose?.())
      pinGeometry.dispose()
      pinMaterial.dispose()
      pulseGeometry.dispose()
      pulseMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="chip-scene">
      <div className="chip-fallback" role="img" aria-label="Abstract chip package with a systolic processing grid">
        <svg viewBox="0 0 560 420" aria-hidden="true">
          <rect x="90" y="78" width="380" height="260" rx="16" />
          <path d="M122 109h316v198H122z" />
          {Array.from({ length: 100 }, (_, index) => <rect key={index} x={146 + (index % 10) * 28} y={132 + Math.floor(index / 10) * 17} width="15" height="8" rx="2" />)}
          <path d="M44 130h46M44 170h46M44 210h46M470 130h46M470 170h46M470 210h46" />
        </svg>
      </div>
      <div className="chip-scene-canvas" ref={host} role="img" aria-label="Three-dimensional chip package with a 12 by 12 processing grid" />
      <div className="chip-scene-caption"><span>FIG. 01 · COMPUTE FABRIC</span><span>12 × 12 PE VIEW</span></div>
      <button className="scene-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? 'Resume motion' : 'Pause motion'}</button>
    </div>
  )
}
