
function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;          
}

var positions = JSON.parse(Get('http://18.216.242.3/dvolsig'));

positions.forEach((item) => {
  item.index = new Date(item.index)
  item.index.setMinutes(0)
  item.index.setHours(0)
  item.index.setSeconds(0)
  item.VIX_VXV = Number(item.VIX_VXV.toFixed(3))
  item.FiveDay_Avg_CB = Number(item.FiveDay_Avg_CB.toFixed(3))
  item.CB_Points = Number(Number(item['CB Points']).toFixed(3))
});

export default positions