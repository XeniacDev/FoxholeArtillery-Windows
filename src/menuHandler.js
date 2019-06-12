
const { remote } = require('electron')
const dialog = remote.dialog


// define variables
let close;
let minimize;


let WIN = remote.getCurrentWindow()

// get elements
// ....
minimize = document.getElementById("minimize");
minimize.addEventListener("click", (event) => {
    WIN.minimize();
})

close = document.getElementById("close");
close.addEventListener("click", (event) => {
    event.preventDefault()
    let options = {}
    options.buttons = ["&Yes", "&No"]
    options.message = "Do you really want to quit?"

    dialog.showMessageBox(WIN, options, (res, checked) => {
        console.log(res)
        console.log(checked)
        if (res === 0)
        // send a message to main for close the app
        ipc_renderer.send("closeApp");
    })
})


//renderer.js - the renderer process



