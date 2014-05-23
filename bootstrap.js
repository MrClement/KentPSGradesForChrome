chrome.tabs.onUpdated.addListener(function(id, info, tab){
    var url = tab.url.toLowerCase();
    if (url.indexOf("powerschool.kentdenver.org") != -1){
      chrome.pageAction.show(tab.id);
      if(url.indexOf("home.html") != -1) {
        chrome.tabs.executeScript(null, {"file": "mainpage.js"});
      } else if(url.indexOf("scores") != -1 ) {
        chrome.tabs.executeScript(null, {"file": "extension.js"});

      }
    }

});
