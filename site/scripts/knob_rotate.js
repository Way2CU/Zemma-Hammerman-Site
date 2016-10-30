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
	self.start_angle = 0;
	self.end_angle = 0;
	self.knob_angle = 0;

	/*
	 * object initialization
	 */
	self._init = function() {
		var angle = -Math.PI / 2;
		var angle_increment = (2 * Math.PI) / self.elements.length;

		// create labels around knob
		for(var i = 0; i < self.elements.length; i++) {
			var menu_item = document.createElement('span');
			menu_item.classList.add('control');
			menu_item.addEventListener('click', self.handle_label);

			var label_item = document.createElement('span');
			menu_item.appendChild(label_item);

			var x = Math.cos(angle);
			var y = Math.sin(angle);

			if(self.container_center.x < (self.container_center.x + self.radius_x * x)) {
				label_item.classList.add('left');
			} else if(self.container_center.x > (self.container_center.x + self.radius_x * x)) {
				label_item.classList.add('right');
			} else {
				label_item.classList.add('center');
			}

			menu_item.style.position = 'absolute';
			menu_item.style.left = self.container_center.x + (self.radius_x - 10) * x + 'px';
			menu_item.style.top = self.container_center.y + (self.radius_y - 10) * y + 'px';
			menu_item.style.transform = "translate(-50%, -50%)";

			angle += angle_increment;

			// set text of labels
			label_item.innerText = self.elements[i].getAttribute('alt');
			self.container.appendChild(menu_item);
		}

		// assign touch events to knob element
		self.knob.addEventListener('touchstart', self.handle_touchstart);
		self.knob.addEventListener('touchmove', self.handle_touchmove);
		self.knob.addEventListener('touchend', self.handle_touchend);
	}

	self.handle_label = function() {
		var item = this;
		var pos_x = parseInt(item.style.left);
		var pos_y = parseInt(item.style.top);

		self.current_angle = self.calculate_angle(pos_x, pos_y);
		var angle = self.knob_angle + (self.current_angle - self.start_angle);
		self.update_knob_rotation(angle);
	}

	self.calculate_angle = function(x, y) {
		var pos_x = x - self.center.x;
		var pos_y = y - self.center.y;
		return Math.atan2(pos_y, pos_x) + (Math.PI / 2);
	}

	self.update_knob_rotation = function(angle) {
		self.knob.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'rad)';
	}

	/*
	 * Handle initial event when user touches knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchstart = function(event) {
		// prevent page from scrolling
		event.preventDefault();

		var touch = event.touches[0];
		self.start_angle = self.calculate_angle(touch.pageX, touch.pageY);
	}

	/*
	 * Handle event when user rotates knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchmove = function(event) {
		var touch = event.touches[0];
		self.current_angle = self.calculate_angle(touch.pageX, touch.pageY);

		var angle = self.knob_angle + (self.current_angle - self.start_angle);
		self.update_knob_rotation(angle);

		return true;
	}

	/*
	 * Handle event when user stops touching knob element.
	 *
	 * @param object event.
	 */
	self.handle_touchend = function(event) {
		var angle_between_projects = (2 * Math.PI) / self.elements.length;
		var final_angle = self.knob_angle + (self.current_angle - self.start_angle);
		var project_index = Math.round(final_angle / angle_between_projects);

		if(project_index > self.elements.length) {
			project_index = 1;
		}

		Site.home_page_menu.showPage(project_index);
		self.knob_angle = project_index * angle_between_projects;
		self.update_knob_rotation(self.knob_angle);
	}

	// finish object initialization
	self._init();
}

$(function() {
	Site.rotate = new Site.Knob('div#controls', 'div.knob', 'div.slider img');
})