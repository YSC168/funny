var canvas;
var debug;

var timer = 0;

var shape = 0;
var shapes = [];

var particles = [];
var particlesTotal = 300;

var mouseX = 0;
var mouseY = 0;

var view = new Matrix3D();

var camera = new Camera3D();
camera.z = 750;
camera.focus = 200;

var focus = camera.focus;
var focuszoom = camera.focus * camera.zoom;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init()
setInterval(loop, 1000/60);

function init() {

	JSTweener.init();

	canvas = document.getElementById('canvas');
	canvas.style.position = 'absolute';
	canvas.style.left = '50%';
	canvas.style.top = '50%';

	// 3D Shapes

	// Up

	shapes[0] = [];

	for (var i = 0; i < particlesTotal; i++) {

		shapes[0][i] = [ 0, 1500, 0 ];

	}

	// Plane

	shapes[1] = [];

	var amountXZ = Math.sqrt( particlesTotal );
	var separation = 150;
	var offset = amountXZ * separation * .5;
	var i = 0;

	for (var x = 0; x < amountXZ; x++) {

		for (var z = 0; z < amountXZ; z++) {

			shapes[1][i++] = [ x * separation - offset, 0, z * separation - offset ];

		}

	}

	// Cube

	shapes[2] = [];

	var amountX = 8;
	var amountY = 8;
	var amountZ = 8;
	var separation = 100;
	var offsetX = (amountX - 1) * separation * .5;
	var offsetY = (amountY - 1) * separation * .5;
	var offsetZ = (amountZ - 1) * separation * .5;
	var i = 0;

	for (var x = 0; x < amountX; x++) { // TOP

		for (var z = 0; z < amountZ; z++) {

			shapes[2][i++] = [ x * separation - offsetX, offsetY, z * separation - offsetZ ];

		}

	}

	for (var x = 0; x < amountX; x++) { // BOTTOM

		for (var z = 0; z < amountZ; z++) {

			shapes[2][i++] = [ x * separation - offsetY, -offsetY, z * separation - offsetZ ];

		}

	}

	for (var x = 0; x < amountX; x++) { // FRONT

		for (var y = 1; y < amountY-1; y++) {

			shapes[2][i++] = [ x * separation - offsetX, y * separation - offsetY, offsetZ ];

		}

	}

	for (var x = 0; x < amountX; x++) { // BACK

		for (var y = 1; y < amountY-1; y++) {

			shapes[2][i++] = [ x * separation - offsetX, y * separation - offsetY, -offsetZ ];

		}

	}

	for (var y = 1; y < amountY-1; y++) { // RIGHT

		for (var z = 1; z < amountZ-1; z++) {

			shapes[2][i++] = [ offsetX, y * separation - offsetY, z * separation - offsetZ ];

		}

	}

	for (var y = 1; y < amountY; y++) { // LEFT

		for (var z = 1; z < amountZ-1; z++) {

			shapes[2][i++] = [ -offsetX, y * separation - offsetY, z * separation - offsetZ ];

		}

	}

	// Random

	shapes[3] = new Array();

	for (var i = 0; i < particlesTotal; i++) {

		shapes[3][i] = new Array( Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000 );

	}

	// Sphere

	shapes[4] = new Array();

	var phi;
	var theta;
	var radius = 500;

	for (var i = 0; i < particlesTotal; i++) {

		phi = Math.acos( -1 + ( 2 * i ) / particlesTotal );
		theta = Math.sqrt( particlesTotal * Math.PI ) * phi;

		shapes[4][i] = new Array(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi));

	}

	// Particles

	for (var i = 0; i < particlesTotal; i++) {

		var particle = particles[i] = new Div3D( shapes[shape][i][0], shapes[shape][i][1], shapes[shape][i][2] );

		particle.content.style.top = '-64px';
		particle.content.style.left = '-64px';
		particle.content.style.width = '128px';
		particle.content.style.height = '128px';
		particle.content.style.background = 'url(files/spriteBlur.png)';
		/*
		particle.content.style.backgroundColor = '#ff0000';
		particle.content.style.opacity = '0.2';
		*/
		canvas.appendChild( particle.container );

	}

	animate();

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	shape = ++shape % shapes.length;

	for (var i = 0; i < particlesTotal; i++) {

		JSTweener.addTween(particles[i],{time: 3, delay: Math.random() * 2, x: shapes[shape][i][0], y: shapes[shape][i][1], z: shapes[shape][i][2], transition: JSTweener.easingFunctions.easeInOutExpo});

	}

	JSTweener.addTween(null,{time: 6, onComplete: animate});

}

//

function loop() {

	JSTweener.update();

	timer = new Date() - 0;

	windowHalfX = window.innerWidth >> 1;
	windowHalfY = window.innerHeight >> 1;

	camera.x += (mouseX - camera.x) * .05;
	camera.y += (-mouseY - camera.y) * .05;

	view.lookAt(camera, camera.target, camera.up);

	var i = particles.length;

	while(--i >= 0) {

		var particle = particles[i];

		particle.sz = particle.x * view.n31 + particle.y * view.n32 + particle.z * view.n33 + view.n34;

		if (focus + particle.sz < 0) {

			particle.content.style['visibility'] = 'hidden';
			continue;

		} else {

			particle.content.style['visibility'] = 'visible';
		}

		var ow = focuszoom / (focus + particle.sz);

		particle.sx = (particle.x * view.n11 + particle.y * view.n12 + particle.z * view.n13 + view.n14) * ow;
		particle.sy = (particle.x * view.n21 + particle.y * view.n22 + particle.z * view.n23 + view.n24) * -ow;

		// I'm sure there is a better dof formula than this...
		// Let me know if you have a better one!

		var dof = ow - .6;
		dof = dof < 0 ? dof * 40 : dof; 
		dof = Math.abs( Math.floor( dof ) ) * 128;
		dof = dof > 1792 ? 1792 : dof < 0 ? 0 : dof;

		particle.content.style.backgroundPosition = '0px ' + -dof + 'px';

		particle.scale = Math.sin( ( Math.floor( particle.x ) + timer ) * 0.002 ) * 0.2 + 0.8;

		var transform = 'translate3D(' + particle.sx + 'px,' + particle.sy + 'px, 0) scale(' + ( ow * particle.scale ) + ')';

		particle.container.style.webkitTransform = transform;
		particle.container.style.mozTransform = transform;
		particle.container.style.msTransform = transform;
		particle.container.style.oTransform = transform;
		particle.container.style.transform = transform;

		particle.container.style.zIndex = 1000 + ( - particle.sz * 100 ) >> 0;
	}
}
