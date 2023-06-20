//import { timeFormat } from "https://cdn.skypack.dev/d3-time-format@4";
var time_count1 = 1440;
var interval1 = "5M";
var lines1 = 289;
const margin1 = { top: 30, right: 0, bottom: 30, left: 0 },
    width1 = 960 - margin1.left - margin1.right,
    height1 = 280 - margin1.top - margin1.bottom;
var anim_fihished1=0;
var parseDate1 = d3.utcParse("%m/%d/%Y"),
    formatDate1 = d3.timeFormat("%Y-%m-%d %H:%M:%S"),
    formatMonth1 = d3.timeFormat("%b");

var x1 = d3.scaleTime().range([0, width1]);
var y1 = d3.scaleLinear().range([height1, 0]);

var area1 = d3
    .area()
    .x1((d) => { return x1(d.date1); })
    .y0(height1)
    .y1((d) => { return y1(d.price1); })
    .curve(d3.curveCardinal);

var valueline1 = d3
    .line()
    .x((d) => { return x1(d.date1); })
    .y((d) => { return y1(d.price1); })
    .curve(d3.curveBasis);

const svg1 = d3
    .select("#root1")
    .append("svg")
    .attr(
        "viewBox",
        `0 0 ${width1 + margin1.left + margin1.right} ${height1 + margin1.top + margin1.bottom}`)
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

appendData1(time_count1,interval1,lines1);
$("#btc-1d").click(function () {
    $("#btc-1d").addClass("active");
    $("#btc-1w").removeClass("active");
    $("#btc-1m").removeClass("active");
    $("#btc-1y").removeClass("active");
    $("#btc-5y").removeClass("active");
    interval1 = "5M";
    time_count1 = 1440;
    appendData1(time_count1, interval1, lines1);
});
$("#btc-1w").click(function () {
    $("#btc-1w").addClass("active");
    $("#btc-1d").removeClass("active");
    $("#btc-1m").removeClass("active");
    $("#btc-1y").removeClass("active");
    $("#btc-5y").removeClass("active");
    interval1 = "1H";
    time_count1 = 10080;
    appendData1(time_count1, interval1, lines1);
});
$("#btc-1m").click(function () {
    $("#btc-1m").addClass("active");
    $("#btc-1d").removeClass("active");
    $("#btc-1w").removeClass("active");
    $("#btc-1y").removeClass("active");
    $("#btc-5y").removeClass("active");
    interval1 = "1H";
    time_count1 = 46080;
    appendData1(time_count1, interval1, lines1);
});
$("#btc-1y").click(function () {
    $("#btc-1y").addClass("active");
    $("#btc-1d").removeClass("active");
    $("#btc-1w").removeClass("active");
    $("#btc-1m").removeClass("active");
    $("#btc-5y").removeClass("active");
    interval1 = "1D";
    time_count1 = 535680;
    appendData1(time_count1, interval1, lines1);
});
$("#btc-5y").click(function () {
    $("#btc-5y").addClass("active");
    $("#btc-1d").removeClass("active");
    $("#btc-1w").removeClass("active");
    $("#btc-1m").removeClass("active");
    $("#btc-1y").removeClass("active");
    interval1 = "1W";
    time_count1 = 2678400;
    lines1 = 1240;
    appendData1(time_count1, interval1, lines1);
});
var start1 = Date.now();
setInterval(function () {
    var delta1 = Date.now() - start1; // milliseconds elapsed since start
    appendData1(time_count1, interval1, lines1);
}, 60000); // update about every second

function appendData1(time_count, interval, lines) {
    ip1 = "";
    filename1 = "https://api.allinoneapi.app/api/Crypto/GetKandles?symbol=BTCUSDT&minutes=" + time_count + "&lines=" + lines + "&interval=" + interval;
    //console.log(filename1);
    var min1 = 9999999999;
    $.ajax({
        url: filename1,
        context: document.body,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            "Accept": "*"
        }
    }).done(function (data1) {
        //console.log(resp);
        d3.selectAll("#root1 path.area").remove();
        d3.selectAll("#root1 path.line").remove();
        d3.selectAll("#root1 .title").remove();
        data1.forEach(d => {
            //$('#table-crypto tbody').append('<tr role="button" class="align-middle" onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\"><td scope="row" class="first_row" onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\"><a href="/Home/Crypto/' + element['symbol'] + '"><span class="d-inline-block star-black" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Add to watchlist"><i class="fa fa-star-o"></i></span></a></td><td scope="row" class="first_row"  onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\" ><a href="/Home/Crypto/' + element['symbol'] + '"><img title="' + element['name'] + '" src="/img/crypto/' + element['symbol'] + '.png" onerror="this.onerror=null;this.src=\'/img/stocks/question.jpg\';" height="50" width="50" /></a></td><td scope="row"><span class="name"  onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\" ><a href="/Home/Crypto/' + element['symbol'] + '">' + element['name'] + '</span><span class="ticker">' + element['symbol'] + '</span></a></td><td scope="row"  onclick=\"window.location.href = \'/Home/Crypto/' + element['symbol'] + '\';\" ><a href="/Home/Crypto/' + element['symbol'] + '">$' + element['price'].toFixed(3) + '</a></td></tr>');
            date1 = d['openTime'].substring(5, 7) + "/" + d['openTime'].substring(8, 10) + "/" + d['openTime'].substring(0, 4) + " " + d['openTime'].substring(11, 13) + ":" + d['openTime'].substring(14, 16) + ":" + d['openTime'].substring(17, 19) + ".000Z";
            date1 = d['openTime'].substring(5, 7) + "/" + d['openTime'].substring(8, 10) + "/" + d['openTime'].substring(0, 4);
            //console.log(date);
            var parseDate1 = d3.utcParse("%Y-%m-%dT%H:%M:%S%Z");
            //date = parseDate(new Date(d['openTime'].substring(0, 4), d['openTime'].substring(8, 10), d['openTime'].substring(5, 7), 0, 0, 0, 0));
            //console.log(date);
            date1 = d['openTime'];
            //console.log("DATE: " + date);
            //console.log("NEW: " + parseDate('01/01/2023T12:35:43.000Z'));
            d.date1 = parseDate1(date1);

            d.price1 = Number(d['closePrice']);
            //console.log("CHART1: " + d.date1 + " " + d.price1);
            if (d.price1 < min1) {
                min1 = d.price1
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
        //console.log(min1);
        x1.domain(
            d3.extent(data1, (d) => { return d.date1; })
        );
        y1.domain([
            min1,
            d3.max(data1, (d) => { return d.price1; }),
        ]);
        svg1
            .select(".x.axis")
            .transition()
            .duration(750)
            .call(d3.axisBottom(x1).tickFormat(d3.timeFormat("%H")));
        svg1
            .select(".y.axis")
            .transition()
            .duration(750)
            .call(d3.axisLeft(y1));

        var areaPath1 = svg1
            .append("path")
            .data([data1])
            .attr("class", "area")
            .attr("d", area1)
            .attr("transform", "translate(0,300)")
            .transition()
            .duration(1000)
            .attr("transform", "translate(0,0)");

        var linePath1 = svg1
            .append("path")
            .data([data1])
            .attr("class", "line")
            .attr("d", valueline1)
        var pathLength1 = linePath1.node().getTotalLength();
        linePath1
            .attr("stroke-dasharray", pathLength1)
            .attr("stroke-dashoffset", pathLength1)
            .attr("stroke-width", 3)
            .transition()
            .duration(500)
            .attr("stroke-width", 0)
            .attr("stroke-dashoffset", 0);

        var focus1 = svg1
            .append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus1
            .append("line")
            .attr("class", "x")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height1);

        focus1
            .append("line")
            .attr("class", "y")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width1)
            .attr("x2", width1);

        focus1
            .append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .attr("r", 4);

        focus1.append("text").attr("class", "y1").attr("dx", 8).attr("dy", "-.3em");
        focus1.append("text").attr("class", "y2").attr("dx", 8).attr("dy", "-.3em");

        focus1.append("text").attr("class", "y3").attr("dx", 8).attr("dy", "1em");
        focus1.append("text").attr("class", "y4").attr("dx", 8).attr("dy", "1em");

        function mouseMove1(event) {
            
            var bisect1 = d3.bisector((d) => d.date1).left,
                x0 = x1.invert(d3.pointer(event, this)[0]),
                i = bisect1(data1, x0, 1),
                d0 = data1[i - 1],
                d1 = data1[i],
                d = x0 - d0.date1 > d1.date1 - x0 ? d1 : d0;
            btc_price1 = d.price1;
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
            $("#price-bitcoin").text(btc_price1);
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

            focus1
                .select("circle.y")
                .attr("transform", "translate(" + x1(d.date1) + "," + y1(d.price1) + ")");

            focus1
                .select("text.y1")
                .attr("transform", "translate(" + x1(d.date1) + "," + y1(d.price1) + ")")
                .text(d.price);

            focus1
                .select("text.y2")
                .attr("transform", "translate(" + x1(d.date1) + "," + y1(d.price1) + ")")
                .text(d.price1);

            focus1
                .select("text.y3")
                .attr("transform", "translate(" + x1(d.date1) + "," + y1(d.price1) + ")")
                .text(formatDate1(d.date1));

            focus1
                .select("text.y4")
                .attr("transform", "translate(" + x1(d.date1) + "," + y1(d.price1) + ")")
                .text(formatDate1(d.date1));

            focus1
                .select(".x")
                .attr("transform", "translate(" + x1(d.date1) + "," + y1(d.price1) + ")")
                .attr("y2", height1 - y1(d.price1));

            focus1
                .select(".y")
                .attr("transform", "translate(" + width1 * -1 + "," + y1(d.price1) + ")")
                .attr("x2", width1 + width1);
        }

        svg1
            .append("rect")
            .attr("width", width1)
            .attr("height", height1)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", () => {
                focus1.style("display", null);
            })
            .on("mouseout", () => {
                focus1.style("display", "none");
                
            })
            .on("touchmove mousemove", mouseMove1);
    });
}