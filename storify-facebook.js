// Stay in the Storify namespace (SFY).
var SFY = SFY || {};

// FB has its own `$` selector.
$.noConflict();

jQuery(document).ready(function($) {
  var baseUrl = SFY.baseUrl
    , appname = SFY.appname
    , strictEncodeURIComponent = SFY.strictEncodeURIComponent;

  var setTarget = function(permalink, storyElement) {
    var target = baseUrl+'/import?appname='+appname+'&permalink='+strictEncodeURIComponent(permalink)+'&text=&title=';
    if (storyElement) target += '&storyElement='+strictEncodeURIComponent(storyElement);
    return target;
  };

  var storifyThis = function(elementType) {
    var elem = $(this), storyElement;

    console.log("Storifying element "+elementType,this);

    if ( elem.hasClass('storifyed') ) 
      return;
      
    if(elem.hasClass('uiUfiComment')) {
      storyElement = {
        description: elem.find(".commentContent span").text(),
        elementClass: "fbpost",
        created_at: elem.find("abbr").attr("data-date"),
        author: {
          name: elem.find("a.actorName").text(),
          href: elem.find("a.actorName").attr("href"),
          avatar: elem.find("img.uiProfilePhoto").attr("src")
        }
      };
      if(storyElement.author.href)
        storyElement.permalink = window.location.href+'#'+storyElement.author.href.replace(/https?:\/\/(www\.)?facebook\.com\//i,'');
    }
    else {
      storyElement = {
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

    elem.addClass('storifyed');
    if(elem.hasClass('uiUfiComment')) elem.find('.commentActions').append(' · ', storifyAction);
    else elem.find('.UIActionLinks').prepend(' · ', storifyAction);
  }
  

  // initialize
  $('.UIIntentionalStory, .uiStreamStory, .mall_post, .uiUfiComment').each(storifyThis);

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
