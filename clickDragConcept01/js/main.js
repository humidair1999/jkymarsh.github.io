require(["jquery", "libs/jquery-ui-1.8.16.custom.min", "libs/jquery.infinitedrag"], function($) {

    console.log("lol");

	var wall = jQuery.infinitedrag("#wall", {}, {
		start_col: 0,
		start_row: 0,
		width: 100,
		height: 100
	});

	// $("._tile").draggable({ delay: 2000, snap: true, snapTolerance: 100 });

	$("._tile").click(function() {
    	$("._tile").draggable({ delay: 1000, snap: true, snapTolerance: 100, disabled: false });
	});

	$("._tile").mouseup(function() {
    	$("._tile").draggable({ disabled: true });
	});

});