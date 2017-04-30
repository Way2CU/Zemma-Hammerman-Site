// create or use existing site scope
var Site = Site || new Object();

Site.Map = function(is_draggable, is_scroll) {
	var self = this;

	self.maps = null;
	self.geocoder = null;

	self._init = function() {
		self.maps = new google.maps.Map(document.getElementById('map'),
			{zoom: 18, mapTypeControl: false, draggable: is_draggable, scrollwheel: is_scroll});
		self.geocoder = new google.maps.Geocoder();

		var address = document.querySelector('input[type="hidden"]').value;
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
	if (Site.is_mobile()) {
		Site.map = new Site.Map(false, false);
	} else {
		Site.map_desktop = new Site.Map(true, true);
	}
});