const $ = require('jquery');
const bezz = require("jquery-bez");



$(document).ready(() => {
    $("#overlay_content_box").click(
        () => {
            $("#overlay_content_box").animate({
                    width: "360px",
                    height: "686px",
            }, 500, $.bez([.52, .25, .15, .99]));
            $("#overlay_content_box").css('border-radius', '5px');
            
        }
    )
});


