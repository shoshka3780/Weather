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
    let title4 = []
    let title5 = []
    let title6 = []
    let title7 = []

    let imageToday = []
    let imageTum = []
    let imageAftTum = []
    let image4 = []
    let image5 = []
    let image6 = []
    let image7 = []

    let tempToday = []
    let tempTum = []
    let tempAftTum = []
    let temp4 = []
    let temp5 = []
    let temp6 = []
    let temp7 = []

    let windToday = []
    let windTum = []
    let windAftTum = []
    let wind4 = []
    let wind5 = []
    let wind6 = []
    let wind7 = []

    let pressToday = []
    let pressTum = []
    let pressAftTum = []
    let press4 = []
    let press5 = []
    let press6 = []
    let press7 = []

    let humToday = []
    let humTum = []
    let humAftTum = []
    let hum4 = []
    let hum5 = []
    let hum6 = []
    let hum7 = []

    let listArrRus= []
let listArrOther = []

let h1City = document.querySelector(".city-name")
async function fetchWeatherGeo() {
    const response = await fetch(`
https://api.openweathermap.org/data/2.5/weather?lat=${localStorage.getItem("lat")}&lon=${localStorage.getItem("lon")}
&appid=646a83fd16d15957b747eda0eed49f39&lang=ru&units=metric`)
    const res = await response.json()
    return res
}
async function fetchWeather() {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem("lat")}&longitude=${localStorage.getItem("lon")}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,pressure_msl,weather_code&forecast_days=7`)
    const forecast = await response.json()
    return forecast
    }
    async function find(name) {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=ru&format=json`)
        const res = await response.json()
        return res
    }
    current.addEventListener("click", function() {
        navigator.geolocation.getCurrentPosition(position => {
            localStorage.removeItem("inf")
            localStorage.removeItem("lon")        
            localStorage.removeItem("lat")
            localStorage.setItem("lon" , position.coords.longitude)        
            localStorage.setItem("lat", position.coords.latitude)
            fetchWeatherGeo(localStorage.getItem("lat"),localStorage.getItem("lon")).then(data=> {
                localStorage.removeItem("name")
                localStorage.setItem("name", data.name)
                h1City.textContent = localStorage.getItem("name")
                location.reload()
            })
           
        })
        
        
    })
    city.addEventListener("input", function() {
        let cityName = this.value
        find(cityName).then(data => {
            for (let i = 0; i < listArrRus.length; i++) {
                listArrRus[i].remove()
                console.log("пенис");
                
            }
            let inf = []
            inf = data.results
            console.log(data.results);
            
             if(city.value !== ""){
             for (const element of data.results) {
                
                 list.insertAdjacentHTML("beforeend", `<li class = "rus">${element.name} (${element.admin1})</li>`)     
                 }
                 listArrRus = document.querySelectorAll(".rus")
                 listArrRus.forEach((item,index) => { item.addEventListener("click", function() {
                     localStorage.removeItem("lat")
                     localStorage.removeItem("lon")
                     localStorage.removeItem("name")
                     localStorage.setItem("name", data.results[index].name)
                     localStorage.setItem("lat", data.results[index].latitude)
                     localStorage.setItem("lon", data.results[index].longitude)
                     h1City.textContent = localStorage.getItem("name")
                     fetchWeather()
                     location.reload()
                  })
                })
            }
         })
       
        for (let i = 0; i < listArrOther.length; i++) {
            listArrOther[i].remove()
        }
         
     })  
        
    async function addimg(dayTime, day, data) {
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
                for (let i = 6 + day*24; i < 13 + day*24; i++) {
                    let code = data.hourly.weather_code[i]
                    conditionsArr.push(code)
                }
                isDay = 1
            }
            // днем
            if(dayTime === 1) {
            for (let i = 13 + day*24; i <19 + day*24; i++) {
                    let code = data.hourly.weather_code[i]
                    conditionsArr.push(code)
                }
                isDay = 1
            }
            // вечером 
            if(dayTime === 2) {
                for (let i = 18 + day*24; i < 24 + day*24; i++) {
                    let code = data.hourly.weather_code[i]
                    conditionsArr.push(code)
                }
                isDay = 0
            }
            // ночью
            if(dayTime === 3) {
                for (let i = 0 + day*24; i < 9 + day*24; i++) {
                    let code = data.hourly.weather_code[i]
                    conditionsArr.push(code)
                    
                }
                 conditionsArr.push(data.hourly.weather_code[23+day*24]) 
                isDay = 0
            }
            
            console.log(conditionsArr,day);
            
            // находим код погоды
            let objRes = {}
            for (const element of conditionsArr) {
                objRes[element] = (objRes[element] || 0) + 1;
              }
              let max = Math.max.apply(Math, Object.values(objRes));
              let code = Math.max(...Object.keys(objRes).filter(key => objRes[key] === max).map(Number)); 
              console.log(code);
              
              if(code === 0) {
                if(isDay === 1) {
                     icon = `images/Солнечно${theme}.png`
                }
                if(isDay === 0) {
                    icon = `images/луна${theme}.png`
                }
                title = "Ясно"
            }
            if(code === 1 || code === 2) {
                if(isDay === 1) {
                     icon = `images/солнце_и_облако${theme}.png`
                }
                if(isDay === 0) {
                     icon = `images/луна_и_облако${theme}.png`
                }
                title = "Облачно с прояснениями"
            }
            if(code === 3) {
                icon = `images/пасмурно${theme}.png`
                title = "Пасмурно"
            }
            if(code === 51 || code === 53 || code === 55 || code === 56 || code === 57 || code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) {
                icon = `images/дождь${theme}.png`
                title = "Дождь"
            }
            if(code === 66 || code === 67) {
                icon = `images/снег_и_дождь${theme}.png`
                title = "Снег с дождем"
            }
            if(code === 71 || code === 73 || code === 75 || code === 77) {
                icon = `images/снег${theme}.png`
                title = "Снег"
            }
            if(code === 45 || code === 48) {
                icon = `images/туман${theme}.png`
                title = "туман"
            }
            if(code === 95) {
                icon = `images/гроза${theme}.png`
                title = "Гроза"
            }
            if(code === 96 || code === 99) {
                icon = `images/дождь_и_гроза${theme}.png`
                title = "Дождь с грозой"
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
               if(day === 3) {
                image4.push(icon)
                title4.push(title)
            }
            if(day === 4) {
                image5.push(icon)
                title5.push(title)
            }
            if(day === 5) {
                image6.push(icon)
                title6.push(title)
            }
             if(day === 6) {
                image7.push(icon)
                title7.push(title)
            }
    }
    async function addTemp(dayTime,day,data) {
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
                for (let i = 6 + day*24; i < 13 + day*24; i++) {
                    if (tempStr === "temp_c") {
                        let code = data.hourly.temperature_2m[i]
                    tempArr.push(code)
                    }
                     if (tempStr === "temp_f") {
                        let code = data.hourly.temperature_2m[i] * 1.8 + 32
                    tempArr.push(code)
                    }
                    
                }
                isDay = 1
            }
            // днем
            if(dayTime === 1) {
            for (let i = 13 + day*24; i <19 + day*24; i++) {
                  if (tempStr === "temp_c") {
                        let code = data.hourly.temperature_2m[i]
                    tempArr.push(code)
                    }
                     if (tempStr === "temp_f") {
                        let code = data.hourly.temperature_2m[i] * 1.8 + 32
                    tempArr.push(code)
                    }
                }
                isDay = 1
            }
            // вечером 
            if(dayTime === 2) {
                for (let i = 18 + day*24; i < 24 + day*24; i++) {
                   if (tempStr === "temp_c") {
                        let code = data.hourly.temperature_2m[i]
                    tempArr.push(code)
                    }
                     if (tempStr === "temp_f") {
                        let code = data.hourly.temperature_2m[i] * 1.8 + 32
                    tempArr.push(code)
                    }
                }
                isDay = 0
            }
            // ночью
            if(dayTime === 3) {
                for (let i = 0 + day*24; i < 9 + day*24; i++) {
                   if (tempStr === "temp_c") {
                        let code = data.hourly.temperature_2m[i]
                    tempArr.push(code)
                    }
                     if (tempStr === "temp_f") {
                        let code = data.hourly.temperature_2m[i] * 1.8 + 32
                    tempArr.push(code)
                    }
                    
                }
                 if (tempStr === "temp_c") {
                 tempArr.push(data.hourly.temperature_2m[23+day*24]) 
                 }
                  if (tempStr === "temp_f") {
                 tempArr.push(data.hourly.temperature_2m[23+day*24] * 1.8 + 32) 
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
               if(day === 3) {
                temp4.push(res)
           
            }
            if(day === 4) {
                temp5.push(res)
             
            }
            if(day === 5) {
                temp6.push(res)
                
            }
             if(day === 6) {
                temp7.push(res)
              
            }  
    }
    async function addWind(dayTime,day,data) {
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
                for (let i = 6 + day*24; i < 13 + day*24; i++) {
                    if (windStr === "wind_kph") {
                        let code = data.hourly.wind_speed_10m[i]
                        windArr.push(code)
                    }
                     if (windStr === "wind_mph") {
                        let code = data.hourly.wind_speed_10m[i]*2.23694
                        windArr.push(code)
                    }
                    
                }
                isDay = 1
            }
            // днем
            if(dayTime === 1) {
            for (let i = 13 + day*24; i <19 + day*24; i++) {
                 if (windStr === "wind_kph") {
                        let code = data.hourly.wind_speed_10m[i]
                        windArr.push(code)
                    }
                     if (windStr  === "wind_mph") {
                        let code = data.hourly.wind_speed_10m[i]*2.23694
                        windArr.push(code)
                    }
                }
                isDay = 1
            }
            // вечером 
            if(dayTime === 2) {
                for (let i = 18 + day*24; i < 24 + day*24; i++) {
                    if (windStr === "wind_kph") {
                        let code = data.hourly.wind_speed_10m[i]
                        windArr.push(code)
                    }
                     if (windStr  === "wind_mph") {
                        let code = data.hourly.wind_speed_10m[i]*2.23694
                        windArr.push(code)
                    }
                }
                isDay = 0
            }
            // ночью
            if(dayTime === 3) {
                for (let i = 0 + day*24; i < 9 + day*24; i++) {
                    if (windStr === "wind_kph") {
                        let code = data.hourly.wind_speed_10m[i]
                        windArr.push(code)
                    }
                     if (windStr === "wind_mph") {
                        let code = data.hourly.wind_speed_10m[i]*2.23694
                        windArr.push(code)
                    }
                    
                }
                 if (windStr === "wind_kph") {
                        let code = data.hourly.wind_speed_10m[23+day*24]
                        windArr.push(code)
                    }
                     if (windStr  === "wind_mph") {
                        let code = data.hourly.wind_speed_10m[23+day*24]*2.23694
                        windArr.push(code)
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
          if(day === 3) {
            wind4.push(`${res} ${sign}`)
        }
        if(day === 4) {
            wind5.push(`${res} ${sign}`)
        }
        if(day === 5) {
            wind6.push(`${res} ${sign}`)
        }
        if(day === 6) {
            wind7.push(`${res} ${sign}`)
        }
    }
    async function addPress(dayTime,day,data) {
        let sign = ""
        let isMM = false
        let pressStr = ""
        let pressArr = []
        let isDay = 0
        if(localStorage.getItem("pressure") === "mm") {
            pressStr = "pressure_mm"
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
                for (let i = 6 + day*24; i < 13 + day*24; i++) {
                    if (pressStr === "pressure_mm") {
                        let code = data.hourly.pressure_msl[i] * 0.75
                        pressArr.push(code)
                    }
                     if (pressStr === "pressure_in") {
                        let code = data.hourly.pressure_msl[i]* 0.02953
                        pressArr.push(code)
                    }
                    if (pressStr === "pressure_mb") {
                        let code = data.hourly.pressure_msl[i]
                        pressArr.push(code)
                    }
                    
                }
                isDay = 1
            }
            // днем
            if(dayTime === 1) {
            for (let i = 13 + day*24; i <19 + day*24; i++) {
               if (pressStr === "pressure_mm") {
                        let code = data.hourly.pressure_msl[i] * 0.75
                        pressArr.push(code)
                    }
                     if (pressStr === "pressure_in") {
                        let code = data.hourly.pressure_msl[i]* 0.02953
                        pressArr.push(code)
                    }
                    if (pressStr === "pressure_mb") {
                        let code = data.hourly.pressure_msl[i]
                        pressArr.push(code)
                    }
                }
                isDay = 1
            }
            // вечером 
            if(dayTime === 2) {
                for (let i = 18 + day*24; i < 24 + day*24; i++) {
                    if (pressStr === "pressure_mm") {
                        let code = data.hourly.pressure_msl[i] * 0.75
                        pressArr.push(code)
                    }
                     if (pressStr === "pressure_in") {
                        let code = data.hourly.pressure_msl[i]* 0.02953
                        pressArr.push(code)
                    }
                    if (pressStr === "pressure_mb") {
                        let code = data.hourly.pressure_msl[i]
                        pressArr.push(code)
                    }
                }
                isDay = 0
            }
            // ночью
            if(dayTime === 3) {
                for (let i = 0 + day*24; i < 9 + day*24; i++) {
                     if (pressStr === "pressure_mm") {
                        let code = data.hourly.pressure_msl[i] * 0.75
                        pressArr.push(code)
                    }
                     if (pressStr === "pressure_in") {
                        let code = data.hourly.pressure_msl[i]* 0.02953
                        pressArr.push(code)
                    }
                    if (pressStr === "pressure_mb") {
                        let code = data.hourly.pressure_msl[i]
                        pressArr.push(code)
                    }
                    
                }
               if (pressStr === "pressure_mm") {
                        let code = data.hourly.pressure_msl[23+day*24] * 0.75
                        pressArr.push(code)
                    }
                     if (pressStr === "pressure_in") {
                        let code = data.hourly.pressure_msl[23+day*24]* 0.02953
                        pressArr.push(code)
                    }
                    if (pressStr === "pressure_mb") {
                        let code = data.hourly.pressure_msl[23+day*24]
                        pressArr.push(code)
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
          if(day === 3) {
            press4.push(`${res} ${sign}`)
        }
        if(day === 4) {
            press5.push(`${res} ${sign}`)
        }
        if(day === 5) {
            press6.push(`${res} ${sign}`)
        }
         if(day === 6) {
            press7.push(`${res} ${sign}`)
        }
    }
    async function addHum(dayTime,day,data) {
        let humArr = []
        let isDay  = 0
       if(dayTime === 0) {
                for (let i = 6 + day*24; i < 13 + day*24; i++) {
                        let code = data.hourly.relative_humidity_2m[i]
                        humArr.push(code)
                    
                    
                }
                isDay = 1
            }
            // днем
            if(dayTime === 1) {
            for (let i = 13 + day*24; i <19 + day*24; i++) {
                let code = data.hourly.relative_humidity_2m[i]
                 humArr.push(code)
                }
                isDay = 1
            }
            // вечером 
            if(dayTime === 2) {
                for (let i = 18 + day*24; i < 24 + day*24; i++) {
                        let code = data.hourly.relative_humidity_2m[i]
                        humArr.push(code)

                }
                isDay = 0
            }
            // ночью
            if(dayTime === 3) {
                for (let i = 0 + day*24; i < 9 + day*24; i++) {
                        let code = data.hourly.relative_humidity_2m[i]
                        humArr.push(code)
                    
                }
                        let code = data.hourly.relative_humidity_2m[23+day*24]
                        humArr.push(code)
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
          if(day === 3) {
            hum4.push(`${res}%`)
        }
        if(day === 4) {
            hum5.push(`${res}%`)
        }
        if(day === 5) {
            hum6.push(`${res}%`)
        }
         if(day === 6) {
            hum7.push(`${res}%`)
        }
    }
   async function addCityName(data) {
        let cityName = document.querySelector(".city-name")
        cityName.textContent = `Погода на три дня: ${localStorage.getItem("name")}`
        if (localStorage.getItem("theme") === "dark") {
            cityName.style.color = "white"
        } 
       
    }
const dayName = []
  const daysOfWeek = [];
const months = [];
   function addDate() {
const today = new Date();
for (let i = 0; i < 7; i++) {
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + i);
  const da = nextDate.toLocaleDateString('ru-RU', { weekday: 'long' });
  dayName.push(da)
  daysOfWeek.push(nextDate.getDate());
  months.push(nextDate.toLocaleDateString('ru-RU', { month: 'long' }));
}
    }
    async function addAllInf(dayTime, day){
   const data = await fetchWeather().then(data=> data)
await Promise.all([
    addimg(dayTime, day, data),
    addTemp(dayTime, day, data),
    addWind(dayTime, day,  data),
    addPress(dayTime, day,  data),
    addHum(dayTime, day,  data),
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
 addDate()
    addCityName()
    addAllInf(0,0)
    addAllInf(1,0)
    addAllInf(2,0)
    addAllInf(3,0)
  addContainer(daysOfWeek[0], months[0], tempToday, imageToday, windToday, pressToday, humToday, "сегодня", titleToday, 1)
    addAllInf(0,1)
    addAllInf(1,1)
    addAllInf(2,1)
    addAllInf(3,1)
 addContainer(daysOfWeek[1], months[1], tempTum, imageTum, windTum, pressTum, humTum, "завтра", titleTum, 2)
    addAllInf(0,2)
    addAllInf(1,2)
    addAllInf(2,2)
    addAllInf(3,2)
 addContainer(daysOfWeek[2], months[2], tempAftTum,imageAftTum,windAftTum,pressAftTum,humAftTum, "послезавтра", titleAftTum, 3)
    addAllInf(0,3)
    addAllInf(1,3)
    addAllInf(2,3)
    addAllInf(3,3)
    addContainer(daysOfWeek[3], months[3], temp4, image4, wind4, press4, hum4, dayName[3], title4, 4)
    addAllInf(0,4)
    addAllInf(1,4)
    addAllInf(2,4)
    addAllInf(3,4)
 addContainer(daysOfWeek[4], months[4], temp5, image5, wind5, press5, hum5, dayName[4], title5, 5)
    addAllInf(0,5)
    addAllInf(1,5)
    addAllInf(2,5)
    addAllInf(3,5)
 addContainer(daysOfWeek[5], months[5], temp6,image6,wind6,press6,hum6, dayName[5], title6, 6)
    addAllInf(0,6)
    addAllInf(1,6)
    addAllInf(2,6)
    addAllInf(3,6)
     addContainer(daysOfWeek[6], months[6], temp7,image7,wind7,press7,hum7, dayName[6], title7, 7)

 function addDarkTheme() {
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
        list.innerHTML = ""
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
  menu.style.display = localStorage.getItem("menu")
}
