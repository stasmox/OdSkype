var cssCode =  [
                '.c-Header {width:575px;}',
                '.c-Repeater.commands.links {display:none;}',
                '#Menu-14_0 {display:none !important;}',
                '#Menu-14_1 {display:none !important;}',
                '#Menu-14_2 {display:none !important;}',
                '.responsive .c-Header .c-NavItem {display:inline-block !important;}',
                '.c_hicons.links {display:inline-block !important;}',
                'div#sidebar {width:575px; left:0px;}',
                '#rec_conv {display:block;}',
                '#uxp_ftr_left {display:none;}',
                'span#sidebar_close_img {width:0px;}',
                'div .ModernConversationHistoryControl {width: 550px;}',
                'div .ModernConversationHistoryItem {width:480px;}',
                'div .ModernConversationControl_Container {width:550px;}',
                'div .ModernConversationControlBottom {width:550px;}',
                '.ModernConversationInputControl_DefaultText {width:550px !important;}',//FIXME: Somehow not overriden
                'div .ModernConversationTypingControl {width:550px !important;}',
                'div .RecentConversationsControl_MessageText {width: 80%;}',
                'div .RecentConversationsControl_ContactDisplayName {width: 80%;}'
                ];


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
