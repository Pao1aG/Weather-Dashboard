//Variables------------------------------
var selectedCity = document.querySelector("#selectedCity");
var date1 = document.querySelector("#date-1");
var date2 = document.querySelector("#date-2");
var date3 = document.querySelector("#date-3");
var date4 = document.querySelector("#date-4");
var date5 = document.querySelector("#date-5");

//Moment.js for Dates----------------------------------
var today = moment().format("MM/DD/YYYY");
selectedCity.innerHTML = "City " + "(" + today + ")";
date1.innerHTML= today;

var tomorrow = moment().add(1,"days").format("MM/DD/YYYY");
date2.innerHTML = tomorrow;

var dayAfter = moment().add(2,"days").format("MM/DD/YYYY");
date3.innerHTML = dayAfter;

var dayAfter2 = moment().add(3,"days").format("MM/DD/YYYY");
date4.innerHTML = dayAfter2;

var dayAfter3 = moment().add(4,"days").format("MM/DD/YYYY");
date5.innerHTML = dayAfter3;

//API Fetch (look at activity 8)

//trial for phx az..ACTUALLY NEED TO PULL ONE CALL API

// fetch("https://api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=72a52a72e7a14c1a47a69d46ea5e7322")
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);

//         var currentTemp = document.querySelector(".temp");
//         currentTemp.textContent = "Temp: " + data.main.temp_max + " F"; //this is from the json list they have

//         var currentWind = document.querySelector(".wind");
//         currentWind.textContent = "Wind: " + data.wind.speed + " mph";

//         var humidity = document.querySelector(".hum");
//         humidity.textContent = "Humidity: " + data.main.humidity + " %";

//         // var uvIndex = document.querySelector(".uv"); //no uv index in this api
//         // uvIndex.textContent= "UV Index: " + data.
//     })

function getWeatherData (city) {

   if (localStorage.citiesArray.length > 0) {
       //get city name-----------------
       var storedCity = JSON.parse(localStorage.getItem("citiesArray"));
       city = storedCity[0]
       console.log(city);//success
       
       //get its lat and lan--------------------------
        var apiKey = "72a52a72e7a14c1a47a69d46ea5e7322" //this is from my account with OpenWeather

        var locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        console.log(locationUrl);

        fetch (locationUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
        console.log(data);
        var lat = data.coord.lat; 
        var lon = data.coord.lon; 
        console.log(lat,lon); //success
        
            //send second request to retrieve weather data--------------------------
    
            var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
            fetch(weatherUrl)
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
        })
   } else {
       console.log("I will need to make a function that selects the specific city name from the array")
       return
   };
   

    
};

//Event delegation !!!!!!!!!!!!!!!!!!!!!!!!!!!!

var buttonContainer = document.querySelector(".city-btns");

buttonContainer.addEventListener("click", function (e) {
    //Make sure that it is a button that was clicked


    //Get city name from button element


    //Get weather data
    getWeatherData(cityName);
})


//Listen for submit event on form 

var searchForm = document.querySelector(".search");

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();

    //get the city from input
    inputValue = document.querySelector("input").value.trim();
    //Upper case first letter, syntax found on t.ly/Ld2x
    cityName = inputValue.charAt(0).toUpperCase() + inputValue.slice(1); 
    console.log(cityName);//success
   
    //store the city in our search history
    if (cityName.length < 1) {
        window.alert("Please enter a city name");
    } else {
        //Saving city name to local storage 
        var citiesArray = [];
        citiesArray.push(cityName);
        localStorage.setItem("citiesArray", JSON.stringify(citiesArray)); //success
    }

    //get weather data
    getWeatherData(cityName);
    
}) 