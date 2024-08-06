import { useState } from "react";
import browser from "webextension-polyfill";
import { useBrowserMessaging } from "../hooks/useBrowserMessaging";
import { Action, Source } from "../types/types";
export default function () {
  const [message, setMessage] = useState<string>("");
  const { sentMessage } = useBrowserMessaging();
  const handleMessage = async () => {
    await sentMessage({
      type: Action.SEND_MESSAGE,
      from: Source.POP_UP,
      message,
    });
    setMessage("");
  };
  const openSidepanel = async () => {
    //getting tab info
    const [tab] = await browser.tabs.query({});
    await chrome.sidePanel.open({ windowId: Number(tab.windowId) });
  };

  return (
    <div className="bg-gray-900 w-[300px] h-[300px] px-4 py-4">
      <h1 className="text-gray-500">Messages and Side panel</h1>
      <div className="flex flex-row gap-2">
        <input
          placeholder="message"
          className="w-full bg-transparent border border-gray-400 text-white placeholder-gray-400 rounded-sm px-2 py-1"
          value={message}
          onChange={(event) => {
            setMessage(event.currentTarget.value);
          }}
        />
        <button
          className="bg-gray-700 text-white rounded-sm px-2 py-1"
          onClick={handleMessage}
        >
          Sent message
        </button>
      </div>
      <button
        className="bg-gray-700 text-white rounded-sm px-2 py-1 w-full mt-2"
        onClick={openSidepanel}
      >
        Open sidepanel
      </button>
    </div>
  );
}
