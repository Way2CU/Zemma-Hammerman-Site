// create or use existing site scope
var Site = Site || new Object();

Site.Map = function() {
	var self = this;

	self.maps = null;
	self.geocoder = null;

	self._init = function() {
		self.maps = new google.maps.Map(document.getElementById('map'),
			{zoom: 17, mapTypeControl: false, draggable: false, scrollwheel: false});
		self.geocoder = new google.maps.Geocoder();

		var address = document.querySelector('h1').innerHTML;
		self._find_coordinates(address);
	};

	self._find_coordinates = function(address) {
		var data = {
				address: address
			};

		self.geocoder.geocode(data, self._handle_geocode);
	}

	self._handle_geocode = function(results, status) {
		if (status !== google.maps.GeocoderStatus.OK)
			return;

		self.maps.setCenter(results[0].geometry.location);
		var data = {
				map: self.maps,
				position: results[0].geometry.location
			};
		var marker = new google.maps.Marker(data);
	};

	// finalize object
	self._init();
}

$(function() {
		Site.map = new Site.Map();
});