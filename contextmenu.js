
function storifyThis(info, tab) {
  console.log( this, info, tab );
  var permalink = info.linkUrl || info.pageUrl;
  var text = info.selectionText || '';
  var photo = info.srcUrl || '';
  var importUrl = 'http://storify.com/import?permalink=' + encodeURIComponent(permalink)
                + '&text=' + encodeURIComponent(text)
                + '&photo=' + encodeURIComponent(photo);
  chrome.windows.create({
    "url": importUrl,
    "type": "popup",
    "height": 560,
    "width": 445
  });
}


var storifySelection = chrome.contextMenus.create({
  "title":    "Storify This... Selection",
  "contexts": ["selection"],
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

var storifyImage = chrome.contextMenus.create({
  "title":    "Storify This... Image",
  "contexts": ["image"],
  "onclick":  storifyThis
});
