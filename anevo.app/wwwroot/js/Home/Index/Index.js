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