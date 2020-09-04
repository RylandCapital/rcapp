
function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;          
}

var thrustdata = JSON.parse(Get('http://18.216.242.3/thrust'));

thrustdata.forEach((item) => {
  item.index = new Date(item.index)
  item.index.setMinutes(0)
  item.index.setHours(0)
  item.index.setSeconds(0)
  item.vxx_thrust10 = Number(item.vxx_thrust10.toFixed(4))
  item.vxx_thrust20 = Number(item.vxx_thrust20.toFixed(4))
});
console.log(thrustdata)
export default thrustdata 