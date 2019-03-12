function gObj(id){ return document.getElementById(id); }

var requestURL = "http://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=2bf68e13904ea713eda41eaaa1672a58";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    var ow = request.response;
    gObj("current-temp").innerHTML = ow['main']['temp'];
    console.log(ow);
}