import * as THREE from "three";
import { MeshPhongMaterial } from "three";

function main() {
  consolw.log(window.devicePixelRatio);
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGL1Renderer({ canvas });

  // Camera parameters
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 4;

  const scene = new THREE.Scene();

  // BoxGeometry paremeters
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const cubeGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Create cubes
  const cubes = [
    makeInstance(cubeGeometry, 0x44aa88, 0),
    makeInstance(cubeGeometry, 0x8844aa, -2),
    makeInstance(cubeGeometry, 0x9e03978, 2),
  ];

  // light
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001; // convert time to seconds
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
      resizeRendererToDisplaySize(renderer)
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
