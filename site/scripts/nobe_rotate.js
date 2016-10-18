/**
 * Nobe rotate JavaScript
 * Zemah hamerman site
 *
 * Copyright (c) 2016. by Way2CU, http://way2cu.com
 * Authors: Tal Reznic
 */

// create or use existing site scope
var Site = Site || {};

Site.Nobe_rotation = function(container, knob, elements ) {
	var self = this;

	self.container = document.querySelector(container);
	self.knob = document.querySelector(knob);
	self.elements = document.querySelectorAll(elements);
	self.handle = false;

	/*
	 * object initialization
	 */
	self._init = function() {
		self.radius = self.container.clientHeight / 2;
		self.container_center = {x: self.radius, y: self.radius};

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
	}

	// handle touchstart
	self.handle_touchstart = function() {

	}

	// handle touchmove
	self.handle_touchmove = function() {

	}

	// handle touchend
	self.handle_touchend = function() {

	}

	// finish object initialization
	self._init();
}

$(function() {
	Site.rotate = new Site.Nobe_rotation('div#controls', 'div.knob', 'div.slider img');
})