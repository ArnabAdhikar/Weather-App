const apikey = "cb3f147cc45fee38a5e3cee029566180"
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchbox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const weathericon = document.querySelector(".weather-icon")

async function checkweather(city){
	const response = await fetch(apiurl + city + `&appid=${apikey}`)
	
	// check the response code
	if (response.status === 404){
		document.querySelector(".error").style.display = "block"
		document.querySelector(".weather").style.display = "none"
	}
	else{
		// all the data in JSON format for a city
		var data = await response.json()

		// display--> console
		console.log(data)

		// display--> frontend
		/*
			code is running in a Node.js environment, where document is not defined. 
			Document is part of the DOM (Document Object Model), which exists in browsers, not in Node.js.
		*/
		document.querySelector(".city").innerHTML = data.name
		document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
		document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
		document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr"

		// update the image
		if (data.weather[0].main === "Cloud"){
			weathericon.src = "images/clouds.png";
		}
		else if (data.weather[0].main === "Clear"){
			weathericon.src = "images/clear.png";
		}
		else if (data.weather[0].main === "Rain"){
			weathericon.src = "images/rain.png";
		}
		else if (data.weather[0].main === "Drizzle"){
			weathericon.src = "images/drizzle.png";
		}
		else if (data.weather[0].main === "Mist"){
			weathericon.src = "images/mist.png";
		}

		// show the details when search button is clicked
		document.querySelector(".weather").style.display = "block"
		document.querySelector(".error").style.display = "none"
	}
}

// event listener
searchbtn.addEventListener("click", ()=>{
	checkweather(searchbox.value)
})
