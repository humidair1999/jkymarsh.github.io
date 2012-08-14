require(["jquery"], function($) {
    
    // initialize our variables used across all functions

    var sliderCaption = "", sliderImage = "", thumbnailList = "";

    // initial AJAX call to a (pretend) remote datasource to retrieve the default contents of the slider

    $.ajax({
        url: 'datasource/slider.json',
        cache: false,
        success: function(data) {
            $.each(data, function(i, item) {
                
                sliderCaption = data[i].caption;
                sliderImage = data[i].image;
            
                thumbnailList +=    "<li>" +
                                    "<a href='#' id='sliderThumb" + i + "' tabindex>" +
                                    "<img src='" + sliderImage + "' alt='" + sliderCaption + "' class='clickThumbs inactiveSlide' /></a>" +
                                    "</li>";

                $(".allThumbsList").html(thumbnailList);
                $("#sliderThumb01").children("img").toggleClass("activeSlide");
            });

            // invoke our interactive functions within the success case, as they won't be used at all if an error is returned

            sliderThumbClicked();
            arrowsClicked();
        },
        error: function() {
            alert("Data could not be loaded.");

            // we could also dump out a bunch of placeholder captions/images in the case of AJAX GET failure, but for the sake
            // of simplicity, we'll assume our request is always going to work
        }
    });

    function sliderThumbClicked() {
        $('a[id^="sliderThumb"]').click(function(event) {
            // prevent clicking from scrolling the page
            event.preventDefault();

            $('a[id^="sliderThumb"]').children("img").removeClass("activeSlide");
            $(this).children("img").addClass("activeSlide");

            // grab the ID of the clicked element and slice out the number on the end of it to determine which JSON
            // element to retrieve

            var linkId = $(this).attr("id");
            linkId = linkId.slice(-2);

            placeContent(linkId);

        });
    }

    function arrowsClicked() {
        $('a[id="rightArrow"]').click(function(event) {
            // prevent clicking from scrolling the page
            event.preventDefault();
            
            var currentActive = $('img.activeSlide').parent('a').attr('id');

            var currentActiveSlice = currentActive.slice(-2);
            currentActiveSlice = Number(currentActiveSlice);

            var nextActiveSlice = (currentActiveSlice + 1);

            // we could actually leave nextActiveSlice a number, but for the sake of ubiquity and unified parameters, we'll
            // toss it back into a string

            nextActiveSlice = nextActiveSlice.toString();
            nextActiveSlice = ("0" + nextActiveSlice);

            if (nextActiveSlice === "04") {
                nextActiveSlice = "01";
            }

            $("#" + currentActive).children("img").removeClass("activeSlide");
            $("#sliderThumb" + nextActiveSlice).children("img").addClass("activeSlide");

            var linkId = nextActiveSlice;

            placeContent(linkId);

        });

        $('a[id="leftArrow"]').click(function(event) {
            // prevent clicking from scrolling the page
            event.preventDefault();
            
            var currentActive = $('img.activeSlide').parent('a').attr('id');

            var currentActiveSlice = currentActive.slice(-2);
            currentActiveSlice = Number(currentActiveSlice);

            var prevActiveSlice = (currentActiveSlice - 1);

            prevActiveSlice = prevActiveSlice.toString();
            prevActiveSlice = ("0" + prevActiveSlice);

            if (prevActiveSlice === "00") {
                prevActiveSlice = "03";
            }

            $("#" + currentActive).children("img").removeClass("activeSlide");
            $("#sliderThumb" + prevActiveSlice).children("img").addClass("activeSlide");

            var linkId = prevActiveSlice;

            placeContent(linkId);

        });
    }

    function placeContent(linkId) {
        $.ajax({
                url: 'datasource/slider.json',
                cache: false,
                success: function(data) {
                    sliderCaption = data[linkId].caption;
                    sliderImage = data[linkId].image;
                },
                error: function() {
                    alert("Data could not be loaded.");
                }
        });

        // fade out the current caption, then the image, and then fade them back in with the new content. we could
        // also do them simultaneously, but I think the one-at-a-time method looks snazzy

        $(".sliderCaption").fadeOut("slow", function() {
            $(".sliderCurrent").fadeOut("slow", function() {
                $(this).css("background", "url(" + sliderImage + ") no-repeat").fadeIn("slow", function() {
                    $(".sliderCaption").html(sliderCaption).fadeIn("slow");
                });
            });
        });
    }

});