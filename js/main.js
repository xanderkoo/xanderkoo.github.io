function mouseOverButton(elt) {
    scrolling = true;
    elt.style.cssText += ";border: 1px solid black; background-color: transparent"
}

function mouseOutButton(elt) {
    scrolling = false;
    elt.style.cssText += ";border: 1px dashed black; background-color: white"
}

function mouseOverBio(elt) {
    fluctuating = true;
    elt.className = "border";
    elt.style.cssText += ";border: none; padding: 21px;"
}

function mouseOutBio(elt) {
    fluctuating = false;
    elt.className = "";
    elt.style.cssText += ";border: 1px dashed black; padding: 20px;"
}

