//Poll interactions
setInterval(function() {
    $('#ContentControl-12_0').click();
    console.log("refreshing state");
}, 60000);

//Poll textArea size in chat
var interval = setInterval(function() {
    if ($("textarea.ModernConversationInputControl_TextBox").is(":visible") === true && 
    	$("textarea").attr("style") !== "width: 83% !important;") {
        	$("textarea").attr("style", "width: 83% !important;");
    }
}, 250);