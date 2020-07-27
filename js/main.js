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
		$(window).resize(function() {
			o2.priorityNav('._footerNav', '._footerNavItem', '._footerNavTrigger');
		});
		this.sliders.init();
		this.upload.init();
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
					fade: true,
					rows: 0,
					autoplay: true,
					autoplaySpeed: 3000
				});
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
					autoplay: true,
					autoplaySpeed: 5000
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
					autoplay: true,
					autoplaySpeed: 5000
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
		fileArray: [],

		init: function()
		{
			$('._fileInput').on('change', function() {
				o2.upload.filePreviews(this, '._uploadItems', '._upload');
			});
		},

		filePreviews: function(input, itemsWrap, directWrap)
		{

			if (input.files)
			{
				var filesAmount = input.files.length;

				for (i = 0; i < filesAmount; i++)
				{
					var reader = new FileReader();

					$($.parseHTML('<div class="g-uload__item _uploadItem">' + input.files[i].name + '</div>')).appendTo(itemsWrap);

					$($.parseHTML('<div class="g-uload__clear _uploadClear" onclick="o2.upload.clearFiles();"><img src="assets/template/img/close.svg" alt=""></div>')).appendTo(directWrap);

					reader.readAsDataURL(input.files[i]);
				}
			}
		},

		clearFiles: function()
		{
			$('._fileInput')[0].value = "";
			$('._uploadItem').remove();
			$('._uploadClear').remove();
		}
	}
}