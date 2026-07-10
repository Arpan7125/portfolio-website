/**
 * Three.js Hero Background — Floating Geometric Particles
 * Lightweight particle system with mouse parallax & auto-rotation
 * Respects prefers-reduced-motion and pauses on hidden tabs
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const PARTICLE_COUNT = isMobile ? 30 : 80;
const COLORS = [0xf5c518, 0xffd700, 0xffb300, 0xff8f00, 0xffe082];

let scene, camera, renderer, particles, animationId;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let isVisible = true;

function init() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  // Scene
  scene = new THREE.Scene();

  // Camera
  const aspect = canvas.clientWidth / canvas.clientHeight;
  camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
  camera.position.z = 50;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Particles
  createParticles();

  // Event listeners
  window.addEventListener('resize', onResize);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Start animation
  animate();
}

function createParticles() {
  const geometry = new THREE.IcosahedronGeometry(0.6, 0);
  const materials = COLORS.map(color => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide
  }));

  particles = new THREE.Group();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const material = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(geometry, material);

    // Spherical distribution
    const radius = 15 + Math.random() * 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    mesh.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );

    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    mesh.scale.setScalar(0.5 + Math.random() * 0.8);

    // Store animation params
    mesh.userData = {
      baseRadius: radius,
      baseTheta: theta,
      basePhi: phi,
      speed: 0.0003 + Math.random() * 0.0005,
      rotSpeedX: (Math.random() - 0.5) * 0.002,
      rotSpeedY: (Math.random() - 0.5) * 0.002,
      rotSpeedZ: (Math.random() - 0.5) * 0.002,
      phase: Math.random() * Math.PI * 2
    };

    particles.add(mesh);
  }

  scene.add(particles);
}

function animate() {
  if (!isVisible) return;

  animationId = requestAnimationFrame(animate);

  const time = performance.now() * 0.001;

  // Smooth mouse follow
  targetX += (mouseX - targetX) * 0.03;
  targetY += (mouseY - targetY) * 0.03;

  // Animate particles
  particles.children.forEach((mesh, i) => {
    const data = mesh.userData;

    // Orbital motion
    const angle = time * data.speed + data.phase;
    const radius = data.baseRadius + Math.sin(time * 0.5 + data.phase) * 2;

    mesh.position.x = radius * Math.sin(data.basePhi) * Math.cos(data.baseTheta + angle);
    mesh.position.y = radius * Math.sin(data.basePhi) * Math.sin(data.baseTheta + angle);
    mesh.position.z = radius * Math.cos(data.basePhi);

    // Rotation
    mesh.rotation.x += data.rotSpeedX;
    mesh.rotation.y += data.rotSpeedY;
    mesh.rotation.z += data.rotSpeedZ;
  });

  // Mouse parallax - rotate entire particle group
  particles.rotation.y = targetX * 0.15;
  particles.rotation.x = -targetY * 0.1;

  // Subtle camera drift
  camera.position.x += (targetX * 2 - camera.position.x) * 0.02;
  camera.position.y += (-targetY * 2 - camera.position.y) * 0.02;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

function onMouseMove(e) {
  // Normalize to -1 to 1
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

function onResize() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !camera || !renderer) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function onVisibilityChange() {
  isVisible = !document.hidden;
  if (isVisible) animate();
}

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential cleanup
export { init };