function mouseOverButton(elt) {
    scrolling = true;
    elt.style.cssText += ";border: 1px solid black; background-color: transparent"
}

function mouseOutButton(elt) {
    scrolling = false;
    elt.style.cssText += ";border: 1px dashed black; background-color: white"
}

function mouseOverBio(elt) {
    elt.className = "border";
    elt.style.cssText += ";border: none; padding: 21px;"
    console.log('hey')
}

function mouseOutBio(elt) {
    elt.className = "";
    elt.style.cssText += ";border: 1px dashed black; padding: 20px;"
}

