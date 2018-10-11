// Sample background script that opens the options page on fresh install
require("chrome-extension-async");

// Check whether new version is installed then open options page
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    console.log("This is a first install!");
    chrome.runtime.openOptionsPage();
  }
});
