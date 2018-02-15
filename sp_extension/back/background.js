chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {

      chrome.privacy.services.autofillEnabled.get({}, function(details) {
        chrome.privacy.services.autofillEnabled.set({value: false}, function() {
          if(chrome.runtime.lastError == null) {
            console.log("success")
          } else {
            console.log("error:", chrome.runtime.lastError)
          }
        })
      })

      chrome.privacy.services.passwordSavingEnabled.get({}, function(details) {
        chrome.privacy.services.passwordSavingEnabled.set({value: false}, function() {
          if(chrome.runtime.lastError == null) {
            console.log("success")
          } else {
            console.log("error:", chrome.runtime.lastError)
          }
        })
      })

      chrome.tabs.executeScript(null, {
        file: "main.js"
      }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
          console.log('That\'s not really an error ...')
        }
      });

      //window.open("../popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");

    }
  })
