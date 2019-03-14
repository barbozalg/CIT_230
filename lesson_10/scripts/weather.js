function degreeDirection(deg){
    var c="N";
    if(deg<11.25){
    
    } else if(deg<33.75){
        c = "N NE";
    } else if(deg<56.25){
        c = "NE";
    } else if(deg<78.75){
        c = "E NE";
    } else if(deg<101.25){
        c = "E";
    } else if(deg<123.75){
        c = "E SE";
    } else if(deg<146.25){
        c = "SE";
    } else if(deg<168.75){
        c = "S SE";
    } else if(deg<191.25){
        c = "S";
    } else if(deg<213.75){
        c = "S SW";
    } else if(deg<236.25){
        c = "SW";
    } else if(deg<258.75){
        c = "W SW";
    } else if(deg<281.25){
        c = "W";
    } else if(deg<303.75){
        c = "W NW";
    } else if(deg<326.25){
        c = "NW";
    } else if(deg<348.75){
        c = "NNW";
    }
    return c;
}

function addTipo(ar, des){
    if(ar[0].length==0){
        ar[0].push(des);
        ar[1].push(1);
    } else {
        var ent = false;
        for(var i=0; i<ar[0].length; i++){
            if(ar[0][i]==des){
                ar[1][i]++;
                ent = true;
            }
        }
        if(!ent){
            ar[0].push(des);
            ar[1].push(1);
        }
    }
    return ar;
}

function fisrtCaps(phrase){
    var res = phrase.split(" ");
    for(var i=0; i<res.length; i++){
        res[i] = res[i].charAt(0).toUpperCase() + res[i].substring(1);
    }
    return res.join(" ");
}

function bestDes(des){
    var txt = '';
    var num = -1;
    for(var i=0; i<des[0].length; i++){
        if(num<des[1][i]){
            txt = des[0][i];
            num = des[1][i];
        }
    }
    return fisrtCaps(txt);
}


var wObjURL = "//api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=2bf68e13904ea713eda41eaaa1672a58";
var wObj = new XMLHttpRequest();
wObj.open('GET', wObjURL, true);
wObj.send();
wObj.onload = function() {
    var wInfo = JSON.parse(wObj.responseText);
    console.log(wInfo);
    gObj("current").innerHTML = wInfo.weather[0].description;
    gObj("temp").innerHTML = wInfo.main.temp;
    gObj("humid").innerHTML = wInfo.main.humidity;
    gObj("precip").innerHTML = 0;
    gObj("wSpeed").innerHTML = wInfo.wind.speed;
}


var tdy = 2;
var ord = [];
var dtN = [];
var mth = [];
var dSm = [];
var dS3 = [];
var arDes = [];
var low = [];
var hgh = [];
var arWnd = [];
var w1ObjURL = "//api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=2bf68e13904ea713eda41eaaa1672a58";
var w1Obj = new XMLHttpRequest();
w1Obj.open('GET', w1ObjURL, true);
w1Obj.send();
w1Obj.onload = function() {
    if (this.readyState != 4 || this.status != 200) { return ''; }
    var wInfo = JSON.parse(w1Obj.responseText);
    var day=0;
    var AcL = 300;
    var AcH = -300;
    low = [];
    hgh = [];
    arDes = [];
    arWnd = [];
    console.log(wInfo);
    for(var i=0; i<wInfo.cnt; i++){
        var tmpD = new Date(wInfo.list[i].dt_txt);
        if(wInfo.list[i].main.temp_max>AcH){ AcH = wInfo.list[i].main.temp_max; }
        if(AcL>wInfo.list[i].main.temp_min){ AcL = wInfo.list[i].main.temp_min; }
        if(typeof arDes[tmpD.getDay()]!="object"){ arDes[tmpD.getDay()] = [[], []]; }
        arDes[tmpD.getDay()] = addTipo(arDes[tmpD.getDay()],wInfo.list[i].weather[0].description);
        if(typeof arWnd[tmpD.getDay()]!="object"){ arWnd[tmpD.getDay()] = [[], []]; }
        arWnd[tmpD.getDay()] = addTipo(arWnd[tmpD.getDay()],wInfo.list[i].wind.speed + ',' + wInfo.list[i].wind.deg);
        if(day==0){
            day = tmpD.getDate();
            dtN.push(day);
            mth.push(tmpD.getMonth());
            dSm.push(weekDayName(tmpD.getDay()));
            dS3.push(weekDayN3(tmpD.getDay()));
            ord.push(tmpD.getDay());
        } else {
            if((day!=tmpD.getDate()) && (dSm.length<5)){
                low.push(Math.floor(AcL));
                AcL = 300;
                hgh.push(Math.round(AcH));
                AcH = -300;
                day = tmpD.getDate();
                dtN.push(day);
                mth.push(tmpD.getMonth());
                dSm.push(weekDayName(tmpD.getDay()));
                dS3.push(weekDayN3(tmpD.getDay()));
                ord.push(tmpD.getDay());
            }
        }
    }
    low.push(Math.floor(AcL));
    hgh.push(Math.round(AcH));
    for(var i=0; i<low.length; i++){
        gObj("dS"+i).innerHTML = dS3[i]; // Week Day Small Table
        gObj("tf"+i).innerHTML = hgh[i]; // Forecast
        
        gObj("wd"+i).innerHTML = dSm[i]; // Week Day Large Table
        gObj("dd"+i).innerHTML = bestDes(arDes[ord[i]]); // Description Large Table
        gObj("ld"+i).innerHTML = low[i]; // Low Temp 
        gObj("hd"+i).innerHTML = hgh[i]; // High Temp
        var v2 = bestDes(arWnd[ord[i]]).split(',');
        gObj("md"+i).innerHTML = parseInt(v2[0]*100)/100; // Wind speed
        gObj("cd"+i).innerHTML = degreeDirection(v2[1]); // Wind Degrees Direction
        var ptf = (hgh[i] + low[i]) / 2;
        var s016 = Math.pow(v2[0], 0.16);
        gObj("fd"+i).innerHTML = Math.round(35.74 + (0.6215 * ptf) - (35.75 * s016) + (0.4275 * ptf * s016));
    }
    /*
    console.log(dtN);
    console.log(mth);
    console.log(hgh);
    console.log(low);
    console.log(arDes);
    console.log(arWnd);
    console.log(ord);
    */
}