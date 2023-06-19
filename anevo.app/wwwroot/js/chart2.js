//import { timeFormat } from "https://cdn.skypack.dev/d3-time-format@4";
var time_count2 = 1;
var interval2 = "1m";
var lines2 = 289;
var date_start = "";
var date_end = "";
const margin2 = { top: 30, right: 0, bottom: 30, left: 0 },
    width2 = 960 - margin2.left - margin2.right,
    height2 = 280 - margin2.top - margin2.bottom;
var anim_fihished2 = 0;
var parseDate2 = d3.utcParse("%m/%d/%Y"),
    formatDate2 = d3.timeFormat("%x %H:%M:%S"),
    formatMonth2 = d3.timeFormat("%b");

function another6HourRound(date) {
    var subHalf = d3.time.hour.offset(date, -3);
    var addHalf = d3.time.hour.offset(date, 3);
    return d3.time.hours(subHalf, addHalf, 6)[0];
}

var x2 = d3.scaleTime().range([0, width2]);
var y2 = d3.scaleLinear().range([height2, 0]);

var area2 = d3
    .area()
    .x((d) => { return x2(d.date2); })
    .y0(height2)
    .y((d) => { return y2(d.price2); })
    .curve(d3.curveCardinal);

var valueline2 = d3
    .line()
    .x((d) => {
        //console.log(x2(d.date2));
        return x2(d.date2);
    })
    .y((d) => { return y2(d.price2); })
    .curve(d3.curveBasis);

const svg2 = d3
    .select("#root2")
    .append("svg")
    .attr(
        "viewBox",
        `0 0 ${width2 + margin2.left + margin2.right} ${height2 + margin2.top + margin2.bottom}`)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
function subtractDays(date, days) {
    date.setDate(date.getDate() - days);

    return date;
}
function GetCurrentPrice(days) {
    $.ajax({
        url: "https://api.allinoneapi.app/api/Stock/GetPrice?symbol=SPY",
        context: document.body,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Accept": "*"
        }
    }).done(function (data2) {
        //console.log(data2);
        date_end = data2[0]["openTime"].substring(0, 10);
        date_start = subtractDays(new Date(data2[0]["openTime"]), days);
        date_start = date_start.getFullYear() + "-" + ("0" + (date_start.getMonth() + 1)).slice(-2) + "-" + ("0" + date_start.getDate()).slice(-2);
        console.log(date_start + " " + date_end + " " + time_count2 + " " + interval2 + " " + lines2);
        appendData2(time_count2, interval2, lines2);
    });
}
GetCurrentPrice(1);

$("#spy-1d").click(function () {
    $("#spy-1d").addClass("active");
    $("#spy-1w").removeClass("active");
    $("#spy-1m").removeClass("active");
    $("#spy-1y").removeClass("active");
    $("#spy-5y").removeClass("active");
    interval2 = "1m";
    time_count2 = 1;
    GetCurrentPrice(1);
});
$("#spy-1w").click(function () {
    $("#spy-1w").addClass("active");
    $("#spy-1d").removeClass("active");
    $("#spy-1m").removeClass("active");
    $("#spy-1y").removeClass("active");
    $("#spy-5y").removeClass("active");
    interval2 = "1H";
    time_count2 = 1;
    GetCurrentPrice(7);
});
$("#spy-1m").click(function () {
    $("#spy-1m").addClass("active");
    $("#spy-1d").removeClass("active");
    $("#spy-1w").removeClass("active");
    $("#spy-1y").removeClass("active");
    $("#spy-5y").removeClass("active");
    interval2 = "1H";
    time_count2 = 1;
    GetCurrentPrice(30);
});
$("#spy-1y").click(function () {
    $("#spy-1y").addClass("active");
    $("#spy-1d").removeClass("active");
    $("#spy-1w").removeClass("active");
    $("#spy-1m").removeClass("active");
    $("#spy-5y").removeClass("active");
    interval2 = "1D";
    time_count2 = 1;
    GetCurrentPrice(365);
});
$("#spy-5y").click(function () {
    $("#spy-5y").addClass("active");
    $("#spy-1d").removeClass("active");
    $("#spy-1w").removeClass("active");
    $("#spy-1m").removeClass("active");
    $("#spy-1y").removeClass("active");
    interval2 = "1W";
    time_count2 = 1;
    GetCurrentPrice(1825);
});
var start2 = Date.now();
setInterval(function () {
    var delta = Date.now() - start2; // milliseconds elapsed since start
    appendData2(time_count2, interval2, lines2);
}, 60000); // update about every second

function appendData2(time_count, interval, lines) {
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    //console.log(strDate);
    ip2 = "";
    //filename = "https://hungryapi.ru/api/Crypto/GetKandles?symbol=BTCUSDT&minutes=" + time_count + "&lines=" + lines + "&interval=" + interval;
    filename2 = "https://api.allinoneapi.app/api/Stock/GetKandles?symbol=SPY&interval=" + interval2 + "&minutes=" + time_count2 + "&lines=5000&datestart=" + date_start + "&dateend=" + date_end;
    //console.log(filename2);
    var min2 = 9999999999;
    $.ajax({
        url: filename2,
        context: document.body,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Accept": "*"
        }
    }).done(function (data2) {
        //console.log(resp);
        d3.selectAll("#root2 path.area").remove();
        d3.selectAll("#root2 path.line").remove();
        d3.selectAll("#root2 .title").remove();
        data2.forEach(d => {
            //$('#table-crypto tbody').append('<tr role="button" class="align-middle" onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\"><td scope="row" class="first_row" onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\"><a href="/Home/Crypto/' + element['symbol'] + '"><span class="d-inline-block star-black" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Add to watchlist"><i class="fa fa-star-o"></i></span></a></td><td scope="row" class="first_row"  onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\" ><a href="/Home/Crypto/' + element['symbol'] + '"><img title="' + element['name'] + '" src="/img/crypto/' + element['symbol'] + '.png" onerror="this.onerror=null;this.src=\'/img/stocks/question.jpg\';" height="50" width="50" /></a></td><td scope="row"><span class="name"  onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\" ><a href="/Home/Crypto/' + element['symbol'] + '">' + element['name'] + '</span><span class="ticker">' + element['symbol'] + '</span></a></td><td scope="row"  onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\" ><a href="/Home/Crypto/' + element['symbol'] + '">$' + element['price'].toFixed(3) + '</a></td></tr>');
            date2 = d['openTime'].substring(5, 7) + "/" + d['openTime'].substring(8, 10) + "/" + d['openTime'].substring(0, 4) + " " + d['openTime'].substring(11, 13) + ":" + d['openTime'].substring(14, 16) + ":" + d['openTime'].substring(17, 19) + ".000Z";
            date2 = d['openTime'].substring(5, 7) + "/" + d['openTime'].substring(8, 10) + "/" + d['openTime'].substring(0, 4);
            //console.log(date);
            var parseDate2 = d3.utcParse("%Y-%m-%dT%H:%M:%S%Z");
            //date = parseDate(new Date(d['openTime'].substring(0, 4), d['openTime'].substring(8, 10), d['openTime'].substring(5, 7), 0, 0, 0, 0));
            //console.log(date);
            date2 = d['openTime'];
            //console.log("DATE: " + date);
            //console.log("NEW: " + parseDate('01/01/2023T12:35:43.000Z'));

            d.date2 = parseDate2(date2);
            //console.log("NEWDATE2: " + another6HourRound(d.date2));
            d.price2 = Number(d['closePrice']);
            //console.log("CHART2: " + d.date2 + " " + d.price2);
            if (d.price2 < min2) {
                min2 = d.price2
            }
        });

        //var arr = {  };//
        //$.ajax({
        //    url: filename,
        //    type: 'GET',
        //    data: JSON.stringify(arr),
        //    crossDomain: true,
        //    "headers": {
        //        "accept": "application/json",
        //        "Access": "*"
        //    },
        //    contentType: 'application/json; charset=utf-8',
        //    dataType: 'json',
        //    async: false,
        //    success: function (msg) {
        //        console.log(msg);
        //    }
        //});


        //filename = "https://raw.githubusercontent.com/jukuznets/datasets/main/usd-" + year + ".csv";
        //d3.json(filename).then((data) => {
        //    data = data.reverse();
        //    console.log(data);
        //    data.forEach((d) => {
        //        d.date = parseDate(d.date);
        //        d.price = Number(d.price);

        //    });
        //avg = avg / count;
        //console.log(min2);
        x2.domain(
            d3.extent(data2, (d) => {
                //console.log(d.date2);
                return d.date2;
            })
        );
        y2.domain([
            min2,
            d3.max(data2, (d) => { return d.price2; }),
        ]);



        var areaPath2 = svg2
            .append("path")
            .data([data2])
            .attr("class", "area")
            .attr("d", area2)
            .attr("transform", "translate(0,300)")
            .transition()
            .duration(1000)
            .attr("transform", "translate(0,0)");

        var linePath2 = svg2
            .append("path")
            .data([data2])
            .attr("class", "line")
            .attr("d", valueline2)
        var pathLength2 = linePath2.node().getTotalLength();
        linePath2
            .attr("stroke-dasharray", pathLength2)
            .attr("stroke-dashoffset", pathLength2)
            .attr("stroke-width", 3)
            .transition()
            .duration(500)
            .attr("stroke-width", 0)
            .attr("stroke-dashoffset", 0);

        var focus2 = svg2
            .append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus2
            .append("line")
            .attr("class", "x")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height2);

        focus2
            .append("line")
            .attr("class", "y")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width2)
            .attr("x2", width2);

        focus2
            .append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .attr("r", 4);

        focus2.append("text").attr("class", "y1").attr("dx", 8).attr("dy", "-.3em");
        focus2.append("text").attr("class", "y2").attr("dx", 8).attr("dy", "-.3em");

        focus2.append("text").attr("class", "y3").attr("dx", 8).attr("dy", "1em");
        focus2.append("text").attr("class", "y4").attr("dx", 8).attr("dy", "1em");

        function mouseMove2(event) {

            var bisect2 = d3.bisector((d) => d.date2).left,
                x0 = x2.invert(d3.pointer(event, this)[0]),
                i = bisect2(data2, x0, 1),
                d0 = data2[i - 1],
                d1 = data2[i],
                d = x0 - d0.date2 > d1.date2 - x0 ? d1 : d0;
            btc_price2 = d.price2;
            //if (anim_fihished == 0) {
            //    anim_fihished = 1;
            //    //$('#price-bitcoin').fadeOut(200).dequeue().fadeIn(20);

            //    $('#price-bitcoin').fadeOut(100).promise().done(function () {
            //        console.log('finished');
            //        $("#price-bitcoin").fadeIn(100).promise().done(function(){
            //            anim_fihished = 0;
            //        });

            //    });
            //}
            $("#price-spy").text(btc_price2);
            //console.log(d.price);
            //if (anim_fihished == 0) {
            //    var myEvent = function () {
            //        $("#price-bitcoin").fadeOut("fast");
            //    };
            //    $.when(myEvent()).done(function () {
            //        console.log('finished');
            //        canim_fihished = 1;
            //        $("#price-bitcoin").fadeIn();
            //    });
            //}
            //$("#price-bitcoin").text(btc_price);

            //$("#price-bitcoin").toggle("fast", function () {
            //    $("#price-bitcoin").text(d.price);
            //});
            //$("#price-bitcoin").text(d.price);
            //$("#price-bitcoin").toggle();

            focus2
                .select("circle.y")
                .attr("transform", "translate(" + x2(d.date2) + "," + y2(d.price2) + ")");

            focus2
                .select("text.y1")
                .attr("transform", "translate(" + x2(d.date2) + "," + y2(d.price2) + ")")
                .text(d.price2);

            focus2
                .select("text.y2")
                .attr("transform", "translate(" + x2(d.date2) + "," + y2(d.price2) + ")")
                .text(d.price2);

            focus2
                .select("text.y3")
                .attr("transform", "translate(" + x2(d.date2) + "," + y2(d.price2) + ")")
                .text(formatDate2(d.date2));

            focus2
                .select("text.y4")
                .attr("transform", "translate(" + x2(d.date2) + "," + y2(d.price2) + ")")
                .text(formatDate2(d.date2));

            focus2
                .select(".x")
                .attr("transform", "translate(" + x2(d.date2) + "," + y2(d.price2) + ")")
                .attr("y2", height2 - y2(d.price2));

            focus2
                .select(".y")
                .attr("transform", "translate(" + width2 * -1 + "," + y2(d.price2) + ")")
                .attr("x2", width2 + width2);
        }

        svg2
            .append("rect")
            .attr("width", width2)
            .attr("height", height2)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", () => {
                focus2.style("display", null);
            })
            .on("mouseout", () => {
                focus2.style("display", "none");

            })
            .on("touchmove mousemove", mouseMove2);
    });
}