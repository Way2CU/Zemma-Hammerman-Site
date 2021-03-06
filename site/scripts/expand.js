/**
 * Expand JavaScript
 * Zemah Hamerman Site
 *
 * Copyright (c) 2016. by Way2CU, http://way2cu.com
 * Authors: Tal Reznic
 */

// create or use existing site scope
var Site = Site || {};

Site.ExpandContent = function(article, button, hidden_elements) {
	var self = this;

	self.article = document.querySelector(article);
	self.elements = self.article.children;
	self.button = document.querySelector(button);
	self.hidden_elements = hidden_elements;
	self.hidden = true;

	// initialize function
	self._init = function() {
		// condition to display read more button
		if(self.elements.length > self.hidden_elements) {
			self.button.style.visibility = "visible";
			self.button.style.opacity = 1;
			self.handle_click();
		}

		self.button.addEventListener('click', self.handle_click);
	}

	self.handle_click = function() {
		if(self.hidden) {
			for(var i = self.hidden_elements; i < self.elements.length; i++) {
				self.elements[i].style.display = "none";
			}
			self.hidden = false;
			language_handler.getTextArrayAsync(null, ['button_show_more', 'button_close'], function(data) {
				self.button.innerText = data.button_show_more;
			});
		} else {
			for(var i = self.hidden_elements; i < self.elements.length; i++) {
				self.elements[i].style.display = "block";
			}
			self.hidden = true;
			language_handler.getTextArrayAsync(null, ['button_show_more', 'button_close'], function(data) {
				self.button.innerText = data.button_close;
			});
		}
	}

	// object finalize
	self._init();
}

$(function() {
	Site.show_more = new Site.ExpandContent('article', 'a.show_more', 2);
})