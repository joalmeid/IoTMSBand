visuals = {
    jazz: function (mx, my, h, w, timeScale) {
        for (var k = 0; k < 5; k++) {
            svg.append("svg:circle")
				.attr("cx", mx).attr("cy", my).attr("r", 6)
				.style("stroke", colors(++ci)).style("fill", colors(++ci))
				.transition().duration(timeScale * 800).ease(Math.sqrt)
					.attr("cx", mx + Math.floor(Math.random() * 200) - 100).attr("cy", my + Math.floor(Math.random() * 200) - 100)
					.style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove();
        }
    },
};

var svg = d3.select("#svgContainer").append("svg:svg").style("pointer-events", "all");
var colors = d3.scale.category20b();
var ci=0;

var socket;
document.addEventListener("DOMContentLoaded", function (event) {
    console.log('about to open socket');
    socket = new WebSocket('ws://localhost:33338');
    console.log('attempted to open socket');

    socket.onopen = function () {
        console.log('socket opened');
    };
    socket.onclose = function () {
        console.log('socket closed');
    };
    socket.onerror = function (err) {
        console.log('error - ' + err);
    };
    socket.onmessage = function (event) {
        var bandEvent = JSON.parse(event.data);
        switch (bandEvent.Type) {
            case 'hr':
                break;
            case 'gyro':
                var accX = window.innerWidth / 2 + bandEvent.Args.AngularVelocityX * 100;
                var accY = window.innerHeight / 2 + bandEvent.Args.AngularVelocityY * 100;
                var velX = window.innerWidth / 2 + bandEvent.Args.AngularVelocityX * 100;
                var velY = window.innerHeight / 2 + bandEvent.Args.AngularVelocityY * 100;
                //var w = window.innerWidth, h = window.innerHeight;
                //visuals.jazz(accX, accY, w, h, 1);
                //visuals.jazz(velX, velY, w, h, 1);
                break;
            case 'acc':
                var accX = window.innerWidth / 2 + bandEvent.Args.AccelerationX;
                var accY = window.innerHeight / 2 + bandEvent.Args.AccelerationY;
                var w = window.innerWidth, h = window.innerHeight;
                visuals.jazz(accX, accY, w, h, 1);
                break;
        }
    };
});
