window.onload = function() {
    let body = document.querySelector(".light-theme")
    let city = document.querySelector(".city")
    let searchOpen = document.querySelector(".search-open")
    let searchForm = document.querySelector(".search-form")
    let buttonSearch = document.querySelector(".button-search")
    let butMenu = document.querySelector(".buttonMenu")
    let menu =  document.querySelector(".menu-light")
    let del = document.querySelector(".delete")
    let selectTopic = document.querySelector(".topic-select")
    let lightOption = document.getElementById("light-option")
    let darkOption = document.getElementById("dark-option")
    let selectDegree = document.querySelector(".degree-select")
    let tempCOption = document.getElementById("C")
    let tempFOption = document.getElementById("F")
    let selectSpeed = document.querySelector(".speed-select")
    let kphOption = document.getElementById("kph")
    let mphOption = document.getElementById("mph")
    let selectPressure = document.querySelector(".pressure-select")
    let mbOption = document.getElementById("mb")
    let inOption = document.getElementById("in")
    let mmOption = document.getElementById("mm")
    let hints = document.querySelector(".hints-light")
    let list = document.querySelector(".hint-ul")
    let current = document.querySelector(".current")
    let clickCount = 0
    let content = document.querySelector(".content")
    let todayPage = document.querySelector(".today")    
    let titleToday = []
    let titleTum = []
    let titleAftTum = []
    let imageToday = []
    let imageTum = []
    let imageAftTum = []
    let tempToday = []
    let tempTum = []
    let tempAftTum = []
    let windToday = []
    let windTum = []
    let windAftTum = []
    let pressToday = []
    let pressTum = []
    let pressAftTum = []
    let humToday = []
    let humTum = []
    let humAftTum = []
    let listArrRus= []
    let a = false
    let load = document.querySelector(".loader-light")
    let loading = document.querySelector(".loading-screen-light")
    let l = document.querySelector(".l-light")
let listArrOther = []

let h1City = document.querySelector(".city-name")

async function fetchWeather() {
    const response = await fetch(`https://nameless-sky-3cb5.ivanuskinartem59.workers.dev/forecast.json?&q=${localStorage.getItem("lat")} ${localStorage.getItem("lon")}&lang=ru&days=5`)
    const forecast = await response.json()
    return forecast
    }
    async function find(name) {
        const response = await fetch(`https://api.geotree.ru/search.php?key=KLYDH7obgUh3&term=${name}&level=4&limit=5`)
        const res = await response.json()
        return res
    }
    console.log(find("Сур"));
    
    function findWorld() {}
    current.addEventListener("click", function() {
        navigator.geolocation.getCurrentPosition(position => {
            localStorage.removeItem("inf")
            localStorage.removeItem("lon")        
            localStorage.removeItem("lat")
            localStorage.setItem("lon" , position.coords.longitude)        
            localStorage.setItem("lat", position.coords.latitude)
            fetchWeather(localStorage.getItem("lat"),localStorage.getItem("lon")).then(data=> {
                localStorage.removeItem("name")
                localStorage.setItem("name", data.name)
                h1City.textContent = localStorage.getItem("name")
                location.reload()
            })
           
        })
        
        
    })
    let arrCityNotRussia = []
        city.addEventListener("input", function() {
            let cityName = this.value
            console.log(cityName);
            
            find(cityName).then(data => {
                for (let i = 0; i < listArrRus.length; i++) {
                    listArrRus[i].remove()
                }
                let inf = []
                inf = data.results
                console.log(data);
                
                 if(city.value !== ""){
                 for (const element of data) {
                    
                     list.insertAdjacentHTML("beforeend", `<li class = "rus">${element.value}</li>`)     
                     }
                     listArrRus = document.querySelectorAll(".rus")
                     listArrRus.forEach((item,index) => { item.addEventListener("click", function() {
                         localStorage.removeItem("lat")
                         localStorage.removeItem("lon")
                         localStorage.removeItem("name")
                         localStorage.setItem("name", data[index].name_display)
                         localStorage.setItem("lat", data[index].geo_center.lat)
                         localStorage.setItem("lon", data[index].geo_center.lon)
                         h1City.textContent = localStorage.getItem("name")
                         fetchWeather()
                         location.reload()
                      })
                    })
                }
             })
            arrCityNotRussia = []
            for (let i = 0; i < listArrOther.length; i++) {
                listArrOther[i].remove()
            }
        
         findWorld(cityName).then(data => {
            for (const element of data) {
                if(element.country !== "RU" && element.local_names.ru !== undefined) {
                list.insertAdjacentHTML("beforeend", `<li class = "other">${element.local_names.ru} (${element.state})${element.country}</li>`)
                arrCityNotRussia.push({
                    name: `${element.local_names.ru} ${element.state} ${element.country}`,
                    lat: element.lat,
                    lon: element.lon
                })  
            }
            console.log(arrCityNotRussia);
              
            }
            listArrOther = document.querySelectorAll(".other")
                     listArrOther.forEach((item,index) => { item.addEventListener("click", function() {
                         localStorage.removeItem("lat")
                         localStorage.removeItem("lon")
                         localStorage.removeItem("name")
                         localStorage.setItem("name", arrCityNotRussia[index].name)
                         localStorage.setItem("lat", arrCityNotRussia[index].lat)
                         localStorage.setItem("lon", arrCityNotRussia[index].lon)
                         h1City.textContent = localStorage.getItem("name")
                         fetchWeather()
                         location.reload()
                      })
                    })
         })
             
         })  
    async function addSun(riseOrSet, day, data) {
       
        let res = 0;
        let time = data.forecast.forecastday[day].astro[riseOrSet].slice(6, 8);
        let riseOrSetArr = data.forecast.forecastday[day].astro[riseOrSet].slice(0, 5).split(":").map(Number);
         if (riseOrSetArr[1] > 30) {
           res = riseOrSetArr[0] + 1;
         } else {
           res = riseOrSetArr[0];
         }
        return  time === "PM"? res + 12: res ;
      }
    async function addimg(dayTime, day, sunRise, sunSet, data) {
        let title
        let theme = ""
        if(localStorage.getItem("theme") === "dark"){
            theme = "-dark"
        }
            let conditionsArr = []
            let isDay = 0
            let icon = ""
            // создаем массив из погодных условий и вычисляем каких больше всего, если их одинаковое количество выберем самый неблагоприятный
            // утром     
            if(dayTime === 0) {
                for (let i = 6; i < 13; i++) {
                    let code = data.forecast.forecastday[day].hour[i].condition.code
                    conditionsArr.push(code)
                }
                isDay = 1
            }
            // днем
            if(dayTime === 1) {
            for (let i = 13; i < 19; i++) {
                    let code = data.forecast.forecastday[day].hour[i].condition.code
                    conditionsArr.push(code)
                }
                isDay = 1
            }
            // вечером 
            if(dayTime === 2) {
                for (let i = 18; i < 24; i++) {
                    let code = data.forecast.forecastday[day].hour[i].condition.code
                    conditionsArr.push(code)
                }
                isDay = 0
            }
            // ночью
            if(dayTime === 3) {
                for (let i = 23; i > 7; i--) {
                    let code = data.forecast.forecastday[day].hour[i].condition.code
                    conditionsArr.push(code)
                    
                }  
                isDay = 0
            }
            // находим код погоды
            let objRes = {}
            for (const element of conditionsArr) {
                objRes[element] = (objRes[element] || 0) + 1;
              }
              let max = Math.max.apply(Math, Object.values(objRes));
              let code = Math.max(...Object.keys(objRes).filter(key => objRes[key] === max).map(Number));  
              if(code === 1000) {
                if(isDay === 1) {
                     icon = `images/Солнечно${theme}.png`
                }
                if(isDay === 0) {
                    icon = `images/луна${theme}.png`
                }
                title = "Ясно"
            }
            if(code === 1003 || code === 1006) {
                if(isDay === 1) {
                     icon = `images/солнце_и_облако${theme}.png`
                }
                if(isDay === 0) {
                     icon = `images/луна_и_облако${theme}.png`
                }
                title = "Облачно с прояснениями"
            }
            if(code === 1009) {
                icon = `images/пасмурно${theme}.png`
                title = "Пасмурно"
            }
            if(code === 1063 || code === 1072 || code === 1150 || code === 1153 || code === 1168 || code === 1171 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195 || code === 1198 || code === 1201 || code === 1240 || code === 1243 || code === 1246 || code === 1249 || code === 1252) {
                icon = `images/дождь${theme}.png`
                title = "Дождь"
            }
            if(code === 1069 || code === 1255 || code === 1258) {
                icon = `images/снег_и_дождь${theme}.png`
                title = "Снег с дождем"
            }
            if(code === 1066 || code === 1114 || code === 1117 || code === 1204 || code === 1207 || code === 1210 || code === 1216 || code === 1219 || code === 1222 || code === 1225 || code === 1213) {
                icon = `images/снег${theme}.png`
                title = "Снег"
            }
            if(code === 1135 || code === 1147) {
                icon = `images/туман${theme}.png`
                title = "туман"
            }
            if(code === 1237 || code === 1261 || code === 1264) {
                icon = `images/град${theme}.png`
                title = "Град"
            }
            if(code === 1030 || code === 1135 || code === 1147){
                icon = `images/туман${theme}.png`
                title = "Туман"
            }
            if(code === 1087) {
                icon = `images/гроза${theme}.png`
                title = "Гроза"
            }
            if(code === 1273 || code === 1276) {
                icon = `images/дождь_и_гроза${theme}.png`
                title = "Дождь с грозой"
            }
            if(code === 1279 || code === 1282) {
                icon = `images/снег_и_гроза${theme}.png`
                title = "Снег с грозой"
            }
            if(day === 0) {
                imageToday.push(icon)
                titleToday.push(title)
            }
            if(day === 1) {
                imageTum.push(icon)
                titleTum.push(title)
            }
            if(day === 2) {
                imageAftTum.push(icon)
                titleAftTum.push(title)
            }
    }
    async function addTemp(dayTime,day,sunRise,sunSet,data) {
        let sign = ""
        let tempStr = ""
        let tempArr = []
        let isDay = 0
        if(localStorage.getItem("temp") === "C") {
            tempStr = "temp_c"
            sign = String.fromCharCode(176) + "C"
        }
        if(localStorage.getItem("temp") === "F") {
            tempStr = "temp_f"
            sign = String.fromCharCode(176) + "F"
        }
        if(dayTime === 0) {
            for (let i = 6; i < 13; i++) {
                let temp = Math.round(data.forecast.forecastday[day].hour[i][tempStr])
                console.log(temp);
                
                tempArr.push(temp)
            }
            isDay = 1
        }
        // днем
        if(dayTime === 1) {
        for (let i = 13; i < 19; i++) {
            let temp = Math.round(data.forecast.forecastday[day].hour[i][tempStr])
           
            tempArr.push(temp)
            }
            isDay = 1
        }
        // вечером 
        if(dayTime === 2) {
            for (let i = 18; i < 24; i++) {
                let temp = Math.round(data.forecast.forecastday[day].hour[i][tempStr])
               
                tempArr.push(temp)
            }
            isDay = 0
        }
        // ночью
        if(dayTime === 3) {
            for (let i = 23; i > 7; i--) {
                let temp = Math.round(data.forecast.forecastday[day].hour[i][tempStr])
                tempArr.push(temp)
                
            }
            isDay = 0
        }
        let res = ""
        let value = Math.round(tempArr.reduce((acc, value) => acc+=value,0) / tempArr.length)
        if(value > 0) {
            res = `+${value}${sign}`
        }
        if(value < 0) {
            res = `${value}${sign}`
        }
        if(value === 0) {
            res = `${value}${sign}`
        }
        
        if(day === 0) {
            tempToday.push(res)
        }
        if(day === 1) {
            tempTum.push(res)
        }
        if(day === 2) {
            tempAftTum.push(res)
        }    
    }
    async function addWind(dayTime,day,sunRise,sunSet,data) {
        let sign = ""
        let windStr = ""
        let windArr = []
        let isDay = 0
        if(localStorage.getItem("wind") === "kph") {
            windStr = "wind_kph"
            sign = "км/ч"
        }
        if(localStorage.getItem("wind") === "mph") {
            windStr = "wind_mph"
            sign = "миль/ч"
        }
        if(dayTime === 0) {
            for (let i = 6; i < 13; i++) {
                let wind = Math.round(data.forecast.forecastday[day].hour[i][windStr])
            windArr.push(wind)
            }
            isDay = 1
        }
        // днем
        if(dayTime === 1) {
        for (let i = 13; i < 19; i++) {
            let wind = Math.round(data.forecast.forecastday[day].hour[i][windStr])
            windArr.push(wind)
            }
            isDay = 1
        }
        // вечером 
        if(dayTime === 2) {
            for (let i = 18; i < 24; i++) {
                let wind = Math.round(data.forecast.forecastday[day].hour[i][windStr])
                windArr.push(wind)
            }
            isDay = 0
        }
        // ночью
        if(dayTime === 3) {
            for (let i = 23; i > 7; i--) {
                let wind = Math.round(data.forecast.forecastday[day].hour[i][windStr])
                windArr.push(wind)
                
            }
            isDay = 0
        }
        let res = Math.round(windArr.reduce((acc, value) => acc+=value,0) / windArr.length)
        if(day === 0) {
            windToday.push(`${res} ${sign}`)
        }
        if(day === 1) {
            windTum.push(`${res} ${sign}`)
        }
        if(day === 2) {
            windAftTum.push(`${res} ${sign}`)
        }
    }
    async function addPress(dayTime,day,sunRise,sunSet,data) {
        let sign = ""
        let isMM = false
        let pressStr = ""
        let pressArr = []
        let isDay = 0
        if(localStorage.getItem("pressure") === "mm") {
            isMM = true
            sign = "мм.рт.ст"
        }
        if(localStorage.getItem("pressure") === "in") {
            pressStr = "pressure_in"
            sign = "дюйм"
        }
        if(localStorage.getItem("pressure") === "mb") {
            pressStr = "pressure_mb"
            sign = "д.рт.ст"
        }
        if(dayTime === 0) {
            for (let i = 6; i < 13; i++) {
                if(isMM) {
                let pressure = Math.round(data.forecast.forecastday[day].hour[i]["pressure_in"]*25.4)
                pressArr.push(pressure)
                }
                else {
                    let pressure = Math.round(data.forecast.forecastday[day].hour[i][pressStr])
                pressArr.push(pressure)
                }
            }
            isDay = 1
        }
        // днем
        if(dayTime === 1) {
        for (let i = 13; i < 19; i++) {
            if(isMM) {
                let pressure = Math.round(data.forecast.forecastday[day].hour[i]["pressure_in"]*25.4)
                pressArr.push(pressure)
                }
                else {
                    let pressure = Math.round(data.forecast.forecastday[day].hour[i][pressStr])
                pressArr.push(pressure)
                }
            }
            isDay = 1
        }
        // вечером 
        if(dayTime === 2) {
            for (let i = 18; i < 24; i++) {
                if(isMM) {
                    let pressure = Math.round(data.forecast.forecastday[day].hour[i]["pressure_in"]*25.4)
                    pressArr.push(pressure)
                    }
                    else {
                        let pressure = Math.round(data.forecast.forecastday[day].hour[i][pressStr])
                    pressArr.push(pressure)
                    }
            }
            isDay = 0
        }
        // ночью
        if(dayTime === 3) {
            for (let i = 23; i > 7; i--) {
                if(isMM) {
                    let pressure = Math.round(data.forecast.forecastday[day].hour[i]["pressure_in"]*25.4)
                    pressArr.push(pressure)
                    }
                    else {
                        let pressure = Math.round(data.forecast.forecastday[day].hour[i][pressStr])
                    pressArr.push(pressure)
                    }
                
            }
            isDay = 0
        }
        let res = Math.round(pressArr.reduce((acc, value) => acc+=value,0) / pressArr.length)
        if(day === 0) {
            pressToday.push(`${res} ${sign}`)
        }
        if(day === 1) {
            pressTum.push(`${res} ${sign}`)
        }
        if(day === 2) {
            pressAftTum.push(`${res} ${sign}`)
        }
    }
    async function addHum(dayTime,day,sunRise,sunSet,data) {
        let humArr = []
        let isDay  = 0
        if(dayTime === 0) {
            for (let i = 6; i < 13; i++) {
                let hum = Math.round(data.forecast.forecastday[day].hour[i].humidity)
                humArr.push(hum)
            }
            isDay = 1
        }
        // днем
        if(dayTime === 1) {
        for (let i = 13; i < 19; i++) {
            let hum = Math.round(data.forecast.forecastday[day].hour[i].humidity)
            humArr.push(hum)
            }
            isDay = 1
        }
        // вечером 
        if(dayTime === 2) {
            for (let i = 18; i < 24; i++) {
                let hum = Math.round(data.forecast.forecastday[day].hour[i].humidity)
                humArr.push(hum)
            }
            isDay = 0
        }
        // ночью
        if(dayTime === 3) {
            for (let i = 23; i > 7 ; i--) {
                let hum = Math.round(data.forecast.forecastday[day].hour[i].humidity)
                humArr.push(hum)
                
            }
            isDay = 0
        }
        let res = Math.round(humArr.reduce((acc, value) => acc+=value,0) / humArr.length)
        if(day === 0) {
            humToday.push(`${res}%`)
        }
        if(day === 1) {
            humTum.push(`${res}%`)
        }
        if(day === 2) {
            humAftTum.push(`${res}%`)
        }
    }
   async function addCityName(data) {
        let cityName = document.querySelector(".city-name")
        cityName.textContent = `Погода на три дня: ${localStorage.getItem("name")}`
        if (localStorage.getItem("theme") === "dark") {
            cityName.style.color = "white"
        } 
       
    }
    day = []
    month = []
   function addDate() {
        let monthStr = {
            0: "январь",
            1: "февраль",
            2: "март",
            3: "апрель",
            4: "май",
            5: "июнь",
            6: "июль",
            7: "август",
            8: "сентябрь",
            9: "октябрь",
            10: "ноябрь",
            11: "декабрь"
        }
        let today = new Date()
        let tumorrow = new Date(today)
        tumorrow.setDate(today.getDate() + 1)
        let aftTumorrow = new Date(today)
        aftTumorrow.setDate(today.getDate() + 2)
        day.push(today.getDate())
        month.push(monthStr[today.getMonth()])
        day.push(tumorrow.getDate())
        month.push(monthStr[tumorrow.getMonth()])
        day.push(aftTumorrow.getDate())
        month.push(monthStr[aftTumorrow.getMonth()])
    }
    async function addAllInf(dayTime, day){
   const data = await fetchWeather().then(data=> data)
   const [sunRise, sunSet] = await Promise.all([
    addSun("sunrise", day, data),
    addSun("sunset", day, data)
]);

// Параллельный рендеринг остальных блоков
await Promise.all([
    addimg(dayTime, day, sunRise, sunSet, data),
    addTemp(dayTime, day, sunRise, sunSet, data),
    addWind(dayTime, day, sunRise, sunSet, data),
    addPress(dayTime, day, sunRise, sunSet, data),
    addHum(dayTime, day, sunRise, sunSet, data),
    addCityName(data)
]);
        
    }
  
    async  function addContainer(day, month, temp, img, wind, press, hum, dayStr, title, i) {
        const data = await fetchWeather()
            let theme = ""
            let color = "black"
            if(localStorage.getItem("theme") === "dark"){
                theme = "-dark"
                color = "white"
            }
            content.insertAdjacentHTML("beforeend", `
                 <div class="main-container">
            <div class="container${i}">
            <div class="head-main">
              <div class="date">
                <div class="number"><h1>${day}</h1>
                </div>
                <div class = "month-day">
                    <p class="month">${month},</p>
                    <p class="day">${dayStr}</p>
                </div>
            </div>
            </div>
        <br>
          <div class="morning${i}">
            <div class="time" style="font-size: xx-large; margin-left: 80px; width: 82px;">
                    <p style="margin-top: 24px;">Утро</p>
                </div>
                    <div class="temp-main">
                        <p id="temp-morning-today">${temp[0]}</p>
                        <div class="icon" id="morning-temp">
                            <img id ="icon-morning-today" src= "${img[0]}" alt="" height="40px" width="40px" title = "${title[0]}">
                           
                        </div>
                    </div> 
                    <div class="wind-main" id="morning-wind">
                        <div class="icon">
                            <img src="images/007wind_99904${theme}.png" alt="" height="30px" width="30px"  title = "Скорость ветра">
                        </div>
                        <p id="wind-morning-today">${wind[0]}</p>
                    </div>
                    <div class="pressure-main" id="morning-pressure">
                        <div class="icon">
                            <img src="images/pressure_4667${theme}.png" alt="" height="40px" width="40px"  title = "Давление">
                        </div>
                        <p id ="pressure-morning-today">${press[0]}</p>
                    </div>
                    <div class="hum-main" id="morning-hum">
                        <div class="icon">
                            <img src="images/forecast_weather_humidity_icon_220089${theme}.png" alt="" height="40px" width="40px"  title = "Влажность">
                        </div>
                        <p id ="hum-morning-today">${hum[0]}</p>
                    </div>
            </div>
           <div class="day-time${i}">
                <div class="time" style="font-size: xx-large; margin-left: 80px; width: 82px;">
                        <p style="margin-top: 24px;">День</p>
                    </div>
                        <div class="temp-main">
                            <p id="temp-day-time-today">${temp[1]}</p>
                            <div class="icon" id="morning-temp">
                                <img id ="icon-morning-today" src= "${img[1]}" alt="" height="40px" width="40px" title = "${title[1]}">
                            </div>
                        </div> 
                        <div class="wind-main" id="morning-wind">
                            <div class="icon">
                                <img src="images/007wind_99904${theme}.png" alt="" height="30px" width="30px"  title = "Скорость ветра">
                            </div>
                            <p id="wind-day-time-today">${wind[1]}</p>
                        </div>
                        <div class="pressure-main" id="morning-pressure">
                            <div class="icon">
                                <img src="images/pressure_4667${theme}.png" alt="" height="40px" width="40px"  title = "Давление">
                            </div>
                            <p id ="pressure-day-time-today">${press[1]}</p>
                        </div>
                        <div class="hum-main" id="morning-hum">
                            <div class="icon">
                                <img src="images/forecast_weather_humidity_icon_220089${theme}.png" alt="" height="40px" width="40px"  title = "Влажность">
                            </div>
                            <p id ="hum-day-time-today">${hum[1]}</p>
                        </div>
                </div>
            <div class="evening${i}">
                <div class="time" style="font-size: xx-large; margin-left: 80px; width: 82px;">
                <p style="margin-top: 24px;">Вечер</p>
                </div>
                <div class="temp-main">
                    <p id="temp-evening-today">${temp[2]}</p>
                    <div class="icon" id="evening-temp">
                        <img src="${img[2]}" alt="" height="40px" width="40px" id="icon-evening-today" title = "${title[2]}">
                    </div>
                </div> 
                <div class="wind-main" id="evening-wind">
                    <div class="icon">
                        <img src="images/007wind_99904${theme}.png" alt="" height="30px" width="30px" title = "Скорость ветра">
                    </div>
                    <p id="wind-evening-today">${wind[2]}</p>
                </div>
                <div class="pressure-main" id="evening-pressure">
                    <div class="icon">
                        <img src="images/pressure_4667${theme}.png" alt="" height="40px" width="40px" title = "Давление">
                    </div>
                    <p id="pressure-evening-today">${press[2]}</p>
                </div>
                <div class="hum-main" id="evening-hum">
                    <div class="icon">
                        <img src="images/forecast_weather_humidity_icon_220089${theme}.png" alt="" height="40px" width="40px" id="icon-evening-today"  title = "Влажность">
                    </div>
                    <p id="hum-evening-today">${hum[2]}</p>
                </div>
            </div>
            <div class="night${i}">
                <div class="time" style="font-size: xx-large; margin-left: 80px; width: 82px;">
                <p style="margin-top: 24px;">Ночь</p>
                </div>
                <div class="temp-main">
                    <p id="temp-night-today">${temp[3]}</p>
                    <div class="icon" id="night-temp">
                        <img src="${img[3]}" alt="" height="40px" width="40px" id="icon-night-today" title = "${title[3]}">
                    </div>
                </div> 
                <div class="wind-main" id="night-wind">
                    <div class="icon">
                        <img src="images/007wind_99904${theme}.png" alt="" height="30px" width="30px" title = "Скорость ветра">
                    </div>
                    <p id="wind-night-today">${wind[3]}</p>
                </div>
                <div class="pressure-main" id="night-pressure">
                    <div class="icon">
                        <img src="images/pressure_4667${theme}.png" alt="" height="40px" width="40px" title = "давление">
                    </div>
                    <p id="pressure-night-today">${press[3]}</p>
                </div>
                <div class="hum-main" id="night-hum">
                    <div class="icon">
                        <img src="images/forecast_weather_humidity_icon_220089${theme}.png" alt="" height="40px" width="40px" title = "влажность">
                    </div>
                    <p id="hum-night-today">${hum[3]}</p>
                </div>
            </div>
        </div>
        `)
     
    let container = document.querySelector(`.container${i}`)
    let morning = document.querySelector(`.morning${i}`)
    let dayTime = document.querySelector(`.day-time${i}`)
    let evening = document.querySelector(`.evening${i}`)
    let night = document.querySelector(`.night${i}`)
    container.style.color = color
    morning.style.borderColor = color
    dayTime.style.borderColor = color
    evening.style.borderColor = color
    night.style.borderColor = color
}
setTimeout(function() {
    loading.style.display = 'block';
    loading.style.display = 'none';
}, 2600);
    addAllInf(0,0)
    addAllInf(1,0)
    addAllInf(2,0)
    addAllInf(3,0)
    addAllInf(0,1)
    addAllInf(1,1)
    addAllInf(2,1)
    addAllInf(3,1)
    addAllInf(0,2)
    addAllInf(1,2)
    addAllInf(2,2)
    addAllInf(3,2)
    addDate()
    addCityName()
    console.log(tempTum);
    addContainer(day[0], month[0], tempToday, imageToday, windToday, pressToday, humToday, "сегодня", titleToday, 1)
    addContainer(day[1], month[1], tempTum, imageTum, windTum, pressTum, humTum, "завтра", titleTum, 2)
    addContainer(day[2], month[2], tempAftTum,imageAftTum,windAftTum,pressAftTum,humAftTum, "послезавтра", titleAftTum, 3)

 function addDarkTheme() {
    l.classList.remove("l-light")
    l.classList.add("l-dark")
     loading.classList.remove("loading-screen-light")
     loading.classList.add("loading-screen-dark")
     load.classList.remove("loader-light")
     load.classList.add("loader-dark")
     localStorage.removeItem("theme")
     localStorage.setItem("theme", "dark")
     darkOption.setAttribute('selected', true);
     body.classList.remove("light-theme")
    body.classList.add("dark-theme")
     menu.classList.remove("menu-light")
     menu.classList.add("menu-dark")
     hints.classList.remove("hints-light")
     hints.classList.add("hints-dark")
 }
 function addLightTheme() {
    loading.classList.remove("loading-screen-dark")
    loading.classList.add("loading-screen-light")
    l.classList.remove("l-dark")
    l.classList.add("l-light")
    load.classList.remove("loader-dark")
    load.classList.add("loader-light")
     localStorage.removeItem("theme")
     localStorage.setItem("theme", "light")
     lightOption.setAttribute('selected', true);
     body.classList.remove("dark-theme")
         body.classList.add("light-theme")
         menu.classList.remove("menu-dark")
         menu.classList.add("menu-light")
         hints.classList.remove("hints-dark")
     hints.classList.add("hints-light")
 }
 function addTheme() {
    if(localStorage.getItem("lat")=== null) {
        localStorage.removeItem("name")
        localStorage.setItem("lat", "55.7558")
        localStorage.setItem("lon", "37.6173")
        localStorage.setItem("name", "Москва")
    }
    if(localStorage.getItem("temp")=== null) {
        localStorage.setItem("temp", "C")
    }
    if(localStorage.getItem("wind")=== null) {
        localStorage.setItem("wind", "kph")
    }
    if(localStorage.getItem("theme")=== null) {
        localStorage.setItem("theme", "light")
    }
    if(localStorage.getItem("pressure")=== null) {
        localStorage.setItem("pressure", "mm")
    }
     if(localStorage.getItem("theme") === "light"){
         addLightTheme()
     }
     if(localStorage.getItem("theme") === "dark"){
         addDarkTheme()
     }
     if(localStorage.getItem("temp") === "C"){
        tempCOption.setAttribute("selected", true)
    }
    if(localStorage.getItem("temp") === "F"){
        tempFOption.setAttribute("selected", true)
    }
    if(localStorage.getItem("wind") === "kph"){
        kphOption.setAttribute("selected", true)
    }
    if(localStorage.getItem("wind") === "mph"){
        mphOption.setAttribute("selected", true)
    }
    if(localStorage.getItem("pressure") === "mm") {
        mmOption.setAttribute("selected", true)
    }
    if(localStorage.getItem("pressure") === "in") {
        inOption.setAttribute("selected", true)
    }
    if(localStorage.getItem("pressure") === "mb") {
        mbOption.setAttribute("selected", true)
    }
    }
    function hideForm() {
        clickCount = 0
        searchOpen.style.display = "none"
        city.style.display = "none"
        city.style.width = "0px"
        city.value = ""
        hints.style.display = "none"
    }
    searchForm.addEventListener("submit", function(event) {
        
        event.preventDefault()
        buttonSearch.style.backgroundImage = `url("images/before.png")`
        localStorage.removeItem("city")
        localStorage.setItem("city", city.value)
        hideForm()
        fetchWeather()
        addAllInf()
    })
    searchOpen.addEventListener("click", function() {
        buttonSearch.style.backgroundImage = `url("images/before.png")`
       hideForm()
    })
    
    buttonSearch.addEventListener("click", function(){
        if(clickCount < 1) {
            clickCount++
             buttonSearch.style.backgroundImage = `url("images/after.png")`
            city.style.display="block"
            buttonSearch.src = `images/after.png`
            searchOpen.style.display = "block"
            hints.style.display = "block"
          let start = Date.now()
          interval = setInterval(function() {
              let timePassed = Date.now() - start
              if(timePassed >= 350) {
                  clearInterval(interval)
                  return
              }
              city.style.width = timePassed + "px"
        },20)
    }
    })

selectDegree.addEventListener("change", function() {
    localStorage.removeItem("menu")
    localStorage.setItem("menu", "block")
    if(this.value === "C") {
        localStorage.removeItem("temp")
        localStorage.setItem("temp", "C")
       
    }
    if(this.value === "F") {
        localStorage.removeItem("temp")
        localStorage.setItem("temp", "F")
       
    }
    
    location.reload()
})
selectTopic.addEventListener("change", function() {
    localStorage.removeItem("menu")
    localStorage.setItem("menu", "block")
    if(this.value === "dark") {
        darkOption.setAttribute("selected",true)
        localStorage.removeItem("theme")
        localStorage.setItem("theme", "dark")
    }
    if(this.value === "light") {
        lightOption.setAttribute("selected",true)
        localStorage.removeItem("theme")
        localStorage.setItem("theme", "light")
    }
    location.reload()
})
selectSpeed.addEventListener("change", function() {
    localStorage.removeItem("menu")
    localStorage.setItem("menu", "block")
    if(this.value === "kph") {
        localStorage.removeItem("wind")
        localStorage.setItem("wind", "kph")
        kphOption.setAttribute("selected",true)
    }
    if(this.value === "mph") {
        localStorage.removeItem("wind")
        localStorage.setItem("wind", "mph")
        mphOption.setAttribute("selected",true)
    }
    location.reload()
})
selectPressure.addEventListener("change", function() {
    localStorage.removeItem("menu")
    localStorage.setItem("menu", "block")
    if(this.value === "mb") {
        localStorage.removeItem("pressure")
        localStorage.setItem("pressure", "mb")
        mbOption.setAttribute("selected",true)
    }
    if(this.value === "in") {
        localStorage.removeItem("pressure")
        localStorage.setItem("pressure", "in")
        inOption.setAttribute("selected",true)
    }
    if(this.value === "mm") {
        localStorage.removeItem("pressure")
        localStorage.setItem("pressure", "mm")
        mmOption.setAttribute("selected",true)
    }
    console.log("пенис");
    
    a = true
    location.reload()
})
butMenu.onclick = function() {
    localStorage.removeItem("menu")
    localStorage.setItem("menu", "block")
   menu.style.display = "block"
}
del.onclick = function() {
    localStorage.removeItem("menu")
    localStorage.setItem("menu", "none")
     menu.style.display = "none"
 }
 addTheme()
console.log(fetchWeather());
console.log(localStorage.getItem("lat"));
console.log(Math.round(-0.5)+1)
}