chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create("app.html", {
        id: "od_skype",
        bounds: {
            width: 590,
            height: 705,
        },
        innerBounds: {
            minWidth: 590,
            minHeight: 705,
            maxWidth: 590,
            maxHeight: 705
        },
        resizable: false,
        singleton: true
    }, function(win) {
        win.contentWindow.onload = function() {
            var wv = this.document.querySelector("webview");
            wv.addEventListener("loadcommit", function(e) {
                this.insertCSS({
                    file: "css/inject.css",
                    runAt: "document_end",
                    allFrames: true
                });
            });
            wv.addEventListener("contentload", function(e) {
                this.executeScript({
                    file: "js/jquery-2.1.4.min.js"
                });
                this.executeScript({
                    file: "js/inject.js"
                });
            });
            wv.addEventListener("newwindow", function(e) {
                e.preventDefault();
                chrome.browser.openTab({
                    url: e.targetUrl
                });
            });
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                console.log(request);
                var options = {
                    type: "basic",
                    title: request.user_name,
                    message: request.message,
                    iconUrl: request.avatar || "resources/icons/skype-48.png"
                };
                chrome.notifications.create(options);
            });
        };
    });
});