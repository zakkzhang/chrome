var SFY = {
	base_url: 'http://storify.com',
	appname: 'storifychrome'

	/**
	 * Strict Percent Encoding conforming to RFC 3986.
	 *
	 * Based on: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURIComponent
	 *
	 * @param {String} str
	 */

	,
	strictEncodeURIComponent: function(str) {
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
	}
};

(function() {
	_my_script = document.createElement('SCRIPT');
	_my_script.type = 'text/javascript';
	_my_script.src = SFY.base_url + '/public/js/bookmarklet.js?x=' + (Math.random());
	document.getElementsByTagName('html')[0].setAttribute('STORIFY_APPNAME',SFY.appname);
	document.getElementsByTagName('head')[0].appendChild(_my_script);
})();
