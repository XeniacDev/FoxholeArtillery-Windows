const $ = require('jquery');
require("jquery-bez");



// Jquery animation for ArtyCalc modal overlay

$(document).ready(() => {
    $("#overlay_content_box").click(
        () => {
            $("#overlay_content_box").animate({
                    width: "360px",
                    height: "686px",
            }, 500, $.bez([.52, .25, .15, .99]));
            $("#overlay_content_box").css('border-radius', '5px');
            $("#overlay_content_box").css("cursor", "default");
        }
    )
});


