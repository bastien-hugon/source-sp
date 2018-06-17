var CURRENT_DIR = null;
var MY_COOKIES = null;

function getCookies(domain, callback) {
  chrome.cookies.getAll({"url": domain}, function(cookie) {
      if(callback) {
          callback(cookie);
      }
  });
}

function onWindowLoad() {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    CURRENT_DIR = url.split('/')[2];
    //usage:
    getCookies(tabs[0].url, function(id) {
        MY_COOKIES = id;
    });
  });
}


window.onload = onWindowLoad;