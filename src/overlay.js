let openOverlay = document.getElementById("openOverlay");
let overlayBox = document.getElementById("overlayBox");
let overlayContent = document.getElementById("overlay_content");

overlayContent.style.opacity = 0;

openOverlay.addEventListener("click",() => {
    // 1. open the overlay container
    overlayBox.style.width = "360px";
    overlayBox.style.height = "686px";
    overlayBox.style.borderRadius = "5px";
    // 2. add tranistion class to overlay Opening
    overlayBox.classList.add("overlay_Animation");
    // 3. display none for openOverlay
    openOverlay.classList.add("display_none");
    //4 show content
    // .. unfade 
    overlayContent.style.opacity = 1;
    // .. moving animation
    //overlayContent.style.paddingTop = 0;
});




































// Arty types Dic
const artilleryType = {
    Fa: "Field Artillery",
    Gb: "Gun boat",
    Howi: "Howitzer",
    Mor: "Mortar"
}