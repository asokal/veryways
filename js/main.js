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
		this.upload.init();

		$('body').addClass('ready');
	},

	setViewHeight: function()
	{
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		$( window ).resize(function() {
			let vh = window.innerHeight * 0.01;
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

			// $("#filer_input2").filer({
			// 	limit: null,
			// 	maxSize: null,
			// 	extensions: null,
			// 	changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>Drag&Drop files here</h3> <span style="display:inline-block; margin: 15px 0">or</span></div><a class="jFiler-input-choose-btn blue">Browse Files</a></div></div>',
			// 	showThumbs: true,
			// 	theme: "dragdropbox",
			// 	templates: {
			// 		box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
			// 		item: '<li class="jFiler-item">\
			// 					<div class="jFiler-item-container">\
			// 						<div class="jFiler-item-inner">\
			// 							<div class="jFiler-item-thumb">\
			// 								<div class="jFiler-item-status"></div>\
			// 								<div class="jFiler-item-thumb-overlay">\
			// 									<div class="jFiler-item-info">\
			// 										<div style="display:table-cell;vertical-align: middle;">\
			// 											<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
			// 											<span class="jFiler-item-others">{{fi-size2}}</span>\
			// 										</div>\
			// 									</div>\
			// 								</div>\
			// 								{{fi-image}}\
			// 							</div>\
			// 							<div class="jFiler-item-assets jFiler-row">\
			// 								<ul class="list-inline pull-left">\
			// 									<li>{{fi-progressBar}}</li>\
			// 								</ul>\
			// 								<ul class="list-inline pull-right">\
			// 									<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
			// 								</ul>\
			// 							</div>\
			// 						</div>\
			// 					</div>\
			// 				</li>',
			// 		itemAppend: '<li class="jFiler-item">\
			// 						<div class="jFiler-item-container">\
			// 							<div class="jFiler-item-inner">\
			// 								<div class="jFiler-item-thumb">\
			// 									<div class="jFiler-item-status"></div>\
			// 									<div class="jFiler-item-thumb-overlay">\
			// 										<div class="jFiler-item-info">\
			// 											<div style="display:table-cell;vertical-align: middle;">\
			// 												<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
			// 												<span class="jFiler-item-others">{{fi-size2}}</span>\
			// 											</div>\
			// 										</div>\
			// 									</div>\
			// 									{{fi-image}}\
			// 								</div>\
			// 								<div class="jFiler-item-assets jFiler-row">\
			// 									<ul class="list-inline pull-left">\
			// 										<li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
			// 									</ul>\
			// 									<ul class="list-inline pull-right">\
			// 										<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
			// 									</ul>\
			// 								</div>\
			// 							</div>\
			// 						</div>\
			// 					</li>',
			// 		progressBar: '<div class="bar"></div>',
			// 		itemAppendToEnd: false,
			// 		canvasImage: true,
			// 		removeConfirmation: true,
			// 		_selectors: {
			// 			list: '.jFiler-items-list',
			// 			item: '.jFiler-item',
			// 			progressBar: '.bar',
			// 			remove: '.jFiler-item-trash-action'
			// 		}
			// 	},
			// 	dragDrop: {
			// 		dragEnter: null,
			// 		dragLeave: null,
			// 		drop: null,
			// 		dragContainer: null,
			// 	},
			// });
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