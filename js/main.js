var headshotsDir = "./images/me/";
var headshotNames = ["button.png", "mask.png", "ohdeer.png", "srs.png", "translate.png", "wg.png",];

var numMenuBarsVisible = 1;

function locationHashChanged() {    
    let contentTitles = document.getElementsByClassName("title");
    let contentTexts = document.getElementsByClassName("content");
    for (let i = 0; i < contentTitles.length; i++) {
        contentTitles[i].hidden = true;
        contentTexts[i].hidden = true;
    }

    if (location.hash === "" || location.hash === "#" || location.hash === "#home") {
        toggleTextBoxSize(true);
        $("#home-title").removeAttr("hidden");
        $("#home-content").removeAttr("hidden");
        $(".menubar.right")[0].hidden = true;
    } else if (location.hash === "#aboutme") {
        toggleTextBoxSize(false);
        $("#aboutme-title").removeAttr("hidden");
        $("#aboutme-content").removeAttr("hidden");
    }
}
window.onhashchange = locationHashChanged;

document.onreadystatechange = function(e)
{
    if (location.hash === "" || location.hash === "#" || location.hash === "#home") {
        numMenuBarsVisible = 1;
        document.querySelector(":root").style.setProperty("--textbox-width", "calc(var(--main-container-width) - 1 * var(--menubar-width))");
        $("#home-title").removeAttr("hidden");
        $("#home-content").removeAttr("hidden");
        $(".menubar.right")[0].hidden = true;
    } else if (location.hash === "#aboutme") {
        document.querySelector(":root").style.setProperty("--textbox-width", "calc(var(--main-container-width) - 2 * var(--menubar-width))");
        $("#headshot").attr("src", headshotsDir + headshotNames[Math.floor(Math.random() * headshotNames.length)]);
        $("#headshot-box").fadeIn();
        numMenuBarsVisible = 2;
        $("#aboutme-title").removeAttr("hidden");
        $("#aboutme-content").removeAttr("hidden");
        $(".menubar.right")[0].hidden = false;
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

var lastTime;
var variableName = "--textbox-width";
var variableUnit = "vw";
var targetNumMenubars;
var currentValue, targetValue;

/**
 * 
 * @param {Number} val false for small, true for normal size
 */
function toggleTextBoxSize(val) {

    targetNumMenubars = val ? 1 : 2;

    let style = getComputedStyle(document.body);

    let mcw = parseFloat(style.getPropertyValue("--main-container-width"));
    let mbw = parseFloat(style.getPropertyValue("--menubar-width-ratio")) * mcw;

    let oldSize = mcw - numMenuBarsVisible * mbw;
    let newSize = mcw - (val ? 1 : 2) * mbw;

    animateResizeTextBox(oldSize, newSize)
}

/**
 * Called to resize a certain variable value
 * @param {Number} newVal new value to assign the variable, no unit
 */
function animateResizeTextBox(oldVal, newVal) {

    lastTime = 0;
    currentValue = new Number(oldVal);
    targetValue = new Number(newVal);

    /**
     * Callback for requestAnimationFrame
     * 
     * @param {*} ms elapsed time in ms, similar to performance.now(), passed in by requestAnimationFrame
     */
    function resizeTextBoxCallback(ms) {
        let elapsed;
        
        // If we are beginning a new path to a dest, then we want to start the speed
        // (and therefore the elapsed time) out at 0
        if (lastTime == 0) {
            elapsed = 0;
        } else {
            elapsed = ms - lastTime;
        }
        lastTime = ms;

        // Calculate velocity based on distance + how long has passed since last tick
        let rate = (targetValue - currentValue) / 0.25;
        let elapsedSeconds = elapsed / 1000;

        // Adjust variable value based on time elapsed
        currentValue += (rate * elapsedSeconds);

        // Update target
        document.querySelector(":root").style.setProperty(variableName, `${currentValue}${variableUnit}`);

        // Move until we are within 0.01 of the target value
        if (Math.abs(currentValue - targetValue) > 0.05) {
            window.requestAnimationFrame(resizeTextBoxCallback);
        } else {
            // Force variable assignment
            currentValue = Math.round(currentValue);
            document.querySelector(":root").style.setProperty(variableName, `${currentValue}${variableUnit}`);
            numMenuBarsVisible = targetNumMenubars;

            if (numMenuBarsVisible === 2) {
                $("#headshot").attr("src", headshotsDir + headshotNames[Math.floor(Math.random() * headshotNames.length)]);
                $("#headshot-box").css("display", "none");
                $(".menubar.right")[0].hidden = false;
                $("#headshot-box").fadeIn();
            }
        }
    }

    // Start animation
    window.requestAnimationFrame(resizeTextBoxCallback);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

