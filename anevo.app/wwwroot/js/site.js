const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
    //$("#test").click(function () {
    //    console.log("tst");
    //    $(".left-menu").toggle();
    //});

    $("#menu-toggle").on("click", function () {
        
        $("#navbarNavDropdown").toggle("fast", function () {
            if ($("#menu-toggle i").hasClass("fa-toggle-on")) {
                $("#menu-toggle i").removeClass("fa-toggle-on").addClass("fa-toggle-off");
                $(".dashboard").css({ 'min-height': '80px' });
                $("#navbarNavDropdown").css({ 'display': 'none' });
                $(".lgtop").css({ 'max-height': '0px' });
            }
            else {
                $("#menu-toggle i").removeClass("fa-toggle-off").addClass("fa-toggle-on");
                $(".dashboard").css({ 'min-height': '100%' });
                $("#navbarNavDropdown").css({ 'display': 'grid' });
                $(".lgtop").css({ 'max-height': '100%' });
            };
        });        
    });
});

var get_btc_price_url = "https://api.allinoneapi.app/api/Crypto/GetPrice?symbol=BTCUSDT";
var get_spy_price_url = "https://api.allinoneapi.app/api/Stock/GetPrice?symbol=SPY";
var min = 9999999999;
function getBtcPrice() {
    //console.log("getBtcPriceStart");
    $.ajax({
        url: get_btc_price_url,
        context: document.body,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Accept": "*"
        }
    }).done(function (data) {
        //console.log("getBtcPriceDone");
        var current_price = $("#price-bitcoin").text();
        //console.log(current_price);
        if (current_price > data["price"]) {
            $("#price-bitcoin").animate({
                color: "red"
            }, 300);
        }
        if (current_price < data["price"]) {
            $("#price-bitcoin").animate({
                color: "#07d00a"
            }, 300);
        }
        $("#price-bitcoin").animate({
            color: "white"
        }, 300);
        $("#price-bitcoin").text(data["price"]);
        //console.log("getBtcPriceEnd " + data["price"]);
    });
}

function getSpyPrice() {
    $.ajax({
        url: get_spy_price_url,
        context: document.body,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Accept": "*"
        }
    }).done(function (data2) {
        //$("#price-spy").text(data2["closePrice"]);
        //console.log(data2);
        var current_price = $("#price-spy").text();
        //console.log(current_price);
        if (current_price > data2[0]["closePrice"]) {
            $("#price-spy").animate({
                color: "red"
            }, 300);
        }
        if (current_price < data2[0]["closePrice"]) {
            $("#price-spy").animate({
                color: "#07d00a"
            }, 300);
        }
        $("#price-spy").animate({
            color: "white"
        }, 300);
        $("#price-spy").text(data2[0]["closePrice"]);
    });
}
getBtcPrice();
getSpyPrice();

var start = Date.now();
setInterval(function () {
    var delta = Date.now() - start; // milliseconds elapsed since start
    getBtcPrice();
    getSpyPrice();
}, 5000); // update about evey second


if ($(window).width() < 574) {
    $("#detail").addClass("text-center");
    $(".detail-image").addClass("d-none");

}

if ($(window).width() > 574) {
    $("#detail").removeClass("text-center");
    $(".detail-image").removeClass("d-none");

}

$(window).on('resize', function () {
    if ($(window).width() < 574) {
        $("#detail").addClass("text-center");
        $(".detail-image").addClass("d-none");
    }
    else {
        $("#detail").removeClass("text-center");
        $(".detail-image").removeClass("d-none");
    }
});