waitForjQuery();

function waitForjQuery() {
  if (typeof jQuery == 'undefined') {
    setTimeout(waitForjQuery, 10000);
  } else {
    initStorify();
  }
}

function initStorify() {

  function setTarget(permalink) {
    return 'http://storify.com/import?permalink='+encodeURIComponent(permalink);
  }

  $('#page-container').delegate('.tweet', 'mouseover', function() {
    var permalinkAttr = 'data-storify-permalink';
    if ( $(this).find('.storify-action').length === 0 || !$(this).attr(permalinkAttr) ) {
      var permalink = 'http://twitter.com/' + $(this).attr('data-screen-name')
                    + '/status/' + $(this).attr('data-tweet-id');
      $(this).attr(permalinkAttr, permalink);
      var target = setTarget(permalink);
      var storifyAction = $('<a href="' + target + '" class="storify-action" '
                        + '><span><i></i><b>Storify</b></span></a>')
          .click(function(e) {
            e.preventDefault();
            var w = 460,
                h = 580,
                sh = screen.height,
                sw = screen.width,
                top = 0;
            var left = Math.round((sw/2)-(w/2));
            if (sh>h) {
              top = Math.round((sh/2)-(h/2))
            }
            var popup = window.open(target, 'storify_this','left='+left+',top='+top+',width='+w+',height='+h+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
            if (popup) {
              popup.focus();
            } else {
              window.location.href=target;
            }
          });
      $(this).find('.tweet-actions').prepend(storifyAction);
    }
  });

}
