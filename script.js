// Vim -> press gx in normal mode to open url.
// file:///C:/ftp_root/New%20folder/Geoguessr%20streak%20mod/Streak%20mod%202/woodpuzzle/index.html

let stepPlaceHolder = document.getElementById('stepPlaceHolder');
let step = -1;

// CREATE SCENE
const loader = new THREE.TextureLoader();
const space = loader.load('https://i.imgur.com/XssZ0Cy.jpeg');

let scene = new THREE.Scene();
scene.background = space; //color2;

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 10);
directionalLight.target.position.set(0,0,0);
scene.add(directionalLight);

// CAMERA
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 15); // this sets the boom's length
camera.lookAt(0, 0, 0);

// RENDERER
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//scene.add(new THREE.AxesHelper(5))

// MAKE BLOCKS

let blocks = [];

let geometry = new THREE.BoxGeometry(1, 1, 1);
const woodTexture1 = loader.load('https://i.imgur.com/e69Z1hI.jpeg');
const woodTexture2 = loader.load('https://i.imgur.com/o601eUl.png');

let vertexShader = `
    // https://discourse.threejs.org/t/how-to-render-geometry-edges/5745/7
    varying vec2 vUv;
    void main()	{
       vUv = uv;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`;

 let fragmentShader = `
		//#extension GL_OES_standard_derivatives : enable
    
    varying vec2 vUv;
    uniform float thickness;
    uniform float t;

    float edgeFactor(vec2 p){
    	vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;
  		return min(grid.x, grid.y);
    }
    
    void main() {
			
        float a = edgeFactor(vUv);
          
        vec3 c = mix(vec3(0.166), vec3(0.199, t, 0.5), a);
          
        gl_FragColor = vec4(c, 1);
    }
`;

for (let n = 0; n < 27; n++) {
   // let map = n % 2 == 0? woodTexture1: woodTexture2;
    //let material = new THREE.MeshStandardMaterial({ map: map }); // Use with ambient and directional light.

    let material = new THREE.ShaderMaterial({
        // https://discourse.threejs.org/t/how-to-render-geometry-edges/5745/7
        uniforms: { thickness: { value: 0.6 }, t: { value: (n % 2) === 0 ?0.19: 0.194 }},
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    blocks[n] = new THREE.Mesh(geometry, material);
}

// CREATE PUZZLE AND GROUPS OF BLOCKS
const puzzle = new THREE.Group();
scene.add(puzzle);

let groups = [];

function makeGroup(parent) {
    let g1 = new THREE.Group();
    parent.add(g1);
    groups.push(g1);
    return g1;
}

const g1 = new THREE.Group();
puzzle.add(g1);
g1.add(blocks[0], blocks[1]);
blocks[0].position.set(0, 0, 0);
blocks[1].position.set(1, 0, 0);
g1.position.set(-1, -1, 1); // Try to center the cube.

const s2 = makeGroup(g1);
s2.add(blocks[2]);
blocks[2].position.set(0, 0, 0);
s2.position.set(2, 0, 0);
s2.rotation.x = 1.5;

const s3 = makeGroup(s2);
s3.add(blocks[3]);
blocks[3].position.set(0, 0, 0);
s3.position.set(0, 1, 0);
s3.rotation.y = -1.5;

const g4 = makeGroup(s3);
g4.add(blocks[4], blocks[5]);
blocks[4].position.set(0, 0, 0);
blocks[5].position.set(0, 0, -1);
g4.position.set(-1, 0, 0);
g4.rotation.x = 1.6;

const s5 = makeGroup(g4);
s5.add(blocks[6]);
blocks[6].position.set(0, 0, 0);
s5.position.set(0, 0, -2);
s5.rotation.z = 1.5;

const g6 = makeGroup(s5);
g6.add(blocks[7], blocks[8]);
blocks[7].position.set(0, 0, 0);
blocks[8].position.set(0, 0, 1);
g6.position.set(0, 1, 0);
g6.rotation.y = 1.5;

const s7 = makeGroup(g6);
s7.add(blocks[9]);
blocks[9].position.set(0, 0, 0);
s7.position.set(0, 0, 2);
s7.rotation.z = 1.5;

const s8 = makeGroup(s7);
s8.add(blocks[10]);
blocks[10].position.set(0, 0, 0);
s8.position.set(1, 0, 0);
s8.rotation.x = 1.5;

const g9 = makeGroup(s8);
g9.add(blocks[11], blocks[12]);
blocks[11].position.set(0, 0, 0);
blocks[12].position.set(0, -1, 0);
g9.position.set(0, 0, -1);
g9.rotation.z = 1.5;

const g10 = makeGroup(g9);
g10.add(blocks[13], blocks[14]);
blocks[13].position.set(0, 0, 0);
blocks[14].position.set(-1, 0, 0);
g10.position.set(0, -2, 0);
g10.rotation.y = -1.5;

const s11 = makeGroup(g10);
s11.add(blocks[15]);
blocks[15].position.set(0, 0, 0);
s11.position.set(-2, 0, 0);
s11.rotation.x = -1.5;

const s12 = makeGroup(s11);
s12.add(blocks[16]);
blocks[16].position.set(0, 0, 0);
s12.position.set(0, 1, 0);
s12.rotation.y = -1.5;

const s13 = makeGroup(s12);
s13.add(blocks[17]);
blocks[17].position.set(0, 0, 0);
s13.position.set(0, 0, 1);
s13.rotation.z = 1.5;

const g14 = makeGroup(s13);
g14.add(blocks[18], blocks[19]);
blocks[18].position.set(0, 0, 0);
blocks[19].position.set(0, 0, -1);
g14.position.set(0, 1, 0);
g14.rotation.y = 1.5;

const g15 = makeGroup(g14);
g15.add(blocks[20], blocks[21]);
blocks[20].position.set(0, 0, 0);
blocks[21].position.set(0, -1, 0);
g15.position.set(0, 0, -2);
g15.rotation.z = -1;

const g16 = makeGroup(g15);
g16.add(blocks[22], blocks[23]);
blocks[22].position.set(0, 0, 0);
blocks[23].position.set(1, 0, 0);
g16.position.set(0, -2, 0);
g16.rotation.y = 1.5;

const g17 = makeGroup(g16);
g17.add(blocks[24], blocks[25], blocks[26]);
blocks[24].position.set(0, 0, 0);
blocks[25].position.set(0, 1, 0);
blocks[26].position.set(0, 2, 0);
g17.position.set(2, 0, 0);
g17.rotation.x = -2;

for (let n = 0; n < groups.length; n++) {
    let pp = groups[n];
    pp._rotation = [pp.rotation.x, pp.rotation.y, pp.rotation.z];
}

// ANIMATE THE SCENE
let animate = function () {
    requestAnimationFrame(animate);

    for (let n = 0; n < groups.length; n++) {
        if (groups[n].animate) {
            groups[n].animate();
        }
    }

    //    puzzle.rotation.y += 0.005;
    renderer.render(scene, camera);
};
animate();

// Create DOM ELEMENTS
let nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", function (e) {
    step += 1;
    stepPlaceHolder.innerText = step+1;
    if (step >= groups.length) {
        step = groups.length - 1;
        return;
    }
    const g = groups[step];
    g.animate = solveAnimation.bind(null, g, g._rotation, clearAnimation.bind(g), transitionFn(1400));
});

let prevBtn = document.getElementById("prev");
prevBtn.addEventListener("click", function (e) {
    stepPlaceHolder.innerText = step - 1 < 0? 0: step-1;
    const g = groups[step];

    g.animate = jumbleAnimation.bind(null, g, g._rotation, clearAnimation.bind(g), transitionFn(900));
    step--;
    if (step < 0) step = -1;
});

let interval = null;

let solveBtn = document.getElementById("solve");
solveBtn.addEventListener("click", function (e) {
    clearInterval(interval); 
    let t = 0;
    interval = setInterval(()=> {
       nextBtn.click();
       if (t++ == 18) clearInterval(interval); 
    }, 1);
});

let jumbleBtn = document.getElementById("jumble");
jumbleBtn.addEventListener("click", function (e) {
    clearInterval(interval); 
    let t = 0;
    interval = setInterval(()=> {
       prevBtn.click();
       if (t++ == 18) clearInterval(interval); 
    }, 1);
});

// EVENT LISTENERS
document.addEventListener("mousewheel", function (e) {
    if (e.wheelDeltaY < 0) {
        camera.position.z += 1;
    } else {
        camera.position.z -= 1;
    }
});

document.addEventListener("mousedown", (r) => {
    let x = r.x;
    let y = r.y;
    let yy = puzzle.rotation.y;
    let xx = puzzle.rotation.x;
    document.addEventListener("mousemove", move);

    function move(e) {
        let ax = e.x - x;
        let ay = e.y - y;

        let py = yy + ax * 0.01;
        let px = xx + ay * 0.01;

        puzzle.rotation.y = py;
        puzzle.rotation.x = px;
    }

    document.addEventListener("mouseup", function up() {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    });
});

// ANIMATIONS
function clearAnimation() {
    this.animate = null;
}

function transitionFn(duration){
    // Ease In function -> https://easings.net/#easeInSine
    let btime = Date.now(); 
    return function () {
        let t = Date.now();
        if (t >= (btime + duration)) return 0;

        let d = ((btime + duration) - t) / duration;
        return -(Math.cos(Math.PI * d) - 1) / 2;
        //return 1 - Math.cos((d * Math.PI) / 2);
    }
}

function solveAnimation(pp, coords, clear, transFn){
    let p = transFn();

    pp.rotation.x = coords[0] * p; 
    pp.rotation.y = coords[1] * p;
    pp.rotation.z = coords[2] * p;

    if (p === 0){
        clear();
        return;
    }
}

function jumbleAnimation(pp, coords, clear, transFn){
    let p = transFn();

    pp.rotation.x = coords[0] - coords[0] * p; 
    pp.rotation.y = coords[1] - coords[1] * p;
    pp.rotation.z = coords[2] - coords[2] * p;

    if (p === 0){
        clear();
        return;
    }
}




