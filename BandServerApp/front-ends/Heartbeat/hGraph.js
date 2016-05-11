var chart = new SmoothieChart({millisPerPixel:68,scaleSmoothing:0.71,grid:{strokeStyle:'rgba(255,250,250,0.23)',fillStyle:'transparent',sharpLines:true, millisPerLine:3000,verticalSections:4},timestampFormatter:SmoothieChart.timeFormatter});


var TS = [new TimeSeries(), new TimeSeries(), new TimeSeries()];
var colors = ['white', 'yellow', 'red'];

function push () {
    TS.forEach(function (val,i) {

        var colorran = colors[i];
        chart.addTimeSeries(val, { strokeStyle: colorran, lineWidth: 1.2, fillStyle: '' });
    });
}
push();

//where to stream
chart.streamTo(document.getElementById('smoothie-chart'), 100);

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
                //myData(bandEvent.Args.HeartRate, bandEvent.Type);
                TS[0].append(new Date().getTime(), bandEvent.Args.HeartRate);
                console.log('[HR] - ' + bandEvent.Args.HeartRate);
                break;
            case 'gyro':
                var gyroValue = bandEvent.Args.AngularVelocityX + bandEvent.Args.AngularVelocityY + bandEvent.Args.AngularVelocityZ;
                //myData(gyroValue, bandEvent.Type);
                TS[1].append(new Date().getTime(), gyroValue);
                console.log('[GY] - (' + bandEvent.Args.AngularVelocityX + ', ' + bandEvent.Args.AngularVelocityY + ', ' + bandEvent.Args.AngularVelocityZ + ')');
                break;
            case 'acc':
                var accValue = bandEvent.Args.AccelerationX + bandEvent.Args.AccelerationY + bandEvent.Args.AccelerationZ;
                //myData(bandEvent.Args.HeartRate);
                TS[2].append(new Date().getTime(), accValue);
                console.log('[AC] - (' + bandEvent.Args.AccelerationX + ', ' + bandEvent.Args.AccelerationY + ', ' + bandEvent.Args.AccelerationZ + ')');
                break;
        }
        //console.log('message - ' + event.data);
    };
});