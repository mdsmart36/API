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

//ASSIGNMENT:  	write a function that pulls out the current temp after you add a zipcode to a form and hit submit.  
// 				It should then display the results in the html body. Apply some nice CSS.

// next line is shorthand for $(document).ready()
$(function () {

	// make the api call to Weather Underground
	function getCurrentTemp(zip) {
		$.ajax({
			url: "http://api.wunderground.com/api/51f3c6006c94948b/conditions/q/" + zip + ".json",
			dataType: "jsonp",
			success: function(data) {
				console.log(data);
				var jsonObj = data.current_observation;
				var time = jsonObj.local_time_rfc822;
				var offset = data.current_observation.local_tz_offset.length;

				// set the text with the appropriate data
				$('#date-time').text(time.slice(0, offset * (-1)));
				$('#location').text(jsonObj.display_location.full + "  " + zip);
				$('#temperature-string').text(jsonObj.temperature_string);
				$('#temperature-icon').attr('src', jsonObj.icon_url);
			}
		});
	}

	var button = $('button');
	var inputText = $('#zip-code');

	function processForm() {
		var zip = inputText.val();
		getCurrentTemp(zip);
		inputText.val('');
		inputText.focus();
	}

	// if user clicks submit button
	button.on('click', function() {
		processForm();
	});

	// if user presses 'return' or 'enter' while inside input text box
	inputText.on('keypress', function(e) {
		// when a keypress event occurs, check the keycode (ASCII?)
		if (e.keyCode === 13) { 
			processForm();
		}
	});
});