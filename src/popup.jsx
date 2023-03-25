import React, { useState, useEffect } from "react";
import "./css/popup.css";

function Popup() {
  const [web3storageKey, setWeb3storageKey] = useState("");
  const [savedKey, setSavedKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    chrome.storage.local.set({ web3storageKey }, function () {
      chrome.runtime.sendMessage({ type: "keyUpdated", key: web3storageKey });
    });
  };

  const handleRemoveKey = () => {
    chrome.storage.local.set({ web3storageKey: null });
    setSavedKey("");
    setWeb3storageKey("");
  };

  const handleContinueWithSavedKey = () => {
    chrome.runtime.sendMessage({ type: "continueWithSavedKey", key: savedKey });
  };

  function formatKey(str) {
    if (str.length > 35) {
      return (
        str.substr(0, 20) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  useEffect(() => {
    chrome.storage.local.get(["web3storageKey"], function (result) {
      setSavedKey(result.web3storageKey);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (message) {
      if (message.type === "reloadPopup") {
        window.location.href = "file.html";
      }
    });
  }, []);

  return (
    <div>
      <section className="center">
        {savedKey ? (
          <div>
            <p>
              Your current API key 🔑 is:{" "}
              <p className="saved-key">{formatKey(savedKey)}</p>
            </p>
            <button className="remove-btn" onClick={handleRemoveKey}>
              Remove Key
            </button>
            <button
              className="continue-btn"
              onClick={handleContinueWithSavedKey}
            >
              Continue with saved key
            </button>
          </div>
        ) : (
          <div>
            <p>You do not have a saved API key 🔑</p>
            <form onSubmit={handleSubmit}>
              <input
                id="key"
                type="text"
                value={web3storageKey}
                placeholder="Enter your web3.storage key"
                onChange={(e) => setWeb3storageKey(e.target.value)}
                required
              />
              <button className="save-btn">Save Key</button>
            </form>
            <div class="instructions">
              <ol>
                <p>⚙️ Instructions:</p>
                <code>
                  <li>
                    Go to{" "}
                    <a
                      href="https://web3.storage/"
                      className="instructions-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      web3.storage ⁂
                    </a>{" "}
                    and Sign In.
                  </li>
                </code>
                <br />
                <code>
                  <li>Click on Accounts -{">"} Create an API Token.</li>
                </code>
                <br />
                <code>
                  <li>Copy the API token and paste it here.</li>
                </code>
                <br />
              </ol>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Popup;
