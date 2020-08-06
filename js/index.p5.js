p5.disableFriendlyErrors = true;
var scrolling = false;
var fluctuating = false;

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
    } else if (fluctuating) {
        updateFluxAnimation();
    }
}

var start = 0;
var fluxParam = 0;

function updateScrollAnimation() {
    background(255)
    noFill();
    for (var l = 0, offsetY = -height/5; l < 8; l++, offsetY += height/5) {
        var offsetX = start;
        beginShape();
    
        for (var x = width; x > 0; x -= 4) {
            stroke(0);
            var y = (noise(offsetX) - 0.5)* Math.cos(fluxParam) * height + offsetY;
            vertex(x, y);
    
            offsetX += 0.047;
        }
        endShape();
    }
    start += 0.02;
}

function updateFluxAnimation() {
    background(255)
    noFill();
    for (var l = 0, offsetY = -height/5; l < 8; l++, offsetY += height/5) {
        var offsetX = start;
        beginShape();
    
        for (var x = width; x > 0; x -= 4) {
            stroke(0);
            var y = (noise(offsetX) - 0.5) * Math.cos(fluxParam) * height + offsetY;
            vertex(x, y);
    
            offsetX += 0.047;
        }
        endShape();
    }
    fluxParam += 0.02;
}