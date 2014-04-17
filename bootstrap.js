chrome.tabs.onUpdated.addListener(function(id, info, tab){

    if (tab.url.toLowerCase().indexOf("powerschool.kentdenver.org") != -1){
      chrome.pageAction.show(tab.id);
      chrome.tabs.executeScript(null, {"file": "extension.js"});
        }

});
