function fisrtCaps(phrase){
    var res = phrase.split(" ");
    for(var i=0; i<res.length; i++){
        res[i] = res[i].charAt(0).toUpperCase() + res[i].substring(1);
    }
    return res.join(" ");
}


var wObjURL = "//api.openweathermap.org/data/2.5/weather?id=" + townID + "&units=imperial&appid=2bf68e13904ea713eda41eaaa1672a58";
var wObj = new XMLHttpRequest();
wObj.open('GET', wObjURL, true);
wObj.send();
wObj.onload = function() {
    var wInfo = JSON.parse(wObj.responseText);
    console.log(wInfo);
    var iObj = gObj("crntIcon");
    var iAlt = fisrtCaps(wInfo.weather[0].description);
    iObj.src = "//openweathermap.org/img/w/" + wInfo.weather[0].icon + ".png";
    iObj.alt = iAlt;
    gObj("city").innerHTML = wInfo.name;
    gObj("current").innerHTML = iAlt;
    gObj("temp").innerHTML = wInfo.main.temp;
    gObj("humid").innerHTML = wInfo.main.humidity;
    gObj("wSpeed").innerHTML = wInfo.wind.speed;
}

//var urlBase = "//localhost/CIT_230/lesson_13/";
var urlBase = "//barbozalg.github.io/CIT_230/lesson_13/";
var wObjURL1 = "scripts/temple_data.json";
var wObj1 = new XMLHttpRequest();
wObj1.open('GET', wObjURL1, true);
wObj1.send();
wObj1.onload = function() {
    var wInfo = JSON.parse(wObj1.responseText);
    //console.log(wInfo);
    var nO = gObj("tImg");
    nO.src = urlBase + "images/" + wInfo.temples[tmplID].tImg;
    nO.alt = wInfo.temples[tmplID].tName;
    gObj("tName").innerHTML = wInfo.temples[tmplID].tName;
    gObj("tName1").innerHTML = wInfo.temples[tmplID].tName;
    gObj("tAddress").innerHTML = wInfo.temples[tmplID].tAddress;
    gObj("tPhone").innerHTML = wInfo.temples[tmplID].tPhone;
    var nO = gObj("tLinkEml");
    nO.innerHTML = wInfo.temples[tmplID].tLinkEml;
    nO.href = ((wInfo.temples[tmplID].tLinkEml=="Does not have email")? "javascript:void;" : wInfo.temples[tmplID].tLinkCal);
    gObj("tServices").innerHTML = wInfo.temples[tmplID].tServices;
    gObj("tLinkCal").href = wInfo.temples[tmplID].tLinkCal;
    gObj("tClosures").innerHTML = wInfo.temples[tmplID].tClosures;
    gObj("tMilestone").innerHTML = wInfo.temples[tmplID].tMilestone;
}