chrome.runtime.sendMessage({data: window.location.path}, function(response) {
    console.log(response.data);
    alert('toto');
});