// get variables
let radioSubtitle = document.getElementById("Arty_type_radio_subtitle");

// enemy textboxes
let enemyDis = document.getElementById("enemyDistance"); 
let enemyAzim = document.getElementById("enemyAzimuth");

//friendly textboxes

// use global change method to track everything
document.addEventListener("change",() => {
    // get value of selected radio button
    let radioTitle = document.querySelector('input[name="arty_type"]:checked').value; 
    // send value to change the subtitle method
    radioSubtitle.innerText = radioTitle;
    // send data to calc function(textboxes if they are not empty);
    // اگر یکیشون هم خالی بود دیتایی برای حساب کردن ارسال نمیشه
    console.log(enemyDis.value);
    // show result c0ords

});




























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