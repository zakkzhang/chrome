var SFY = {
    baseUrl: 'http://storify.com'
  , appname: 'storifychrome'

    /**
     * Strict Percent Encoding conforming to RFC 3986.
     *
     * Based on: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURIComponent
     *
     * @param {String} str
     */

  , strictEncodeURIComponent: function(str) {
      return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28')
                                    .replace(/\)/g, '%29').replace(/\*/g, '%2A');
    }
};
