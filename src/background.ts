import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});
browser.runtime.onMessage.addListener((message) => {
  console.log("Message received in the background: ", message);
});
