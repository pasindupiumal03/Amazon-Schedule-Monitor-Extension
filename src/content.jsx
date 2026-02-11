import { initPopup } from "./shadowRoot.jsx";

// Configuration
const CONFIG = {
    POLL_INTERVAL_MS: 1000,
    RELOAD_ON_FOUND_DELAY_MS: 500, // Wait a bit after finding success before reloading ensuring it's stable
    BLOCK_RECOVERY_DELAY_MS: 60000, // 60 seconds wait if blocked
};

// State tracking
let hasSeenError = false;

// Helper to log to background script (Service Worker)
const logToBackground = (text) => {
    console.log(text); // Also log locally
    try {
        chrome.runtime.sendMessage({ type: "STATUS_UPDATE", text: text });
    } catch (e) {
        // Ignore errors if extension context invalid (e.g. valid reload)
    }
};

// Helper to check for 403/CloudFront Block
const checkIsBlocked = () => {
    // Check if body text contains specific CloudFront error messages
    const text = document.body.innerText || "";
    return text.includes("403 ERROR") && text.includes("The request could not be satisfied");
};

// Function to check the error message
// Returns true if error is currently present
const checkAndProcessError = () => {
    const errorSelector = '[data-test-id="banner-message-container-test-id"]';
    const errorText = "Unable to fetch headcount request.";
    const errorElement = document.querySelector(errorSelector);

    // 1. If element doesn't exist at all -> Error is GONE
    if (!errorElement) return false;

    // 2. If element exists, check if it contains the error text
    const hasErrorText = errorElement.innerText.includes(errorText);
    if (!hasErrorText) return false; // Text changed -> Error is GONE

    // 3. Check visibility explicitly for robustness
    // Get computed style to check for display:none, visibility:hidden, or opacity:0
    const style = window.getComputedStyle(errorElement);
    const isHidden = style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0';

    if (isHidden) return false; // Visually hidden -> Error is GONE

    // If we are here: Element exists, has error text, and is visible.
    return true;
};

// Main logic
const main = () => {
    // 1. Check for Blocked State and recover
    if (checkIsBlocked()) {
        logToBackground("Detected 403 Block. Waiting to recover...");
        setTimeout(() => {
            window.location.reload();
        }, CONFIG.BLOCK_RECOVERY_DELAY_MS);
        return;
    }

    // Only run on the target domain
    if (!window.location.href.includes("hiring.amazon.ca")) return;

    logToBackground("Script started. Monitoring for schedule availability...");

    // Polling loop to check for the error message state
    setInterval(() => {
        const errorPresent = checkAndProcessError();

        if (errorPresent) {
            if (!hasSeenError) {
                logToBackground("Error message detected. Waiting for it to change...");
                hasSeenError = true;
            }
            // If error is present, we do NOTHING. We wait for it to disappear.
        } else {
            // Error is NOT present.
            if (hasSeenError) {
                // STATE CHANGE: Error WAS there, now it's GONE!
                logToBackground("Error message disappeared! Reloading to fetch data...");
                hasSeenError = false; // Reset state

                // Wait a small delay to ensure it's not a flicker, then reload
                setTimeout(() => {
                    window.location.reload();
                }, CONFIG.RELOAD_ON_FOUND_DELAY_MS);
            } else {
                // We haven't seen the error yet. 
                // Either we validly have schedules, or the page is still loading.
            }
        }
    }, CONFIG.POLL_INTERVAL_MS);
};

// Run the main logic
main();

// Uncomment the lines below to automatically inject the popup on all pages
// setInterval(() => {
//   const popup = document.querySelector("#react-chrome-extension-popup");
//   if (popup) return;
//   initPopup();
// }, 100);