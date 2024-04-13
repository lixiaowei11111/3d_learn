import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 创建场景
const scene = new THREE.Scene();

// 添加相机
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// 加载模型
const loader = new GLTFLoader();
loader.load('./model.glb', function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    camera.position.set(0, 0, 5);

    // 调整模型位置、缩放等属性
    // model.position.set(0, 0, 0);
    // model.scale.set(1, 1, 1);

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // 更新控件状态
        renderer.render(scene, camera);
    }
    animate();
});
