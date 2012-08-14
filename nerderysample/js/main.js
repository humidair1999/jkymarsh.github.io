require(["jquery"], function($) {
    
    var carouselCaption = "", carouselImage = "";

    // initial AJAX call to a (pretend) remote datasource to retrieve the default contents of the carousel

    $.ajax({
        url: 'datasource/carousel.json',
        cache: false,
        success: function(data) {
            carouselCaption = data["01"].caption;
            carouselImage = data["01"].image;

            $(".carouselCaption").html(carouselCaption);
            $("#carouselRight").attr("src", carouselImage);
        },
        error: function() {
            alert("Data could not be loaded.");

            // we could also set a default state for content to be displayed in HTML here, if we so desired,
            // as a fallback for when the initial AJAX call fails
        }
    });

    $('a[id^="carouselSlide"]').click(function(event) {
        // prevent clicking from scrolling the page
        event.preventDefault();

        $('a[id^="carouselSlide"]').css("color", "#fff");

        $(this).css("color", "#fefab3");

        // grab the ID of the clicked element and slice out the number on the end of it to determine which JSON
        // element to retrieve

        var linkId = $(this).attr("id");
        linkId = linkId.slice(-2);

        $.ajax({
            url: 'datasource/carousel.json',
            cache: false,
            success: function(data) {
                carouselCaption = data[linkId].caption;
                carouselImage = data[linkId].image;
            },
            error: function() {
                alert("Data could not be loaded.");
            }
        });

        // fade out the current caption, then the image, and then fade them back in with the new content. we could
        // also do them simultaneously, but I think the one-at-a-time method looks snazzy

        $(".carouselCaption").fadeOut("slow", function() {
            $("#carouselRight").fadeOut("slow", function() {
                $(this).attr("src", carouselImage).fadeIn("slow");
            });
            
            $(this).html(carouselCaption).fadeIn("slow");
        });

    });

});
