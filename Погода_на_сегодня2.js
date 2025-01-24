window.onload = function() {

let h1City = document.querySelector(".location")
let mainInf = document.querySelector(".main")
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
let threeDaysPage = document.querySelector(".three-day")
let icon = document.querySelector(".icon")
let feelslike = document.querySelector(".feelslike")
let wind = document.querySelector(".speedWind")
let temp = document.querySelector(".temp")
let pressure = document.querySelector(".press")
let hum = document.querySelector(".humidity")
let weather = document.querySelector(".weather")
let hints = document.querySelector(".hints-light")
let list = document.querySelector(".hint-ul")
let current = document.querySelector(".current")
let clickCount = 0
let eng = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
const celsiusSign = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'celsius',
  });
const fahrenheitSign = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'fahrenheit'
})
//${localStorage.getItem("inf")}
//${localStorage.getItem("inf")}
async function fetchWeather() {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b76243c0b1d64157974120632241107&q=${localStorage.getItem("lat")},${localStorage.getItem("lon")}&lang=ru&days=5&aqi=yes`)
    const forecast = await response.json()
    return forecast
    }
    async function findWorld(name) {
        const response = await fetch(`https://api.weatherapi.com/v1/alerts.json?key=b76243c0b1d64157974120632241107&q=Мурманск&lang=ru`)
        const res = await response.json()
        return res
    }
    console.log(findWorld());
    
async function find(name) {
    const response = await fetch(`https://api.geotree.ru/search.php?key=KLYDH7obgUh3&term=${name}&level=4&limit=5`)
    const res = await response.json()
    return res
}
    city.addEventListener("input", function() {
     let cityName = this.value
         find(cityName).then(data => {
            list.innerHTML = ""
            let inf = []
              inf = data.results
             console.log(inf);  
             console.log(data);
             if(city.value !== ""){
             for (const element of data) {
                 list.insertAdjacentHTML("beforeend", `<li>${element.value}</li>`)
                 let listArr = document.querySelectorAll(".hints.ul > li")
                 listArr.insertAdjacentHTML("click", function() {
                    console.log("ojdfihd");
                    
                 })
                }
            }
         })
     })
threeDaysPage.addEventListener("click", function() {
    localStorage.removeItem("menu")
    localStorage.getItem("menu", "none")
})
function  addTemp_c() {
   
        fetchWeather().then(data => {
            let temp_c = Math.round(data.current.temp_c)
            let feelslike_c =  Math.round(data.current.feelslike_c)
            if(temp_c > 0) {
                temp.textContent = `+${celsiusSign.format(temp_c)}`
            }
            if(feelslike_c > 0) {
                feelslike.textContent = `Ощущается как: +${celsiusSign.format(feelslike_c)}`
            }
            if(temp_c < 0) {
                temp.textContent = `${celsiusSign.format(temp_c)}` 
            }
            if(feelslike_c < 0) {
                feelslike.textContent = `Ощущается как: ${celsiusSign.format(feelslike_c)}`
            }
            if(temp_c === 0) {
                temp.textContent = `${celsiusSign.format(temp_c)}` 
            }
            if(feelslike_c === 0) {
                feelslike.textContent = `Ощущается как: ${celsiusSign.format(temp_c)}`
            }
        })
        tempCOption.setAttribute("selected", true)
}
function addTemp_f() {
        fetchWeather().then(data => {
        let temp_f = Math.round(data.current.temp_f)
        let feelslike_f = Math.round(data.current.feelslike_f)
        temp.textContent = `${fahrenheitSign.format(temp_f)}`
        feelslike.textContent = `Ощущается как: ${fahrenheitSign.format(feelslike_f)}`
        })
        tempFOption.setAttribute("selected", true)
}
    function addWindKph() {
        fetchWeather().then(data => {
    let kph = Math.round(data.current.wind_kph)
    wind.textContent = `${kph} км/ч`
        })
        kphOption.setAttribute("selected",true)
    }
    function addWindMph() {
            fetchWeather().then(data => {
        let mph = Math.round(data.current.wind_mph)
        wind.textContent = `${mph} миль/ч`
        })
        mphOption.setAttribute("selected",true)
    }
    function addPressureMb() {
            fetchWeather().then(data => {
                let mb = data.current.pressure_mb
                pressure.textContent = `${mb} мбар`
            })
            mbOption.setAttribute("selected",true)
    }
   
    function addPressureIn() {
            fetchWeather().then(data => {
                let inches = Math.round(data.current.pressure_in)
                pressure.textContent = `${inches} д.рт.ст`
            })
            inOption.setAttribute("selected",true)
    }
    function addPressureMM() {
            fetchWeather().then(data => {
                let mm = Math.round(data.current.pressure_in  * 25)
                pressure.textContent = `${mm} мм.рт.ст`
            })
            mmOption.setAttribute("selected",true)
    }
    function addHum() {
        fetchWeather().then(data => {
            let humidyty = data.current.humidity
            hum.textContent = `${humidyty}%`
        })
    }
function addIconAndColor() {
    fetchWeather().then(data => {
        let code = data.current.condition.code 
        let isDay = data.current.is_day
        let text = data.current.condition.text
        weather.textContent = text
        if(code === 1000) {
            if(isDay === 1) {
                icon.src = "images/Солнечно.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(94,154,255,1) 0%, rgba(70,191,255,1) 74%)'
            }
            if(isDay === 0) {
                icon.src = "images/луна.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(72,113,180,1) 0%, rgba(40,41,188,1) 74%)'

            }
        }
        if(code === 1003 || code === 1006) {
            if(isDay === 1) {
                icon.src = "images/солнце_и_облако.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(94,154,255,1) 0%, rgba(70,191,255,1) 74%)'
            }
            if(isDay === 0) {
                icon.src = "images/луна_и_облако.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(72,113,180,1) 0%, rgba(40,41,188,1) 74%)'

            }
        }
        if(code === 1009) {
            icon.src = "images/пасмурно.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1063 || code === 1072 || code === 1150 || code === 1153 || code === 1168 || code === 1171 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195 || code === 1198 || code === 1201 || code === 1240 || code === 1243 || code === 1246 || code === 1249 || code === 1252) {
            icon.src = "images/дождь.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1069 || code === 1255 || code === 1258) {
            icon.src = "images/снег_и_дождь.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1066 || code === 1114 || code === 1117 || code === 1204 || code === 1207 || code === 1210 || code === 1216 || code === 1219 || code === 1222 || code === 1225 || code === 1213) {
            icon.src = "images/снег.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(103,92,175,1) 50%, rgba(177,177,187,1) 100%)"
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(65,50,167,1) 59%, rgba(112,112,137,1) 100%)"
            }
        }
        if(code === 1135 || code === 1147) {
            icon.src = "images/туман.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1237 || code === 1261 || code === 1264) {
            icon.src = "images/град.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1030 || code === 1135 || code === 1147){
            icon.src = "images/туман.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1087) {
            icon.src = "images/гроза.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1273 || code === 1276) {
            icon.src = "images/дождь_и_гроза.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 1279 || code === 1282) {
            icon.src = "images/снег_и_гроза.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
    })
}
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
        if(localStorage.getItem("theme") === "light"){
            addLightTheme()
        }
        if(localStorage.getItem("theme") === "dark"){
            addDarkTheme()
        }
    }
    function addAllInf() {
      
        if(localStorage.getItem("lat")=== null) {
            localStorage.removeItem("name")
            localStorage.setItem("lat", "55.7558")
            localStorage.setItem("lon", "37.6173")
            localStorage.setItem("name", "Москва Россия")
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
        h1City.textContent = localStorage.getItem("name")
        addIconAndColor()
        addHum()
        if(localStorage.getItem("temp") === "C" || localStorage.getItem("temp") === null) {
            addTemp_c()
        }
        if(localStorage.getItem("temp") === "F") {
            addTemp_f()
        }
        if(localStorage.getItem("wind") === "kph" || localStorage.getItem("wind") === null) {
            addWindKph()
        }
        if(localStorage.getItem("wind") === "mph") {
            addWindMph()
        }
        if(localStorage.getItem("pressure") === "mm" || localStorage.getItem("pressure") === null) {
            addPressureMM()
        }
        if(localStorage.getItem("pressure") === "in") {
            addPressureIn()
        }
        if(localStorage.getItem("pressure") === "mb") {
            addPressureMb()
        }
        buildAir(110,130,localStorage.getItem("theme"), "pm2_5",["0", "60"],[10,25,60],1, "pm2.5")
        buildAir(110,130,localStorage.getItem("theme"), "pm10",["0", "100"],[20,50,100],2, "pm10")
        buildAir(110,130,localStorage.getItem("theme"), "o3",["0", "200"],[50,100,200],3, `  O${String.fromCharCode(0x2083)}`)
        buildAir(110,130,localStorage.getItem("theme"), "no2",["0", "95"],[42,60,95],4, ` NO${String.fromCharCode(0x2082)}`)
        buildChart(localStorage.getItem("theme"), localStorage.getItem("temp"))
        menu.style.display = localStorage.getItem("menu")
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
       addTemp_c()
    }
    if(this.value === "F") {
        localStorage.removeItem("temp")
        localStorage.setItem("temp", "F")
        addTemp_f()
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
    }
    if(this.value === "mph") {
        localStorage.removeItem("wind")
        localStorage.setItem("wind", "mph")
    }
    location.reload()
})
selectPressure.addEventListener("change", function() {
    localStorage.removeItem("menu")
    localStorage.setItem("menu", "block")
    if(this.value === "mb") {
        localStorage.removeItem("pressure")
        localStorage.setItem("pressure", "mb")
    }
    if(this.value === "in") {
        localStorage.removeItem("pressure")
        localStorage.setItem("pressure", "in")
    }
    if(this.value === "mm") {
        localStorage.removeItem("pressure")
        localStorage.setItem("pressure", "mm")
    }
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
 function buildAir(x, y, theme, elment, designations, standart, index, text) {
    
     fetchWeather().then(data => {
    const canvas = document.getElementById(`${index}`)
    const ctx = canvas.getContext("2d");
    let defraH1 = document.querySelector(".defra-h1")
    defraH1.textContent = "Состав и качество воздуха"
    let textDefra = document.querySelector(".text")
    let quality = document.querySelector(".quality")
    let startFone = 0.7 * Math.PI
    let endFone =  0.3 * Math.PI
    let colorFont = ""
    let font = `25px Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif`
    let foneColor = "rgb(135, 135, 135)" 
    let color = ""
    let defraIndex = data.current["air_quality"]["us-epa-index"]
    let aqi = data.current.air_quality[elment]
    let range = 414 - 126
    let procent = aqi * 100 / designations[1]
    let g =  126 + procent * range / 100
    let cornerStart = Math.PI * 0.7
    let cornerEnd = g * (Math.PI/180)
    let maxCornerEnd = Math.PI * 2.3
    const good = "rgb(38, 212, 32)"
    const medium = "rgb(255, 218, 11)"
    const bad = "rgb(204, 24, 57)"
    if(index === 1) {
         textDefra.textContent = `Качество воздуха:`
    if(defraIndex === 1) {
        quality.textContent = "Отлично"
        quality.style.color = good
    }
    if(defraIndex === 2) {
        quality.textContent = "Средний"
        quality.style.color = medium
    }
    if(defraIndex === 3) {
        quality.textContent = "Вредно для чувствительной группы"
        quality.style.color = medium
    }
    if(defraIndex === 3) {
        quality.textContent = "Вредно для чувствительной группы"
        quality.style.color = medium
    }
    if(defraIndex === 4) {
        quality.textContent = "Вредное"
        quality.style.color = bad
    }
    if(defraIndex === 5) {
        quality.textContent = "Очень вредное"
        quality.style.color = bad
    }
    if(defraIndex === 6) {
        quality.textContent = "Опасное!"
        quality.style.color = bad
    }
}
    if(cornerEnd > maxCornerEnd) {
        cornerEnd = maxCornerEnd
    }    
    if(theme === "light") {
        colorFont = "black"
        defraH1.style.color = colorFont
        textDefra.style.color = colorFont
    }
    if(theme === "dark") {
        colorFont = "white"
        defraH1.style.color = colorFont
        textDefra.style.color = colorFont
    }
    if(aqi <= standart[0]) {
        color = good
        
    }
    else if(aqi > standart[0] && aqi <= standart[1]) {
        color = medium
    }
    else if(aqi > standart[1]  && aqi > standart[2] || aqi <= standart[2]) {
        color = bad
    }
    ctx.arc(x,y, 100, startFone,endFone)
    ctx.lineWidth = 15
    ctx.strokeStyle = foneColor
    ctx.stroke()
        ctx.beginPath()
        ctx.lineWidth = 15
        ctx.strokeStyle = color
        ctx.arc(x,y, 100, cornerStart, cornerEnd)
        ctx.stroke()
        ctx.closePath()
    ctx.font = font
    ctx.fillStyle = colorFont
    ctx.fillText(`${designations[0]}`, x-60, 235)
    ctx.fillText(`${designations[1]}`, x+40, 235)
    ctx.fillText(`${text}`, x-30, y)
})
 }
 function buildChart(theme, temp) {
    let canvas = document.getElementById("canvasChart")
    const ctx = canvas.getContext("2d")   
 fetchWeather().then(data => {
    let chartH1 = document.querySelector(".chart-h1")
    chartH1.textContent = "График температуры"
    let temperature = ""
    let arrTemp = []
    let arrTempSort = []
    let height =  0
 let set = new Set()
 let color = ""
 if(temp === "C") {
    temperature = "temp_c"
 }
 if(temp === "F") {
    temperature = "temp_f"
 }
 if(theme === "dark") {
    color = "white"
    chartH1.style.color = color
 }
 if(theme === "light") {
    color = "black"
    chartH1.style.color = color
 }

ctx.beginPath()
        for (let i = 0; i < 24; i++) {
            arrTemp.push(Math.round(data.forecast.forecastday[0].hour[i][temperature]))
            set.add(arrTemp[i])
        }
        console.log(arrTemp);
        
        arrTempSort = Array.from(set).sort((a,b) => a - b)
        ctx.canvas.height = arrTempSort.length * 40 + 40
        height = ctx.canvas.height
        console.log(arrTempSort);
        
        let xForTemp = 0
        let yForTemp = height - 40
       ctx.font = `20px Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif`
       ctx.fillStyle = color
        for (let j = 0; j < 24; j++) {
           if(arrTempSort[j] > 0) {
            ctx.fillText(`+${arrTempSort[j]+ String.fromCharCode(176) + temp}`, xForTemp, yForTemp)
            ctx.fill()
            }
             if(arrTempSort[j] === 0) {
                 ctx.fillText(` ${arrTempSort[j]+ String.fromCharCode(176) + temp}`, xForTemp, yForTemp)
             }
             if(arrTempSort[j] < 0) {
                 ctx.fillText(`${arrTempSort[j]+ String.fromCharCode(176) + temp}`, xForTemp, yForTemp)
             }
            yForTemp-=40
            }
    let xForHour = 60
    let yForHour = height
    for (let i = 0; i < 24; i++) {
        if(i < 10) {
            ctx.fillText(`0${i}:00`, xForHour, yForHour)
        }
        else if(i >= 10) {
            ctx.fillText(`${i}:00`, xForHour, yForHour)
        }
        xForHour+=60
    }

   let x =  80
     let y = 0
     let cordsX = []
     let cordsY = []
     ctx.strokeStyle = "rgb(255, 218, 11)"
     ctx.fillStyle = "rgb(255, 218, 11)"
    
     for (let e = 0; e < 24; e++) {
         y = height - arrTempSort.indexOf(arrTemp[e]) * 40 - 50
         cordsX.push(x)
         cordsY.push(y)
         ctx.moveTo(x,y)
         ctx.arc(x, y, 3,0, 2*Math.PI, false)
       
         x+=60
     }
     ctx.lineWidth = 2
     for (let i = 0; i < 23; i++) {
         ctx.moveTo(cordsX[i], cordsY[i])
         ctx.lineTo(cordsX[i+1], cordsY[i+1])
     }
     ctx.fill()
     ctx.stroke()
  })
  }

console.log(fetchWeather());
console.log(find("dhfjhf", "iejfuhd"));

addTheme()
addAllInf()
}

