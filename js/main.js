var headshot = null;
var headshotsDir = "./images/me/";
var headshotNames = ["mask.png", "wg.png"];

function locationHashChanged() {
    let contentTitles = document.getElementsByClassName("title");
    let contentTexts = document.getElementsByClassName("content");
    for (let i = 0; i < contentTitles.length; i++) {
        contentTitles[i].hidden = true;
        contentTexts[i].hidden = true;
    }

    if (location.hash === "" || location.hash === "#home") {
        document.querySelector(":root").style.setProperty("--textbox-width", "calc(var(--main-container-width) - var(--menubar-width))");
        document.getElementById("home-title").hidden = false;
        document.getElementById("home-content").hidden = false;
        document.getElementsByClassName("menubar right")[0].hidden = true;
    } else if (location.hash === "#aboutme") {
        console.log("here");
        document.querySelector(":root").style.setProperty("--textbox-width", "calc(var(--main-container-width) - 2 * var(--menubar-width))");
        document.getElementById("aboutme-title").hidden = false;
        document.getElementById("aboutme-content").hidden = false;
        document.getElementsByClassName("menubar right")[0].hidden = false;
        headshot = document.getElementById("headshot");
        headshot.src = headshotsDir + headshotNames[Math.floor(Math.random() * headshotNames.length)];
    }
}
  
window.onhashchange = locationHashChanged;

document.onreadystatechange = function(e)
{
    if (document.readyState === 'complete')
    {
        locationHashChanged();
    }
};

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

