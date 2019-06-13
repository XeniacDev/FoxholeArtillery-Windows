
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
modalBg = document.querySelector(".modal-bg");
ModalCancel = document.getElementById("ModalCancel");
AppClose = document.getElementById("AppClose");


close.addEventListener("click", (event) => {
    modalBg.classList.add("bg-active");
})

ModalCancel.addEventListener("click", closeModal);
modalBg.addEventListener("click", closeModal);
AppClose.addEventListener("click", () => {
    ipc_renderer.send("closeApp");
})

function closeModal() {
    modalBg.classList.remove("bg-active");
}



