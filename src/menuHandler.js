const remote = require("electron").remote;

// a js file for handle close and minimize events


// define variables
let close;
let minimize;
const currentWindow = remote.getCurrentWindow();

// get elements
// ....
minimize = document.getElementById("minimize");
minimize.addEventListener("click", (event) => {
    currentWindow.minimize();
})

close = document.getElementById("close");
close.addEventListener("click", (event) => {
    currentWindow.close();
})