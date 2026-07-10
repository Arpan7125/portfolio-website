/**
 * Three.js Skills Sphere — Interactive 3D Skill Nodes
 * Orbiting nodes grouped by category, hover for tooltip, click to scroll
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const NODE_COUNT = isMobile ? 60 : 120;

const SKILL_CATEGORIES = [
  { name: 'Languages', color: 0xf5c518, skills: ['Python', 'JavaScript', 'TypeScript', 'Go', 'Java', 'Kotlin', 'HTML5', 'CSS3'] },
  { name: 'Frameworks', color: 0xff8f00, skills: ['React.js', 'Next.js', 'Spring Boot', 'Node.js', 'Web Audio API'] },
  { name: 'Mobile', color: 0xffb300, skills: ['Android Studio', 'Java / Kotlin Mobile'] },
  { name: 'Databases', color: 0xffe082, skills: ['Supabase', 'MySQL', 'MongoDB', 'PostgreSQL'] },
  { name: 'Tools', color: 0xf5c518, skills: ['Docker', 'Git', 'GitHub', 'Azure DevOps'] },
  { name: 'Specializations', color: 0xff8f00, skills: ['NLP / AI', 'P2P Networking', 'Distributed Systems', 'Blockchain'] }
];

let scene, camera, renderer, sphereGroup, nodes = [];
let animationId, isVisible = true;
let hoveredNode = null;
let raycaster, mouse;
let autoRotate = true;
const sphereRadius = 8;

function init() {
  const canvas = document.getElementById('skills-canvas');
  const container = document.getElementById('skills-sphere-container');
  if (!canvas || !container) return;

  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  // Scene
  scene = new THREE.Scene();

  // Camera
  const aspect = canvas.clientWidth / canvas.clientHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
  camera.position.z = 22;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Raycaster for hover
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Create sphere of nodes
  createSkillSphere();

  // Subtle ambient light
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.4);
  directional.position.set(10, 10, 10);
  scene.add(directional);

  // Events
  window.addEventListener('resize', onResize);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('click', onClick);
  canvas.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Pause auto-rotate on hover
  canvas.addEventListener('mouseenter', () => { autoRotate = false; });
  canvas.addEventListener('mouseleave', () => { autoRotate = true; });

  animate();
}

function createSkillSphere() {
  sphereGroup = new THREE.Group();

  // Flatten all skills with category info
  const allSkills = [];
  SKILL_CATEGORIES.forEach((cat, catIndex) => {
    cat.skills.forEach(skill => {
      allSkills.push({ name: skill, category: cat.name, color: cat.color, catIndex });
    });
  });

  // Distribute nodes on sphere using Fibonacci spiral
  for (let i = 0; i < NODE_COUNT; i++) {
    const skill = allSkills[i % allSkills.length];
    const node = createNode(skill, i, NODE_COUNT);
    nodes.push({ mesh: node, skill, index: i });
    sphereGroup.add(node);
  }

  // Add connecting lines (subtle)
  addConnections();

  scene.add(sphereGroup);
}

function createNode(skill, index, total) {
  // Fibonacci sphere distribution
  const phi = Math.acos(1 - 2 * (index + 0.5) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

  const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
  const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
  const z = sphereRadius * Math.cos(phi);

  // Node geometry - small icosahedron
  const geometry = new THREE.IcosahedronGeometry(0.18, 0);
  const material = new THREE.MeshStandardMaterial({
    color: skill.color,
    transparent: true,
    opacity: 0.85,
    metalness: 0.3,
    roughness: 0.6
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.lookAt(0, 0, 0);

  // Store data
  mesh.userData = {
    skill,
    basePosition: new THREE.Vector3(x, y, z),
    phase: Math.random() * Math.PI * 2,
    hoverScale: 1
  };

  return mesh;
}

function addConnections() {
  // Connect nearby nodes with subtle lines
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  const maxDist = 4.5;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
      if (dist < maxDist && Math.random() < 0.15) {
        linePositions.push(
          nodes[i].mesh.position.x, nodes[i].mesh.position.y, nodes[i].mesh.position.z,
          nodes[j].mesh.position.x, nodes[j].mesh.position.y, nodes[j].mesh.position.z
        );
      }
    }
  }

  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xf5c518,
    transparent: true,
    opacity: 0.08
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  sphereGroup.add(lines);
  nodes.lineMesh = lines;
}

function animate() {
  if (!isVisible) return;
  animationId = requestAnimationFrame(animate);

  const time = performance.now() * 0.001;

  // Auto-rotate sphere
  if (autoRotate) {
    sphereGroup.rotation.y += 0.0003;
    sphereGroup.rotation.x += 0.0001;
  }

  // Animate nodes - subtle breathing + orbit
  nodes.forEach((nodeData, i) => {
    const mesh = nodeData.mesh;
    const data = mesh.userData;

    // Subtle scale pulse
    const pulse = 1 + Math.sin(time * 1.5 + data.phase) * 0.08;
    mesh.scale.setScalar(pulse * data.hoverScale);

    // Subtle orbital wobble
    const wobbleX = Math.sin(time * 0.7 + data.phase) * 0.05;
    const wobbleY = Math.cos(time * 0.5 + data.phase) * 0.05;
    mesh.position.x = data.basePosition.x + wobbleX;
    mesh.position.y = data.basePosition.y + wobbleY;
    mesh.position.z = data.basePosition.z;

    // Always face camera slightly
    mesh.lookAt(camera.position);
  });

  // Raycast for hover
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));

  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    if (hoveredNode !== mesh) {
      hoveredNode = mesh;
      mesh.userData.hoverScale = 1.8;
      showTooltip(mesh, intersects[0].point);
    }
  } else if (hoveredNode) {
    hoveredNode.userData.hoverScale = 1;
    hoveredNode = null;
    hideTooltip();
  }

  // Smooth tooltip follow
  if (hoveredNode) {
    updateTooltipPosition();
  }

  renderer.render(scene, camera);
}

function showTooltip(mesh, worldPoint) {
  let tooltip = document.getElementById('skill-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'skill-tooltip';
    tooltip.style.cssText = `
      position: fixed; pointer-events: none; z-index: 1000;
      padding: 0.5rem 0.85rem; background: var(--black); color: var(--white);
      border-radius: var(--radius); font-size: 0.78rem; font-weight: 600;
      box-shadow: var(--shadow-lg); opacity: 0; transition: opacity 0.15s;
      white-space: nowrap; font-family: var(--font-primary);
    `;
    document.body.appendChild(tooltip);
  }

  const skill = mesh.userData.skill;
  tooltip.innerHTML = `<span style="color: var(--yellow)">${skill.category}</span> — ${skill.name}`;
  tooltip.style.opacity = '1';
}

function hideTooltip() {
  const tooltip = document.getElementById('skill-tooltip');
  if (tooltip) tooltip.style.opacity = '0';
}

function updateTooltipPosition() {
  const tooltip = document.getElementById('skill-tooltip');
  if (!tooltip || !hoveredNode) return;

  const vector = hoveredNode.getWorldPosition(new THREE.Vector3());
  vector.project(camera);

  const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

  tooltip.style.left = `${x + 15}px`;
  tooltip.style.top = `${y - 15}px`;
}

function onMouseMove(e) {
  const canvas = document.getElementById('skills-canvas');
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
}

function onMouseLeave() {
  mouse.x = mouse.y = 100; // Off screen
}

function onClick(e) {
  const canvas = document.getElementById('skills-canvas');
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));

  if (intersects.length > 0) {
    const skill = intersects[0].object.userData.skill;
    scrollToSkillCategory(skill.category);
  }
}

function scrollToSkillCategory(category) {
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    const cat = card.querySelector('.skill-category');
    if (cat && cat.textContent.trim() === category) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight briefly
      card.style.boxShadow = '0 0 0 3px var(--yellow)';
      setTimeout(() => card.style.boxShadow = '', 1500);
    }
  });
}

function onResize() {
  const canvas = document.getElementById('skills-canvas');
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

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { init };