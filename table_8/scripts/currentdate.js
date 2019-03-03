var d = new Date();


function gObj(id){ return document.getElementById(id); }

function toggleMenu(hide){ gObj("iMenu").classList.toggle("hide"); }

function weekDayName(num){
    switch(num){
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wenesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        default: return "Saturday";
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

function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}

function hoy(){
    document.getElementById("sDate").value = d.getFullYear()+"-"+((d.getMonth()>9)? '' : '0')+d.getMonth()+"-"+((d.getDate()>9)? '' : '0')+d.getDate();
}

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++){
        var pair = vars[i].split("=");
        if(pair[0] == variable){ return pair[1]; }
    }
    return false;
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

function dcodeURL(urlStr){
    return decodeURIComponent(urlStr).replace("%40", "@").replace("+", " ");
}

function data(){
    var r = getQueryArray();
    for(var i=0; i<r[0].length; i++){
        if(r[0][i]=="sSeverity"){
            gObj(r[0][i]).value = r[1][i];
            adjustRating(r[1][i]);
        } else if(r[0][i]=="inDanger"){
            gObj("usr" + ((r[1][i]=="Yes")? "1" : ((r[1][i]=="No")? "3" : "2"))).checked = true;         
        } else {
            gObj(r[0][i]).value = dcodeURL(r[1][i]);
        }
    }
}

gObj("currentDate").innerHTML = weekDayName(d.getDay()) + ", " + d.getDate() + " " + monthName(d.getMonth()) + " " + d.getFullYear();