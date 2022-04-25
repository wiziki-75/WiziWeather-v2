function cloudDef (cloud){
    if(cloud >= 80 && cloud <= 100){
        return 'Overcast'
    } else if(cloud >= 51 && cloud <= 79){
        return 'Broken'
    } else if(cloud >= 21 && cloud <= 50){
        return 'Scattered'
    } else if(cloud >= 11 && cloud <= 20){
        return 'Few'
    } else if(cloud >= 0 && cloud <= 10){
        return 'Clear'
    } else {
        return 'ERROR'
    }
}

function visiDef(visi){
    if(visi >= 10000){
        return `+10 Km`
    } else {
        return Math.round((visi / 1000) * 100) / 100 + ' Km'
    }
}

function visiDef2(visi){
    if(visi >= 6){
        return `+6`
    } else {
        return visi
    }
}


function tempColor(t){ 
    if(t <= 5){
        return '#3155DA'
    } else if(t >= 6 && t <= 9){
        return '#4775AC'
    } else if(t >= 10 && t <= 19){
        return '#58B5A5'
    } else if(t >= 20 && t <= 29){
        return '#D29B2E'
    } else if(t >= 30){
        return '#D55626'
    }
}

function utcday (a){
    switch(a){
        case 1 :
            return "Mon"
        case 2 :
            return "Tue"
        case 3 :
            return "Wed"
        case 4 : 
            return "Thu"
        case 5 : 
            return "Fri"
        case 6 :
            return "Sat"
        case 7 : 
            return "Sun"
    }
}

function time(){
    var hour = new Date()
    var UTC = hour.toUTCString()
    $('#time').text(`${UTC}`)
}

function windeg(wind){
    if(wind >= 340 || wind <= 20){
        return 'N'
    } else if(wind >= 300 && wind < 340){
        return 'NW'
    } else if(wind > 20 && wind <= 60){
        return 'NE'
    } else if(wind < 300 && wind >= 240){
        return 'W'
    } else if(wind > 60 && wind <= 120){
        return 'E'
    } else if(wind < 240 && wind >= 200){
        return 'SW'
    } else if(wind > 120 && wind <= 160){
        return 'SE'
    } else if(wind > 160 && wind < 200){
        return 'S'
    } else {
        return 'Error'
    }
}

function convertUnixDate(x, y){
    var date = new Date(x * 1000)
    var hours = date.getHours()
    if(y == 1){
        hours -= 12
    }
    var minutes = "0" + date.getMinutes()
    var formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
}
var hour = new Date()
var UTC = hour.toUTCString()
var UTC2 = hour.getHours()
var UTC3 = hour.getDay()
setInterval("time()", 1000)
