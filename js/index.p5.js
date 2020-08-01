p5.disableFriendlyErrors = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    updateAnimation();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateAnimation();
}

function draw() {}

// Make it mobile friendly
function touchStarted() {
    draw = (() => updateAnimation());
}

function touchEnded() {
    draw = (() => {});
}

function mouseMoved() {
    updateAnimation();
}

var start = 0;

function updateAnimation() {
    background(255)
    noFill();
    for (var l = 0, offsetY = -height; l < 10; l++, offsetY += height/5) {
        var offsetX = start;
        beginShape();
    
        for (var x = width; x > 0; x -= 4) {
            stroke(0);
            var y = noise(offsetX) * height + offsetY;
            vertex(x, y);
    
            offsetX += 0.047;
        }
        endShape();
    }

    start += 0.02;
}