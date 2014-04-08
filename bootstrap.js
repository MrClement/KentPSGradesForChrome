


chrome.tabs.onUpdated.addListener(function(id, info, tab){
  
    if (tab.url.toLowerCase().indexOf("google.com") !== -1){
      chrome.pageAction.show(tab.id);
        }

    //chrome.tabs.executeScript(null, {"file": "path/to/extension.js"});
});
