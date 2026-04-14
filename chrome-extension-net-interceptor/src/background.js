chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log('Request intercepted:', details.url);
    // 可以在此处修改请求（如重定向）
    return { cancel: false }; // 不阻止请求
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    // 发送请求数据到 React UI
    chrome.runtime.sendMessage({
      type: 'REQUEST_COMPLETED',
      data: details
    });
  },
  { urls: ["<all_urls>"] }
);