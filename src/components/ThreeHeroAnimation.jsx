import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHeroAnimation = () => {
  const containerRef = useRef(null);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 600;

    // Scroll tracking refs
    const scrollRef = { current: 0 };
    const smoothScrollRef = { current: 0 };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollRef.current = window.scrollY / totalScroll;
      }
    };
    window.addEventListener('scroll', handleScroll);

    // --- 1. Scene & Cinematic Renderer Setup ---
    const scene = new THREE.Scene();
    
    // Custom Sky Dome (smooth cinematic gradient)
    const skyGeo = new THREE.SphereGeometry(220, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0xa5f3fc) },   // Cinematic blue
        bottomColor: { value: new THREE.Color(0xffedd5) },// Warm sunset/sunrise horizon
        offset: { value: 35 },
        exponent: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // Warm atmospheric fog
    scene.fog = new THREE.FogExp2(0xffedd5, 0.0075);

    // Perspective Camera (Cinematic lens setting)
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(8, 2.2, 12);
    camera.lookAt(0, 0.8, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap; // PCFShadowMap resolves deprecation
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // --- 2. Advanced Daytime Lighting (Realistic Shading) ---
    // Sky light (pure white) & ground reflection (slate blue-grey)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x5a6372, 0.85);
    scene.add(hemiLight);

    // Sun light (warm golden daylight)
    const sunLight = new THREE.DirectionalLight(0xfffbf0, 1.6);
    sunLight.position.set(22, 38, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 100;
    const dSide = 32;
    sunLight.shadow.camera.left = -dSide;
    sunLight.shadow.camera.right = dSide;
    sunLight.shadow.camera.top = dSide;
    sunLight.shadow.camera.bottom = -dSide;
    sunLight.shadow.bias = -0.0006;
    scene.add(sunLight);

    // Faint golden sun halo
    const sunHaloGeo = new THREE.RingGeometry(0.1, 15, 32);
    const sunHaloMat = new THREE.MeshBasicMaterial({
      color: 0xfff3d4,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const sunHalo = new THREE.Mesh(sunHaloGeo, sunHaloMat);
    sunHalo.position.set(44, 76, 28);
    sunHalo.lookAt(0, 0, 0);
    scene.add(sunHalo);

    // Secondary soft fill light (daylight scatter)
    const fillLight = new THREE.DirectionalLight(0xbfdbfe, 0.35); // Cool blue skylight fill
    fillLight.position.set(-20, 15, -15);
    scene.add(fillLight);

    // --- 3. High-Fidelity City Environment ---
    // Materials
    const roadMat = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b, // Premium dark asphalt
      roughness: 0.38, 
      metalness: 0.15 
    }); 
    const sidewalkMat = new THREE.MeshStandardMaterial({ 
      color: 0xf1f5f9, // Slate concrete paver
      roughness: 0.45 
    }); 
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.4 }); // Slate-500 curb
    const crosswalkMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.85 }); // Crosswalk white stripes
    
    // Reflective building glass
    const buildingGlassMat = new THREE.MeshPhysicalMaterial({ 
      color: 0x60a5fa, // sky-400
      roughness: 0.05, 
      metalness: 0.9, 
      transmission: 0.4, 
      transparent: true, 
      opacity: 0.65 
    });

    // Warm glowing interior windows
    const glowingWindowMat = new THREE.MeshStandardMaterial({
      color: 0xfff3c4,
      emissive: 0xffa855,
      emissiveIntensity: 0.95,
      roughness: 0.2
    });

    const buildingFrameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 }); // slate-800

    // Asphalt Road Slab
    const roadGeo = new THREE.BoxGeometry(100, 0.5, 9);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(10, -0.25, 2.5);
    road.receiveShadow = true;
    scene.add(road);

    // Road White Center Lines (Dashed)
    const centerLineMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
    for (let i = -40; i <= 60; i += 7.5) {
      const lineGeo = new THREE.BoxGeometry(2.5, 0.012, 0.16);
      const line = new THREE.Mesh(lineGeo, centerLineMat);
      line.position.set(i, 0.01, 2.5);
      scene.add(line);
    }

    // Pedestrian Crosswalk (Zebra crossing stripes at Pickup point)
    for (let i = -1.2; i <= 2.8; i += 0.9) {
      const stripeGeo = new THREE.BoxGeometry(0.5, 0.01, 5.2);
      const stripe = new THREE.Mesh(stripeGeo, crosswalkMat);
      stripe.position.set(i, 0.01, 2.5);
      stripe.receiveShadow = true;
      scene.add(stripe);
    }

    // Paved Sidewalk Tiles (with real gap grooving)
    const sidewalkGroup = new THREE.Group();
    scene.add(sidewalkGroup);

    // Individual concrete pavers
    for (let i = -35; i <= 55; i += 4) {
      const slabGeo = new THREE.BoxGeometry(3.92, 0.6, 5);
      const slab = new THREE.Mesh(slabGeo, sidewalkMat);
      slab.position.set(i, -0.2, -4.5);
      slab.receiveShadow = true;
      sidewalkGroup.add(slab);
    }

    // Curbstones
    for (let i = -35; i <= 55; i += 3) {
      const stoneGeo = new THREE.BoxGeometry(2.92, 0.65, 0.25);
      const stone = new THREE.Mesh(stoneGeo, curbMat);
      stone.position.set(i, -0.175, -1.875);
      stone.receiveShadow = true;
      stone.castShadow = true;
      sidewalkGroup.add(stone);
    }

    // --- City Backdrop (Skyscrapers with detailed facades) ---
    const buildGroup = new THREE.Group();
    scene.add(buildGroup);

    const spawnSkyscraper = (x, z, w, d, h, facadeColor) => {
      const bMat = new THREE.MeshStandardMaterial({ color: facadeColor, roughness: 0.75 });
      const bGeo = new THREE.BoxGeometry(w, h, d);
      const building = new THREE.Mesh(bGeo, bMat);
      building.position.set(x, h/2 - 0.5, z);
      building.receiveShadow = true;
      building.castShadow = true;
      buildGroup.add(building);

      // Ground Floor Storefront
      const storefrontFrame = new THREE.Mesh(new THREE.BoxGeometry(w - 0.6, 3, 0.16), buildingFrameMat);
      storefrontFrame.position.set(x, 1.0, z + d/2 + 0.02);
      buildGroup.add(storefrontFrame);

      const glassPaneGeo = new THREE.BoxGeometry((w - 2.4) / 2, 2.3, 0.1);
      const pane1 = new THREE.Mesh(glassPaneGeo, buildingGlassMat);
      pane1.position.set(x - w/4, 1.0, z + d/2 + 0.1);
      buildGroup.add(pane1);
      const pane2 = new THREE.Mesh(glassPaneGeo, buildingGlassMat);
      pane2.position.set(x + w/4, 1.0, z + d/2 + 0.1);
      buildGroup.add(pane2);

      // Window grid facades with randomized warm lights
      const winCountX = Math.floor(w / 1.8);
      const winCountY = Math.floor((h - 5) / 2.8);
      const winGeo = new THREE.BoxGeometry(0.75, 1.15, 0.08);

      for (let i = 0; i < winCountX; i++) {
        for (let j = 0; j < winCountY; j++) {
          const winFrame = new THREE.Mesh(winGeo, buildingFrameMat);
          const wx = x - w/2 + 1.1 + i * 1.8;
          const wy = 4.5 + j * 2.8;
          const wz = z + d/2 + 0.03;

          winFrame.position.set(wx, wy, wz);
          winFrame.castShadow = true;
          buildGroup.add(winFrame);

          // 25% chance of warm glowing room light, 75% reflective window
          const useGlow = Math.random() < 0.25;
          const glassPane = new THREE.Mesh(
            new THREE.BoxGeometry(0.65, 1.05, 0.1), 
            useGlow ? glowingWindowMat : buildingGlassMat
          );
          glassPane.position.set(wx, wy, wz + 0.01);
          buildGroup.add(glassPane);
        }
      }

      // Rooftop structural details
      const roofY = h - 0.5;
      
      // 1. Water tower
      if (Math.random() < 0.5) {
        const wtGroup = new THREE.Group();
        wtGroup.position.set(x + (Math.random() - 0.5) * (w - 2.5), roofY, z + (Math.random() - 0.5) * (d - 2.5));
        
        const legMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
        for (let li = -0.3; li <= 0.3; li += 0.6) {
          for (let lj = -0.3; lj <= 0.3; lj += 0.6) {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8), legMat);
            leg.position.set(li, 0.4, lj);
            leg.castShadow = true;
            wtGroup.add(leg);
          }
        }
        
        const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.8, 12), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 }));
        tank.position.y = 1.2;
        tank.castShadow = true;
        wtGroup.add(tank);
        
        const tankRoof = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.3, 12), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
        tankRoof.position.y = 1.75;
        tankRoof.castShadow = true;
        wtGroup.add(tankRoof);
        
        buildGroup.add(wtGroup);
      }
      
      // 2. Antenna
      if (Math.random() < 0.6) {
        const antGroup = new THREE.Group();
        antGroup.position.set(x + (Math.random() - 0.5) * (w - 2.5), roofY, z + (Math.random() - 0.5) * (d - 2.5));
        
        const antBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), buildingFrameMat);
        antBase.position.y = 0.15;
        antGroup.add(antBase);
        
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 2.5, 8), new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 }));
        pole.position.y = 1.4;
        pole.castShadow = true;
        antGroup.add(pole);
        
        const redBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        redBeacon.position.y = 2.65;
        antGroup.add(redBeacon);
        
        buildGroup.add(antGroup);
      }
      
      // 3. HVAC / Ventilation boxes
      const boxCount = Math.floor(Math.random() * 2) + 1;
      for (let bi = 0; bi < boxCount; bi++) {
        const boxGeo = new THREE.BoxGeometry(1.2 + Math.random() * 0.6, 0.8, 1.2 + Math.random() * 0.6);
        const box = new THREE.Mesh(boxGeo, buildingFrameMat);
        box.position.set(
          x + (Math.random() - 0.5) * (w - 3.5),
          roofY + 0.4,
          z + (Math.random() - 0.5) * (d - 3.5)
        );
        box.castShadow = true;
        buildGroup.add(box);
      }

      // 4. Storefront awnings
      if (Math.random() < 0.75) {
        const awningGroup = new THREE.Group();
        awningGroup.position.set(x, 2.5, z + d/2 + 0.35);
        
        const awColor = Math.random() < 0.5 ? 0xbe123c : 0xd97706; // deep red or amber orange
        const awningMat = new THREE.MeshStandardMaterial({ color: awColor, roughness: 0.9 });
        
        const slope = new THREE.Mesh(new THREE.BoxGeometry(w - 1, 0.1, 0.8), awningMat);
        slope.rotation.x = 0.35;
        slope.castShadow = true;
        awningGroup.add(slope);
        
        const valance = new THREE.Mesh(new THREE.BoxGeometry(w - 1, 0.25, 0.05), awningMat);
        valance.position.set(0, -0.12, 0.38);
        valance.castShadow = true;
        awningGroup.add(valance);
        
        buildGroup.add(awningGroup);
      }

      // 5. Storefront signs
      if (Math.random() < 0.6) {
        const signMat = new THREE.MeshStandardMaterial({
          color: facadeColor,
          emissive: Math.random() < 0.5 ? 0xef4444 : 0x06b6d4, // Red or Cyan glow
          emissiveIntensity: 0.85
        });
        const board = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.15), signMat);
        board.position.set(x, 3.2, z + d/2 + 0.1);
        board.castShadow = true;
        buildGroup.add(board);
      }
    };

    spawnSkyscraper(-30, -32, 10, 10, 36, 0xd1d5db); // Light Grey building
    spawnSkyscraper(-17, -29, 9, 8, 26, 0x94a3b8);  // Slate Blue building
    spawnSkyscraper(-4, -28, 13, 11, 40, 0xa1a1aa);  // Medium Grey building
    spawnSkyscraper(9, -29, 9, 9, 32, 0xe4e4e7);   // Silver Sand building
    spawnSkyscraper(22, -26, 12, 10, 48, 0xcbd5e1);  // Concrete Grey building
    spawnSkyscraper(36, -30, 9, 8, 28, 0xd4d4d8);   // Warm Grey building

    // --- City Signs & Props ---
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 }); // Dark metal
    
    // Traffic Light Signal Pole
    const tlGroup = new THREE.Group();
    tlGroup.position.set(4.5, 0.1, -1.8);
    scene.add(tlGroup);

    const tlPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 4.2, 8), poleMat);
    tlPole.position.y = 2.1;
    tlPole.castShadow = true;
    tlGroup.add(tlPole);

    const tlArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8), poleMat);
    tlArm.geometry.rotateZ(Math.PI / 2);
    tlArm.position.set(0.6, 3.8, 0);
    tlArm.castShadow = true;
    tlGroup.add(tlArm);

    const signalBox = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), poleMat);
    signalBox.position.set(1.2, 3.8, 0);
    signalBox.castShadow = true;
    tlGroup.add(signalBox);

    const redLens = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    redLens.position.set(1.2, 4.1, 0.16);
    tlGroup.add(redLens);
    const yellowLens = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xeab308 }));
    yellowLens.position.set(1.2, 3.8, 0.16);
    tlGroup.add(yellowLens);
    const greenLens = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    greenLens.position.set(1.2, 3.5, 0.16);
    tlGroup.add(greenLens);

    // Paved Curb Guard Bollards (connected by rails)
    const bollardMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.1 });
    const createBollard = (x) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(x, 0.1, -1.8);

      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8), bollardMat);
      post.position.y = 0.4;
      post.castShadow = true;
      bGroup.add(post);

      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.095, 8, 8), bollardMat);
      cap.position.y = 0.8;
      bGroup.add(cap);

      scene.add(bGroup);
    };
    createBollard(-6);
    createBollard(-3);
    createBollard(9);
    createBollard(12);

    // Realistic Bus Shelter / Booth
    const shelter = new THREE.Group();
    shelter.position.set(-18, 0.1, -4.5);
    scene.add(shelter);

    const frameGeo = new THREE.BoxGeometry(0.1, 2.5, 0.1);
    const makePost = (x, z) => {
      const p = new THREE.Mesh(frameGeo, poleMat);
      p.position.set(x, 1.25, z);
      p.castShadow = true;
      shelter.add(p);
    };
    makePost(-1.5, 1.0);
    makePost(1.5, 1.0);
    makePost(-1.5, -1.0);
    makePost(1.5, -1.0);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.12, 2.2), poleMat);
    roof.position.set(0, 2.5, 0);
    roof.castShadow = true;
    shelter.add(roof);

    const backGlass = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.1, 0.05), buildingGlassMat);
    backGlass.position.set(0, 1.15, -0.95);
    shelter.add(backGlass);

    const sideGlassL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.1, 1.9), buildingGlassMat);
    sideGlassL.position.set(-1.48, 1.15, 0);
    shelter.add(sideGlassL);

    const benchMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 }); // wooden bench
    const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.6), benchMat);
    benchSeat.position.set(0, 0.5, -0.4);
    benchSeat.castShadow = true;
    shelter.add(benchSeat);

    // --- Planters, Trash Bins, Hydrants ---
    const propGroup = new THREE.Group();
    scene.add(propGroup);

    // Red fire hydrants
    const makeHydrant = (x, z) => {
      const hGroup = new THREE.Group();
      hGroup.position.set(x, 0.1, z);
      
      const hydMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.2, roughness: 0.5 });
      const mainBody = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 8), hydMat);
      mainBody.position.y = 0.225;
      mainBody.castShadow = true;
      hGroup.add(mainBody);
      
      const topCap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), hydMat);
      topCap.position.y = 0.45;
      hGroup.add(topCap);
      
      const sideCap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8), hydMat);
      sideCap.geometry.rotateZ(Math.PI/2);
      sideCap.position.y = 0.3;
      hGroup.add(sideCap);
      
      propGroup.add(hGroup);
    };
    makeHydrant(-1.5, -2.1);
    makeHydrant(16.5, -2.1);

    // Sleek concrete sidewalk flower planters
    const makePlanter = (x, z) => {
      const planterGroup = new THREE.Group();
      planterGroup.position.set(x, 0.1, z);
      
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.85), sidewalkMat);
      box.position.y = 0.225;
      box.castShadow = true;
      box.receiveShadow = true;
      planterGroup.add(box);
      
      const shrubMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.9, flatShading: true });
      const shrub = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 0.7), shrubMat);
      shrub.position.y = 0.5;
      shrub.castShadow = true;
      planterGroup.add(shrub);
      
      const flowerColors = [0xbe123c, 0xd97706, 0x9333ea]; // red, orange, purple
      for (let i = 0; i < 6; i++) {
        const flColor = flowerColors[i % flowerColors.length];
        const flMat = new THREE.MeshBasicMaterial({ color: flColor });
        const flower = new THREE.Mesh(new THREE.SphereGeometry(0.045, 4, 4), flMat);
        flower.position.set(
          (Math.random() - 0.5) * 1.1,
          0.6 + Math.random() * 0.06,
          (Math.random() - 0.5) * 0.5
        );
        planterGroup.add(flower);
      }
      
      propGroup.add(planterGroup);
    };
    makePlanter(-13.5, -2.2);
    makePlanter(1.5, -2.2);
    makePlanter(24.5, -2.2);

    // Gray street trash bins
    const makeTrashBin = (x, z) => {
      const binGroup = new THREE.Group();
      binGroup.position.set(x, 0.1, z);
      
      const binMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 });
      const outerBin = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.55, 8), binMat);
      outerBin.position.y = 0.275;
      outerBin.castShadow = true;
      binGroup.add(outerBin);
      
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 8), poleMat);
      lid.position.y = 0.575;
      lid.castShadow = true;
      binGroup.add(lid);
      
      propGroup.add(binGroup);
    };
    makeTrashBin(-24, -2.2);
    makeTrashBin(8, -2.2);

    // --- Detailed Streetlights with Volumetric beams ---
    const streetLightsGroup = new THREE.Group();
    scene.add(streetLightsGroup);
    
    const createStreetLight = (x) => {
      const slGroup = new THREE.Group();
      slGroup.position.set(x, 0.1, -1.8);
      
      // Pole
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 3.8, 8), poleMat);
      pole.position.y = 1.9;
      pole.castShadow = true;
      slGroup.add(pole);
      
      // Arm
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), poleMat);
      arm.geometry.rotateX(Math.PI / 2);
      arm.position.set(0, 3.8, 0.4);
      arm.castShadow = true;
      slGroup.add(arm);
      
      // Head
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.45), poleMat);
      head.position.set(0, 3.8, 0.8);
      head.castShadow = true;
      slGroup.add(head);
      
      // Bulb
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffe29a }));
      bulb.position.set(0, 3.74, 0.8);
      slGroup.add(bulb);
      
      // Volumetric beam cone
      const beamGeo = new THREE.ConeGeometry(0.8, 3.6, 16, 1, true);
      beamGeo.translate(0, -1.8, 0); // shift origin to tip
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xfffae0,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, 3.74, 0.8);
      slGroup.add(beam);
      
      streetLightsGroup.add(slGroup);
    };
    createStreetLight(-22);
    createStreetLight(-7);
    createStreetLight(6);
    createStreetLight(22);
    createStreetLight(37);

    // --- Procedural City Trees with multi-shade branch crown details ---
    const trees = [];
    const createOrganicTree = (x, z) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0.1, z);

      // Main trunk
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3f2305, roughness: 0.95 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, 1.6, 8), trunkMat);
      trunk.position.y = 0.8;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Procedural branches & cluster crowns
      const makeBranch = (by, length, rotZ, rotY) => {
        const branchGeo = new THREE.CylinderGeometry(0.06, 0.1, length, 8);
        branchGeo.translate(0, length / 2, 0);
        const branch = new THREE.Mesh(branchGeo, trunkMat);
        branch.position.set(0, by, 0);
        branch.rotation.z = rotZ;
        branch.rotation.y = rotY;
        branch.castShadow = true;
        treeGroup.add(branch);
        
        // Add multi-toned green/yellow foliage cluster at the end
        const leafColors = [0x15803d, 0x166534, 0x4d7c0f, 0xeab308, 0x15803d];
        const clr = leafColors[Math.floor(Math.random() * leafColors.length)];
        const foliageMat = new THREE.MeshStandardMaterial({ color: clr, roughness: 0.9, flatShading: true });
        
        const folGeo = new THREE.SphereGeometry(0.65 + Math.random() * 0.25, 8, 8);
        const foliage = new THREE.Mesh(folGeo, foliageMat);
        const tx = -Math.sin(rotZ) * length;
        const ty = by + Math.cos(rotZ) * length;
        foliage.position.set(tx, ty, 0);
        foliage.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
        foliage.castShadow = true;
        treeGroup.add(foliage);
      };

      makeBranch(1.1, 1.0, 0.5, 0);
      makeBranch(1.2, 0.9, -0.6, Math.PI * 0.65);
      makeBranch(1.3, 0.8, 0.6, -Math.PI * 0.75);
      makeBranch(1.4, 1.0, -0.4, Math.PI * 1.35);

      // Center crown
      const crownMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.9, flatShading: true });
      const crown = new THREE.Mesh(new THREE.SphereGeometry(0.85, 8, 8), crownMat);
      crown.position.set(0, 2.3, 0);
      crown.castShadow = true;
      treeGroup.add(crown);

      scene.add(treeGroup);
      trees.push(treeGroup.position);
    };

    createOrganicTree(-10, -7.5);
    createOrganicTree(14, -7.5);
    createOrganicTree(28, -7.5);


    // --- 4. PHOTOREALISTIC TAXI MODEL (Automotive Paint & Chrome Details) ---
    const taxiGroup = new THREE.Group();
    scene.add(taxiGroup);

    // Real automotive paint material (Physical Material with clearcoat)
    const taxiYellowPaintMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b, // amber yellow
      roughness: 0.14,
      metalness: 0.15,
      clearcoat: 1.0,          // Automotive clear coat layer
      clearcoatRoughness: 0.04
    });

    const chromeTrimMat = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      metalness: 0.98, 
      roughness: 0.06 
    }); // shiny polished chrome

    const blackTireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 }); // tire rubber
    const glassTintMat = new THREE.MeshPhysicalMaterial({
      color: 0xa5f3fc, // light cyan tint
      roughness: 0.05,
      metalness: 0.95,
      transmission: 0.35,
      transparent: true,
      opacity: 0.7
    });

    // Create a suspension chassis group that contains all body parts, allowing them to tilt independent of wheels
    const taxiChassisGroup = new THREE.Group();
    taxiGroup.add(taxiChassisGroup);

    // Lower Chassis
    const taxiLower = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.5, 1.8), taxiYellowPaintMat);
    taxiLower.position.y = 0.65;
    taxiLower.castShadow = true;
    taxiLower.receiveShadow = true;
    taxiChassisGroup.add(taxiLower);

    // Sloped Hood
    const taxiHood = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.22, 1.76), taxiYellowPaintMat);
    taxiHood.position.set(1.725, 0.85, 0);
    taxiHood.castShadow = true;
    taxiChassisGroup.add(taxiHood);

    // Sloped Trunk
    const taxiTrunk = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.22, 1.76), taxiYellowPaintMat);
    taxiTrunk.position.set(-1.775, 0.85, 0);
    taxiTrunk.castShadow = true;
    taxiChassisGroup.add(taxiTrunk);

    // Aerodynamic grill
    const grillFrame = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 1.25), chromeTrimMat);
    grillFrame.position.set(2.21, 0.62, 0);
    taxiChassisGroup.add(grillFrame);

    for (let i = -0.45; i <= 0.45; i += 0.225) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.25, 0.04), chromeTrimMat);
      bar.position.set(2.22, 0.62, i);
      taxiChassisGroup.add(bar);
    }

    // Cabin
    const taxiCabin = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.7, 1.62), taxiYellowPaintMat);
    taxiCabin.position.set(-0.25, 1.35, 0);
    taxiCabin.castShadow = true;
    taxiCabin.receiveShadow = true;
    taxiChassisGroup.add(taxiCabin);

    // Reflective Windshields (front and rear)
    const makeTaxiWindow = (w, h, d, x, y, z) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), glassTintMat);
      win.position.set(x, y, z);
      taxiChassisGroup.add(win);
    };
    makeTaxiWindow(0.04, 0.52, 1.4, 0.94, 1.35, 0);
    makeTaxiWindow(0.04, 0.52, 1.4, -1.44, 1.35, 0);
    makeTaxiWindow(0.85, 0.42, 0.04, 0.35, 1.35, 0.82);
    makeTaxiWindow(0.85, 0.42, 0.04, -0.65, 1.35, 0.82);
    makeTaxiWindow(0.85, 0.42, 0.04, 0.35, 1.35, -0.82);
    makeTaxiWindow(0.85, 0.42, 0.04, -0.65, 1.35, -0.82);

    // Chrome Bumpers
    const bumperF = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 1.84), chromeTrimMat);
    bumperF.position.set(2.18, 0.45, 0);
    bumperF.castShadow = true;
    taxiChassisGroup.add(bumperF);

    const bumperB = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 1.84), chromeTrimMat);
    bumperB.position.set(-2.24, 0.45, 0);
    bumperB.castShadow = true;
    taxiChassisGroup.add(bumperB);

    // Door rearview side-mirrors
    const createMirror = (zOffset) => {
      const mGroup = new THREE.Group();
      mGroup.position.set(0.8, 1.05, zOffset);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.16, 6), chromeTrimMat);
      stem.geometry.rotateX(Math.PI/2);
      mGroup.add(stem);
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.12), taxiYellowPaintMat);
      mirror.position.set(0.08, 0, zOffset > 0 ? 0.08 : -0.08);
      mirror.castShadow = true;
      mGroup.add(mirror);
      taxiChassisGroup.add(mGroup);
    };
    createMirror(0.9);
    createMirror(-0.9);

    // Chrome door handles
    const createDoorHandle = (x, z) => {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.03), chromeTrimMat);
      handle.position.set(x, 0.95, z);
      taxiChassisGroup.add(handle);
    };
    createDoorHandle(0.7, 0.91);
    createDoorHandle(-0.25, 0.91);
    createDoorHandle(0.7, -0.91);
    createDoorHandle(-0.25, -0.91);

    // License plates
    const plateF = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.35), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    plateF.position.set(2.28, 0.45, 0);
    taxiChassisGroup.add(plateF);

    const plateB = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.35), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    plateB.position.set(-2.34, 0.45, 0);
    taxiChassisGroup.add(plateB);

    // Chrome exhausts
    const tailPipeL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8), chromeTrimMat);
    tailPipeL.geometry.rotateX(Math.PI/2);
    tailPipeL.position.set(-2.2, 0.35, 0.45);
    taxiChassisGroup.add(tailPipeL);
    const tailPipeR = tailPipeL.clone();
    tailPipeR.position.set(-2.2, 0.35, -0.45);
    taxiChassisGroup.add(tailPipeR);

    // Detailed Wheels (Front wheels steerable, rear wheels static roll)
    const wheels = [];
    const frontWheels = [];
    const tyreGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 24);
    tyreGeo.rotateX(Math.PI / 2);
    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.32, 12);
    rimGeo.rotateX(Math.PI / 2);

    const addWheel = (x, z, isFront) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(x, 0.42, z);

      const tyre = new THREE.Mesh(tyreGeo, blackTireMat);
      tyre.castShadow = true;
      wGroup.add(tyre);

      const rim = new THREE.Mesh(rimGeo, chromeTrimMat);
      wGroup.add(rim);

      // Hub spokes
      for (let i = 0; i < 6; i++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.34), chromeTrimMat);
        spoke.rotation.z = (i * Math.PI) / 6;
        wGroup.add(spoke);
      }

      // Add directly to taxiGroup (so body suspension pitching/rolling doesn't tilt the wheels on the road)
      taxiGroup.add(wGroup);
      wheels.push(wGroup);
      if (isFront) {
        frontWheels.push(wGroup);
      }
    };

    addWheel(1.25, 0.95, true);   // Front Right
    addWheel(-1.25, 0.95, false);  // Rear Right
    addWheel(1.25, -0.95, true);  // Front Left
    addWheel(-1.25, -0.95, false); // Rear Left

    // Headlight housings
    const glassCoverGeo = new THREE.SphereGeometry(0.12, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    glassCoverGeo.rotateX(Math.PI / 2);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });
    const glassLensMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.02, transparent: true, opacity: 0.45 });

    const makeHeadlightAssembly = (x, y, z) => {
      const hlGroup = new THREE.Group();
      hlGroup.position.set(x, y, z);

      const backReflector = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), chromeTrimMat);
      backReflector.position.x = -0.05;
      hlGroup.add(backReflector);

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), bulbMat);
      hlGroup.add(bulb);

      const cover = new THREE.Mesh(glassCoverGeo, glassLensMat);
      hlGroup.add(cover);

      taxiChassisGroup.add(hlGroup);
    };
    makeHeadlightAssembly(2.12, 0.72, 0.55);
    makeHeadlightAssembly(2.12, 0.72, -0.55);

    // Taillight assemblies
    const redBulbMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const makeTaillightAssembly = (x, y, z) => {
      const tlGroup = new THREE.Group();
      tlGroup.position.set(x, y, z);
      
      const cover = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, 0.3), redBulbMat);
      tlGroup.add(cover);
      
      const chromeFrame = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.16, 0.34), chromeTrimMat);
      chromeFrame.position.x = -0.01;
      tlGroup.add(chromeFrame);
      
      taxiChassisGroup.add(tlGroup);
    };
    makeTaillightAssembly(-2.21, 0.72, 0.55);
    makeTaillightAssembly(-2.21, 0.72, -0.55);

    // Headlight road projection beams
    const beamProjectionMat = new THREE.MeshBasicMaterial({
      color: 0xfffae0,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Length = 6.0, width = 1.6
    const headBeamGeo = new THREE.PlaneGeometry(6.0, 1.6);
    headBeamGeo.rotateX(-Math.PI / 2);
    headBeamGeo.translate(3.0, 0, 0); // extend forward from origin
    
    const leftBeamProj = new THREE.Mesh(headBeamGeo, beamProjectionMat);
    leftBeamProj.position.set(2.12, 0.015, 0.55);
    taxiGroup.add(leftBeamProj);
    
    const rightBeamProj = new THREE.Mesh(headBeamGeo, beamProjectionMat);
    rightBeamProj.position.set(2.12, 0.015, -0.55);
    taxiGroup.add(rightBeamProj);

    // Roof sign
    const signGroup = new THREE.Group();
    signGroup.position.set(-0.25, 1.85, 0);
    const signB = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.25), taxiYellowPaintMat);
    signB.castShadow = true;
    signGroup.add(signB);

    const signCenterMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffa000,
      emissiveIntensity: 1.2,
      roughness: 0.2
    });
    const signC = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.27), signCenterMat);
    signGroup.add(signC);
    taxiChassisGroup.add(signGroup);

    // Passenger Door (Rear-Right)
    const doorGroup = new THREE.Group();
    doorGroup.position.set(-0.25, 0.68, 0.9);
    taxiChassisGroup.add(doorGroup);

    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.68, 0.05), taxiYellowPaintMat);
    doorPanel.geometry.translate(-0.45, 0, 0);
    doorPanel.castShadow = true;
    doorGroup.add(doorPanel);


    // --- 5. DETAILED FIGURINE PASSENGER (Realistic Suit styling) ---
    const manGroup = new THREE.Group();
    scene.add(manGroup);

    const suitGreyMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 }); // blazer grey
    const pantsSlateMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 }); // trousers
    const whiteShirt = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const redTieMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.7 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xdfa080, roughness: 0.6 }); // peaches-and-cream skin tone

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 18), skinMat);
    head.position.y = 1.62;
    head.castShadow = true;
    manGroup.add(head);

    // Nose
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.08, 4), skinMat);
    nose.geometry.rotateX(Math.PI / 2);
    nose.position.set(0, 0, 0.23);
    head.add(nose);

    // Styled hair
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12, 0, Math.PI * 2, 0, Math.PI / 1.8), new THREE.MeshStandardMaterial({ color: 0x3f2305, roughness: 0.8 }));
    hair.rotation.x = -0.25;
    head.add(hair);

    // Eyes
    const eyeG = new THREE.SphereGeometry(0.024, 6, 6);
    const eyeM = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eyeL = new THREE.Mesh(eyeG, eyeM);
    eyeL.position.set(0.12, 0.04, 0.16);
    head.add(eyeL);
    const eyeR = new THREE.Mesh(eyeG, eyeM);
    eyeR.position.set(-0.12, 0.04, 0.16);
    head.add(eyeR);

    // Torso (Suit Blazer)
    const torsoL = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.23, 0.5, 12), suitGreyMat);
    torsoL.position.y = 1.05;
    torsoL.castShadow = true;
    manGroup.add(torsoL);

    const torsoU = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.21, 0.35, 12), suitGreyMat);
    torsoU.position.y = 1.35;
    torsoU.castShadow = true;
    manGroup.add(torsoU);

    // White shirt collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.08, 12), whiteShirt);
    collar.position.y = 1.5;
    manGroup.add(collar);

    // Tie
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.28, 0.03), redTieMat);
    tie.position.set(0, 1.36, 0.2);
    tie.rotation.x = 0.05;
    manGroup.add(tie);

    // Legs with joints
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(0.1, 0.8, 0);
    manGroup.add(leftLegGroup);

    const legUpperL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.38, 8), pantsSlateMat);
    legUpperL.position.y = -0.19;
    legUpperL.castShadow = true;
    leftLegGroup.add(legUpperL);

    const legLowerL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.38, 8), pantsSlateMat);
    legLowerL.position.y = -0.55;
    legLowerL.castShadow = true;
    leftLegGroup.add(legLowerL);

    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.22), blackTireMat);
    shoeL.position.set(0, -0.74, 0.05);
    shoeL.castShadow = true;
    leftLegGroup.add(shoeL);

    // Right Leg
    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(-0.1, 0.8, 0);
    manGroup.add(rightLegGroup);

    const legUpperR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.38, 8), pantsSlateMat);
    legUpperR.position.y = -0.19;
    legUpperR.castShadow = true;
    rightLegGroup.add(legUpperR);

    const legLowerR = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.38, 8), pantsSlateMat);
    legLowerR.position.y = -0.55;
    legLowerR.castShadow = true;
    rightLegGroup.add(legLowerR);

    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.22), blackTireMat);
    shoeR.position.set(0, -0.74, 0.05);
    shoeR.castShadow = true;
    rightLegGroup.add(shoeR);

    // Arms
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(0.28, 1.42, 0);
    manGroup.add(leftArmGroup);

    const armUpperL = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.058, 0.35, 8), suitGreyMat);
    armUpperL.position.y = -0.18;
    armUpperL.castShadow = true;
    leftArmGroup.add(armUpperL);

    const armLowerL = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.05, 0.32, 8), suitGreyMat);
    armLowerL.position.y = -0.48;
    armLowerL.castShadow = true;
    leftArmGroup.add(armLowerL);

    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), skinMat);
    handL.position.y = -0.66;
    leftArmGroup.add(handL);

    // Right Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(-0.28, 1.42, 0);
    manGroup.add(rightArmGroup);

    const armUpperR = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.058, 0.35, 8), suitGreyMat);
    armUpperR.position.y = -0.18;
    armUpperR.castShadow = true;
    rightArmGroup.add(armUpperR);

    const armLowerR = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.05, 0.32, 8), suitGreyMat);
    armLowerR.position.y = -0.48;
    armLowerR.castShadow = true;
    rightArmGroup.add(armLowerR);

    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), skinMat);
    handR.position.y = -0.66;
    rightArmGroup.add(handR);


    // --- 6. Exhaust Smoke & Falling Leaves Particle Pools ---
    const smokeParticles = [];
    const maxSmoke = 25;
    const smokeGeo = new THREE.SphereGeometry(0.08, 6, 6);
    
    for (let i = 0; i < maxSmoke; i++) {
      const smMat = new THREE.MeshBasicMaterial({
        color: 0xdddddd,
        transparent: true,
        opacity: 0,
        depthWrite: false
      });
      const smMesh = new THREE.Mesh(smokeGeo, smMat);
      scene.add(smMesh);
      smokeParticles.push({
        mesh: smMesh,
        active: false,
        age: 0,
        life: 0,
        vel: new THREE.Vector3()
      });
    }

    const spawnSmoke = (originPos) => {
      const p = smokeParticles.find(part => !part.active);
      if (!p) return;
      p.active = true;
      p.age = 0;
      p.life = 0.5 + Math.random() * 0.4;
      p.mesh.position.copy(originPos);
      p.mesh.scale.set(1, 1, 1);
      p.mesh.material.opacity = 0.4;
      p.vel.set(
        -1.5 - Math.random() * 1.5, // Blow back
        0.3 + Math.random() * 0.4,   // Rise
        (Math.random() - 0.5) * 0.4
      );
    };

    const updateSmoke = (dt) => {
      smokeParticles.forEach(p => {
        if (!p.active) return;
        p.age += dt;
        if (p.age >= p.life) {
          p.active = false;
          p.mesh.material.opacity = 0;
        } else {
          p.mesh.position.addScaledVector(p.vel, dt);
          const ratio = p.age / p.life;
          p.mesh.material.opacity = 0.4 * (1 - ratio);
          const sc = 1.0 + ratio * 3.5;
          p.mesh.scale.set(sc, sc, sc);
        }
      });
    };

    const leafParticles = [];
    const maxLeaves = 30;
    const leafGeo = new THREE.BoxGeometry(0.12, 0.01, 0.08);

    for (let i = 0; i < maxLeaves; i++) {
      const leafColors = [0x22c55e, 0x15803d, 0x84cc16, 0xeab308, 0xf97316];
      const lMat = new THREE.MeshStandardMaterial({
        color: leafColors[i % leafColors.length],
        roughness: 0.9,
        side: THREE.DoubleSide
      });
      const lMesh = new THREE.Mesh(leafGeo, lMat);
      lMesh.position.y = -100;
      scene.add(lMesh);
      leafParticles.push({
        mesh: lMesh,
        active: false,
        age: 0,
        life: 0,
        vel: new THREE.Vector3(),
        rotSpeed: new THREE.Vector3()
      });
    }

    let leafSpawnTimer = 0;
    const updateLeaves = (dt) => {
      leafSpawnTimer += dt;
      if (leafSpawnTimer > 0.4) {
        leafSpawnTimer = 0;
        if (trees.length > 0) {
          const tPos = trees[Math.floor(Math.random() * trees.length)];
          const p = leafParticles.find(part => !part.active);
          if (p) {
            p.active = true;
            p.age = 0;
            p.life = 4.0 + Math.random() * 3.0;
            p.mesh.position.set(
              tPos.x + (Math.random() - 0.5) * 2.2,
              2.0 + Math.random() * 1.5,
              tPos.z + (Math.random() - 0.5) * 2.2
            );
            p.mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            p.vel.set(
              (Math.random() - 0.5) * 0.4,
              -0.6 - Math.random() * 0.4,
              (Math.random() - 0.5) * 0.4
            );
            p.rotSpeed.set(
              1 + Math.random() * 3,
              1 + Math.random() * 3,
              1 + Math.random() * 3
            );
          }
        }
      }

      leafParticles.forEach(p => {
        if (!p.active) return;
        p.age += dt;
        if (p.age >= p.life || p.mesh.position.y <= 0.1) {
          p.active = false;
          p.mesh.position.y = -100;
        } else {
          p.mesh.position.x += Math.sin(p.age * 3.0 + p.life) * dt * 0.5;
          p.mesh.position.addScaledVector(p.vel, dt);
          p.mesh.rotation.x += p.rotSpeed.x * dt;
          p.mesh.rotation.y += p.rotSpeed.y * dt;
          p.mesh.rotation.z += p.rotSpeed.z * dt;
        }
      });
    };


    // --- 7. Animation / Tick Loop (Automatic Cinematic Physics Path) ---
    let lastTime = performance.now() * 0.001;
    let elapsedTime = 0;

    const pWait = new THREE.Vector3(1.2, 0.2, -3.2);
    const pDrop = new THREE.Vector3(19.2, 0.2, -3.2);
    
    const taxiPLeft = -40;
    const taxiPStop1 = 1.2;
    const taxiPStop2 = 19.2;
    const taxiPRight = 55;

    const lookTarget = new THREE.Vector3(0, 0.8, 0);
    const cameraTargetPos = new THREE.Vector3();

    // Physics state tracking
    let prevTaxiX = taxiPLeft;
    let prevTaxiZ = 1.0;
    let taxiVelX = 0;
    let taxiVelZ = 0;
    let taxiAccX = 0;
    let prevTaxiIsMoving = false;

    let chassisPitch = 0;
    let chassisPitchVel = 0;
    let chassisRoll = 0;
    let chassisRollVel = 0;
    let chassisBounceY = 0;
    let chassisBounceYVel = 0;

    const tick = () => {
      const currentTime = performance.now() * 0.001;
      const dt = Math.min(currentTime - lastTime, 0.1);
      lastTime = currentTime;
      elapsedTime += dt;

      const loopDuration = 18; // 18-second auto loop
      const rawProgress = (elapsedTime % loopDuration) / loopDuration;

      // Wrap-around reset
      if (rawProgress < currentProgressRef.current - 0.5) {
        currentProgressRef.current = rawProgress;
      } else {
        currentProgressRef.current += (rawProgress - currentProgressRef.current) * 0.08;
      }
      const t = currentProgressRef.current;

      manGroup.visible = true;
      let taxiX = taxiPLeft;
      let taxiZ = 1.0;
      let manPos = pWait.clone();
      let doorRot = 0;
      let taxiIsMoving = false;
      let manIsWalking = false;
      let manIsWaving = false;
      let manDirection = 0;

      // Cinematic Timeline Script (with Z pullovers and steering coordinates)
      if (t <= 0.35) {
        // Phase 1: Taxi Approaching. Pulls over to Z = 0.5
        const pt = t / 0.35;
        const easedPt = 1 - Math.pow(1 - pt, 3);
        taxiX = THREE.MathUtils.lerp(taxiPLeft, taxiPStop1, easedPt);
        taxiZ = THREE.MathUtils.lerp(1.2, 0.5, pt);
        
        taxiIsMoving = pt < 0.98;
        manPos.copy(pWait);
        manIsWaving = true;
        manDirection = Math.PI;

        // Camera: Low angle looking past the man
        cameraTargetPos.set(
          THREE.MathUtils.lerp(9.5, 4.5, pt),
          2.0,
          THREE.MathUtils.lerp(12.5, 8.5, pt)
        );
        lookTarget.set(
          THREE.MathUtils.lerp(-18, taxiPStop1, pt), 
          0.8, 
          THREE.MathUtils.lerp(0, 0.5, pt)
        );

      } else if (t <= 0.52) {
        // Phase 2: Boarding
        const pt = (t - 0.35) / (0.52 - 0.35);
        taxiX = taxiPStop1;
        taxiZ = 0.5;
        taxiIsMoving = false;

        const targetDoorEntrance = new THREE.Vector3(taxiPStop1 - 0.25, 0.3, taxiZ + 0.9);

        if (pt <= 0.3) {
          const doorPt = pt / 0.3;
          doorRot = THREE.MathUtils.lerp(0, Math.PI / 2.2, doorPt);
          manPos.copy(pWait);
          manIsWaving = true;
          manDirection = Math.PI;
        } else if (pt <= 0.8) {
          const walkPt = (pt - 0.3) / 0.5;
          doorRot = Math.PI / 2.2;
          manPos.lerpVectors(pWait, targetDoorEntrance, walkPt);
          manIsWalking = true;
          manDirection = Math.PI / 2.2;
        } else {
          const doorClosePt = (pt - 0.8) / 0.2;
          doorRot = THREE.MathUtils.lerp(Math.PI / 2.2, 0, doorClosePt);
          manGroup.visible = false;
        }

        // Camera: Zoom-in focus on passenger door
        cameraTargetPos.set(
          THREE.MathUtils.lerp(4.5, 4.0, pt),
          THREE.MathUtils.lerp(2.0, 1.6, pt),
          THREE.MathUtils.lerp(8.5, 6.0, pt)
        );
        lookTarget.set(1.0, 0.9, THREE.MathUtils.lerp(-0.5, 0.6, pt));

      } else if (t <= 0.80) {
        // Phase 3: Riding & Driving. Pulls back out to Z = 1.2, then pulls over to Z = 0.5 at drop point
        const pt = (t - 0.52) / (0.80 - 0.52);
        const easedPt = pt * pt * (3 - 2 * pt);
        
        taxiX = THREE.MathUtils.lerp(taxiPStop1, taxiPStop2, easedPt);
        
        if (pt <= 0.3) {
          taxiZ = THREE.MathUtils.lerp(0.5, 1.2, pt / 0.3);
        } else if (pt <= 0.7) {
          taxiZ = 1.2;
        } else {
          taxiZ = THREE.MathUtils.lerp(1.2, 0.5, (pt - 0.7) / 0.3);
        }

        taxiIsMoving = pt > 0.02 && pt < 0.98;
        manGroup.visible = false;
        doorRot = 0;

        // Camera: Grand daytime city skyscraper tracking sweep
        cameraTargetPos.set(
          THREE.MathUtils.lerp(4.0, 24.0, pt),
          THREE.MathUtils.lerp(1.6, 5.0, pt),
          THREE.MathUtils.lerp(6.0, 13.0, pt)
        );
        lookTarget.set(taxiX + 1.5, 1.0, 0);

      } else if (t <= 0.93) {
        // Phase 4: Drop-off
        const pt = (t - 0.80) / (0.93 - 0.80);
        taxiX = taxiPStop2;
        taxiZ = 0.5;
        taxiIsMoving = false;

        const startDoorEntrance = new THREE.Vector3(taxiPStop2 - 0.25, 0.3, taxiZ + 0.9);

        if (pt <= 0.3) {
          manGroup.visible = false;
          const doorPt = pt / 0.3;
          doorRot = THREE.MathUtils.lerp(0, Math.PI / 2.2, doorPt);
        } else if (pt <= 0.8) {
          manGroup.visible = true;
          const walkPt = (pt - 0.3) / 0.5;
          doorRot = Math.PI / 2.2;
          manPos.lerpVectors(startDoorEntrance, pDrop, walkPt);
          manIsWalking = true;
          manDirection = -Math.PI / 2.0;
        } else {
          manGroup.visible = true;
          const doorClosePt = (pt - 0.8) / 0.2;
          doorRot = THREE.MathUtils.lerp(Math.PI / 2.2, 0, doorClosePt);
          manPos.copy(pDrop);
          manDirection = Math.PI;
        }

        // Camera: Lower front-quarter angle viewing drop-off
        cameraTargetPos.set(
          THREE.MathUtils.lerp(24.0, 22.5, pt),
          THREE.MathUtils.lerp(5.0, 2.3, pt),
          THREE.MathUtils.lerp(13.0, 8.5, pt)
        );
        lookTarget.set(19.2, 0.8, THREE.MathUtils.lerp(0, -1.0, pt));

      } else {
        // Phase 5: Taxi Departs. Pulls back out to Z = 1.2
        const pt = (t - 0.93) / (1.0 - 0.93);
        const easedPt = pt * pt;
        taxiX = THREE.MathUtils.lerp(taxiPStop2, taxiPRight, easedPt);
        taxiZ = THREE.MathUtils.lerp(0.5, 1.2, Math.min(pt / 0.5, 1.0));
        
        taxiIsMoving = pt < 0.98;
        doorRot = 0;
        manPos.copy(pDrop);
        manIsWaving = true;
        manDirection = Math.PI;

        // Camera: Crane sweep looking up towards sky-high buildings
        cameraTargetPos.set(
          THREE.MathUtils.lerp(22.5, 21.0, pt),
          THREE.MathUtils.lerp(2.3, 5.5, pt),
          THREE.MathUtils.lerp(8.5, 14.0, pt)
        );
        lookTarget.set(
          THREE.MathUtils.lerp(19.2, 28.0, pt),
          THREE.MathUtils.lerp(0.8, 4.0, pt),
          THREE.MathUtils.lerp(-1.0, -5.0, pt)
        );
      }

      // --- Spring Suspension Physics Calculations ---
      if (dt > 0) {
        const vx = (taxiX - prevTaxiX) / dt;
        const vz = (taxiZ - prevTaxiZ) / dt;
        taxiAccX = (vx - taxiVelX) / dt;
        taxiVelX = vx;
        taxiVelZ = vz;
      }
      prevTaxiX = taxiX;
      prevTaxiZ = taxiZ;

      // Suspension target angles
      const targetPitch = taxiAccX * 0.007; // dip forward on brake (acc < 0), squat back on acceleration (acc > 0)
      const targetRoll = -taxiVelZ * 0.15;  // roll chassis outward during lane sweeps

      // Suspension spring integration
      const stiffness = 8.0;
      const damping = 3.2;

      const pitchForce = stiffness * (targetPitch - chassisPitch);
      chassisPitchVel += (pitchForce - damping * chassisPitchVel) * dt;
      chassisPitch += chassisPitchVel * dt;

      const rollForce = stiffness * (targetRoll - chassisRoll);
      chassisRollVel += (rollForce - damping * chassisRollVel) * dt;
      chassisRoll += chassisRollVel * dt;

      // Stop bumper rebound bounce
      if (!taxiIsMoving && prevTaxiIsMoving) {
        chassisBounceYVel = -0.25; // nose dip impact
        chassisPitchVel = -0.16;
      }
      prevTaxiIsMoving = taxiIsMoving;

      const targetBounceY = taxiIsMoving ? Math.sin(elapsedTime * 45) * 0.008 : 0;
      const bounceForce = 16.0 * (targetBounceY - chassisBounceY);
      chassisBounceYVel += (bounceForce - 4.5 * chassisBounceYVel) * dt;
      chassisBounceY += chassisBounceYVel * dt;

      // Apply chassis movement, independent of wheels
      taxiChassisGroup.rotation.z = chassisPitch;
      taxiChassisGroup.rotation.x = chassisRoll;
      taxiChassisGroup.position.y = chassisBounceY;

      // Render Positions & Rotations
      taxiGroup.position.x = taxiX;
      taxiGroup.position.z = taxiZ;
      doorGroup.rotation.y = -doorRot;

      manGroup.position.copy(manPos);
      manGroup.rotation.y = manDirection;

      // Exhaust Smoke spawn
      if (taxiIsMoving && Math.random() < 0.35) {
        // World coordinates of tailpipes
        const leftPipePos = new THREE.Vector3(-2.2, 0.35, 0.45);
        leftPipePos.applyMatrix4(taxiGroup.matrixWorld);
        spawnSmoke(leftPipePos);

        const rightPipePos = new THREE.Vector3(-2.2, 0.35, -0.45);
        rightPipePos.applyMatrix4(taxiGroup.matrixWorld);
        spawnSmoke(rightPipePos);
      }

      // Update Particles
      updateSmoke(dt);
      updateLeaves(dt);

      // Spin Wheels and steer front wheels
      if (taxiIsMoving) {
        wheels.forEach(w => {
          w.rotation.z -= 0.18;
        });
      }

      // Rotate steerable front wheels
      const steeringAngle = taxiVelX !== 0 ? Math.atan2(taxiVelZ, Math.abs(taxiVelX)) : 0;
      frontWheels.forEach(w => {
        w.rotation.y = steeringAngle * 2.2;
      });

      // Man Animations
      if (manGroup.visible) {
        if (manIsWalking) {
          const limbSpeed = 16;
          const swingAngle = 0.45;
          const swing = Math.sin(elapsedTime * limbSpeed) * swingAngle;
          
          leftLegGroup.rotation.z = swing;
          rightLegGroup.rotation.z = -swing;
          leftArmGroup.rotation.z = -swing * 0.8;
          rightArmGroup.rotation.z = swing * 0.8;
          
          leftArmGroup.rotation.x = 0;
          manGroup.position.y = manPos.y + Math.abs(Math.sin(elapsedTime * limbSpeed)) * 0.04;
        } else if (manIsWaving) {
          leftLegGroup.rotation.z = 0;
          rightLegGroup.rotation.z = 0;
          rightArmGroup.rotation.z = 0.1;
          
          // Wave left arm
          leftArmGroup.rotation.z = Math.PI * 0.8;
          leftArmGroup.rotation.x = Math.sin(elapsedTime * 6) * 0.35;
          manGroup.position.y = manPos.y;
        } else {
          // Idle breathing
          leftLegGroup.rotation.z = 0;
          rightLegGroup.rotation.z = 0;
          leftArmGroup.rotation.z = 0.05;
          leftArmGroup.rotation.x = 0;
          rightArmGroup.rotation.z = -0.05;
          manGroup.position.y = manPos.y + Math.sin(elapsedTime * 3.5) * 0.008;
        }
      }

      // Smooth out scroll progress (low-pass filter)
      smoothScrollRef.current += (scrollRef.current - smoothScrollRef.current) * 0.08;
      const s = smoothScrollRef.current;

      // Cinematic scroll fly-through: swoop camera up and zoom out as user scrolls down the page
      cameraTargetPos.y += s * 14.0;
      cameraTargetPos.z += s * 18.0;
      cameraTargetPos.x -= s * 12.0;

      lookTarget.y += s * 4.0;
      lookTarget.x += s * 6.0;

      // Apply camera positions and focal points smoothly with handheld wobble
      const wobbleX = Math.sin(elapsedTime * 1.5) * 0.04;
      const wobbleY = Math.cos(elapsedTime * 1.8) * 0.03;
      const wobbleZ = Math.sin(elapsedTime * 2.2) * 0.04;

      const wobbledCameraPos = cameraTargetPos.clone().add(new THREE.Vector3(wobbleX, wobbleY, wobbleZ));
      camera.position.lerp(wobbledCameraPos, 0.12);

      const wobbledLookTarget = lookTarget.clone().add(new THREE.Vector3(wobbleX * 0.4, wobbleY * 0.4, wobbleZ * 0.4));
      camera.lookAt(wobbledLookTarget);

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    // --- 8. Resize Handler ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight || 600;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- 9. Cleanup ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      });
      // Dispose custom materials explicitly
      skyMat.dispose();
      glowingWindowMat.dispose();
      beamProjectionMat.dispose();
      smokeGeo.dispose();
      leafGeo.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0 select-none cursor-default z-0"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default ThreeHeroAnimation;
