/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Mobile phone scroll emulation.
 *
 * @param string screen_selector
 * @param string content_selector
 */
Site.MobileScroll = function(screen_selector, content_selector) {
	var self = this;

	self.screen = null;
	self.content = null;
	self.drag_offset = 0;
	self.initial_position = 0;

	self.handler = new Object();

	/**
	 * Complete object initialization.
	 */
	self._init = function() {
		self.screen = document.querySelector(screen_selector);
		self.content = document.querySelector(content_selector);

		// attach event listeners
		self.screen.addEventListener('mousedown', self.handler.mouse_down);
		self.screen.addEventListener('wheel', self.handler.mouse_scroll);
	};

	/**
	 * Handle mouse press.
	 * @param object event
	 */
	self.handler.mouse_down = function(event) {
		self.drag_offset = event.clientY;
		self.screen.addEventListener('mouseup', self.handler.mouse_up);
		self.screen.addEventListener('mousemove', self.handler.mouse_move);
	};

	/**
	 * Handle mouse press.
	 * @param object event
	 */
	self.handler.mouse_move = function(event) {
		var offset = self.initial_position + (event.clientY - self.drag_offset);

		// don't allow scroll above top
		if (offset > 0)
			return;

		// don't allow scroll after page is completely visible
		if (offset < self.screen.offsetHeight - self.content.offsetHeight)
			return;

		self.content.style.top = offset + 'px';
	};

	/**
	 * Handle mouse scroll.
	 * @param object event
	 */
	self.handler.mouse_scroll = function(event) {
		var offset = self.initial_position - (event.deltaY * 10);

		// don't allow scroll above top
		if (offset > 0)
			return;

		// don't allow scroll after page is completely visible
		if (offset < self.screen.offsetHeight - self.content.offsetHeight)
			return;

		self.content.style.top = offset + 'px';
		self.initial_position = parseInt(self.content.style.top) || 0;
	};

	/**
	 * Handle mouse press.
	 * @param object event
	 */
	self.handler.mouse_up = function(event) {
		self.initial_position = parseInt(self.content.style.top) || 0;

		self.screen.removeEventListener('mouseup', self.handler.mouse_up);
		self.screen.removeEventListener('mousemove', self.handler.mouse_move);
	};

	// finalize object
	self._init();
}

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	// Events
	for (var i=0; i < Caracal.ContactForm.list.length; i++) {
			Caracal.ContactForm.list[i].events.connect('submit-success', function(event){
				fbq('track', 'Lead');
			});
		}


	// create mobile menu
	Site.mobile_menu = new Caracal.MobileMenu();

	// create slider
	Site.home_page_menu = new PageControl('div.slider', 'img.image');
	Site.home_page_menu
		.setWrapAround(true)
		.attachControls('div#controls span.control');

	// make our own scrollbar
	if (!Site.is_mobile())
		Site.scrollbar = new Site.MobileScroll('div#screen', 'div#content');

	//Lightbox
	Site.gallery = new LightBox('body.gallery section a', false, false, true);
};


// connect document `load` event with handler function
$(Site.on_load);
