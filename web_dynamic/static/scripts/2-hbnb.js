$(document).ready(function() {
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
});

$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    console.log(data['status']);
    if (data['status'] === 'OK') {
	$('#api_status').addClass('available');
    } else {
	$('#api_status').removeClass('available');
    }
});
