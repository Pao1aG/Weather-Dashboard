//Variables------------------------------
var selectedCity = document.querySelector("#selectedCity");
var date1 = document.querySelector("#date-1");
var date2 = document.querySelector("#date-2");
var date3 = document.querySelector("#date-3");
var date4 = document.querySelector("#date-4");
var date5 = document.querySelector("#date-5");

var displayCity = document.querySelector(".city-weather");

//Moment.js for Dates----------------------------------
var today = moment().format("MM/DD/YYYY");
selectedCity.innerHTML = "City " + "(" + today + ")";

var tomorrow = moment().add(1,"days").format("MM/DD/YYYY")
date1.innerHTML= tomorrow;

var dayAfter = moment().add(2,"days").format("MM/DD/YYYY");
date2.innerHTML = dayAfter;

var dayAfter1 = moment().add(3,"days").format("MM/DD/YYYY");
date3.innerHTML = dayAfter1;

var dayAfter2 = moment().add(4,"days").format("MM/DD/YYYY");
date4.innerHTML = dayAfter2;

var dayAfter3 = moment().add(5,"days").format("MM/DD/YYYY");
date5.innerHTML = dayAfter3;


//Function for getting weather data from API------------------------------------
function getWeatherData (cityName) {
    var localArray = JSON.parse(localStorage.getItem("citiesArray"));

    //This is for the first city submit
   if (localArray.length >= 1) {
       //get city name-----------------
       var storedCity = JSON.parse(localStorage.getItem("citiesArray"));
       var city = storedCity[0];

       //create city button
       var buttonsDiv = document.querySelector(".city-btns");
       var cityBtn = document.createElement("button");
       cityBtn.innerHTML = `${city}`;
       cityBtn.setAttribute("id", `"${city}"`);
       console.log(cityBtn.getAttribute("id"));
       buttonsDiv.append(cityBtn); 
       identifyButton(cityBtn);
       
       //get its lat and lan--------------------------
        var apiKey = "72a52a72e7a14c1a47a69d46ea5e7322" //this is from my account with OpenWeather

        var locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

        fetch (locationUrl)
            .then(function (response) {
                console.log(response);
                if(response.status == 404) {
                    window.alert("Please enter a valid city");

                    var appendedBtn = document.getElementById(`"${city}"`);
                    appendedBtn.remove();//removes recent button

                    storedCity.shift();
                    localStorage.setItem("citiesArray", JSON.stringify(storedCity)); //deletes new 'city' from local storage

                    location.reload();
    
                } else {
                    return response.json();
                }
               
            })
            .then(function (data) {
            console.log(data);
            var lat = data.coord.lat; 
            var lon = data.coord.lon; 
            console.log(lat,lon); //success
        
            //send second request to retrieve weather data--------------------------
    
            var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    
            fetch(weatherUrl)
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                appendWeather(city, data);
            })
           
            });
   } else {
       return;
   };
};

function appendWeather (c, d) {
    //APPEND WEATHER FOR CITY-DETAILS
    var selectedCity = document.querySelector("#selectedCity");
    selectedCity.textContent =  c + " -- " + today;

    var mainIcon = document.querySelector("#mainIcon");
    icon1 = d.current.weather[0].icon
    mainIcon.setAttribute("src", `http://openweathermap.org/img/wn/${icon1}@2x.png`); 

    var currentTemp = document.querySelector(".temp");
    currentTemp.textContent = "Temp: " + d.current.temp + " F";

    var currentWind = document.querySelector(".wind");
    currentWind.textContent = "Wind: " + d.current.wind_speed + " mph"; 

    var humidity = document.querySelector(".hum");
    humidity.textContent = "Humidity: " + d.current.humidity + " %";

    var uvIndex = document.querySelector(".uv"); 
    uvIndex.textContent= "UV Index: " + d.current.uvi;

    //APPEND WEATHER FOR FIVE-DAY

    //ICON
    for (let index = 0; index < 5; index++) {
        var day = "#day" + [index]; 
        var fiveDay = document.querySelector(day);

        var tempImg = document.createElement("img"); //create 1 img element
        icon2 = d.daily[index].weather[0].icon;
        tempImg.setAttribute("src", `http://openweathermap.org/img/wn/${icon2}@2x.png`);
        tempImg.setAttribute("style", "height:42px")

        fiveDay.innerHTML= "";

        fiveDay.append(tempImg);
    };

    //TEMP
    for (let index = 0; index < 5; index++) {
        var day = "#day" + [index]; 
        var fiveDay = document.querySelector(day);
        
        var tempLi = document.createElement("li"); //create 1 li element
        tempLi.textContent= "Temp: " + d.daily[index].temp.max + " F"; //paste temp at d index

        fiveDay.append(tempLi);
    };

    //WIND
    for (let index = 0; index < 5; index++) {
        var day = "#day" + [index]; 
        var fiveDay = document.querySelector(day);
        
        var tempLi = document.createElement("li"); //create 1 li element
        tempLi.textContent= "Wind: " + d.daily[index].wind_speed + " MPH"; //paste wind at d index

        fiveDay.append(tempLi);
    };

    //HUMIDITY
    for (let index = 0; index < 5; index++) {
        var day = "#day" + [index]; 
        var fiveDay = document.querySelector(day);
        
        var tempLi = document.createElement("li"); //create 1 li element
        tempLi.textContent= "Humidity: " + d.daily[index].humidity + " %"; //paste wind at d index

        fiveDay.append(tempLi);
    };
};


//Event delegation---------------------------

function identifyButton (cityBtn) {
    cityBtn.addEventListener("click", function (e) {
        //Make sure that it is a button that was clicked
        console.log(this.getAttribute("id"));

        //Get city name from button element
        var cityId = this.getAttribute("id");
        capitalizeCity = cityId.charAt(0).toUpperCase() + cityId.slice(1); 
        var cityName = capitalizeCity.replace(/"/g,""); //syntax found on t.ly/40Q6
        console.log(cityName);

        //Get weather data
        var apiKey = "72a52a72e7a14c1a47a69d46ea5e7322" //this is from my account with OpenWeather

        var locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
        console.log(locationUrl);

        fetch (locationUrl)
        .then(function (response) {
        return response.json();
        })

        .then(function (data) {
            console.log(data);
            var lat = data.coord.lat; 
            var lon = data.coord.lon; 
            console.log(lat,lon); //success
                
        //send second request to retrieve weather data--------------------------
            
        var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            
        fetch(weatherUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            appendWeather(cityName, data);
        })
        });
    });
};


//Listen for submit event on form 
var searchForm = document.querySelector(".search");

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    //Clear text from input
    var inputText = document.querySelector("input[type=text]").value;
    console.log(inputText);
    inputText.innerHTML= "";
    //Reveal divs
    mode = "reveal"
    displayCity.setAttribute("class", mode);

    //get the city from input
    inputValue = document.querySelector("input").value.trim();
    //Upper case first letter, syntax found on t.ly/Ld2x
    cityName = inputValue.charAt(0).toUpperCase() + inputValue.slice(1); 
    console.log(cityName);//success

   
    //store the city in our search history
    if (cityName.length < 1) {
        window.alert("Please enter a city name");
    } else {
        
        var citiesArray = [];
        
        citiesArray.push(cityName);
       
         
        if (localStorage.citiesArray != null) {
            var localArray = JSON.parse(localStorage.getItem("citiesArray"));//get what is already in local
            console.log(localArray.length);
            console.log(localArray);
            
            for (let index = 0; index < localArray.length; index++) {
                citiesArray.push(localArray[index]); //push each individual name into the array
            }
            
            console.log(citiesArray);
            localStorage.setItem("citiesArray", JSON.stringify(citiesArray)); //save all names in local storage
        
        } else {
            localStorage.setItem("citiesArray", JSON.stringify(citiesArray));
        }
    };
    //get weather data
    getWeatherData(cityName);
}); 