'use strict';

//What is the phase of the moon tonight?
/* 

function moonPhase() {
	$.ajax({
		url: "http://api.wunderground.com/api/51f3c6006c94948b/astronomy/q/37087.json",
		dataType: "jsonp",
		success: function(data) {
			console.log(data);
			console.log(data.moon_phase.phaseofMoon);
		}
	});
}
moonPhase();


//In what year was the record low temperature for today's date?  use almanac
function recordLow() {
	$.ajax({
		url: "http://api.wunderground.com/api/51f3c6006c94948b/almanac/q/37087.json",
		dataType: "jsonp",
		success: function(data) {
			console.log(data);
			console.log("Record low temp = " + data.almanac.temp_low.record.F);
		}
	});
}
recordLow();

*/

/* DEMONSTRATES A SYNCHRONOUS REQUEST; DO NOT USE -- DEPRECATED
	function getIpAddress() {
		
		var xmlHttp = new XMLHttpRequest();
		
		// GET data, from URL, false = synchronous request
	    xmlHttp.open( "GET", "http://ip4.telize.com", false );
	    xmlHttp.send(); // send the request

	    // ip address is returned as text
	    return xmlHttp.responseText; 
	}
*/

/* DEMONSTRATES A SYNCHRONOUS REQUEST; DO NOT USE -- DEPRECATED
	function getZipfromIP(ipAddress) {
		var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", "https://freegeoip.net/json/" + ipAddress, false );
	    xmlHttp.send();
	    // response is a JSON string which must be converted to an object
	    return (($.parseJSON(xmlHttp.responseText)).zip_code);
	}
*/

//ASSIGNMENT:  	write a function that pulls out the current temp after you add a zipcode to a form and hit submit.  
// 				It should then display the results in the html body. Apply some nice CSS.

// next line is shorthand for $(document).ready()
$(function () {

	// must declare these variables before calling getIpAndZip();
	var defaultZip;
	var $inputText = $('#zip-code');

	// variable needed in getCurrentTemp();
	var $dateTime = $('#date-time');
	var $location = $('#location');
	var $temperatureString = $('#temperature-string');
	var $temperatureIcon = $('#temperature-icon');
	var $button = $('button');

	function getCurrentTemp(zip) {
		$.get("http://api.wunderground.com/api/51f3c6006c94948b/conditions/q/" + zip + ".json",
			function(data) {
				var jsonObj = data.current_observation;
				var time = jsonObj.local_time_rfc822;
				var offset = jsonObj.local_tz_offset.length;

				// set the text with the appropriate data
				$dateTime.text(time.slice(0, offset * (-1)));
				$location.text(jsonObj.display_location.full + "  " + zip);
				$temperatureString.text(jsonObj.temp_f + " degrees F");
				$temperatureIcon.attr('src', jsonObj.icon_url);
			});
	}

	//get ip address asynchronously
	function getIpAndZip() {
		// shortcut for performing an HTTP GET request
		$.get("http://ip4.telize.com", function(data) {
			getZipfromIP(data);
		});
	}

	// get local zip code from machine ip address asynchronously
	function getZipfromIP(ipAddress) {
		// perform an HTTP GET request
		$.get("https://freegeoip.net/json/" + ipAddress, function(data) {
			defaultZip = data.zip_code;
			$inputText = $('#zip-code').val(defaultZip);
			$inputText.focus();
		});
	}

	function processForm() {
		var zip = $inputText.val();
		getCurrentTemp(zip);
		$inputText.val('');
		$inputText.focus();
	}

	getIpAndZip();

	// EVENT LISTENERS for $button and 'return' key

	$button.on('click', function() {
		processForm();
	});

	$inputText.on('keypress', function(e) {
		if (e.keyCode === 13) { // ASCII CODE 13 = 'RETURN'
			processForm();
		}
	});
});