var CURRENT_DIR = null;
function onWindowLoad() {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    CURRENT_DIR = url.split('/')[2];
  });
}

window.onload = onWindowLoad;