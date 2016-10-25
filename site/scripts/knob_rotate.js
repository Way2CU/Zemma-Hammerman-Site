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
	self.radius_x = self.container.clientWidth / 2;
	self.radius_y = self.container.clientHeight / 2;
	self.container_center = {x: self.radius_x, y: self.radius_y};
	self.rect = self.container.getBoundingClientRect();
	self.center = {
		x: self.rect.left + (self.rect.width / 2),
		y: self.rect.top + (self.rect.height / 2)
	};
	self.starting_angle = null;
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
			menu_item.style.left = self.container_center.x + self.radius_x * Math.cos(2 * Math.PI * i / self.elements.length) + "px";
			menu_item.style.top = self.container_center.y + self.radius_y * Math.sin(2 * Math.PI * i / self.elements.length) + "px";
			menu_item.style.transform = "translate(-50%, -50%)";

			// set text of labels
			menu_item.innerText = self.elements[i].getAttribute('alt');
			self.container.appendChild(menu_item);
		}
		// assign touch events to knob element
		// self.knob.addEventListener('touchstart', self.handle_touchstart);

		// assign move event to knob container element
		self.knob.addEventListener('touchstart', self.handle_touchstart);
		self.knob.addEventListener('touchmove', self.handle_touchmove);
	}

	/*
	 * Handle initial event when user touches knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchstart = function(event) {
		var touch = event.touches[0];
		var pos_x = touch.pageX - self.center.x;
		var pos_y = touch.pageY - self.center.y;

		self.starting_angle = Math.atan2(pos_y, pos_x) + (Math.PI / 2);
		self.knob.style.transform = 'translate(-50%, -50%) rotate('+self.starting_angle+'rad)';
	}

	/*
	 * Handle event when user rotates knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchmove = function(event) {
		var touch = event.touches[0];
		var pos_x = touch.pageX - self.center.x;
		var pos_y = touch.pageY - self.center.y;

		var radian = Math.atan2(pos_y, pos_x) + (Math.PI / 2) - self.starting_angle;
		self.knob.style.transform = 'translate(-50%, -50%) rotate('+radian+'rad)';
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