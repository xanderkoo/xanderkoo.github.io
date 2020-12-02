async function mouseOverButton(elt) {
    scrolling = true;
    elt.style.cssText += ";border: var(--dashed-line-thickness) solid black; background-color: transparent"
}

function mouseOutButton(elt) {
    scrolling = false;
    elt.style.cssText += ";border: 1px dashed black; background-color: white"
}

function mouseOverBio(elt) {
    fluctuating = true;
    elt.className = "border";
    elt.style.cssText += ";border: none; padding: calc(var(--textbox-padding) + var(--dashed-line-thickness));"
}

function mouseOutBio(elt) {
    fluctuating = false;
    elt.className = "";
    elt.style.cssText += ";border: 1px dashed black; padding: var(--textbox-padding);"
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

