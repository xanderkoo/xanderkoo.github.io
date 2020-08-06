function mouseOverButton(elt) {
    moving = true;
    elt.style.cssText += ";border: 1px solid black; background-color: transparent"
}

function mouseOutButton(elt) {
    moving = false;
    elt.style.cssText += ";border: 1px dashed black; background-color: white"
}

function mouseOverBio(elt) {
    // moving = true;
    // elt.style.cssText += ";border: 1px dashed white; background-color: black; color: white;"
}

function mouseOutBio(elt) {
    // moving = false;
    // elt.style.cssText += ";border: 1px dashed black; background-color: white; color: black;"
}

