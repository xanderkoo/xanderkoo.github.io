p5.disableFriendlyErrors = true;

var inc = 0.047;
var start = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
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

function updateAnimation() {
    background(255)
    noFill();

    for (var l = 0, offsetY = -height; l < 10; l++, offsetY += height/5) {
        var offsetX = start;
        
        beginShape();
    
        for (var x = 0; x < width; x += 4) {
            stroke(0);
            // var y = map(noise(offsetX), 0, 1, 0, height);
            var y = noise(offsetX) * height + offsetY;
            vertex(x, y);
    
            offsetX += inc;
        }
        endShape();
    }

    start += 0.01;
}