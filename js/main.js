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
        $("#headshot-box").stop().hide();
    } else if (location.hash === "#aboutme") {
        toggleTextBoxSize(false);
        $("#aboutme-title").removeAttr("hidden");
        $("#aboutme-content").removeAttr("hidden");
    }
}
window.onhashchange = locationHashChanged;

document.onreadystatechange = function(e) {
    switch (document.readyState) {
        case "loading":
            break;
        case "interactive":
            switch (location.hash) {
                case "":
                case "#":
                case "#home":
                    numMenuBarsVisible = 1;
                    document.querySelector(":root").style.setProperty("--textbox-width", "calc(var(--main-container-width) - 1 * var(--menubar-width))");
                    $("#home-title").removeAttr("hidden");
                    $("#home-content").removeAttr("hidden");
                    $("#headshot-box").stop().hide();
                    break;
                case "#aboutme":
                    document.querySelector(":root").style.setProperty("--textbox-width", "calc(var(--main-container-width) - 2 * var(--menubar-width))");
                    let imgSrc = headshotsDir + headshotNames[Math.floor(Math.random() * headshotNames.length)];
                    let promise = loadImageElement(imgSrc, $("#headshot").get(0));
                    numMenuBarsVisible = 2;
                    $("#aboutme-title").removeAttr("hidden");
                    $("#aboutme-content").removeAttr("hidden");
                    // $(".menubar.right")[0].hidden = false;

                    // Fade in the headshot if src is loaded
                    promise.then(() => $("#headshot-box").fadeIn());
            }
            break;
        case "complete":
            break;
    }
};

async function loadImageElement(imgSrc, imageElement) {
    // We want to wait for image to finish loading, so we load image inside a promise
    const imageLoadPromise = new Promise(resolve => {
        // Called once image is loaded into element
        imageElement.onload = function() {
            // Resolve promise
            resolve();
        };
        // Set the image source, triggers .onload
        $("#headshot").attr("src", imgSrc);
    });
    // Wait for image to finish initializing
    await imageLoadPromise;
}

async function mouseOverButton(elt) {
    scrolling = true;
    elt.style.cssText += ";border: var(--dashed-line-thickness) solid white; background-color: transparent"
}

function mouseOutButton(elt) {
    scrolling = false;
    elt.style.cssText += ";border: 1px dashed white; background-color: rgb(32, 32, 32)"
}

function mouseOverBio(elt) {
    fluctuating = true;
    elt.className = "border";
    elt.style.cssText += ";border: none; padding: calc(var(--textbox-padding) + var(--dashed-line-thickness));"
}

function mouseOutBio(elt) {
    fluctuating = false;
    elt.className = "";
    elt.style.cssText += ";border: 1px dashed white; padding: var(--textbox-padding);"
}

var lastTime;
var variableName = "--textbox-width";
var targetNumMenubars;
var currentValue, targetValue;

/**
 * 
 * @param {Number} val false for small, true for normal size
 */
function toggleTextBoxSize(val) {

    targetNumMenubars = val ? 1 : 2;

    let style = getComputedStyle(document.body);

    let mainContainerWidth = $(".maincontainer").width();
    let menubarWidth = parseFloat(style.getPropertyValue("--menubar-width-ratio")) * mainContainerWidth;

    let oldSize = $("#textbox").outerWidth();
    let newSize = mainContainerWidth - (val ? 1 : 2) * menubarWidth;

    animateResizeTextBox(oldSize, newSize)
}

/**
 * Called to resize a certain variable value
 * @param {Number} oldVal new value to assign the variable, no unit
 * @param {Number} newVal new value to assign the variable, no unit
 */
function animateResizeTextBox(oldVal, newVal) {

    let imgSrc = headshotsDir + headshotNames[Math.floor(Math.random() * headshotNames.length)];    
    let promise = loadImageElement(imgSrc, $("#headshot").get(0));

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
        document.querySelector(":root").style.setProperty(variableName, `${currentValue}px`);

        // Move until we are within 0.5 of the target value
        if (Math.abs(currentValue - targetValue) > 0.5) {
            window.requestAnimationFrame(resizeTextBoxCallback);
        } else {
            // Force variable assignment
            currentValue = Math.round(currentValue);
            
            numMenuBarsVisible = targetNumMenubars;

            let style = getComputedStyle(document.body);
            let mainContainerWidth = parseFloat(style.getPropertyValue("--main-container-width"));
            let menubarWidth = parseFloat(style.getPropertyValue("--menubar-width-ratio")) * mainContainerWidth;

            if (numMenuBarsVisible === 2) {
                document.querySelector(":root").style.setProperty(variableName, `${mainContainerWidth - 2 * menubarWidth}vw`);
                $("#headshot-box").stop().hide();
                // Fade in the headshot if src is loaded
                promise.then(() => { $("#headshot-box").fadeIn() });
            } else if (numMenuBarsVisible === 1) {
                document.querySelector(":root").style.setProperty(variableName, `${mainContainerWidth - menubarWidth}vw`);
            }
            document.querySelector(":root").style.setProperty("--textbox-width", `calc(var(--main-container-width) - ${numMenuBarsVisible} * var(--menubar-width))`);
        }
    }

    // Start animation
    window.requestAnimationFrame(resizeTextBoxCallback);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

