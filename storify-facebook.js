// Stay in the Storify namespace (SFY).
var SFY = SFY || {
  baseUrl:  'http://storify.com',
  appname:  'storifychrome'
};

// FB has its own `$` selector.
$.noConflict();

jQuery(document).ready(function($) {

  var setTarget = function(permalink, storyElement) {
    var target = SFY.baseUrl+'/import?appname='+SFY.appname+'&permalink='+encodeURIComponent(permalink);
    if (storyElement) target += '&storyElement='+encodeURIComponent(storyElement);
    return target;
  };

  var storifyThis = function() {
    var elem = $(this);

    if ( !elem.hasClass('storifyed') ) {

      var storyElement = {
        description: elem.find(".UIStory_Message,.messageBody").html(),
        elementClass: "fbpost",
        created_at: elem.find("abbr").attr("data-date"),
        author: {
          name: elem.find(".UIIntentionalStory_Names a,.actorName a:first,.actorDescription a:first").text(),
          href: elem.find(".UIIntentionalStory_Names a,.actorName a:first,.actorDescription a:first").attr("href"),
          avatar: elem.find("img.UIProfileImage,img.uiProfilePhoto").attr("src")
        },
        metadata: JSON.parse(elem.attr("data-ft"))
      };

      var slug = elem.find(".UIIntentionalStory_Time a, .uiStreamSource a").attr("href");
      if (slug) {
        if (slug.charAt(0) == '/') {
          storyElement.permalink = 'http://www.facebook.com' + slug;
        } else {
          storyElement.permalink = slug;
        }
      }

      if (elem.find(".uiStreamAttachments").size() > 0) {
        storyElement.image = {
          src: elem.find(".uiStreamAttachments img").attr("src"),
          title: elem.find(".uiStreamAttachments .uiAttachmentTitle").text(),
          description: elem.find(".uiStreamAttachments .uiAttachmentDesc").text(),
          href: elem.find(".uiStreamAttachments .uiAttachmentTitle a").attr("href")
        };
      }

      var storyElement_str = JSON.stringify(storyElement),
          target = setTarget(storyElement.permalink, storyElement_str);

      var storifyAction = $('<a/>', {
          href: '',
          class: 'storify-action',
          'data-storyElement': storyElement_str,
          html: '<span><i></i>Storify</span>',
          click: function(e) {
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
            window.open(target, 'storify_this','left='+left+',top='+top+',width='+w+',height='+h+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
          }
        });

      elem
          .addClass('storifyed')
          .find('.UIActionLinks').prepend(' · ', storifyAction);
    }
  };

  // initialize
  $('.UIIntentionalStory, .uiStreamStory, .mall_post').each(storifyThis);

  /**
   * Continue storifying feed items
   * .UIIntentionalStory = ?
   * .uiStreamStory = user feed
   * .mall_post = groups
   */
  $('#contentArea').delegate('.UIIntentionalStory, .uiStreamStory, .mall_post', 'mouseover', function() {
    $(this).each(storifyThis);
  });
});
