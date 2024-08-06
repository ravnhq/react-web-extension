import browser from "webextension-polyfill";
import { Action, Source } from "./types/types";

declare global {
  interface Window {
    clickListenerAdded?: boolean;
    inputListenerAdded?: boolean;
  }
}
if (!window.clickListenerAdded) {
  console.log("Adding click listener");
  window.clickListenerAdded = true;

  const track = async (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const elementInfo = {
      tag: clickedElement.tagName,
      clientX: event.clientX,
      clientY: event.clientY,
    };

    try {
      await browser.runtime.sendMessage({
        type: Action.SEND_MESSAGE,
        from: Source.BROWSER_TAB,
        message: `user clicks on ${elementInfo.tag}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  document.addEventListener("click", track);
} else {
  console.log("Click listener already added");
}
