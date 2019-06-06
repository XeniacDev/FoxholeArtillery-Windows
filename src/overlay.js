// get variables
let radioSubtitle = document.getElementById("Arty_type_radio_subtitle");

// enemy textboxes
let enemyDis = document.getElementById("enemyDistance"); 
let enemyAzim = document.getElementById("enemyAzimuth");
//friendly textboxes
let friendlyDis = document.getElementById("friendlyDistance");
let friendlyAzim = document.getElementById("friendlyAzimuth");

// use global change method to track everything
document.addEventListener("change",() => {
    // get value of selected radio button
    let radioTitle = document.querySelector('input[name="arty_type"]:checked').value; 
    // send value to change the subtitle method
    radioSubtitle.innerText = radioTitle;
    // show result c0ords
});


// get values of textbox after type it on txboxes
enemyDis.onkeyup = CalcSender;
enemyAzim.onkeyup = CalcSender;
friendlyDis.onkeydup = CalcSender;
friendlyAzim.onkeyup = CalcSender;
function CalcSender() {
    if(enemyDis.value != "" && enemyAzim.value != "" && friendlyDis.value != "" && friendlyDis != "" ) {
        // send values to calc method
    }
}


























// error list
const errorList = {
    emptyFields: "Fields can not be empty",
    closeTarget: "Target is too close to artillery ",
    sameCoords: "Target and Friendly distance and azimuth must not be the same.",
    zeroCoords: "Target and Friendly distance must not be both 0.",
}

// Arty ranges
const artilleryRanges = {
    Mortar: {
        MinRange: 45,
        MaxRange: 65
    },
    Howitzer: {
        MinRange: 75,
        MaxRange: 150
    },
    Gunboat: {
        MinRange: 50,
        MaxRange: 100
    },
    Fieldartillery: {
        MinRange: 75,
        MaxRange: 150
    }
}


// Helper methods
function Getradiant(angle) {
    // use this for calc cos
    return (Math.PI * angle / 180);
}
function Getdegree(angle) {
    return (angle * 180 / Math.PI);
}
function angleConverter(angle) {
    return ((angle > 360) ? angle - 360 : angle);
}