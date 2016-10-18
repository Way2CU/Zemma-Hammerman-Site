/**
 * Knob JavaScript
 * Zemah hamerman site
 *
 * Copyright (c) 2016. by Way2CU, http://way2cu.com
 * Authors: Tal Reznic
 */

// create or use existing site scope
var Site = Site || {};

Site.Knob = function(container, knob, elements) {
	var self = this;

	self.container = document.querySelector(container);
	self.knob = self.container.querySelector(knob);
	self.elements = document.querySelectorAll(elements);
	self.radius = self.container.clientHeight / 2;
	self.knob_radius = self.knob.clientHeight / 2;
	self.knob_center = {x: self.knob_radius, y: self.knob_radius};
	self.container_center = {x: self.radius, y: self.radius};
	self.handle = false;

	/*
	 * object initialization
	 */
	self._init = function() {
		// create labels around knob
		for(var i = 0; i < self.elements.length; i++) {
			var menu_item = document.createElement('span');
			menu_item.classList.add('control');

			menu_item.style.position = 'absolute';
			menu_item.style.left = self.container_center.x + self.radius * Math.cos(2 * Math.PI * i / self.elements.length) + "px";
			menu_item.style.top = self.container_center.y + self.radius * Math.sin(2 * Math.PI * i / self.elements.length) + "px";
			menu_item.style.transform = "translate(-50%, -50%)";

			// set text of labels
			menu_item.innerText = self.elements[i].getAttribute('alt');
			self.container.appendChild(menu_item);
		}
		// assign touch events to knob element
		self.knob.addEventListener('touchstart', self.handle_touchstart);
	}

	/*
	 * Handle initial event when user touches knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchstart = function(event) {
		if(!Site.handle) {
			var touch = event.touches[0];
			var pos_x = touch.clientX;
			var pos_y = touch.clientY;
			var radian = Math.atan(pos_y - self.knob_center.y / pos_x - self.knob_center.x);
			radian += 'rad';
			self.knob.style.transform = 'rotate('+radian+')';
		}
	}

	/*
	 * Handle event when user rotates knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchmove = function(event) {

	}

	/*
	 * Handle event when user stops touching knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchend = function(event) {

	}

	// finish object initialization
	self._init();
}

$(function() {
	Site.rotate = new Site.Knob('div#controls', 'div.knob', 'div.slider img');
})