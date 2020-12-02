var headshot = null;

var headshotsDir = "./images/me/";
var headshotNames = ["mask.png", "wg.png"];

document.onreadystatechange = function() { 
    if (document.readyState === "complete") { 
        headshot = document.getElementById("headshot");
        console.log("print");
        headshot.src = headshotsDir + headshotNames[Math.floor(Math.random() * headshotNames.length)];
    }
}; 