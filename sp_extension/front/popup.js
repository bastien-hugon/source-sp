var CURRENT_DIR = null;
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.data) {
    alert(request.data)
  }
});


function onWindowLoad() {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    CURRENT_DIR = url.split('/')[2];
  });
}

window.onload = onWindowLoad;