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
		this.setViewHeight();
		this.priorityNav('._footerNav', '._footerNavItem', '._footerNavTrigger');
		$(window).resize(function() {
			o2.priorityNav('._footerNav', '._footerNavItem', '._footerNavTrigger');
		});
		this.sliders.init();

		$('body').addClass('ready');
	},

	setViewHeight: function()
	{
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		$( window ).resize(function() {
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
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
			this.servicesSlider();
			this.greetingsSlider();
		},

		greetingsSlider: function()
		{
			if($('._greetingsSlider')[0])
			{
				$('._greetingsSlider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true,
					arrows: false,
					rows: 0,
					autoplay: true,
					autoplaySpeed: 4000,
					pauseOnFocus: false,
					pauseOnHover: false,
					fade: true,
					speed: 0,
				});

				$('._greetingsSlider')[0].slick.cssTransitions = false;
			}
		},

		companySliders: function()
		{
			if($('._companySlider')[0])
			{
				var $companySlider = $('._companySlider'),
				$companyThumbSlider = $('._companyThumbSlider');

				$companySlider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					rows: 0,
					autoplay: true,
					autoplaySpeed: 5000
				});

				$companyThumbSlider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
					arrows: false,
					fade: true,
					rows: 0,
					autoplay: true,
					autoplaySpeed: 5000
				});

				$companyThumbSlider.click(function() {
					$companySlider.slick('slickNext');
					$companyThumbSlider.slick('slickNext');
				});
			}
		},

		servicesSlider: function()
		{
			if($('._servicesSlider')[0])
			{
				var $servicesSlider = $('._servicesSlider'),
				$servicesDotsSlider = $('._servicesDotsSlider'),
				scrollCount = null;
				scroll= null;

				$servicesSlider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					rows: 0,
					asNavFor: '._servicesDotsSlider',
				});

				$servicesDotsSlider.slick({
					centerMode: true,
					centerPadding: '0px',
					arrows: false,
					rows: 0,
					slidesToShow: 7,
					slidesToScroll: 1,
					focusOnSelect: true,
					asNavFor: '._servicesSlider',
				});

				$('body').on('wheel', (function(e) {
					clearTimeout(scroll);

					scroll = setTimeout(function(){scrollCount=0;}, 200);
					if(scrollCount)
					return 0;

					scrollCount = 1;

					if (e.originalEvent.deltaY > 0)
					$($servicesSlider).slick('slickNext');
					else
					$($servicesSlider).slick('slickPrev');
				}));

				$servicesSlider.click(function() {
					$servicesSlider.slick('slickNext');
					$servicesDotsSlider.slick('slickNext');
				});
			}
		}
	},

	upload:
	{
		inputAmount: 1,

		remove: function(instance)
		{
			$('#fileInput' + $(instance).attr('data-remove-id')).remove();
			$(instance).parent().remove();
		},

		create: function(instance)
		{
			this.inputAmount++

			$('._uploadAdd').append('<input type="file" name="uploads[]" class="g-upload__input" onchange="o2.upload.create(this);" id="fileInput' + o2.upload.inputAmount + '">');

			$('._uploadAdd').attr('for', 'fileInput' + this.inputAmount);

			$('._uploadItems').append(
				'<div class="g-uload__item">' +
					'<div class="g-uload__item-name">' + instance.files[0].name + '</div>' +
					'<div class="g-uload__item-remove" data-remove-id="' + o2.upload.inputAmount + '" onclick="o2.upload.remove(this);"><img src="assets/template/img/close.svg" alt=""></div>' +
				'</div>');

		}
	}
}