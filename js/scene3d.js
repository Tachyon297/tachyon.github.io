(function () {
  const canvas = document.getElementById('scene-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    canvas.style.display = 'none';
    return;
  }

  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const group = new THREE.Group();
  scene.add(group);

  const wireMat = new THREE.LineBasicMaterial({ color: 0xf2f2f2, transparent: true, opacity: 0.35 });
  const detail = isMobile ? 0 : 1;

  const icosahedron = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.4, detail)),
    wireMat
  );
  icosahedron.position.set(2.6, 0.4, 0);
  group.add(icosahedron);

  const gridSize = isMobile ? 10 : 16;
  const grid = new THREE.GridHelper(gridSize, gridSize, 0x3a3a3a, 0x1c1c1c);
  grid.position.y = -3;
  scene.add(grid);

  const secondaryCount = isMobile ? 0 : 3;
  const floaters = [];
  for (let i = 0; i < secondaryCount; i++) {
    const geo = new THREE.WireframeGeometry(new THREE.BoxGeometry(0.5, 0.5, 0.5));
    const box = new THREE.LineSegments(geo, wireMat.clone());
    box.material.opacity = 0.2;
    box.position.set(-3 + i * 1.6, 2 - i * 0.7, -2 - i);
    scene.add(box);
    floaters.push(box);
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', resize);

  let scrollProgress = 0;
  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    scrollProgress = max > 0 ? window.scrollY / max : 0;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!reducedMotion) {
      icosahedron.rotation.x = t * 0.08 + scrollProgress * 2.2;
      icosahedron.rotation.y = t * 0.1 + scrollProgress * 3.4;
      floaters.forEach((f, i) => {
        f.rotation.x = t * 0.15 + i;
        f.rotation.y = t * 0.12 + i;
      });
    }

    camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 0.6;
    camera.position.y = -scrollProgress * 2.5;
    camera.position.z = 9 - scrollProgress * 1.5;
    camera.lookAt(0, -scrollProgress * 2, 0);

    renderer.render(scene, camera);
  }
  animate();
})();
