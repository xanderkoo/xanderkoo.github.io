var clickedButton = [];

function buttonClicked(elt) {
    clickedButton = elt;
    elt.style.backgroundColor = "transparent";
    // elt.getElementById
}

function resetButtons() {
    clickedButton.style.backgroundColor = "white";
}

