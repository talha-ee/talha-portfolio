import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const palette = {
  ink: 0x081315,
  substrate: 0x14282a,
  substrateEdge: 0x45625e,
  die: 0x182f2f,
  dieEdge: 0x6f9484,
  mint: 0x9bc8b1,
  mintBright: 0xd3ead7,
  copper: 0xf0a36c,
  copperDeep: 0x9f5f3f,
  signal: 0x6fe2c4,
}

function roundedRectangle(width, height, radius) {
  const shape = new THREE.Shape()
  const x = -width / 2
  const y = -height / 2
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  return shape
}

function extrudedPlate(width, height, depth, radius, material) {
  const geometry = new THREE.ExtrudeGeometry(roundedRectangle(width, height, radius), {
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.08,
    bevelThickness: 0.08,
    depth,
    curveSegments: 10,
  })
  geometry.rotateX(-Math.PI / 2)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.userData.dispose = () => { geometry.dispose(); material.dispose() }
  return mesh
}

function createLine(points, color, opacity = 1) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity })
  const line = new THREE.Line(geometry, material)
  line.userData.dispose = () => { geometry.dispose(); material.dispose() }
  return line
}

function createWire(start, end, color) {
  const midpoint = start.clone().lerp(end, 0.5)
  midpoint.y += 0.55
  const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end)
  const geometry = new THREE.TubeGeometry(curve, 12, 0.018, 5, false)
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.8, roughness: 0.28, emissive: color, emissiveIntensity: 0.08 })
  const wire = new THREE.Mesh(geometry, material)
  wire.userData.dispose = () => { geometry.dispose(); material.dispose() }
  return wire
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
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8))
    renderer.setClearColor(palette.ink, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    target.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100)
    camera.position.set(8.9, 8.2, 10.2)
    camera.lookAt(0, 0.15, 0)

    scene.add(new THREE.HemisphereLight(0xb7ded0, 0x071012, 2.2))
    const key = new THREE.DirectionalLight(0xffd6b4, 4.4)
    key.position.set(5, 9, 6)
    scene.add(key)
    const fill = new THREE.PointLight(palette.signal, 13, 20, 2)
    fill.position.set(-5, 4, -3)
    scene.add(fill)
    const warm = new THREE.PointLight(palette.copper, 10, 16, 2)
    warm.position.set(4, 2, 4)
    scene.add(warm)

    const root = new THREE.Group()
    root.rotation.set(-0.28, -0.46, 0)
    scene.add(root)

    const substrateMaterial = new THREE.MeshPhysicalMaterial({ color: palette.substrate, metalness: 0.58, roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.22 })
    const substrate = extrudedPlate(8.25, 8.25, 0.22, 0.32, substrateMaterial)
    substrate.position.y = -0.12
    root.add(substrate)
    const substrateEdge = new THREE.LineSegments(new THREE.EdgesGeometry(substrate.geometry), new THREE.LineBasicMaterial({ color: palette.substrateEdge, transparent: true, opacity: 0.7 }))
    substrateEdge.position.copy(substrate.position)
    root.add(substrateEdge)

    const packageMaterial = new THREE.MeshPhysicalMaterial({ color: 0x253a3a, metalness: 0.72, roughness: 0.24, clearcoat: 0.8 })
    const packagePlate = extrudedPlate(6.9, 6.9, 0.16, 0.28, packageMaterial)
    packagePlate.position.y = 0.1
    root.add(packagePlate)

    const dieMaterial = new THREE.MeshPhysicalMaterial({ color: palette.die, metalness: 0.35, roughness: 0.28, clearcoat: 0.95, clearcoatRoughness: 0.16 })
    const die = extrudedPlate(5.65, 5.65, 0.22, 0.2, dieMaterial)
    die.position.y = 0.34
    root.add(die)
    const dieEdge = new THREE.LineSegments(new THREE.EdgesGeometry(die.geometry), new THREE.LineBasicMaterial({ color: palette.dieEdge, transparent: true, opacity: 0.75 }))
    dieEdge.position.copy(die.position)
    root.add(dieEdge)

    const tileGeometry = new THREE.BoxGeometry(0.43, 0.1, 0.43)
    const tileMaterial = new THREE.MeshPhysicalMaterial({ color: palette.mint, metalness: 0.22, roughness: 0.34, clearcoat: 0.6 })
    const tiles = new THREE.InstancedMesh(tileGeometry, tileMaterial, 100)
    const tileDummy = new THREE.Object3D()
    const tileCool = new THREE.Color(palette.mint)
    const tileBright = new THREE.Color(palette.mintBright)
    const tileWarm = new THREE.Color(palette.copper)
    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        const index = row * 10 + column
        tileDummy.position.set((column - 4.5) * 0.53, 0.68, (row - 4.5) * 0.53)
        tileDummy.rotation.y = ((row + column) % 2) * 0.035
        tileDummy.updateMatrix()
        tiles.setMatrixAt(index, tileDummy.matrix)
        const active = row === 4 || column === 5 || (row === column && row > 1 && row < 8)
        tiles.setColorAt(index, active ? tileWarm : ((row + column) % 3 === 0 ? tileBright : tileCool))
      }
    }
    tiles.instanceColor.needsUpdate = true
    root.add(tiles)

    const traces = new THREE.Group()
    for (let index = 0; index < 10; index += 1) {
      const offset = (index - 4.5) * 0.53
      traces.add(createLine([new THREE.Vector3(-2.86, 0.64, offset), new THREE.Vector3(2.86, 0.64, offset)], index % 3 === 0 ? palette.copper : palette.signal, 0.22))
      traces.add(createLine([new THREE.Vector3(offset, 0.64, -2.86), new THREE.Vector3(offset, 0.64, 2.86)], index % 4 === 0 ? palette.copper : palette.signal, 0.16))
    }
    root.add(traces)

    const pinGeometry = new THREE.BoxGeometry(0.18, 0.1, 0.48)
    const pinMaterial = new THREE.MeshPhysicalMaterial({ color: palette.copper, metalness: 0.92, roughness: 0.2, clearcoat: 0.55 })
    const pins = new THREE.Group()
    const wires = new THREE.Group()
    for (let index = 0; index < 16; index += 1) {
      const offset = (index - 7.5) * 0.39
      const sides = [
        { pin: new THREE.Vector3(offset, 0.22, 3.66), die: new THREE.Vector3(offset * 0.78, 0.69, 2.76), rotation: 0 },
        { pin: new THREE.Vector3(offset, 0.22, -3.66), die: new THREE.Vector3(offset * 0.78, 0.69, -2.76), rotation: 0 },
        { pin: new THREE.Vector3(3.66, 0.22, offset), die: new THREE.Vector3(2.76, 0.69, offset * 0.78), rotation: Math.PI / 2 },
        { pin: new THREE.Vector3(-3.66, 0.22, offset), die: new THREE.Vector3(-2.76, 0.69, offset * 0.78), rotation: Math.PI / 2 },
      ]
      sides.forEach(({ pin, die: diePoint, rotation }) => {
        const mesh = new THREE.Mesh(pinGeometry, pinMaterial)
        mesh.position.copy(pin)
        mesh.rotation.y = rotation
        pins.add(mesh)
        wires.add(createWire(diePoint, pin.clone().setY(0.32), index % 4 === 0 ? palette.copper : palette.copperDeep))
      })
    }
    root.add(pins, wires)

    const cornerGeometry = new THREE.BoxGeometry(0.44, 0.06, 0.06)
    const cornerMaterial = new THREE.MeshBasicMaterial({ color: palette.signal, transparent: true, opacity: 0.8 })
    const corners = new THREE.Group()
    ;[[-3.03, 3.03, 0], [3.03, 3.03, Math.PI / 2], [3.03, -3.03, 0], [-3.03, -3.03, Math.PI / 2]].forEach(([x, z, rotation]) => {
      const mesh = new THREE.Mesh(cornerGeometry, cornerMaterial)
      mesh.position.set(x, 0.71, z)
      mesh.rotation.y = rotation
      corners.add(mesh)
    })
    root.add(corners)

    const pulseGeometry = new THREE.SphereGeometry(0.105, 16, 16)
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: palette.copper })
    const pulses = [0, 0.33, 0.66].map((offset) => {
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
      pulse.userData.offset = offset
      root.add(pulse)
      return pulse
    })
    const haloGeometry = new THREE.RingGeometry(3.55, 3.57, 96)
    const haloMaterial = new THREE.MeshBasicMaterial({ color: palette.signal, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    halo.rotation.x = -Math.PI / 2
    halo.position.y = -0.02
    root.add(halo)

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
      camera.position.z = camera.aspect < 1.08 ? 13.3 : 10.2
      camera.position.y = camera.aspect < 1.08 ? 8.8 : 8.2
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
      if (time - last < 28) return
      const delta = Math.min(time - last, 100)
      last = time
      if (!visible || document.hidden || pauseRef.current) return
      phase = (phase + delta * 0.00018) % 1
      root.rotation.y += (-0.46 + pointerX * 0.2 - root.rotation.y) * 0.045
      root.rotation.x += (-0.28 + pointerY * 0.13 - root.rotation.x) * 0.045
      halo.rotation.z = phase * Math.PI * 2
      pulses.forEach((pulse, index) => {
        const routePhase = (phase + pulse.userData.offset) % 1
        const angle = routePhase * Math.PI * 2
        pulse.position.set(Math.cos(angle) * 2.18, 0.82 + Math.sin(angle * 2) * 0.03, Math.sin(angle) * 2.18)
        pulse.scale.setScalar(0.82 + Math.sin(angle * 3 + index) * 0.18)
      })
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
      root.traverse((object) => object.userData.dispose?.())
      substrateEdge.geometry.dispose(); substrateEdge.material.dispose()
      dieEdge.geometry.dispose(); dieEdge.material.dispose()
      tileGeometry.dispose(); tileMaterial.dispose()
      pinGeometry.dispose(); pinMaterial.dispose()
      cornerGeometry.dispose(); cornerMaterial.dispose()
      pulseGeometry.dispose(); pulseMaterial.dispose()
      haloGeometry.dispose(); haloMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="chip-scene">
      <div className="chip-fallback" role="img" aria-label="A detailed silicon package with a compute die and bond wires">
        <svg viewBox="0 0 560 420" aria-hidden="true"><rect x="74" y="70" width="412" height="280" rx="28" /><rect x="118" y="104" width="324" height="212" rx="18" /><path d="M156 143h248v134H156z" />{Array.from({ length: 64 }, (_, index) => <rect key={index} x={174 + (index % 8) * 27} y={157 + Math.floor(index / 8) * 15} width="14" height="8" rx="2" />)}</svg>
      </div>
      <div className="chip-scene-canvas" ref={host} role="img" aria-label="Three-dimensional silicon package with bond wires and a 10 by 10 processing die" />
      <div className="chip-scene-caption"><span>FIG. 01 · SILICON PACKAGE STUDY</span><span>10 × 10 PE FABRIC</span></div>
      <button className="scene-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? 'Resume motion' : 'Pause motion'}</button>
    </div>
  )
}
