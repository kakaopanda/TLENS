import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Earth = () => {
  function ThreeGlobe() {
    const canvasRef = useRef(null);

    useEffect(() => {
      // 씬(Scene) 생성
      const scene = new THREE.Scene();

      // 카메라(Camera) 생성
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // 조명(Light) 생성
      const light = new THREE.AmbientLight(0xffffff);
      scene.add(light);

      // 지구본(Sphere) 생성
      const geometry = new THREE.SphereGeometry(2, 32, 32);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(
        "https://threejsfundamentals.org/threejs/resources/images/world.jpg"
      );
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // 한국 위치 좌표값 설정
      const koreaPosition = new THREE.Vector3();
      koreaPosition.setFromSphericalCoords(2, Math.PI / 2 - 0.25, Math.PI / 3);

      // 한국 텍스쳐(Texture) 생성
      const koreaTexture = textureLoader.load(
        "https://i.imgur.com/zftaoFz.png"
      );

      // 한국 매핑
      const koreaGeometry = new THREE.PlaneGeometry(0.1, 0.1);
      const koreaMaterial = new THREE.MeshBasicMaterial({
        map: koreaTexture,
        transparent: true,
      });
      const koreaMesh = new THREE.Mesh(koreaGeometry, koreaMaterial);
      koreaMesh.position.copy(koreaPosition);
      koreaMesh.lookAt(sphere.position);
      sphere.add(koreaMesh);

      // OrbitControls 생성
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasRef.current,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      // 렌더링(렌더링 프레임)
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();
    }, []);

    return <canvas ref={canvasRef} />;
  }

  return (
    <div>
      <h1>three.js로 지구본 중 한국만 색깔 다르게 만들기</h1>
      <ThreeGlobe />
    </div>
  );
};

export default Earth;
