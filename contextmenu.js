var SFY = SFY || {
  baseUrl: 'http://storify.com',
  appname: 'storifychrome'
};

function storifyThis(info, tab) {
  var permalink = info.linkUrl || info.srcUrl || info.pageUrl;
  var text      = info.selectionText || '';
  var importUrl = SFY.baseUrl+'/import?appname=' + SFY.appname
                + '&permalink=' + encodeURIComponent(permalink)
                + (text.length) ? '&text=' + encodeURIComponent(text) : '';

  chrome.windows.get(tab.windowId, function(window) {
    var w = 460,
        h = 580,
        sh = window.height,
        sw = window.width,
        top = 0;
    var left = Math.round((sw/2)-(w/2));
    if (sh > h) {
      top = Math.round((sh/2)-(h/2))
    }
    chrome.windows.create({
      "url": importUrl,
      "type": "popup",
      "width": w,
      "height": h,
      "top": top,
      "left": left
    });
  });
}

var storifyImage = chrome.contextMenus.create({
  "title":    "Storify This... Image",
  "contexts": ["image"],
  "onclick":  storifyThis
});

var storifyLink = chrome.contextMenus.create({
  "title":    "Storify This... Link",
  "contexts": ["link"],
  "onclick":  storifyThis
});

var storifyPage = chrome.contextMenus.create({
  "title":    "Storify This... Page",
  "contexts": ["page"],
  "onclick":  storifyThis
});

var storifySelection = chrome.contextMenus.create({
  "title":    "Storify This... Selection",
  "contexts": ["selection"],
  "onclick":  storifyThis
});
