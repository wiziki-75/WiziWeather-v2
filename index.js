// FUNCTION ======================================

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

// =======================================================================================

setTimeout(function(){ window.scrollTo(0,document.body.scrollHeight) }, 00)  

$('#details').hide()
$('#details2').hide()
$('#preview').hide()
$('#temp1').hide()

$('#title').css({
  color: '#'+(Math.random()*0xFFFFFF<<0).toString(16)
})

var hour = new Date()
var UTC = hour.toUTCString()
var UTC2 = hour.getHours()
var UTC3 = hour.getDay()

// SUBMIT BUTTON  
$('#btn').on('click', function(event){
    event.preventDefault()
    $("body").scrollTop($("#temp1").offset().top)
    $('#f1').css({border: '#1f1d1d solid 8px'})
    
    const apikey = '78fda43046110923760a56e85042272e'
    const city = $("#cv").val()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

    //MAIN WEATHER REQUEST
    $.ajax({
        url: url,
        method: 'GET'
    })
    .done(function(data){
        console.log(data)
        const data1 = {
            temperature : Math.round(data.main.temp),
            iconURL : `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            visibility: data.visibility,
            windeg: data.wind.deg,
            windspeed: data.wind.speed,
            lat : data.coord.lat,
            lon : data.coord.lon,
            w : data.weather[0].main,
            tz : data.timezone,
            sunrise : data.sys.sunrise,
            sunset : data.sys.sunset,
            country : data.sys.country
        }

        Timezone = data1.tz / 3600

        $('#info').text('(You have to click on "clear" before entering a new city name)')

        const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data1.lat}&lon=${data1.lon}&exclude=daily&units=metric&appid=${apikey}`
        const url3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data1.lat}&lon=${data1.lon}&exclude=hourly&units=metric&appid=${apikey}`

        const icon = {
          h : '<img width="50" height="50" src="icon/humidity.png">',
          p : '<img width="50" height="50" src="icon/pressure.jpg">',
          v : '<img width="50" height="50" src="https://openweathermap.org/img/w/50d.png">',
          w : '<img width="50" height="50" src="icon/wind.png">',
          sr : '<img width="50" height="50" src="icon/sunrise.png">',
          ss : '<img width="50" height="50" src="icon/sunset.png">',
        }

        miVisi = Math.round((data1.visibility * 0.001) * 0.62137)

        if(data1.country == 'US'){
          $('#temp1').html(`<div style="color:${tempColor(data1.temperature)}">${Math.round(data1.temperature / 5 * 9 + 32) + '°F'}</div><img class="tab pic" width="80" height="80" src="${data1.iconURL}">`)
          $('#details').html(`${icon.h} ${data1.humidity}% / ${icon.p} ${Math.round((data1.pressure * 0.030) * 100) / 100} inHg / ${icon.v} ${visiDef2(miVisi)}mi / ${icon.w} ${windeg(data1.windeg)} / ${Math.round(data1.windspeed * 0.621371)} mph`)
        } else {
          $('#temp1').html(`<div style="color:${tempColor(data1.temperature)}">${data1.temperature}°C</div><img class="tab pic" width="80" height="80" src="${data1.iconURL}">`)
          $('#details').html(`<div>${icon.h} ${data1.humidity}% / ${icon.p} ${data1.pressure} hPa / ${icon.v} ${visiDef(data1.visibility)} / ${icon.w} ${windeg(data1.windeg)} / ${Math.round(data1.windspeed)} Km/h</div>`)
        }

        if(data.sys.country == 'FR'){
          $('#details2').html(`${icon.sr} ${convertUnixDate(data1.sunrise)} AM / ${icon.ss} ${convertUnixDate(data1.sunset, 1)} PM`)
        }

    // HOURLY REQUEST
    $.ajax({
        url: url2,
        method: 'GET'
    })
    .done(function(data){
        console.log(data)

        UTC2 = hour.getHours() + Timezone - 2
        if(UTC2 > 23){
          UTC2 -= 24
        } else if(UTC2 < 0){
          UTC2 += 24
        }

        for(let i = 0; i < data.hourly.length;i++){
            const data2 = {
                temperature : Math.round(data.hourly[i].temp),
                iconURL : `http://openweathermap.org/img/w/${data.hourly[i].weather[0].icon}.png`,
            }

            if(UTC2 > 23){
                UTC2 = 0
            }
            if(data1.country == 'US'){
              $('#a1').append(`<pre><div class="tab prev1">${(UTC2++)}h </div><div class="tab" style="color:${tempColor(data2.temperature)}">${Math.round(data2.temperature / 5 * 9 + 32) + '°F'}</div><img class="tab pic" src="${data2.iconURL}"></pre>`)
            } else {
              $('#a1').append(`<pre><div class="tab prev1">${Math.round(UTC2++)}h </div><div class="tab" style="color:${tempColor(data2.temperature)}">${data2.temperature}°C</div><img class="tab pic" src="${data2.iconURL}"></pre>`)
            }
        }
        
        // IMPERIAL BUTTON
        $('#btn4').on('click', function(event){
          $('#temp1').html(`<div style="color:${tempColor(data1.temperature)}">${Math.round(data1.temperature / 5 * 9 + 32) + '°F'}</div><img class="tab pic" width="80" height="80" src="${data1.iconURL}">`)
          event.preventDefault()
          $('#a1').empty()

          var UTC2 = hour.getHours() + Timezone - 2
          if(UTC2 > 23){
            UTC2 -= 24
          } else if(UTC2 < 0){
            UTC2 += 24
          }

          for(let i = 0; i < data.hourly.length;i++){
            const data2 = {
                temperature : Math.round(data.hourly[i].temp),
                iconURL : `http://openweathermap.org/img/w/${data.hourly[i].weather[0].icon}.png`,
            }

            if(UTC2 > 23){
                UTC2 = 0
            }

            $('#a1').append(`<pre><div class="tab prev1">${(UTC2++)}h </div><div class="tab" style="color:${tempColor(data2.temperature)}">${Math.round(data2.temperature / 5 * 9 + 32) + '°F'}</div><img class="tab pic" src="${data2.iconURL}"></pre>`)
          }

        })

        // METRIC BUTTON
        $('#btn3').on('click', function(event){
          event.preventDefault()
          $('#a1').empty()

          var UTC2 = hour.getHours() + Timezone - 2
          if(UTC2 > 23){
            UTC2 -= 24
          } else if(UTC2 < 0){
            UTC2 += 24
          }

          for(let i = 0; i < data.hourly.length;i++){
            const data2 = {
                temperature : Math.round(data.hourly[i].temp),
                iconURL : `http://openweathermap.org/img/w/${data.hourly[i].weather[0].icon}.png`,
            }

            if(UTC2 > 23){
                UTC2 = 0
            } else if(UTC2 < 0){
                UTC2 += 24
            }

            $('#a1').append(`<pre><div class="tab prev1">${(UTC2++)}h </div><div class="tab" style="color:${tempColor(data2.temperature)}">${data2.temperature}°C</div><img class="tab pic" src="${data2.iconURL}"></pre>`)
          }

          $('#details').html(`<div>${icon.h} ${data1.humidity}% / ${icon.p} ${data1.pressure} hPa / ${icon.v} ${visiDef(data1.visibility)} / ${icon.w} ${windeg(data1.windeg)} / ${Math.round(data1.windspeed)} Km/h</div>`)
        })
    })

    // DAILY REQUEST
    $.ajax({
        url: url3,
        method: 'GET'
    })
    .done(function(data){
        console.log(data)

        for(let k = 0; k < data.daily.length;k++){
            const data3 = {
                temperature1 : Math.round(data.daily[k].temp.min),
                temperature2 : Math.round(data.daily[k].temp.max),
                iconURL : `http://openweathermap.org/img/w/${data.daily[k].weather[0].icon}.png`,
            }

            if(UTC3 + 1 > 7){
                UTC3 = 0
            }

            if(data1.country == 'US'){
              $('#b1').append(`<pre><div class="tab">${utcday((UTC3++) + 1)} </div><div class="tab" style="color:${tempColor(data3.temperature1)}">${Math.round(data3.temperature1 / 5 * 9 + 32) + '°F'}</div><div class="tab"> - </div><div class="tab" style="color:${tempColor(data3.temperature2)}">${Math.round(data3.temperature2 / 5 * 9 + 32) + '°F'}</div><img class="tab pic" src="${data3.iconURL}"></pre>`)
            } else {
              $('#b1').append(`<pre><div class="tab">${utcday((UTC3++) + 1)} </div><div class="tab" style="color:${tempColor(data3.temperature1)}">${data3.temperature1}°C</div><div class="tab"> - </div><div class="tab" style="color:${tempColor(data3.temperature2)}">${data3.temperature2}°C </div><img class="tab pic" src="${data3.iconURL}"></pre>`)
            }
        }

        // IMPERIAL BUTTON
        $('#btn4').on('click', function(event){
          event.preventDefault()
          $('#temp1').html(`<div style="color:${tempColor(data1.temperature)}">${Math.round(data1.temperature / 5 * 9 + 32) + '°F'}</div><img class="tab pic" width="80" height="80" src="${data1.iconURL}">`)
          $('#b1').empty()

          UTC3 = hour.getDay()

          for(let k = 0; k < data.daily.length;k++){
            const data3 = {
                temperature1 : Math.round(data.daily[k].temp.min),
                temperature2 : Math.round(data.daily[k].temp.max),
                iconURL : `http://openweathermap.org/img/w/${data.daily[k].weather[0].icon}.png`,
            }

            if(UTC3 + 1 > 7){
                UTC3 = 0
            }

            $('#b1').append(`<pre><div class="tab">${utcday((UTC3++) + 1)} </div><div class="tab" style="color:${tempColor(data3.temperature1)}">${Math.round(data3.temperature1 / 5 * 9 + 32) + '°F'}</div><div class="tab"> - </div><div class="tab" style="color:${tempColor(data3.temperature2)}">${Math.round(data3.temperature2 / 5 * 9 + 32) + ' °F'}</div><img class="tab pic" src="${data3.iconURL}"></pre>`)
          }

          miVisi = Math.round((data1.visibility * 0.001) * 0.62137)

          $('#details').html(`${icon.h} ${data1.humidity}% / ${icon.p} ${Math.round((data1.pressure * 0.030) * 100) / 100} inHg / ${icon.v} ${visiDef2(miVisi)}mi / ${icon.w} ${windeg(data1.windeg)} / ${Math.round(data1.windspeed * 0.621371)} mph`)
        })
        
        // METRIC BUTTON
        $('#btn3').on('click', function(event){
          event.preventDefault()
          $('#temp1').html(`<div style="color:${tempColor(data1.temperature)}">${data1.temperature}°C</div><img class="tab pic" width="80" height="80" src="${data1.iconURL}">`)
          $('#b1').empty()

          UTC3 = hour.getDay()

          for(let k = 0; k < data.daily.length;k++){
            const data3 = {
                temperature1 : Math.round(data.daily[k].temp.min),
                temperature2 : Math.round(data.daily[k].temp.max),
                iconURL : `http://openweathermap.org/img/w/${data.daily[k].weather[0].icon}.png`,
            }

            if(UTC3 + 1 > 7){
                UTC3 = 0
            }

            $('#b1').append(`<pre><div class="tab">${utcday((UTC3++) + 1)} </div><div class="tab" style="color:${tempColor(data3.temperature1)}">${data3.temperature1}°C</div><div class="tab"> - </div><div class="tab" style="color:${tempColor(data3.temperature2)}">${data3.temperature2}°C </div><img class="tab pic" src="${data3.iconURL}"></pre>`)
          }

        })
    })

    $("#temp1").slideDown()
    $("#preview").slideDown()
    $("#details").slideDown()
    $("#details2").slideDown()

    })
    .fail(function(err){
        console.log(err)
        alert(`${err.status} ${err.responseJSON.message}`)
        $('#f1').css({border: 'rgb(182, 28, 28) solid 8px',})
    })
})
$('#btn2').on('click', function(event){
    event.preventDefault()
    $("#temp1").slideUp()
    $("#preview").slideUp()
    setInterval(function(){ window.location.reload() }, 1000);
})