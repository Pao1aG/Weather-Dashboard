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
var requestUrl = ""

function getApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}