var tdy = 2;
var des = ["Partly Cloudy", "Sunny", "Snowing", "Raining", "Cloudy"]
var low = [36, 30 ,25, 33, 38];
var hgh = [59, 35, 28, 35, 40];
var crd = ["W","W","N","E",""];
var wnd = [8, 23, 8, 8, 0];


function calc(){
    for(var i = 0; i < des.length; i++){
        gObj("wd"+i).innerHTML = weekDayName(tdy+i);
        gObj("dd"+i).innerHTML = des[i];
        gObj("ld"+i).innerHTML = low[i];
        gObj("hd"+i).innerHTML = hgh[i];
        var res;
        if((crd[i] == "") || (wnd[i] == 0)){
            res = ["", "None", "None"];    
        } else {
            var ptf = (hgh[i] + low[i]) / 2;
            var s016 = Math.pow(wnd[i], 0.16);
            res = [wnd[i], crd[i], Math.round(35.74 + (0.6215 * ptf) - (35.75 * s016) + (0.4275 * ptf * s016))];
        }
        gObj("md"+i).innerHTML = res[0];
        gObj("cd"+i).innerHTML = res[1];
        gObj("fd"+i).innerHTML = res[2];
    }
}


calc();