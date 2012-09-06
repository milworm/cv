$(function() {
	/**
	 * @author Ruslan Prytula
	 * @class FloatableMenu
	 */

	/**
	 * @constructor
	 */
	function FloatableMenu() {
		this.init();
	}

	FloatableMenu.prototype = {
		/**
		 * @var {Number} MENU_OFFSET Top offset for menu
		 * @constant
		 */
		MENU_OFFSET: 150,

		/**
		 * @var {Number} NAVIGATION_SCROLL_DELAY Delay that we should wait
		 *				 before start animation-scrolling
		 * @constant
		 */
		NAVIGATION_SCROLL_DELAY: 200,

		/**
		 * @var {Number} WND_SCROLL_DELAY Delay that we should wait
		 *				 to start moving the menu
		 * @constant
		 */
		WND_SCROLL_DELAY: 100,

		/**
		 * simple initialization
		 * @returns {undefined}
		 */
		init: function() {
			this.initItems();
			this.initEl();
			this.initListeners();
		},

		/**
		 * adds required listeners
		 * @returns {undefined}
		 */
		initListeners: function() {
			$(window).scroll($.proxy(this.onWindowScroll, this));
		},

		/**
		 * function will be called when user scrolls the page
		 * @param {Event} e
		 * @returns {undefined}
		 */
		onWindowScroll: function(e) {
			var me = this;
			me.wndScrollTimeout && clearTimeout(this.wndScrollTimeout);
			me.wndScrollTimeout = setTimeout($.proxy(this.updateMenuPosition, this), me.WND_SCROLL_DELAY);
		},	

		/**
		 * function will update the menu position using window's 
		 * current scroll state 
		 * @returns {undefined}
		 */
		updateMenuPosition: function() {
			var st = $(window).scrollTop(),
				me = this,
				minTop = $(".header").height();

			if(st < minTop) {
				st = minTop;
			}

			st += me.MENU_OFFSET;
			me.el.animate({ top: st });
		},

		/**
		 * @returns {undefined}
		 */
		initItems: function() {
			this.pageItems = $(".item-title");
		},

		/**
		 * and creates the full HTML to show the menu
		 * @returns {undefined}
		 */
		initEl: function() {
			this.el = $('<div class="menu">');
			var list = $("<ul>");
			list.click($.proxy(this.onNavigationClick, this));

			this.pageItems.each(function(index, item) {
				list.append("<li>" + $(item).html() + "</li>")
			});
			this.el.append(list);
			this.listItems = $("li", list);

		},

		/**
		 * function fires after user will click on the ul-list in menu
		 * @param {Event} e
		 * @returns {undefined}
		 */
		onNavigationClick: function(e) {
			var target = $(e.target),
				index = this.listItems.index(target);

			this.scrollTo(this.pageItems.get(index), target);
		},

		/**
		 * @param {HTMLElement} el 
		 * @param {HTMLElement} menuItemEl
		 * @returns {undefined}
		 */
		scrollTo: function(el, menuItemEl) {
			var me = this;

			me.timeout && clearTimeout(me.timeout);
			me.timeout = setTimeout(function() { 
				$("body").animate({
					scrollTop: $(el).position().top
				}, 600);
			}, me.NAVIGATION_SCROLL_DELAY);
		},


		/**
		 * renders menu
		 * @returns {undefined}
		 */
		render: function() {
			this.el.appendTo("body");
		}

	};

	(new FloatableMenu()).render();
});