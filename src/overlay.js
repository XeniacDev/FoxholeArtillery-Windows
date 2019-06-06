// get variables
let radioSubtitle = document.getElementById("Arty_type_radio_subtitle");
let errorLabel = document.getElementById("error_label")
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
friendlyDis.onkeyup = CalcSender;
friendlyAzim.onkeyup = CalcSender;

// use this method for send data 
function CalcSender() {
    console.log(enemyDis.value);
    console.log(friendlyDis.value);
    console.log(enemyDis.value - friendlyDis.value);
    if(enemyDis.value != "" && enemyAzim.value != "" && friendlyDis.value != "" && friendlyAzim.value != "" ) {
        // check that values are valid or not
        if(IsValid(enemyDis.value,enemyAzim.value,friendlyDis.value,friendlyAzim.value) === true) {
            // if all of they were valid send data for calculation
        }
        else {
            // show the error 
        }
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

// use this for data validation
function IsValid(enemyDisValue,enemyAzimValue,friendlyDisValue,friendlyAzimValue) {
    let isValid = true;
    // Conditions
    // 1. dis === dis and azim === azim  
    if((enemyDisValue === friendlyDisValue && enemyAzimValue === friendlyAzimValue)) {
        isValid = false;
        errorLabel.textContent = errorList.sameCoords;
    }
    return isValid;
}
























// error list
const errorList = {
    emptyFields: "Fields can not be empty",
    closeTarget: "Target is too close to artillery ",
    sameCoords: "Coordinates must not be the same.",
    lowRange: "distance can't be less than 45m",
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
