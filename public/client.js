import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { FontLoader } from './jsm/loaders/FontLoader.js';
import { TextGeometry } from './jsm/geometries/TextGeometry.js';

//texture loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('textures/moon_normalMap2.jpg');
const texture = textureLoader.load('textures/moon_map.jpg');

// const fontLoader = new FontLoader();
// const font = fontLoader.load('fonts/space_corner.json', function(obj){
//     console.log(font);
// },function ( err ) {
//     console.error( err );
// });


//instanciate scene
const scene = new THREE.Scene();

//instanciate camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(-0.82, 1.16, 4.6);

//instanciate renderer
const renderer = new THREE.WebGLRenderer({
    // canvas : canvas,
    alpha : true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Orbital control instanciate
const controls = new OrbitControls(camera, renderer.domElement);

//Instanciate geometry
const geometry = new THREE.SphereGeometry(1.5,32,16);

// const textGeometry = new TextGeometry( '.diferit', {
//     font:font,
//     size: 80,
//     height: 5,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 10,
//     bevelSize: 8,
//     bevelOffset: 0,
//     bevelSegments: 5
// } );

// //Particles geometry
// const particlesGeometry = new THREE.BufferGeometry;
// const particleCount = 5000;

// const posArray = new Float32Array(particleCount * 3);

// for(let i=0; i< particleCount * 3; i++)
// {
//     posArray[i] = (Math.random() - 0.5) * 5;
// }

// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

//instanciate material
const material = new THREE.MeshStandardMaterial({
    metalness: 0.312,
    roughness: 0.939,
    color: 0xFEFCD7,
    wireframe: false,
    normalMap : normalTexture,
    map : texture,
});

const textMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.312,
    roughness: 0.939,
    color: 0xFEFCD7,
    wireframe: false,

});
// //particle material
// const particleMaterial = new THREE.PointsMaterial({
//    size: 0.005 
// });

// Basic material
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00CC00,
//     wireframe: true,
// });

// const particles = new THREE.Points(particlesGeometry,particleMaterial );

// instanciate mesh object = geometry + material  
const sphere = new THREE.Mesh(geometry, material);

// const textMesh = new THREE.Mesh(textGeometry, textMaterial);

// adding object to scene
scene.add(sphere);
// scene.add(textMesh);


const loader = new FontLoader();

loader.load( 'fonts/space_corner.json', function ( space_font ) {


    const textGeometry = new TextGeometry('.diferit',{
        font: space_font,
        height : 0.1,
        size : 0.7,
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-2,3,-2);
    textMesh.rotateY(-0.15);
    scene.add(textMesh);
} );


//lights
const lightAmbient = new THREE.AmbientLight(0xffffff,0.5);
lightAmbient.visible = false;

const lightPoint = new THREE.PointLight(0xffffff,0.5,4.13);
lightPoint.position.set(-1, -0.39, 2.06);
//lightPoint.visible = false;

const lightDirectional = new THREE.DirectionalLight(0xffffff,0.5);
lightDirectional.position.set(-1, -0.548, 0.508);

const helperPointLight = new THREE.PointLightHelper( lightPoint, 5 );
scene.add(helperPointLight);
helperPointLight.visible = false;

const helperDirectionalLight = new THREE.DirectionalLightHelper( lightDirectional, 5 );
scene.add( helperDirectionalLight );
helperDirectionalLight.visible = false;

scene.add(lightAmbient);
scene.add(lightPoint);
scene.add(lightDirectional);



// update camera aspect and renderer dimentions when resizing browser window
window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    },
    false
);


//fps screen status
//const stats = Stats();
//document.body.appendChild(stats.dom)


//gui
const gui = new GUI();


// gui mesh object scale
const sphereFolder = gui.addFolder('Sphere');
sphereFolder.add(sphere.scale, 'x', -5, 5);
sphereFolder.add(sphere.scale, 'y', -5, 5);
sphereFolder.add(sphere.scale, 'z', -5, 5);

//gui camera position control
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', -10, 10);
cameraFolder.add(camera.position, 'y', -10, 10);
cameraFolder.add(camera.position, 'z', -10, 10);
cameraFolder.open();

// material color 
const data = {
    color: material.color.getHex(),
    mapsEnabled: true
};

//gui mesh material control
const meshStandardMaterialFolder = gui.addFolder('THREE.MeshStandardMaterial');
meshStandardMaterialFolder.add(material, 'wireframe');
meshStandardMaterialFolder.addColor(data, 'color').onChange(() => {
    material.color.setHex(Number(data.color.toString().replace('#', '0x')))
});
meshStandardMaterialFolder.add(material, 'metalness', 0.0, 1.0);
meshStandardMaterialFolder.add(material, 'roughness', 0.0, 1.0);
meshStandardMaterialFolder.open();

// gui light control
const lightAmbientFolder = gui.addFolder('Ambient Light');
lightAmbientFolder.add(lightAmbient, 'visible');
lightAmbientFolder.add(lightAmbient, 'intensity', 0.0, 1.0);
lightAmbientFolder.addColor(data, 'color').onChange(() => {
    lightAmbient.color.setHex(Number(data.color.toString().replace('#', '0x')));
});
lightAmbientFolder.open();

const lightPointFolder = gui.addFolder('Point Light');
lightPointFolder.add(lightPoint, 'visible');
lightPointFolder.add(lightPoint, 'distance', 0, 100, 0.01);
lightPointFolder.add(lightPoint, 'decay', 0, 4, 0.1);
lightPointFolder.add(lightPoint.position, 'x', -50, 50, 0.01);
lightPointFolder.add(lightPoint.position, 'y', -50, 50, 0.01);
lightPointFolder.add(lightPoint.position, 'z', -50, 50, 0.01);
lightPointFolder.addColor(data, 'color').onChange(() => {
    lightPoint.color.setHex(Number(data.color.toString().replace('#', '0x')));
})
lightPointFolder.open();
const lightPointHelperFolder = gui.addFolder('Point Light Helper');
lightPointHelperFolder.add(helperPointLight,'visible');


const lightDirectionalFolder = gui.addFolder('Directional Light');
lightDirectionalFolder.add(lightDirectional, 'visible');
lightDirectionalFolder.add(lightDirectional.position,'x',-1, 1);
lightDirectionalFolder.add(lightDirectional.position,'y',-1, 1);
lightDirectionalFolder.add(lightDirectional.position,'z',-1, 1);
lightDirectionalFolder.open();
const lightDirectionalHelperFolder = gui.addFolder('Directional Light Helper');
lightDirectionalHelperFolder.add(helperDirectionalLight,'visible');


function animate() {
    requestAnimationFrame(animate)
    //sphere.rotation.x += 0.01
    sphere.rotation.y += 0.001;
    controls.update()
    render()
    //stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
