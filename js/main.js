"use strict"

/**
* инициализация всех инициализаций
*/
$(document).ready(function()
{
	global.init();
});

/**
* основной объект
* @type {object}
*/
const global =
{
	/**
	* вызов функций, которые должны запускаться после загрузки DOM
	*/
	init()
	{
		this.setViewHeight();
		this.priorityNav('._footerNav', '._footerNavItem', '._footerNavTrigger');
		$(window).resize(function() {
			global.priorityNav('._footerNav', '._footerNavItem', '._footerNavTrigger');
		});
		this.sliders.init();

		$('body').addClass('ready');
	},
	/**
	 * для корректной высоты wrapper на мобильных браузерах
	 */
	setViewHeight()
	{
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		$(window).resize(function() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
	},
	/**
	 * переключение адаптивных навигаций
	 * @param {object} instance - объект this
	 * @param {string} toggleElem - модифицируемый блок
	 * @param {string} modifier - имя класса-модификатора
	 */
	toggleNav(instance, toggleElem, modifier)
	{
		$(instance).toggleClass('active');
		$(toggleElem).toggleClass(modifier);
	},
	/**
	 * адаптивное отображение навигации языков
	 * @param {string} navElem - имя класса блока навигации
	 * @param {string} navItemElem - имя классов элементов навигации
	 * @param {string} triggerElem - имя класса переключателя
	 */
	priorityNav(navElem, navItemElem, triggerElem)
	{
		let navWidth = $(navElem).width(),
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
	/**
	 * все слайдеры/карусели. Библиотека "slick"
	 * @type {object}
	 */
	sliders:
	{
		/**
		 * инициализация
		 */
		init()
		{
			this.companySliders();
			this.servicesSlider();
			this.greetingsSlider();
		},
		/**
		 * Слайдер приветствий(главная страница)
		 */
		greetingsSlider()
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
		/**
		 * Слайдер на странице company. Два связанных вместе слайдера - отображаемая фотография и превью следующей, на которую можно кликнуть.
		 */
		companySliders()
		{
			if($('._companySlider')[0])
			{
				const $companySlider = $('._companySlider'),
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
		/**
		 * Слайдер услуг на странице "What we do". Два связанных вместе слайдера - основной и кликабельная навигация
		 */
		servicesSlider()
		{
			if($('._servicesSlider')[0])
			{
				let $servicesSlider = $('._servicesSlider'),
					$servicesDotsSlider = $('._servicesDotsSlider'),
					scrollCount = null;
					scroll = null;

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
	/**
	 * кастомная загрузка файлов
	 * @type {object}
	 */
	upload:
	{
		inputAmount: 1,
		/**
		 * удаление выбранного файла
		 * @param {object} instance - объект this
		 */
		remove(instance)
		{
			$(`#fileInput-${$(instance).attr('data-remove-id')}`).remove();
			$(instance).parent().remove();
			$('._uploadAdd').attr('for', `fileInput-${this.inputAmount}`);
		},
		/**
		 * добавление выбранного файла
		 * @param {object} instance - объект this
		 */
		create(instance)
		{
			$('._uploadItems').append(`
				<div class="g-uload__item">
					<div class="g-uload__item-name">${instance.files[0].name}</div>
					<div class="g-uload__item-remove" data-remove-id="${global.upload.inputAmount}" onclick="global.upload.remove(this);">
						<img src="./img/close.svg" alt="remove file">
					</div>
				</div>
			`);

			this.inputAmount++

			$('._uploadAdd').append(`<input type="file" name="uploads[]" class="g-upload__input" onchange="global.upload.create(this);" id="fileInput-${global.upload.inputAmount}">`);

			$('._uploadAdd').attr('for', `fileInput-${this.inputAmount}`);

		}
	}
}