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
	},

	toggleNav: function(instance)
	{
		$(instance).toggleClass('active');
		$('._header').toggleClass('header--expanded');
	},
}