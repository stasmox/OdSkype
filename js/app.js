chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('app.html', {
        "bounds": {
            "width": 590,
            "height": 705,
        },
        "innerBounds": {
            "minWidth": 590,
            "minHeight": 705,
            "maxWidth": 590,
            "maxHeight": 705
        },
        "resizable": false
    }, function(win) {
        win.contentWindow.onload = function() {
            var wv = this.document.querySelector('webview');
            wv.addEventListener('loadcommit', function(e) {
                this.insertCSS({
                    file: 'css/inject.css',
                    runAt: 'document_end',
                    allFrames: true
                });
            });
            wv.addEventListener('contentload', function(e) {
                this.executeScript({
                    file: 'js/jquery-2.1.4.min.js'
                });
                this.executeScript({
                    file: 'js/inject.js'
                });
            });
            wv.addEventListener('newwindow', function(e) {
                e.preventDefault();
                chrome.browser.openTab({url: e.targetUrl});
            });
        };
    });
});
