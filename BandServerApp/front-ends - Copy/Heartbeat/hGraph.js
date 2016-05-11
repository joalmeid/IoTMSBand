var chart = new SmoothieChart({millisPerPixel:68,scaleSmoothing:0.71,grid:{strokeStyle:'rgba(255,250,250,0.23)',fillStyle:'transparent',sharpLines:true, millisPerLine:3000,verticalSections:4},timestampFormatter:SmoothieChart.timeFormatter});


var TS = [new TimeSeries(), new TimeSeries()];
var timeSeries = new TimeSeries();

function push () {
TS.forEach(function(val,index){
  

  var colorran = 'white';
  //'#'+Math.random().toString(16).substr(-6);
 chart.addTimeSeries(val, { strokeStyle: colorran, lineWidth: 1.2, fillStyle:'' });
  
});
}
push();
//Adding lines on chart
/*chart.addTimeSeries(TS[0], { strokeStyle: '#fafafa', lineWidth: 1.3, fillStyle:'' });
chart.addTimeSeries(TS[1],
  { strokeStyle:'rgba(0, 0, 255, .6)', lineWidth:1 });*/


//where to stream
chart.streamTo(document.getElementById('smoothie-chart'), 100);


var time;


// Add random data periodically
setInterval(function()
{
  var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22MSFT%22%2C%20%22GOOGL%22%2C%20%22AAPL%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

  $.get(url, function(data){
    

    var price;
    
     time = new Date().getTime();
    //If not realTime get Last price
    
    
    if(!data.query.results.quote[0].askRealTime){

      //this should be deleted and replaced with loop
      TS.forEach(function(val,index){
        price = data.query.results.quote[index].LastTradePriceOnly;
        
        
          val.append(new Date().getTime(), Math.random());
        
        var myNode = document.getElementById("apple");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

        
        
        
           //appending html   
   document.getElementById('apple').innerHTML = 'MSFT: '+price;  
      
   document.getElementsByClassName('broj')[0].innerHTML = price;  
      
      });
      
    }else{
      

     document.getElementById('apple').innerHTML = 'MSFT: '+price;  
      
       document.getElementsByClassName('broj')[0].innerHTML = 'lll';  
      
  //append raandom data
   TS.forEach(function(val){
     
     
      //real time price
   price = data.query.results.quote[index].LastTradeRealtimeWithTime;
       
      //append data to chart
      val.append(new Date().getTime(), price);
      
     
   }); 
    }

  });
    timeSeries.append(new Date().getTime(), Math.random());

}, 400);