import browser from "webextension-polyfill";
export const useBrowserMessaging = () => {
  const sentMessage = async (payload: Record<string, any>) => {
    try {
      await browser.runtime.sendMessage(payload);
    } catch (error) {
      console.log(error);
    }
  };
  return { sentMessage };
};
