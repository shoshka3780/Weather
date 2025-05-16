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
let canvasAir = document.querySelector(".canvas-air")
let chartTemp = document.querySelector(".chartTemp")
let listArrRus= []
let listArrOther = []
let current = document.querySelector(".current")
let clickCount = 0

let pod = document.querySelector(".pod-light")
const celsiusSign = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'celsius',
  });
const fahrenheitSign = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'fahrenheit'
})
async function fetchWeather() {
    const response = await fetch(`
https://api.openweathermap.org/data/2.5/weather?lat=${localStorage.getItem("lat")}&lon=${localStorage.getItem("lon")}
&appid=646a83fd16d15957b747eda0eed49f39&lang=ru&units=metric`)
    const res = await response.json()
    return res
}
async function fetchWeatherTemp() {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem("lat")}&longitude=${localStorage.getItem("lon")}&hourly=temperature_2m,precipitation&forecast_days=1`)
    const res = await response.json()
    return res
}
async function fetchWeatherAqi() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${localStorage.getItem("lat")}&lon=${localStorage.getItem("lon")}&appid=646a83fd16d15957b747eda0eed49f39`)
    const res = await response.json()
    return res
}

async function find(name) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=ru&format=json`)
    const res = await response.json()
    return res
}
console.log(fetchWeather());

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
        find(cityName).then(data => {
            for (let i = 0; i < listArrRus.length; i++) {
                listArrRus[i].remove()
            }
            let inf = []
            inf = data.result
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
        arrCityNotRussia = []
        for (let i = 0; i < listArrOther.length; i++) {
            listArrOther[i].remove()
        }
         
     })  
threeDaysPage.addEventListener("click", function() {
    localStorage.removeItem("menu")
    localStorage.getItem("menu", "none")
})
 async function  addTemp_c() {
   
        fetchWeather().then(data => {
            let temp_c = Math.round(data.main.temp)
            let feelslike_c =  Math.round(data.main.feels_like)
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
                temp.textContent = `${celsiusSign.format(0)}` 
            }
            if(feelslike_c === 0) {
                feelslike.textContent = `Ощущается как: ${celsiusSign.format(0)}`
            }
        })
        tempCOption.setAttribute("selected", true)
}
async function addTemp_f() {
        fetchWeather().then(data => {
        let temp_f = Math.round((Math.round(data.main.temp) * 1.8) + 32)
        let feelslike_f = Math.round((Math.round(data.main.feels_like) * 1.8) + 32)
        temp.textContent = `${fahrenheitSign.format(temp_f)}`
        feelslike.textContent = `Ощущается как: ${fahrenheitSign.format(feelslike_f)}`
        })
        tempFOption.setAttribute("selected", true)
}
async function addWindKph() {
        fetchWeather().then(data => {
    let kph = Math.round(data.wind.speed)
    wind.textContent = `${kph} км/ч`
        })
        kphOption.setAttribute("selected",true)
    }
async function addWindMph() {
            fetchWeather().then(data => {
        let mph = Math.round(data.wind.speed * 2.23694)
        wind.textContent = `${mph} миль/ч`
        })
        mphOption.setAttribute("selected",true)
    }
async function addPressureMb() {
            fetchWeather().then(data => {
                let mb = data.main.pressure
                pressure.textContent = `${mb} мбар`
            })
            mbOption.setAttribute("selected",true)
    }
   
async function addPressureIn() {
            fetchWeather().then(data => {
                let inches = Math.round(data.main.pressure * 0.02953)
                pressure.textContent = `${inches} д.рт.ст`
            })
            inOption.setAttribute("selected",true)
    }
async function addPressureMM() {
            fetchWeather().then(data => {
                let mm = Math.round(data.main.pressure  * 0.75)
                pressure.textContent = `${mm} мм.рт.ст`
            })
            mmOption.setAttribute("selected",true)
    }
async function addHum() {
        fetchWeather().then(data => {
            let humidyty = data.main.humidity
            hum.textContent = `${humidyty}%`
        })
    }
async function addIconAndColor() {
    fetchWeather().then(data => {
        let code = data.weather[0].id
        let DorN = data.weather[0].icon
        let isDay = 0
        if (DorN[DorN.length-1] == "d") {
            isDay = 1
        }
        if (DorN[DorN.length-1] == "n") {
            isDay = 0
        }
        let text = data.weather[0].description
        weather.textContent = text
        if(code === 800) {
            if(isDay === 1) {
                icon.src = "images/Солнечно.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(94,154,255,1) 0%, rgba(70,191,255,1) 74%)'
            }
            if(isDay === 0) {
                icon.src = "images/луна.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(72,113,180,1) 0%, rgba(40,41,188,1) 74%)'

            }
        }
        if(code === 801) {
            if(isDay === 1) {
                icon.src = "images/солнце_и_облако.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(94,154,255,1) 0%, rgba(70,191,255,1) 74%)'
            }
            if(isDay === 0) {
                icon.src = "images/луна_и_облако.png"
                mainInf.style.backgroundImage = 'linear-gradient(90deg, rgba(72,113,180,1) 0%, rgba(40,41,188,1) 74%)'

            }
        }
        if(code === 802 || code === 803 || code === 804) {
            icon.src = "images/пасмурно.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 500 || code === 501 || code === 502 || code === 503 || code === 504 || code === 520 || code === 521 || code === 522 || code === 531 || code === 300 || code === 301 || code === 302 || code === 310 || code === 311 || code === 312 || code === 313  || code === 314 || code === 321) {
            icon.src = "images/дождь.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 511 || code === 612 || code === 613 || code === 615 || code === 616 || code === 620) {
            icon.src = "images/снег_и_дождь.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 600 || code === 601 || code === 602 || code === 611  || code === 621 || code === 622) {
            icon.src = "images/снег.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(103,92,175,1) 50%, rgba(177,177,187,1) 100%)"
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(65,50,167,1) 59%, rgba(112,112,137,1) 100%)"
            }
        }
        if(code === 701 || code === 711 || code === 721 || code === 731 || code === 741 || code === 751 || code === 761 || code === 762 || code === 771 || code === 781) {
            icon.src = "images/туман.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 211 || code == 210  || code == 221) {
            icon.src = "images/гроза.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
        if(code === 200 || code === 201 || code === 202 || code === 230 || code === 231 || code === 232) {
            icon.src = "images/дождь_и_гроза.png"
            if(isDay === 1) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(159,160,162,1) 37%, rgba(96,99,111,1) 100%)"
               
            }
            if(isDay === 0) {
                mainInf.style.backgroundImage = "linear-gradient(90deg, rgba(86,88,92,1) 37%, rgba(82,85,102,1) 100%)"
            }
        }
    })
}
let fon = document.querySelectorAll(".l")
    function addDarkTheme() {
        localStorage.removeItem("theme")
        localStorage.setItem("theme", "dark")
        darkOption.setAttribute('selected', true);
        for (let i = 0; i < fon.length; i++) {
            fon[i].classList.remove("l")
        fon[i].classList.add("d")
            
        }
      
        body.classList.remove("light-theme")
        body.classList.add("dark-theme")
        menu.classList.remove("menu-light")
        menu.classList.add("menu-dark")
        hints.classList.remove("hints-light")
        hints.classList.add("hints-dark")
        pod.classList.remove("pod-light")
        pod.classList.add("pod-dark")
    }
    function addLightTheme() {
        for (let i = 0; i < fon.length; i++) {
           fon[i].classList.remove("d")
        fon[i].classList.add("l")
            
        }
       
        localStorage.removeItem("theme")
        localStorage.setItem("theme", "light")
        lightOption.setAttribute('selected', true);
        body.classList.remove("dark-theme")
            body.classList.add("light-theme")
            menu.classList.remove("menu-dark")
            menu.classList.add("menu-light")
            hints.classList.remove("hints-dark")
        hints.classList.add("hints-light")
        pod.classList.remove("pod-dark")
        pod.classList.add("pod-light")
        
    }
    function addTheme() {
        if(localStorage.getItem("theme") === "light"){
            addLightTheme()
        }
        if(localStorage.getItem("theme") === "dark"){
            addDarkTheme()
        }
    }
    async function addAllInf() {
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
         await addIconAndColor()
        addHum()
        if(localStorage.getItem("temp") === "C" || localStorage.getItem("temp") === null) {
         await addTemp_c()
        }
        if(localStorage.getItem("temp") === "F") {
            await addTemp_f()
        }
        if(localStorage.getItem("wind") === "kph" || localStorage.getItem("wind") === null) {
            await addWindKph()
        }
        if(localStorage.getItem("wind") === "mph") {
            await addWindMph()
        }
        if(localStorage.getItem("pressure") === "mm" || localStorage.getItem("pressure") === null) {
            await addPressureMM()
        }
        if(localStorage.getItem("pressure") === "in") {
           await addPressureIn()
        }
        if(localStorage.getItem("pressure") === "mb") {
            await addPressureMb()
        }
            await buildAir(110,130,localStorage.getItem("theme"), "pm2_5",["0", "60"],[10,25,60],1, "pm2.5")
            await buildAir(110,130,localStorage.getItem("theme"), "pm10",["0", "100"],[20,50,100],2, "pm10")
            await buildAir(110,130,localStorage.getItem("theme"), "o3",["0", "200"],[50,100,200],3, `  O${String.fromCharCode(0x2083)}`)
            await buildAir(110,130,localStorage.getItem("theme"), "no2",["0", "95"],[42,60,95],4, ` NO${String.fromCharCode(0x2082)}`)
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
 async function buildAir(x, y, theme, elment, designations, standart, index, text) {
    
    fetchWeatherAqi().then(data => {
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
    let defraIndex = data.list[0].main.aqi
    let aqi = data.list[0].components[elment]
    let range = 414 - 126
    let procent = aqi * 100 / designations[1]
    let g =  126 + procent * range / 100
    let cornerStart = Math.PI * 0.7
    let cornerEnd = g * (Math.PI/180)
    let maxCornerEnd = Math.PI * 2.3
    const excellent = "rgb(38, 212, 32)"
    const good = "rgb(255, 218, 11)"
    const moderate = "rgb(244, 87, 3)"
    const bad = "rgb(204, 24, 57)"
    const dangerous = "rgb(122, 10, 227)"
    if(index === 1) {
         textDefra.textContent = `Качество воздуха:`
    if(defraIndex === 1) {
        quality.textContent = "Отлично"
        quality.style.color = excellent
    }
    if(defraIndex === 2) {
        quality.textContent = "Хорошо"
        quality.style.color = good
    }
    if(defraIndex === 3) {
        quality.textContent = "Умеренно"
        quality.style.color = moderate
    }
    if(defraIndex === 4) {
        quality.textContent = "Вредно"
        quality.style.color = bad
    }
    if(defraIndex === 5) {
        quality.textContent = "Опасно"
        quality.style.color = dangerous
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
        color = excellent
        
    }
    else if(aqi > standart[0] && aqi <= standart[1]) {
        color = good
    }
    else if(aqi > standart[1]  && aqi > standart[2] || aqi <= standart[2]) {
        color = bad
    }

    ctx.lineWidth = 15
    ctx.strokeStyle = foneColor
const chart = new Chart(ctx, {  // Создание экземпляра круговой диаграммы (doughnut)
    type: 'doughnut',  // Тип диаграммы - "пончик" (кольцевая)
    data: {  // Данные для отображения
        datasets: [{  // Массив наборов данных (здесь один набор)
            data: [procent, 100 - procent],  // Данные: [текущее значение, оставшаяся часть]
            backgroundColor: [color, foneColor],  // Цвета сегментов: [активный, фоновый]
            borderWidth: 0  // Отключаем обводку сегментов
        }]
    },
    options: {  // Настройки отображения
        circumference: 260,  // Угол охвата (в градусах) - делает диаграмму частичной (не полный круг)
        rotation: -130,  // Поворот диаграммы (начало отсчета) - чтобы "старт" был слева
        cutout: '80%',  // Внутренний вырез (толщина кольца) - 80% от радиуса
        aspectRatio: 1.9,  // Соотношение сторон (для правильного отображения полукруга)
        plugins: {  // Плагины и их настройки
            legend: { display: false },  // Скрыть легенду
            tooltip: { enabled: false }  // Отключить всплывающие подсказки
        },
        animation: { animateScale: true }  // Анимация при загрузке (масштабирование)
    }
});
})
 }
 function buildChart(theme, temp) {
    let canvas = document.getElementById("canvasChart")
    const ctx = canvas.getContext("2d")   
 fetchWeatherTemp().then(data => {
    let chartH1 = document.querySelector(".chart-h1")
    chartH1.textContent = "График температуры"
    let temperature = ""
    let arrTemp = []
    let arrTempSort = []
    let height =  0

 let color = ""
 let colorGrid
 if(temp === "C") {
    temperature = "temp_c"
 }
 if(temp === "F") {
    temperature = "temp_f"
 }
 if(theme === "dark") {
    color = "azure"
    colorGrid = 'rgba(180, 169, 169, 0.46)'
    chartH1.style.color = color
 }
 if(theme === "light") {
    color = "black"
    chartH1.style.color = ""
 }
 for (let i = 0; i < 24; i++) {
    if(temperature === "temp_c") {
        arrTemp.push(Math.round(data.hourly.temperature_2m[i]))
    }
    if(temperature === "temp_f") {
        arrTemp.push(Math.round(data.hourly.temperature_2m[i] * 1.8) + 32)
    }
}       
const temperatureData = {  // Объект с данными для графика
  labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00',
    '09:00','10:00','11:00','12:00','13:00','14:00','15:00',
    '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'], // Подписи оси X (часы суток)
  datasets: [{  // Массив наборов данных (здесь один набор)
    data: arrTemp,  // Массив значений температуры
    pointRadius: 6,  // Размер точек на графике
    borderColor: 'rgb(255, 218, 11)',  // Цвет линии графика
    tension: 0.4  // Уровень сглаживания кривой
  }]
};
const temperatureChart = new Chart(ctx, {  // Создание экземпляра графика
  type: 'line',  // Тип графика - линейный
  data: temperatureData,  // Передаем данные
  options: {  // Настройки отображения
    scales: {  // Настройки осей
      x: {  // Ось X
        grid: {  // Сетка
          color: colorGrid  // Цвет линий сетки
        },
        ticks: {  // Подписи
          color: color,  // Цвет текста
          font: {  // Шрифт
            size: 14,  // Размер шрифта
            family: 'Arial',  // Название шрифта
            weight: 'bold'  // Жирность
          }
        }
      },
      y: {  // Ось Y
        grid: {  // Сетка
          color: colorGrid  // Цвет линий сетки
        },
        ticks: {  // Подписи
          color: color,  // Цвет текста
          callback: function(value) {  // Форматирование значений
            if(temperature === "temp_c") return value + ' °C';  // Добавляем °C для Цельсия
            if(temperature === "temp_f") return value + ' °F';  // Добавляем °F для Фаренгейта
          },
          font: {  // Шрифт
            size: 14,  // Размер шрифта
            family: 'Arial',  // Название шрифта
            weight: 'bold'  // Жирность
          }
        }
      }
    },
plugins: {  // Плагины
      tooltip: {  // Всплывающие подсказки
        bodyFont: { size: 20 },  // Размер основного текста
        titleFont: { size: 16 },  // Размер заголовка
        displayColors: false  // Скрыть цветные индикаторы
      },
      legend: { display: false },  // Скрыть легенду
      title: { display: true }  // Показать заголовок (без текста)
    }
  }
});    
  })
  }
addTheme()
addAllInf()
const ctx = document.getElementById('airQualityChart').getContext('2d');

// Данные для графика (пример)


// Создаем график

}
