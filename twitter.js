var script = document.createElement("script");
script.type = "text/javascript";
script.src = chrome.extension.getURL("storify-twitter.js");
document.getElementsByTagName("body")[0].appendChild(script)