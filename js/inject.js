function simulatedClick(target, options) {
    var event = target.ownerDocument.createEvent('MouseEvents'),
        options = options || {};
    //Set your default options to the right of ||
    var opts = {
        type: options.type || 'click',
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
        metaKey: options.metaKey || false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
        button: options.button || 0, //0 = left, 1 = middle, 2 = right
        relatedTarget: options.relatedTarget || null,
    };
    //Pass in the options
    event.initMouseEvent(opts.type, opts.canBubble, opts.cancelable, opts.view, opts.detail, opts.screenX, opts.screenY, opts.clientX, opts.clientY, opts.ctrlKey, opts.altKey, opts.shiftKey, opts.metaKey, opts.button, opts.relatedTarget);
    //Fire the event
    target.dispatchEvent(event);
    console.log(event);
}
//Initially hide header and onedrive view.
$(".centerColumn").attr("style", "display: none;");
$("#c_header").attr("style", "opacity:0;");
//Poll events
var interval = setInterval(function() {
    //Load skype sidebar as soon as it possible
    if ($("#sidebar").attr("style") === "top: 50px;" && $('#ImageTile-13_0.c-ImageTile>.visible')) {
        simulatedClick(document.getElementById("ContentControl-12_0"), {
            type: "mousedown"
        });
        //Bring back header
        $("#c_header").removeAttr("style");
        //Bring back onedrive view
        $(".centerColumn").removeAttr("style");
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
                $("#chat_view").fadeOut("fast", function() {
                    $("#chat_view").attr("style", "display: none;");
                    $("#rec_conv").attr("style", "display: block;");
                });
            }
            break;
    }
});