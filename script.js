navigator.geolocation.getCurrentPosition(function(position) {
  	var lat = position.coords.latitude;
 	var lon = position.coords.longitude;
 	
	var variables = getCoordsWeatherTemp(lat, lon);
});


function getCoordsWeatherTemp(lat, lon){
	var googleAPIKey = 'AIzaSyB4JK1II4Zq1Md7qIH5rqqhKFEVCK9DcEs';
	var openWeatherAPIKey = '&APPID=07ab61e88f748fc59dabbaa7647ec489'
	var request = new XMLHttpRequest();
	request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+openWeatherAPIKey);
	request.send();
	request.onreadystatechange = function() {
	  	if (request.readyState == 4 && request.status == 200) {
	    	var data = JSON.parse(request.responseText);
	    	var variables = {
	    						weather: data["weather"][0]["main"], 
	    						tempC: Math.floor(data["main"]["temp"]-273.15)
	    					};
	    	var requestG = new XMLHttpRequest();
	    	requestG.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key='+googleAPIKey);
	    	requestG.send();
	    	requestG.onreadystatechange = function() {
	    		if (requestG.readyState == 4 && requestG.status == 200) {
	    			var dataG = JSON.parse(requestG.responseText);
	    			variables.town = dataG["results"][0]["address_components"][2]["long_name"];
	    			variables.country = dataG["results"][0]["address_components"][5]["long_name"];
	    			var locationDiv = document.getElementById('location'),
	    				tempDiv = document.getElementById('temp'),
	    				weatherDiv = document.getElementById('weather');
	    			locationDiv.innerHTML = '<p>' + variables.town + ', ' + variables.country + '</p>';
	    			tempDiv.innerHTML = '<p>' + variables.tempC + '&#8451</p>'
	    			weatherDiv.innerHTML = '<p>' + variables.weather + '</p>';
	    		};
	    	};
	   	};
	};
};









