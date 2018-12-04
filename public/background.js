
chrome.contextMenus.create({
    id: 'HeadlineFetcher',
    title: 'Get Headlines',
    contexts: ['all']
});
chrome.contextMenus.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getHeadlines' });
        console.log("tab clicked");
    });
});
