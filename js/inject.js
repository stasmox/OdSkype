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

    if ($("#chat_view").attr("style") === "display: block;"){
    	$("a.BackButton").attr("title", "Escape to close");
    }

}, 250);

$(document).on("keyup", function (e) {
	switch(e.which) {
		case 27:
			console.log(e.which);
			if ($("#chat_view").attr("style") === "display: block;"){
				$( "#chat_view").fadeOut( "fast", function() {
					$("#chat_view").attr("style", "display: none;");
					$("#rec_conv").attr("style", "display: block;");
				});
			}
			break;
	}
});