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


    const createDelta = (initDist, initSpeed) => (currDist) => {
        const currSpeed = initSpeed * currDist / initDist;
        const currDelta = currSpeed / 60;
        return Math.max(minDelta, currDelta);
    }

    var moveTime = 5000; // ms
    var pxPerSec = 20;
    var minDelta = .01;
    var initDist, getDelta;

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
            })
        );

        var childBox = new THREE.Mesh(
            new THREE.CubeGeometry(
                10,
                10,
                10),
            new THREE.MeshBasicMaterial({
                color: 0x00FF00
            })
        )

        // moving child box to right of parent box
        childBox.position.x += 22;

        box.add(childBox)

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

        initDist = camera.position.y - box.position.y;
        getDelta = createDelta(initDist, pxPerSec);

        requestAnimationFrame(render);

    };

    function moveCameraToBox(cam, box) {
        if (cam.position.y >= box.position.y) {
            var distBw = cam.position.y - box.position.y;
            var yDelta = getDelta(distBw);
            cam.position.y -= yDelta;
            cam.lookAt(box.position);
        }
    }

    var startTime;
    function moveItem(item) {
        if (!startTime) startTime = Date.now()
        var currentTime = Date.now()
        if (currentTime - startTime <= 2000) item.position.x -= .1;
    }

    function render() {
        renderer.render(scene, camera);

        // 5. move camera gradually closer to cube
        // moveCameraToBox(camera, box);
        moveItem(box)

        requestAnimationFrame(render);
    };

    window.onload = initScene;

})();