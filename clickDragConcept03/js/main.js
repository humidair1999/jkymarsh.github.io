require(["jquery", "libs/jquery-ui-1.8.16.custom.min", "libs/jquery.infinitedrag"], function($) {

	var wall = jQuery.infinitedrag("#wall", {}, {
		start_col: 0,
		start_row: 0,
		width: 85,
		height: 85
	});

	var timeout = 0;

	$("#wall").draggable({
   		start: function(event, ui) {
   			clearTimeout(timeout);

   			console.log("cleared " + timeout);
   		}
	});

	$("#wall").mousedown(function() {
    	timeout = setTimeout(function() {
    		$("._tile").draggable({ helper: "clone", disabled: false });

    		console.log("completed " + timeout);

    		$("._tile").css("background", "gray");
    		$("._tile").addClass("jiggly");

    		$("#jigglyModeContainer").fadeIn(2000);
    	}, 1000);
	}).bind('mouseup mouseleave', function() {
    	clearTimeout(timeout);

    	console.log("cleared " + timeout);
	});

	$("#exitJigglyMode").click(function() {
		$("._tile").draggable({ disabled: true });

        $("._tile").css("background", "black");
        $("._tile").removeClass("jiggly");

        $("#jigglyModeContainer").fadeOut(2000);
	})

/*
	$("#wall").mousedown(function() {
    	timeout = setTimeout(function() {
    		$("._tile").draggable({ helper: "clone" });

    		console.log("completed " + timeout);

    		$("._tile").css("background", "gray");
    	}, 2000);

    	if (timeout) {
    		console.log("timeout function finished");
    	}

    	$(this).mouseup(function() {
        	window.clearTimeout(timeout);

        	$(this).unbind("mouseup");

        	console.log("mouseup");

        	return false;
    	});

    	return false;
	});

*/
	/*
	$("._tile").draggable({
		stop: function(event, ui){
			$("._tile").draggable({ disabled: true });
		},
		start: function(event, ui){
			$("._tile").draggable({ disabled: false });
		}
	});
	*/

	/*
	var pressTimer = 0;

	$("._tile").mouseup(function(){
  		clearTimeout(pressTimer);
  		// Clear timeout
  		return false;
	}).mousedown(function(){
  		// Set timeout
  		pressTimer = window.setTimeout(function() {
  			$("._tile").draggable({ disabled: false });
  		}, 1000);
  		return false;
	});
	*/

});