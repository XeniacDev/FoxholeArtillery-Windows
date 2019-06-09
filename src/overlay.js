const { clipboard } = require('electron');
/*
*
*       FOXHOLE ARTILLERY CALCULATOR 
*       SOURCE: http://www.foxhole-arty.com/
*       CREATE BY [11TH GUIZMO] ( only calc algorithm not more )
*       THANK YOU GUIZMO :P
*/
let isFinishedFlag = false;
sessionStorage.setItem("globalAzimuth", 0);
sessionStorage.setItem("globalDistance", 0);



// get variables
let radioSubtitle = document.getElementById("Arty_type_radio_subtitle");
let errorLabel = document.getElementById("error_label")
errorLabel.classList.add("display_none");
// enemy textboxes
let enemyDis = document.getElementById("enemyDistance"); 
let enemyAzim = document.getElementById("enemyAzimuth");
//friendly textboxes
let friendlyDis = document.getElementById("friendlyDistance");
let friendlyAzim = document.getElementById("friendlyAzimuth");

// get result coordinate labels
let distanceLabel = document.getElementById("distanceLabel");
let azimuthLabel = document.getElementById("azimuthLabel");

// clipboard button
let clipBoardBtn = document.getElementById("clipBoardBtn");


let radioTitle = null

clipBoardBtn.addEventListener("click", ClipBoard);

// use global change method to track everything
document.addEventListener("change",() => {
    // get value of selected radio button
    radioTitle = document.querySelector('input[name="arty_type"]:checked').value; 
    // send value to change the subtitle method
    radioSubtitle.innerText = radioTitle;
    // after a change we should call calc function for refresh ( maxRange minRange for each Arty need to be refresh)

    errorLabel.classList.remove("green_color");
    errorLabel.classList.add("red_color");
    let globalAzimuth;
    let globalDistance;
    globalAzimuth = sessionStorage.getItem("globalAzimuth");
    globalDistance = sessionStorage.getItem("globalDistance");

    if((enemyDis.value != "" || enemyAzim.value != "" || friendlyDis.value != "" || friendlyAzim.value != "")) {
        if (isFinishedFlag === true) {
            //send new data for calculation
            // distance - azimuth - arty name
            WriteResults(globalDistance, globalAzimuth);
        }
    }
    else {
        errorLabel.classList.remove("display_none");
        errorLabel.innerText = errorList.emptyFields;

    }
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
        else {
            errorLabel.classList.remove("display_none");
            errorLabel.innerText = errorList.sameCoords;
            distanceLabel.innerHTML = "Error" + "<span></span>";
            azimuthLabel.innerHTML = "Error" + "<span>°</span>";
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
    return parseFloat(number);
}

function roundNumbersByFive(number) {
    return number % 5 < 3 ? (number % 5 === 0 ? number : Math.floor(number / 5) * 5) : Math.ceil(number / 5) * 5;
}

// split float numbers to Two parts example : 112.9   -> 112 and 9 and round the number
function floatNumbersRounding(number) {
    let result = 0;
    let placeholder
    // we need to split number to two parts
    let numberSpliter = number.toString();
    numberSpliter = numberSpliter.split(".");

    placeholder = numberSpliter;
    numberSpliter = parseInt(numberSpliter[1]);

    if (numberSpliter != 5) {
        result = roundNumbersByFive(numberSpliter);
        if (result === 10) {
            result = parseInt(placeholder[0]);
            result += 1;
        }
        else {
            if (result === 5) {
                // convert array to number
                let placeholderIntNumber = placeholder[0];
                result = parseFloat(placeholderIntNumber.concat(".", result));
            }
            else {
                result = parseInt(placeholder[0]);
            }
        }
    }
    else {
        result = number;
    }
    return result;
}

// target range checker 
function targetRangeChecker(correctCoords, artilleryType) {
    let ranges = artilleryType;
    let result = false;
    if(correctCoords > ranges.MaxRange || correctCoords < ranges.MinRange) {
        result = true;
        errorLabel.classList.remove("display_none");
        errorLabel.classList.remove("green_color");
        distanceLabel.classList.add("red_color");
        if(correctCoords > ranges.MaxRange) {
            errorLabel.innerText = errorList.farTarget;
        }
        else if(correctCoords < ranges.MinRange) {
            errorLabel.innerText = errorList.closeTarget;
        }
    }
    else {
        // errorLabel.classList.add("display_none");
        distanceLabel.classList.remove("red_color");
        errorLabel.classList.add("green_color");
        errorLabel.innerText = errorList.happyHunting;
    }
    return result;
}

// use this for data validation
function IsValid(enemyDisValue,enemyAzimValue,friendlyDisValue,friendlyAzimValue) {

    let isValid = true;
    // Conditions
    // 1. dis === dis and azim === azim  
    if((enemyDisValue === friendlyDisValue && enemyAzimValue === friendlyAzimValue)) {
        isValid = false;
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

    if(r_dist >= 45 && e_dist != 0) {
        errorLabel.classList.add("display_none");
        console.log("hello!!!!");
            a_step = Math.round(deg(Math.acos((-(e_dist * e_dist) + f_dist * f_dist + r_dist * r_dist) / (2 * f_dist * r_dist))));

            if (convert_angle(deg(a_delt)) > 180) {
                r_azi = (e_azi > f_azi) ? f_azi + 180 + a_step : f_azi + 180 - a_step;
            } 
            else {
            //r_azi = (e_azi > f_azi) ? f_azi + 180 - a_step : f_azi + 180 + a_step;
            if (e_azi > f_azi) {
                r_azi = f_azi + 180 - a_step;
            }
            else {
                r_azi = f_azi + 180 + a_step;
            }
        }
        r_azi = convert_angle(Math.round(r_azi));

        // set global variables
        sessionStorage.setItem("globalAzimuth", r_azi);
        sessionStorage.setItem("globalDistance", r_dist);

        // check if dis is higher than maxRange || minRange 
        // .. 
        WriteResults(r_dist, r_azi);

    }
    else {
        isFinishedFlag = false;
        errorLabel.innerText = errorList.lowRange;
        errorLabel.classList.remove("display_none");
        distanceLabel.classList.remove("red_color");
        distanceLabel.innerHTML = "Error" + "<span></span>";
        azimuthLabel.innerHTML = "Error" + "<span>°</span>";

    }
}

function WriteResults(resultDistance, resultAzimuth) {

    errorLabel.classList.remove("display_none");
    let correctCoordinates = 0;
    // .. save R_dis by one floating point
    // .. check for how increase distance
    // .... first we need to know what type of arty is checked right now
    // .... after that we can access the Max and min rnage
    // .... check for maxRange and minRange errors
    switch (radioTitle) {
        case "Field artillery":
            correctCoordinates = correctedDistance(resultDistance, {
                // send arty-type data for calculate the distance for each arty
                artyName: radioTitle,
            });
            targetRangeChecker(correctCoordinates, artilleryRanges.Fieldartillery);
            break;
        case "Gunboat":
            correctCoordinates = correctedDistance(resultDistance, {
                // send arty-type data for calculate the distance for each arty
                artyName: radioTitle,
            });
            targetRangeChecker(correctCoordinates, artilleryRanges.Gunboat);
            break;
        case "Howitzer":
            correctCoordinates = correctedDistance(resultDistance, {
            // send arty-type data for calculate the distance for each arty
            artyName: radioTitle,
            });
            targetRangeChecker(correctCoordinates, artilleryRanges.Howitzer);
            break;
        case "Mortar":
            correctCoordinates = correctedDistance(resultDistance, {
                // send arty-type data for calculate the distance for each arty
                artyName: radioTitle,
            });
            targetRangeChecker(correctCoordinates, artilleryRanges.Mortar);
            break;
        }
        // write the data
        resultDistance = correctCoordinates;
        distanceLabel.innerHTML = resultDistance + "<span>m</span>";
        azimuthLabel.innerHTML = resultAzimuth + "<span>°</span>";

        // set global variables
        sessionStorage.setItem("resultAzimuth_", resultAzimuth);
        sessionStorage.setItem("resultDistance_", resultDistance);

        // copy to clipboard
        clipBoardBtn.addEventListener("click", ClipBoard);
        isFinishedFlag = true;
}

// we use this class to show best coords as possbile
function correctedDistance(distance, Artilleryobject) {
    let result = 0;
    let floatDistance = parseFloat(distance);
    floatDistance = floatDistance.toFixed(1);
    const Arty = Artilleryobject;

    switch (Arty.artyName) {
        case "Field artillery":
        case "Gunboat":
            let intDistance = Math.floor(floatDistance);
            // get next and previous number
            let nextNumber = intDistance + 1;

            if((floatDistance - intDistance) < (nextNumber - floatDistance)){
                // close to previous number
                result = Math.floor(floatDistance);
            }
            else {
                result = Math.round(floatDistance);
            }
            break;
        case "Howitzer":
            result = floatNumbersRounding(floatDistance);
            result = roundNumbersByFive(result);
            break;
        case "Mortar":
            result = floatNumbersRounding(floatDistance);
            break;
    }
    return result;
}

// error list
const errorList = {
    emptyFields: "Fields can not be empty",
    closeTarget: "Target is too close",
    farTarget: "Target is too far",
    sameCoords: "Coordinates must not be the same.",
    lowRange: "distance can't be less than 45m",
    happyHunting: "Happy hunting",
    cantCopy: "There're no coords for copying",
    canCopy: "Copied to clipboard"
}

// Arty ranges
const artilleryRanges = {
    "Mortar": {
        MinRange: 45,
        MaxRange: 65,
    },
    "Howitzer": {
        MinRange: 75,
        MaxRange: 150,
    },
    "Gunboat": {
        MinRange: 50,
        MaxRange: 100,
    },
    "Fieldartillery": {
        MinRange: 75,
        MaxRange: 150,
    }
};

function ClipBoard() {
    errorLabel.classList.remove("display_none");
    if (isFinishedFlag === true) {
        // copy to clipBoard
        // we have coords 
        let resultAzimuth_;
        let resultDistance_;

        resultAzimuth_ = sessionStorage.getItem("resultAzimuth_");
        resultDistance_ = sessionStorage.getItem("resultDistance_");
        clipboard.writeText("Distance: " + resultDistance_ + "  Azimuth: " + resultAzimuth_);
        errorLabel.classList.add("green_color");
        errorLabel.classList.remove("red_color")
        errorLabel.innerText = errorList.canCopy;
    }
    else {
        // error !
        // there nothing to copy
        errorLabel.classList.remove("green_color");
        errorLabel.classList.add("red_color")
        errorLabel.innerText = errorList.cantCopy;
    }
}