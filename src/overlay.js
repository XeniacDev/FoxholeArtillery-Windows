/*
*
*       FOXHOLE ARTILLERY CALCULATOR 
*       SOURCE: http://www.foxhole-arty.com/
*       CREATE BY [11TH GUIZMO]
*       THANK YOU GUIZMO :P
*/


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
    if(enemyDis.value != "" && enemyAzim.value != "" && friendlyDis.value != "" && friendlyAzim.value != "" ) {
        // check that values are valid or not
        if(IsValid(enemyDis.value,enemyAzim.value,friendlyDis.value,friendlyAzim.value) === true) {

            // if all of they were valid send data for calculation
            calc_data(enemyDis.value,enemyAzim.value,friendlyDis.value,friendlyAzim.value);
        }
    }
}


// Helper methods
function convert_angle(angle) {
    return ((angle > 360) ? angle - 360 : angle);
}

function rad(angle) {
    return (Math.PI * angle / 180);
}

function deg(angle) {
    return (angle * 180 / Math.PI);
}

//convert user inputs to int
function numberConverter(number) {
    return parseInt(number);
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
    // more errors if we need :)
    return isValid;
}

// calc coords here
function calc_data(e_dist, e_azi, f_dist, f_azi) {
    let a_delt = 0;
    let r_dist = 0;
    let a_step = 0;
    let r_azi = 0;

    //convert user inputs to int
    e_dist = numberConverter(e_dist);
    e_azi = numberConverter(e_azi);
    f_dist = numberConverter(f_dist);
    f_azi = numberConverter(f_azi);

    a_delt = (e_azi > f_azi) ? rad(e_azi - f_azi) : rad(f_azi - e_azi);

    r_dist = Math.sqrt(e_dist * e_dist + f_dist * f_dist - 2 * e_dist * f_dist * Math.cos(a_delt));

    a_step = Math.round(deg(Math.acos((-(e_dist * e_dist) + f_dist * f_dist + r_dist * r_dist) / (2 * f_dist * r_dist))));

    if (convert_angle(deg(a_delt)) > 180) {
        r_azi = (e_azi > f_azi) ? f_azi + 180 + a_step : f_azi + 180 - a_step;
    } else {
        r_azi = (e_azi > f_azi) ? f_azi + 180 - a_step : f_azi + 180 + a_step;
    }
    console.log(r_azi);
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
