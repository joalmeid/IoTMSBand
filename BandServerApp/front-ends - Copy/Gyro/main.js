var mraa = require('mraa');
var PUBNUB = require('pubnub');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var x = new mraa.Aio(0);
var y = new mraa.Aio(1);
var z = new mraa.Aio(2);

var xo = x.read();
var yo = y.read();
var zo = z.read();

var pubnub = PUBNUB.init({
  publish_key: 'demo',
  subscribe_key: 'demo'
});

setInterval(function(){

    var xv = x.read() - xo;
    var yv = y.read() - yo;
    var zv = z.read() - zo;
    
    console.log(xv, yv, zv);
    
    pubnub.publish({
        channel: 'pubnub-intel-gal-demo-xyz',
        message: {
          columns: [
            ['x', xv],
            ['y', yv],
            ['z', zv]
          ]
        }
    });

}, 1000);