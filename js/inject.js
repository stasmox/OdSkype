function simulatedClick(target, options) {
    var event = target.ownerDocument.createEvent("MouseEvents");
    options = options || {};
    //Set your default options to the right of ||
    var opts = {
        type: options.type || "click",
        canBubble: options.canBubble || true,
        cancelable: options.cancelable || true,
        view: options.view || target.ownerDocument.defaultView,
        detail: options.detail || 1,
        screenX: options.screenX || 0, //The coordinates within the entire page
        screenY: options.screenY || 0,
        clientX: options.clientX || 0, //The coordinates within the viewport
        clientY: options.clientY || 0,
        ctrlKey: options.ctrlKey || false,
        altKey: options.altKey || false,
        shiftKey: options.shiftKey || false,
        metaKey: options.metaKey || false, //I *think* "meta" is "Cmd/Apple" on Mac, and "Windows key" on Win. Not sure, though!
        button: options.button || 0, //0 = left, 1 = middle, 2 = right
        relatedTarget: options.relatedTarget || null,
    };
    //Pass in the options
    event.initMouseEvent(opts.type, opts.canBubble, opts.cancelable, opts.view, opts.detail, opts.screenX, opts.screenY, opts.clientX, opts.clientY, opts.ctrlKey, opts.altKey, opts.shiftKey, opts.metaKey, opts.button, opts.relatedTarget);
    //Fire the event
    target.dispatchEvent(event);
}
$("#c_base").append("<h3 id=\"app_loading_message\" style=\"z-index: -1; position: absolute; margin-top: 50px;margin-left: 20px;\">Loading...</h3>");
$("body").append('<div id="notificationContainer" class="NotificationContainer" persist="1" role="alert" aria-live="assertive" aria-atomic="false" aria-haspopup="true" style="position: absolute; padding: 0px; margin: 0px; height: 100%; width: 100%; top: 0px; left: 0px;"></div>');
//Initially hide header and onedrive view.
$("#c_header").attr("style", "opacity:0;");
$(".centerColumn").attr("style", "opacity:0;");
//Add notifications handler
var notificationContainer = document.getElementById("notificationContainer");
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
            var userName = $(mutation.addedNodes[mutation.addedNodes.length - 1]).
            find(".UserTitle").text();
            var message = $(mutation.addedNodes[mutation.addedNodes.length - 1]).
            find(".UserContent").text();
            var avatar = $('.RecentConversationsControl_Item').find("img[alt='"+userName+"']").attr("src");
            console.log("USER: " + userName);
            console.log("MESSAGE: " + message);
            console.log("AVATAR: "+ avatar);
            var options = {
                type: "basic",
                title: userName,
                message: message,
                avatar: avatar
            };
            chrome.runtime.sendMessage("kjaliacihnibjnheaihmoomljhgkaiip",options);
        }
    });
});
var config = {
    attributes: true,
    childList: true,
    characterData: true
};
observer.observe(notificationContainer, config);
//Poll events
var interval = setInterval(function() {
    //Load skype sidebar as soon as it possible
    if ($("#sidebar").attr("style") === "top: 50px;" && $("#ImageTile-13_0.c-ImageTile>.visible")) {
        simulatedClick(document.getElementById("ContentControl-12_0"), {
            type: "mousedown"
        });
        //Remove loading baloon
        $("#app_loading_message").remove();
        //Bring back header
        $("#c_header").removeAttr("style");
        setTimeout(function() {
            //Bring back onedrive view
            $(".centerColumn").removeAttr("style");
        }, 1000);
    }
    //Expand chat input on char open
    if ($("textarea.ModernConversationInputControl_TextBox").is(":visible") === true && $("textarea").attr("style") !== "width: 83% !important;") {
        $("textarea").attr("style", "width: 83% !important;");
    }
    //Add tooltips on chat
    if ($("#chat_view").attr("style") === "display: block;") {
        $("a.BackButton").attr("title", "Escape to close");
    }
}, 250);
$(document).on("keyup", function(e) {
    switch (e.which) {
        case 27:
            console.log(e.which);
            if ($("#chat_view").attr("style") === "display: block;") {
                simulatedClick($("a.BackButton").get(0), {
                    type: "click"
                });
            }
            break;
    }
});