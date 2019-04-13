var d = new Date();


function gObj(id){ return document.getElementById(id); }

function toggleMenu(hide){ gObj("iMenu").classList.toggle("hide"); }

function weekDayName(num){
    switch(num){
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        default: return "Saturday";
    }
}

function weekDayN3(num){
    switch(num){
        case 0: return "Sun";
        case 1: return "Mon";
        case 2: return "Tue";
        case 3: return "Wed";
        case 4: return "Thu";
        case 5: return "Fri";
        default: return "Sat";
    }
}

function monthName(num){
    switch(num){
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        default: return "December";
    }
}

function monthN3(num){
    switch(num){
        case 0: return "Jan";
        case 1: return "Feb";
        case 2: return "Mar";
        case 3: return "Apr";
        case 4: return "May";
        case 5: return "Jun";
        case 6: return "Jul";
        case 7: return "Aug";
        case 8: return "Sep";
        case 9: return "Oct";
        case 10: return "Nov";
        default: return "Dec";
    }
}

function getQueryArray(){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var ar = [Array(), Array()];
    for (var i=0;i<vars.length;i++){
        var pair = vars[i].split("=");
        ar[0].push(pair[0]);
        ar[1].push(pair[1]);
    }
    return ar;
}

function rplAll(cad, rep, str){
    while(str.split(cad).length>1){
        str = str.replace(cad, rep);
    }
    return str;
}

function dcodeURL(urlStr){
    return rplAll("+", " ",decodeURIComponent(urlStr).replace("/%40/g", "@"));
}

function data(){
    var r = getQueryArray();
    for(var i=0; i<r[0].length; i++){
        var nObj = gObj(r[0][i]);
        if(nObj.type=="checkbox"){
            nObj.checked = ((nObj.value=="on")? true : false);
        } else { nObj.value = dcodeURL(r[1][i]); }
    }
}

function monthTop(month){
    switch(month){
        case 2: return 28;
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
        default: return 30;
    }
}

function childToggle(childNum){
    for(var i=1; i<=10; i++){
        var obj = gObj("divChild"+i);
        var vsl = ((i<=childNum)? "childShow" : "childHide");
        if(obj.className!=vsl){
            obj.className = ((i<=childNum)? "childShow" : "childHide");
            obj.value = ((i<=childNum)? "" : "0");
        }
    }
    var obj = gObj("divChildBS");
    if(childNum==0){
        obj.className = "childHide";
        obj.value = "0";
    } else if(obj.className!="childShow"){
        obj.className = "childShow";
        obj.value = "";
    }
}


gObj("dateS").innerHTML = weekDayN3(d.getDay()) + ", " + d.getDate() + " " + monthN3(d.getMonth()) + " " + d.getFullYear();
gObj("dateL").innerHTML = weekDayName(d.getDay()) + ", " + d.getDate() + " " + monthName(d.getMonth()) + " " + d.getFullYear();
gObj("dateY").innerHTML = d.getFullYear();