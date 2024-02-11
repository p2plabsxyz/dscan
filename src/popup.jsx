import React, { useState, useEffect } from "react";
import "./css/popup.css";
import * as Client from "@web3-storage/w3up-client";

function Popup() {
  const [email, setEmail] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spaceDID, setSpaceDID] = useState("");
  const [isCreatingSpace, setIsCreatingSpace] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isLoginProcessStarted, setIsLoginProcessStarted] = useState(false);
  const [account, setAccount] = useState(null);
  const [popupWindow, setPopupWindow] = useState(null);
  const [paymentPlanSelected, setPaymentPlanSelected] = useState(false);
  const [loadingPaymentPlan, setLoadingPaymentPlan] = useState(true);

  // Effect for handling login continuation and initial setup
  useEffect(() => {
    chrome.storage.local.get(
      [
        "spaceDID",
        "spaceName",
        "emailVerified",
        "loginStarted",
        "email",
        "paymentPlanSelected",
      ],
      async function (result) {
        if (result.spaceDID) {
          setSpaceDID(result.spaceDID);
          setIsAuthenticated(true);
        }
        if (result.spaceName) {
          setSpaceName(result.spaceName);
        }
        setEmailVerified(result.emailVerified || false);
        setPaymentPlanSelected(result.paymentPlanSelected || false);
        setEmail(result.email || "");

        if (result.loginStarted) {
          setIsLoginProcessStarted(true);
          const client = await Client.create();
          const fetchedAccount = await client.login(result.email);
          setAccount(fetchedAccount);

          // Check payment plan status
          await checkPaymentPlan(fetchedAccount);

          // Update local storage to reflect changes
          chrome.storage.local.set(
            { emailVerified: true, loginStarted: false },
            () => {
              setEmailVerified(true);
              setIsLoginProcessStarted(false);
              if (popupWindow) {
                try {
                  popupWindow.focus();
                } catch (error) {
                  console.error("Error focusing the popup window:", error);
                }
              }
            }
          );
        }
      }
    );
  }, [popupWindow]);

  // Separate effect for rechecking payment plan when needed
  useEffect(() => {
    if (emailVerified && !paymentPlanSelected && email) {
      const fetchAndCheckPaymentPlan = async () => {
        const client = await Client.create();
        const fetchedAccount = await client.login(email);
        setAccount(fetchedAccount);
        await checkPaymentPlan(fetchedAccount);
      };

      fetchAndCheckPaymentPlan();
    }
  }, [emailVerified, paymentPlanSelected, email]);

  const checkPaymentPlan = async (account) => {
    try {
      setLoadingPaymentPlan(true);
      const res = await account.plan.get();
      if (res.ok) {
        setPaymentPlanSelected(true);
      } else {
        console.log("Waiting for payment plan to be selected...");
      }
    } catch (error) {
      console.error("Error checking payment plan:", error);
    } finally {
      setLoadingPaymentPlan(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // Set a flag in local storage
    chrome.storage.local.set({ loginStarted: true, email: email }, function () {
      // Calculate the top right position
      const width = 400;
      const height = 628;
      const left = window.screen.availWidth - width;
      const top = 0;

      // Open the popup in a new window and specify the position
      const popupUrl = chrome.runtime.getURL("popup.html");
      const windowFeatures = `width=${width},height=${height},left=${left},top=${top},resizable=no`;
      const newWindow = window.open(popupUrl, "DScanPopup", windowFeatures);
      setPopupWindow(newWindow);
      window.close();
      setIsLoginProcessStarted(true);
    });
  };

  const handleSpaceSubmit = async (e) => {
    e.preventDefault();
    if (!paymentPlanSelected) {
      alert("Please select a payment plan before creating a space.");
      return;
    }
    setIsCreatingSpace(true);
    const client = await Client.create();
    // Check if account is null and re-login if necessary
    if (!account) {
      if (email) {
        try {
          const reFetchedAccount = await client.login(email);
          setAccount(reFetchedAccount);
          proceedWithSpaceRegistration(client, reFetchedAccount);
        } catch (error) {
          console.error("Failed to re-login:", error);
          alert("Failed to login. Please try again.");
          return;
        }
      } else {
        alert("No account found. Please log in first.");
        return;
      }
    } else {
      proceedWithSpaceRegistration(client, account);
    }
  };

  const proceedWithSpaceRegistration = async (client, account) => {
    const space = await client.createSpace(spaceName);
    // Provision the space with the user's account
    await account.provision(space.did());
    // Save space to store and set as current
    await space.save();
    await client.setCurrentSpace(space.did());
    const recovery = await space.createRecovery(account.did());
    await client.capability.access.delegate({
      space: space.did(),
      delegations: [recovery],
    });

    const spaceDID = space.did();
    setSpaceDID(spaceDID);
    setIsCreatingSpace(false);
    chrome.storage.local.set(
      { spaceDID, spaceName, emailVerified: true },
      function () {
        setIsAuthenticated(true);
        setEmailVerified(true);
      }
    );
  };

  const handleRemoveSpace = () => {
    chrome.storage.local.get("email", function (result) {
      if (result.email) {
        setEmail(result.email);
        // Set emailVerified to true to show registration UI
        setEmailVerified(true);
        setIsAuthenticated(false);
        setSpaceDID("");
        setSpaceName("");
        chrome.storage.local.set(
          { spaceDID: null, spaceName: null, emailVerified: true },
          () => {
            // Clear the account state
            setAccount(null);
          }
        );
      } else {
        console.error("Email not found in storage.");
      }
    });
  };

  function formatKey(str) {
    if (str.length > 35) {
      return (
        str.substr(0, 23) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  const handleContinueWithSavedSpace = () => {
    window.location.href = "file.html";
  };

  return (
    <div>
      <section className="center">
        {isAuthenticated ? (
          <div>
            <p style={{ textAlign: "center" }}>
              Your current space is <b>{spaceName}</b>
              <span className="saved-key">{formatKey(spaceDID)}</span>
            </p>
            <button className="remove-btn" onClick={handleRemoveSpace}>
              Remove Space
            </button>
            <button
              className="continue-btn"
              onClick={handleContinueWithSavedSpace}
            >
              Continue with Saved Space
            </button>
            <div class="instructions">
              <p className="w3console">
                <code>
                  Go to{" "}
                  <a
                    href="https://console.web3.storage/"
                    className="instructions-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    console.web3.storage ⁂
                  </a>{" "}
                  and log in to manage your account.
                </code>
              </p>
            </div>
          </div>
        ) : emailVerified ? (
          <div>
            <p>Create a space to upload data 🗳️</p>
            <form onSubmit={handleSpaceSubmit}>
              <input
                id="spaceName"
                type="text"
                value={spaceName}
                placeholder="Enter your space name"
                onChange={(e) => setSpaceName(e.target.value)}
                required
              />
              <button className="space-btn">Create</button>
            </form>
            {emailVerified && !paymentPlanSelected && !loadingPaymentPlan && (
              <div className="billing">
                <p className="payment-warning">
                  Please select a plan, like the free tier, and enter payment
                  details to create a space.
                </p>
                <div className="paywall-msg">
                  <p>Why is there a paywall?</p>
                  <p>
                    web3.storage encounters daily spam from hundreds of
                    accounts, making it challenging for their team to manage.
                  </p>
                </div>
              </div>
            )}
            {isCreatingSpace ? <p>creating...</p> : ""}
          </div>
        ) : isLoginProcessStarted ? (
          <div>
            <p>
              Please click on the link sent to 📥 {email} to verify your
              identity..
            </p>
            <br />
            <p style={{ fontSize: "small", color: "red" }}>
              DO NOT close this window until you've verified your email.
            </p>
          </div>
        ) : (
          <div>
            <p>Log in / Sign up with your email 🔐</p>
            <form onSubmit={handleEmailSubmit}>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="login-btn">Login</button>
            </form>
            <div class="instructions">
              <ul>
                <p>
                  <code>What's new in DScan v4.0?</code>
                </p>
                <code>
                  <li>- Self-sovereign identity</li>
                </code>
                <br />
                <code>
                  <li>- User-owned storage</li>
                </code>
                <br />
                <code>
                  <li>- Customizable QR code styles and logo integration</li>
                </code>
                <br />
                <code>
                  <li>
                    Learn more about w3up in this{" "}
                    <a
                      href="https://blog.web3.storage/posts/the-data-layer-is-here-with-the-new-web3-storage"
                      className="instructions-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      blog
                    </a>
                  </li>
                </code>
              </ul>
              <br />
              <br />
              <br />
              <br />
              <center>
                <p>
                  <code>Own your identity, own your data!</code>
                </p>
              </center>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Popup;
