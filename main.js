// 1. ArtyCalc most be on top in bordless windows
// 2. Make a fullscreen transparent window
// 3. move elements on a transparent full screen
// 4. work with html elements by seprated html element


// Modules to control application life and create native browser window
const { app, BrowserWindow} = require('electron')
require('electron-reload')(__dirname);
const nativeImage = require('electron').nativeImage;

const ipc_main = require("electron").ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let landing
var appIcon = nativeImage.createFromPath("/assets/images/icon.png");

function createWindow() {
    // Create the browser window.
    landing = new BrowserWindow({
        width: 600,
        height: 580,
        webPreferences: {
            nodeIntegration: true,
            //devTools: false
        },
        resizable: false,
        frame: false,
        show: false,
        icon: __dirname + "/assets/images/icon.png",
    })

    landing.setOverlayIcon(appIcon,"Foxhole Artillery");

    // and load the index.html of the app.
    landing.loadFile('src/landing.html')

    // Open the DevTools.
    landing.webContents.openDevTools()

    // Emitted when the window is closed.
    landing.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        landing = null
    })

    landing.once("ready-to-show", () => {
        landing.show();
        landing.focus();
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.disableHardwareAcceleration();

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (landing === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let isClosed = false;
// get startTheGameBtn

console.log("send");
ipc_main.on("ClosedEvent", (event) => {
    isClosed = true;
    console.log("isClosed from overlay");

    landing.webContents.executeJavaScript(`
        document.getElementById("startTheGameBtn").disabled = false
    `)
})


ipc_main.on("landingClosed", (event, args) => {
    ipc_main.setMaxListeners(1);
    // if sender true ipc main send data to landing
    if (isClosed === true) {
        console.log("reading isclosed !!!")
        event.sender.send("landingClosed", true);
    }
    landing.webContents.executeJavaScript(`
        document.getElementById("startTheGameBtn").disabled = true
      `)
    isClosed = false;
})

ipc_main.on("closeApp", (event,args) => {
    app.quit();
})