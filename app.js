window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureSummary =  document.querySelector('.temperature-suggestion');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	let currentTime = document.querySelector('time-zone');

	const temperatureSpan = document.querySelector('.temperature span');
	let hint = ["Its alright today, check outside for more information", 
				"Hella hot today? maybe try not wearing too much", 
				"Its getting cold, some extra layers would be nice"
			   ];

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			//const api_t =`https://api.darksky.net/forecast/41622348b106c5fad46fc68868b6e23f/37.8267,-122.4233`;
			const api = `${proxy}https://api.darksky.net/forecast/41622348b106c5fad46fc68868b6e23f/${lat},${long}`;

			fetch(api)
				.then(responce => {
					return responce.json();
				})

				.then(data => {
					console.log(data);
					const { temperature, summary, icon, time, } = data.currently;
					//set DOm elements from the api
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = "Currently " + summary;
					locationTimezone.textContent = data.timezone;
					//set icon animation
					setIcons(icon, document.querySelector(".icon"));
					//timesects use stime() if values to be exact
					//may not work due to api not changing
					startTime(time);


					//Formula for celcius
					let celsius = (temperature - 32) * (5 / 9);
						if(celsius >= 25){
							temperatureSummary.textContent = hint[1];
						} else if(celsius <= 14){
							temperatureSummary.textContent = hint[2];
						} else {
							temperatureSummary.textContent = hint[0];
						}
						//if(celsius >= 19) {
							//temperatureSummary.textContent = hint[0];
						//}

					

					//set temp to celcious*/farenheight
					 temperatureSection.addEventListener('click', () => {
					 	if(temperatureSpan.textContent === "F"){
					 		temperatureSpan.textContent = "C";
					 		temperatureDegree.textContent = Math.floor(celsius);
					 	}else{
					 		temperatureSpan.textContent = "F";
					 		temperatureDegree.textContent = temperature;
					 	}

					 });
				})
		});
	}

	else{
		h1.textContent = "weather app gone fucky wucky"
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);

	}

	function startTime(stime) {
		  var today = new Date();
		  var h1 = 0;
		  var h = today.getHours();
		  var m = today.getMinutes();
		  var s = today.getSeconds();
		  m = checkTime(m);
		  s = checkTime(s);
		  document.getElementById('time-zone').innerHTML =
		  h + ":" + m + ":" + s;
		  var t = setTimeout(startTime, 500);

		  var h1 = 22; //testing phase

		  //replaces main background color depending on the day phase
		  if(h <= 8) {
		  	if(document.body) {
		  		document.body.style.background= "#80bfff";
		  	}
		  	
		  }

		  else if(h <= 14) {
		  	if(document.body) {
		  		document.body.style.background= "#4da9ff";
		  	}
		  	
		  }

		  else if(h <= 18) {
		  	if(document.body) {
		  		document.body.style.background= "#004f99";
		  	}
		  	
		  }

		   else if(h <= 23) {
		  	if(document.body) {
		  		document.body.style.background= "#000d1a";
		  	}
		  	
		  }
		  
		  document.body.style.backgroundImage= "url('icons/background.png')";


	}
	function checkTime(i) {
		if (i < 10) {i = "0" + i};  // adds zero s
		return i;
	}



});




















