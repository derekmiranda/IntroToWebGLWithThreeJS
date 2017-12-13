var demo = (function () {

    "use strict";

    var scene = new THREE.Scene(),
        light = new THREE.AmbientLight(0xffffff),
        renderer,
        camera,
        renderer = new THREE.WebGLRenderer(),
        box,
        ground,
        controls = null;
    var loader = new THREE.JSONLoader(),
        mesh;

    loader.load('gooseFull.js', function (geometry) {
        var gooseMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('goose.jpg')
        });

        mesh = new THREE.Mesh(geometry, gooseMaterial);
        mesh.scale.set(20, 20, 20);

        scene.add(mesh);
    });

    function initScene() {

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.set(0, 0, 100);

        scene.add(camera);

        requestAnimationFrame(render);

    };

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    window.onload = initScene;

})();