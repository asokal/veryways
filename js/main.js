"use strict"

/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	o2.init();
});

/**
 * основной объект
 * @type {object}
 */
var o2 =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init()
	{
		this.priorityNav('._footerNav', '._footerNavItem', '._footerNavTrigger');
		$(window).resize(function()
		{
			o2.priorityNav('._footerNav', '._footerNavItem', '._footerNavTrigger');
		});
		this.sliders.init();
	},

	toggleNav: function(instance, toggleElem, modifier)
	{
		$(instance).toggleClass('active');
		$(toggleElem).toggleClass(modifier);
	},

	priorityNav: function(navElem, navItemElem, triggerElem)
	{
		var navWidth = $(navElem).width(),
			elemSumWidth = 0;

		$(navItemElem).each(function()
		{
			elemSumWidth = elemSumWidth + $(this).outerWidth(true);

			if(elemSumWidth > navWidth)
				$(this).hide();
			else
				$(this).show();
		});

		if(elemSumWidth > navWidth)
			$(triggerElem).show();
		else
			$(triggerElem).hide();
	},

	sliders:
	{
		init: function()
		{
			this.companySliders();
		},

		companySliders: function()
		{
			var companySlider = $('._companySlider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				rows: 0
			});

			var companyThumbSlider = $('._companyThumbSlider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				initialSlide: 1,
				fade: true,
				rows: 0
			});

			companyThumbSlider.click(function() {
				companySlider.slick('slickNext');
				companyThumbSlider.slick('slickNext');
			});
		}
	}
}