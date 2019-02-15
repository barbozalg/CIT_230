function getObj(nm){ return document.getElementById(nm); }

function toggleMenu(hide){
    if(hide){
        getObj("oMenu").style.display = "inline";
        getObj("cMenu").style.display = "none";
        getObj("iMenu").style.display = "none";
    } else {
        getObj("oMenu").style.display = "none";
        getObj("cMenu").style.display = "inline";
        getObj("iMenu").style.display = "inline";
    }
}

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

var d = new Date();
getObj("currentDate").innerHTML = weekDayName(d.getDay()) + ", " + d.getDate() + " " + monthName(d.getMonth()) + " " + d.getFullYear();