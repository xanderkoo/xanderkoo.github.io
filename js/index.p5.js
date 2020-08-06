p5.disableFriendlyErrors = true;
var scrolling = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    updateScrollAnimation();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateScrollAnimation();
}

function draw() {
    if (scrolling) {
        updateScrollAnimation();
    }
}

var start = 0;

function updateScrollAnimation() {
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