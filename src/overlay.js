/*
*
*       FOXHOLE ARTILLERY CALCULATOR 
*       SOURCE: http://www.foxhole-arty.com/
*       CREATE BY [11TH GUIZMO] ( only calc algorithm not more )
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

let radioTitle = null

// use global change method to track everything
document.addEventListener("change",() => {
    // get value of selected radio button
    radioTitle = document.querySelector('input[name="arty_type"]:checked').value; 
    // send value to change the subtitle method
    radioSubtitle.innerText = radioTitle;
    // after a change we should call calc function for refresh ( maxRange minRange for each Arty need to be refresh)
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
    console.log(radioTitle);
    console.log(r_azi);
    console.log(r_dist);

    // add result to labels
    WriteResults(r_dist, r_azi);
}

function WriteResults(resultDistance, resultAzimuth) {
    // .. save R_dis by one floating point
    // .. check for how increase distance
    // .... first we need to know what type of arty is checked right now
    // .... after that we can access the Max and min rnage
    switch(radioTitle) {
        case "Field artillery":
            console.log("Field artillery");
            correctedDistance(resultDistance, {
                // send arty-type data for calculate the distance for each arty
                artyName: radioTitle,
                MaxRange: artilleryRanges.Fieldartillery,
                MinRange: artilleryRanges.Fieldartillery,
                Increament: artilleryIncreament.byOne,

            });
            break;
        case "Gunboat":
            console.log("Gunboat");
            break;
        case "Howitzer":
            console.log('Howitzer');
            correctedDistance(resultDistance, {
                // send arty-type data for calculate the distance for each arty
                artyName: radioTitle,
                MaxRange: artilleryRanges.Fieldartillery,
                MinRange: artilleryRanges.Fieldartillery,
                Increament: artilleryIncreament.byOne,

            });
            break;
        case "Mortar":
            console.log("Mortar");
            break;
    }
    // .. check for range of arty based on artilleryRanges
}

// we use this class to show best coords as possbile
function correctedDistance(distance, Artilleryobject) {
    let result = 0;

    let floatDistance = 78;
    const Arty = Artilleryobject;

    switch (Arty.artyName) {
        case "Field artillery":
        case "Gunboat":
            console.log("Fa :D");
            let intDistance = parseInt(distance);
            // get next and previous number
            let nextNumber = ++intDistance;

            if((floatDistance - intDistance) < (nextNumber - floatDistance)){
                // close to previous number
                result = Math.floor(floatDistance);
            }
            else {
                result = Math.round(floatDistance);
            }
            break;
        case "Howitzer":
            result = floatDistance % 5 < 3 ? (floatDistance % 5 === 0 ? floatDistance : Math.floor(floatDistance / 5) * 5) : Math.ceil(floatDistance / 5) * 5;
            console.log("Howi :D");
            break;
        
    }


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
        MaxRange: 65,
    },
    Howitzer: {
        MinRange: 75,
        MaxRange: 150,
    },
    Gunboat: {
        MinRange: 50,
        MaxRange: 100,
    },
    Fieldartillery: {
        MinRange: 75,
        MaxRange: 150,
    }
};

// artillery increament count
const artilleryIncreament = {
    byHalf: 0.5,
    byOne: 1,
    byFive: 5,
};