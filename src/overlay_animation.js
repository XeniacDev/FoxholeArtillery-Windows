// require electron remote window for closing the current view
const overlayRemote = require("electron").remote;

let openOverlay = document.getElementById("openOverlay");
let overlayBox = document.getElementById("overlayBox");
let overlayContent = document.getElementById("overlay_content");
let overlayWallpaper = document.getElementById("overlay_wallpaper");
let overlayBtn = document.getElementById("overlay_max_btn_content");

overlayContent.style.opacity = 0;

// we use this flag for form;
let IsOpened = false;

openOverlay.addEventListener("click",() => {
    // 1. open the overlay container
    overlayBox.style.width = "360px";
    overlayBox.style.height = "686px";
    overlayBox.style.borderRadius = "5px";
    // .. set new marginTOp for better view 
    overlayBox.style.marginTop = "85px";
    // 2. add tranistion class to overlay Opening
    overlayBox.classList.add("overlay_Animation");
    // 3. display none for openOverlay
    openOverlay.classList.add("display_none");
    //4 show content
    // .. fadein
    overlayContent.classList.add("opacity_animation")
    overlayContent.style.opacity = 1;
    // .. remove display class from wallpaper
    overlayWallpaper.classList.remove("display_none");

    // .. add ' >> '  character
    overlayBtn.innerHTML = "&#171;"

    // 5 form is open we need to change the flag to true
    IsOpened = true;
});


// close and minimize for Overlay
overlayBtn.addEventListener("click", () => {
    // 1.check is open or not
    if(IsOpened === true) {

       // overlayContent.classList.add("display_none");
       //overlayContent.style.visibility = "hidden";

        // 2. if === open minimize the overlay
        // .. close the overlay container , back to orginal size
        overlayBox.style.width = "55px";
        overlayBox.style.height = "55px";
        overlayBox.style.borderRadius = "100%";
        // .. reset marginTOp 
        overlayBox.style.marginTop = "130px";
        // 3. remove display none for openOverlay
        openOverlay.classList.remove("display_none");
        //4 show content
        // .. fade
        overlayContent.classList.remove("opacity_animation")
        overlayContent.style.opacity = 0;
        // .. add display class from wallpaper
        overlayWallpaper.classList.add("display_none");
        // .. add ' x '  character
        overlayBtn.innerHTML = "&times;"
        // 5 form is close now we need to change the flag to true
        IsOpened = false;

    }
    else {
        // 3. else close the entire overlay thread
        let overlayRemoteHandler = overlayRemote.getCurrentWindow();
        overlayRemoteHandler.close();
    }
})
overlayContent.classList.remove("display_none");































// Arty types Dic
const artilleryType = {
    Fa: "Field Artillery",
    Gb: "Gun boat",
    Howi: "Howitzer",
    Mor: "Mortar"
}