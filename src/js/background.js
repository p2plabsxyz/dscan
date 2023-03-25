chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === "keyUpdated") {
      chrome.runtime.sendMessage({ type: "reloadPopup" });
    } else if (message.type === "continueWithSavedKey") {
      chrome.runtime.sendMessage({ type: "reloadPopup" });
    }
  });
});
