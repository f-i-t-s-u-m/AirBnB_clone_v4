$(document).ready(function() {
    checkBox();
    places_search();
});

function checkBox() {
    let myDict = {};
    $('.amenities input').change(
	function() {
	    if (this.checked) {
		myDict[($(this).attr('data-id'))] = ($(this).attr('data-name'))
	    } else {
		delete myDict[$(this).attr('data-id')];
	    }
	    let myString = Object.values(myDict)
	    let stringAmenities = myString.join(', ');
	    $('.amenities h4').text(stringAmenities);
	})
};

$.getJSON('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data['status']) {
	$('#api_status').addClass('available');
    } else {
	$('#api_status').removeClass('available');
    }
});

function places_search() {
    $.ajax({
	url: 'http://0.0.0.0:5001/api/v1/places_search/',
	type: 'POST',
	contentType: 'application/json',
	data: '{}',
	success: function(data) {
	    $(data).each( function() {
		$('.places').append(
		    $('<article>').append(
			$('<div class="price_by_night">').text('$' + $(this).attr('price_by_night')),
			$('<h2></h2>').text($(this).attr('name')),
			$('<div class="informations"></div>').append(
			    $('<div class="max_guest"></div>').text($(this).attr('max_guest') + ' Guests'),
			    $('<div class="number_rooms"></div>').text($(this).attr('number_rooms') + ' Rooms'),
			    $('<div class="number_bathrooms">').text($(this).attr('number_bathrooms') + ' Bathrooms'),
			    $('<div class="description"></div>').text($(this).attr('description')))
		    ))
	    })}
    })
}
