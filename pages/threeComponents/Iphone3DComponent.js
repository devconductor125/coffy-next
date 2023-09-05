import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Iphone3DComponent = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scrollRotationFactor = 0.0005;
      if (sceneRef.current && sceneRef.current.children.length > 0) {
        const model = sceneRef.current.children.find(child => child.type === 'Group');
        if (model) {
          model.rotation.y = scrollY * scrollRotationFactor;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);


    const container = containerRef.current;
    const canvas = canvasRef.current;
    console.log(container);
    console.log(canvas);
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create renderer, scene, and camera
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    const scene = new THREE.Scene();
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-5, 3, 3);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    scene.add(pointLight);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6; // Modifica questo valore per adattarlo al tuo modello
    camera.position.y = 3.5;

    const loader = new GLTFLoader();
    loader.load('/iphone_14_pro_max/scene.gltf', (gltf) => {
      // Scala il modello
      var scale = 45; // Aumenta questo valore per ingrandire il modello
      // if screen is a smartphone, scale the model
      if (window.innerWidth < 768) {
        scale = 45;
      } else if (window.innerWidth < 1024) {
        scale = 38;
      } else if (window.innerWidth < 1440) {
        scale = 42;
      } else {
        scale = 45;
      }


      gltf.scene.scale.set(scale, scale, scale);
      // rotate the phone by 180 degrees
      gltf.scene.rotation.y = Math.PI;
      scene.add(gltf.scene);
      animate();
    }, undefined, (error) => console.error(error));

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const scrollRotationFactor = 0.002;
      // add scroll rotation starting delay 
      const delay = 0;

      if (delay < window.scrollY) {
        

        scene.rotation.y = ((window.scrollY - delay) * scrollRotationFactor/4) % 360 * -1;
        scene.rotation.z = ((window.scrollY - delay) * scrollRotationFactor/50) % 360 * -1;
        scene.rotation.x = ((window.scrollY - delay) * scrollRotationFactor/50) % 360 * -1;
      } else {
        scene.rotation.y = 0;
      }

      
      renderer.render(scene, camera);
    };


    const onResize = debounce(() => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    }, 100); // Aggiungi un ritardo di 100 millisecondi

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth: '100vw', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Iphone3DComponent;
