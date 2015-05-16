var cssCode =  [
                '.c-Header {width:530px;}',
                '.c-Repeater.commands.links {display:none;}',
                '.responsive .c-Header .c-NavItem {display:inline-block !important;}',
                '.c_hicons.links {display:inline-block !important;}',
                'div#sidebar {width:530px; left:0px;}',
                '#rec_conv {display:block;}',
                'span#sidebar_close_img {width:0px;}',
                'div .ModernConversationHistoryControl {width: 480px;}',
                'div .ModernConversationHistoryItem {width:420px;}',
                'div .ModernConversationControl_Container {width:350px;}',
                'div .ModernConversationControlBottom {width:480px;}',
                'textarea .ModernConversationInputControl_TextBox {width:320px !important;}',//FIXME: Somehow not overriden
                'div .ModernConversationTypingControl {width:480px !important;}',
                'div .RecentConversationsControl_MessageText {width: 80%;}',
                'div .RecentConversationsControl_ContactDisplayName {width: 80%;}'
                ];



chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('popup.html', {
 "bounds": {
        "width": 550,
        "height": 700,

    },
    "innerBounds": {
        "minWidth": 550,
        "minHeight": 700,
        "maxWidth": 550,
        "maxHeight": 700
    },
    "resizable": false 
  },
function(win) {
      win.contentWindow.onload = function() {
        var wv = this.document.querySelector('webview');
        wv.addEventListener('loadcommit', function(e) {
          this.insertCSS({ code: cssCode.join('\n'),
            runAt: 'document_start',allFrames:true});
        });
    };
}
);
});
