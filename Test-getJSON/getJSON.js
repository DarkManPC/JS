
// function Get(yourUrl){
//     var Httpreq = new XMLHttpRequest(); // a new request
//     Httpreq.open("GET",yourUrl,false);
//     Httpreq.send(null);
//     return Httpreq.responseText;
// }
//
// var json_obj = JSON.parse(Get('https://api.nicehash.com/api?method=stats.provider.workers&addr=17RVV7EvHfjgBDFmwV4up3ami3ExVHbLak'));
// console.log("this is the author name: "+json_obj.author_name);


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('https://api.nicehash.com/api?method=stats.provider.workers&addr=17RVV7EvHfjgBDFmwV4up3ami3ExVHbLak',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
});
