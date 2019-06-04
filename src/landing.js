// define remote Window
const RemoteOverlayWindow = require("electron").remote.BrowserWindow;
const LandingRemote = require("electron").remote;
const path = require("path");
const url = require("url");





// get app title from <title> tag 
let title = document.getElementById("AppTitle").innerHTML;

// update window browser title with App title
document.getElementById("titleShown").innerHTML = title;

// get startTheGame click event for opening overlay form
const startTheGameBtn = document.getElementById("startTheGameBtn");


isFirst = sessionStorage.getItem("IsFirstWindow");


startTheGameBtn.addEventListener("click", (event) => {
    if (isFirst === true || isFirst === null) {
        isFirst = sessionStorage.setItem("IsFirstWindow", "false")
        // create new window here
        overlayWindow = new RemoteOverlayWindow({
            // make it fullscreen and transparent so we can put html elements on it!, without creating new Browser window
            hasShadow: false,
            show: false,
            transparent: true,
            frame: false,
            fullscreen: true,
            x: 0,
            y: 0,
            width: screen.availWidth,
            height: screen.availHeight,
            resizable: false,
        });

        isFirstWindow = true;

        console.log(LandingRemote.getGlobal());

        // set our window on top of bordless windowed games
        overlayWindow.setAlwaysOnTop(true);

        // hide the overlay icon in taskbar
        overlayWindow.setSkipTaskbar(true);

        // load overlay.Html
        // they are in the same path
        overlayWindow.loadURL(url.format({
            pathname: path.join(__dirname, "overlay.html"),
            protocol: "file:",
            slashes: true,
        }))

        // close event 
        overlayWindow.on("closed", () => {
            overlayWindow = null;
        })

        // show window when it was rdy
        overlayWindow.once("ready-to-show", () => {
            overlayWindow.show();
            overlayWindow.focus();
        })

        // after opening new one we have to close landing window
        let landingRemote = LandingRemote.getCurrentWindow();
        // landingRemote.close();
        // -----------------------------
    }
});
