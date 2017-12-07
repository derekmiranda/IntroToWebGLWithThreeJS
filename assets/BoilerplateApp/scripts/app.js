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

    var moveTime = 5000; // ms
    var pxPerSec = 20;

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

        box = new THREE.Mesh(
            new THREE.CubeGeometry(
                20,
                20,
                20),
            new THREE.MeshBasicMaterial({
                color: 0xFF0000
            }));

        scene.add(box);

        // 1. move camera closer
        camera.position.z -= 50;

        // 2. move camera to left
        camera.position.x -= 5;

        // 3. Move cube to right and further away
        box.position.x += 5;
        box.position.z -= 5;

        // 4. make camera look down on cube
        camera.position.y += 50;
        camera.lookAt(box.position)

        requestAnimationFrame(render);

    };

    function moveCameraToBox(cam, box) {
        if (cam.position.y >= box.position.y) {
            var yDelta = pxPerSec / 60;
            cam.position.y -= yDelta;
            cam.lookAt(box.position);
        }
    }

    function render() {
        renderer.render(scene, camera);

        // 5. move camera gradually closer to cube
        moveCameraToBox(camera, box);

        requestAnimationFrame(render);
    };

    window.onload = initScene;

})();