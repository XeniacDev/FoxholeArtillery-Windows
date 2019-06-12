// define remote Window
const { shell } = require("electron");
const RemoteOverlayWindow = require("electron").remote.BrowserWindow;
const path = require("path");
const url = require("url");

const ipc_renderer = require("electron").ipcRenderer;

let isClosed = true;

// get app title from <title> tag 
let title = document.getElementById("AppTitle").innerHTML;

let githubBtn = document.getElementById("githubBtn");
let FoxholeArtilleryWiki = document.getElementById("FoxholeArtilleryWiki");

// get startTheGameBtn
let startTheGameBtn = document.getElementById("startTheGameBtn");

// update window browser title with App title
document.getElementById("titleShown").innerHTML = title;

startTheGameBtn.addEventListener("click", (event) => {
        if(isClosed === true) {
            startTheGameBtn.disabled = true;
            isClosed = false;
            console.log(isClosed);
            createOverlay();
            // create new window here
            // after opening new one we have to close landing window
            //let landingRemote = LandingRemote.getCurrentWindow();
            // -----------------------------
       }
    ipc_renderer.send("landingClosed");
    ipc_renderer.on("landingClosed", (event, args) => {
        ipc_renderer.removeAllListeners("landingClosed");
        // if closed is true , we can load the overlayagain else we can't !
        isClosed = true;
        console.log("get icp landing");
        console.log(isClosed);
        createOverlay();
        isClosed = false;
        
    })
    }
);



// community btns externall 
githubBtn.addEventListener('click', ()=> {
    shell.openExternal("https://github.com/irxeniac/FoxholeArtillery-Windows");
});
FoxholeArtilleryWiki.addEventListener("click", () => {
    shell.openExternal("https://github.com/irxeniac/FoxholeArtillery-Windows/wiki");
});



function createOverlay() {
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
        webPreferences: {
            nodeIntegration: true,
            //devTools: false
        },
        icon: __dirname + "/assets/images/icon.png",
    });

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
}