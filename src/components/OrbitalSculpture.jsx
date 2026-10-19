import { useEffect, useRef } from "react";
import {
  AdditiveBlending, BufferAttribute, Color, Group, LineLoop, LineBasicMaterial,
  BufferGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Points,
  Scene, ShaderMaterial, TorusKnotGeometry, Vector3, WebGLRenderer,
} from "three";

// A procedural sculpture: geometry, point shading and pointer inertia are local.
export default function OrbitalSculpture() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = matchMedia("(pointer: coarse), (max-width: 760px)").matches;
    let renderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, .1, 30);
    camera.position.z = 6.2;
    const sculpture = new Group();
    scene.add(sculpture);
    const geometry = new TorusKnotGeometry(1.12, .33, mobile ? 220 : 400, 14, 2, 3);
    const sizes = new Float32Array(geometry.attributes.position.count);
    for (let i = 0; i < sizes.length; i++) sizes[i] = .5 + (Math.sin(i * 12.9898) * 43758.5453 % 1 + 1) * .25;
    geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
    const pointMaterial = new ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uRatio: { value: renderer.getPixelRatio() }, uColor: { value: new Color("#b8efb0") } },
      vertexShader: `
        uniform float uTime;
        uniform float uRatio;
        attribute float aSize;
        varying float vLight;
        void main() {
          vec3 p = position + normal * sin(position.y * 3.0 + uTime * .7) * .045;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vLight = .48 + .52 * sin(position.x * 2.0 + position.z + uTime * .45);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uRatio * (1.2 + aSize * 1.8) * (5.0 / -mv.z);
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vLight;
        void main() {
          float d = length(gl_PointCoord - .5);
          float alpha = (1.0 - smoothstep(.08, .5, d)) * (.3 + .7 * vLight);
          gl_FragColor = vec4(mix(uColor, vec3(.91, 1., .88), vLight * .55), alpha);
        }`,
      transparent: true, depthWrite: false, blending: AdditiveBlending,
    });
    const points = new Points(geometry, pointMaterial);
    const wireMaterial = new MeshBasicMaterial({ color: "#7bb995", wireframe: true, transparent: true, opacity: .09, depthWrite: false });
    const wire = new Mesh(geometry, wireMaterial);
    sculpture.add(points, wire);

    const rings = new Group();
    const ringMaterial = new LineBasicMaterial({ color: "#86d6ac", transparent: true, opacity: .2 });
    const ringGeometries = [];
    for (let k = 0; k < 3; k++) {
      const vertices = Array.from({ length: 160 }, (_, i) => {
        const angle = i / 160 * Math.PI * 2;
        return new Vector3(Math.cos(angle) * (1.92 + k * .08), Math.sin(angle) * (1.92 + k * .08), 0);
      });
      const ringGeometry = new BufferGeometry().setFromPoints(vertices);
      ringGeometries.push(ringGeometry);
      const ring = new LineLoop(ringGeometry, ringMaterial);
      ring.rotation.set(.8 + k * .45, .4 + k * .65, k * .4);
      rings.add(ring);
    }
    scene.add(rings);

    const pointer = { x: 0, y: 0, currentX: 0, currentY: 0 };
    const onPointer = event => {
      const rect = container.getBoundingClientRect();
      pointer.x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      pointer.y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    };
    const onLeave = () => { pointer.x = 0; pointer.y = 0; };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = Math.max(6.2, 5.3 / camera.aspect);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let raf = 0, visible = false, previous = 0, time = 0;
    const frame = now => {
      raf = 0;
      if (!visible || document.hidden) { previous = 0; return; }
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 1 / 60;
      previous = now;
      time += dt;
      const damping = 1 - Math.exp(-dt * 3.5);
      pointer.currentX += (pointer.x - pointer.currentX) * damping;
      pointer.currentY += (pointer.y - pointer.currentY) * damping;
      sculpture.rotation.set(.35 + pointer.currentY * .2, time * .14 + pointer.currentX * .45, -.32 + Math.sin(time * .15) * .12);
      rings.rotation.set(time * .04, time * -.065, pointer.currentX * .1);
      sculpture.position.y = Math.sin(time * .6) * .07;
      pointMaterial.uniforms.uTime.value = time;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const wake = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { cancelAnimationFrame(raf); raf = 0; previous = 0; }
      else wake();
    });
    intersection.observe(container);
    document.addEventListener("visibilitychange", wake);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", wake);
      geometry.dispose();
      ringGeometries.forEach(item => item.dispose());
      pointMaterial.dispose(); wireMaterial.dispose(); ringMaterial.dispose();
      renderer.dispose(); renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="orbital-sculpture" ref={ref} />;
}
