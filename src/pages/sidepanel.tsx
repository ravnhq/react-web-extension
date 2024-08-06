import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { useBrowserMessaging } from "../hooks/useBrowserMessaging";
import { Action, Source } from "../types/types";
const SidePanelPage = () => {
  const { sentMessage } = useBrowserMessaging();
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState<
    { message: string; from: string }[]
  >([]);
  useEffect(() => {
    const handleMessage = async (
      message: { type: string; message: string; from: string },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _sender: any,
      sendResponse: (payload: Record<string, any>) => void
    ) => {
      if (message.type === Action.SEND_MESSAGE) {
        setListMessages((previousMessages) => [
          ...previousMessages,
          { from: message.from, message: message.message },
        ]);
      }
    };
    browser.runtime.onMessage.addListener(handleMessage);
    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);
  return (
    <div className="h-screen bg-gray-900 px-4 py-4 flex flex-col">
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        <h2 className="text-gray-400 font-bold">List of messages</h2>
        {listMessages.map((receiveMessage) => (
          <p className="px-2 py-1 border border-gray-300 text-gray-400 rounded-md">{`From ${receiveMessage.from} you receive: ${receiveMessage.message}`}</p>
        ))}
      </div>
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
          onClick={async () => {
            await sentMessage({
              type: Action.SEND_MESSAGE,
              from: Source.SIDE_PANEL,
              message,
            });
            setListMessages((previousMessages) => [
              ...previousMessages,
              { from: Source.SIDE_PANEL, message },
            ]);
            setMessage("");
          }}
        >
          Sent message
        </button>
      </div>
    </div>
  );
};

export default SidePanelPage;
