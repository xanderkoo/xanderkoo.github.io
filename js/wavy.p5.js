p5.disableFriendlyErrors = true;
var scrolling = false;
var fluctuating = false;

var cols, rows;
var scl = 69;
var terrain;
var waves = 0;
var wavesSpeed = 0.01;
var jaggedness = 0.1;
var spin = 0;
var spinSpeed = 0.001;
var tilt = 2.3;
var longSide = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    longSide = Math.max(windowWidth, windowHeight);
    cols = Math.round(longSide / scl);
    rows = cols;
    initializeTerrain();
}

function initializeTerrain() {
    // terrain array to store depth (i.e. elevation) at each coordinate
    terrain = new Array(cols);
    for (var i = 0; i < terrain.length; i++) {
        terrain[i] = new Array(rows);
    }
}

function draw() {

    let colDelta = waves;
    for (let i = 0; i < rows; i++) {
        let rowDelta = 0;
        for (let j = 0; j < cols; j++) {
            // terrain[x][y] = map(noise(xDelta, yDelta), 0, 1, -150, 150);
            terrain[i][j] = map(noise(rowDelta, colDelta), 0, 1, -150, 150);
            rowDelta += jaggedness;
        }
        colDelta += jaggedness;
    }
    waves += wavesSpeed;

    background(0);
    stroke(128);
    noFill();

    // scale(1)
    rotateX(PI / tilt);
    rotateZ(PI * spin);
    

    // center the thing
    translate(-longSide / 2, -longSide / 2);

    if (!dragging) {
        spin = spin + spinSpeed; // can't really use % here to avoid rounding errors i think
    }

    for (let i = 0; i < rows - 1; i++) {
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j < cols; j++) {
            vertex(i * scl, j * scl, terrain[i][j]);
            vertex((i + 1) * scl, j * scl, terrain[i+1][j]);
        }
        endShape();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    longSide = Math.max(windowWidth, windowHeight);
    cols = Math.round(longSide / scl);
    rows = cols;
    initializeTerrain();
}

var dragging = false;
var dragStartMouseX = -1;
var dragStartSpin = -1;
var dragRate = 0.001;

function mouseDragged() {
    if (!dragging) {
        dragging = true;
        dragStartMouseX = mouseX;
        dragStartSpin = spin;
    }
    let delta = dragStartMouseX - mouseX;

    spin = dragStartSpin + delta * dragRate;
}

function mouseReleased() {
    dragging = false;
    dragStartMouseX = -1;
}
