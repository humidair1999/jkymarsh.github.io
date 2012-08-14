/* Author: J. Ky Marsh

*/

$(function() {
    $('.social_icons_tipsy').tipsy({gravity: $.fn.tipsy.autoNS});
});

$('.portfolio_container').click(function() {
    var findDivInt = $(this).attr('id');
    var portfolioInt = findDivInt.match(/[0-9 -()+]+$/);
    portfolioInt = parseInt(portfolioInt);

    // console.log(portfolioInt);

    var numDivs = $('div[id*="portfolio_item_"]').length;

    // console.log(numDivs);

    for (var i=1; i <= numDivs; i++) {
        $('#portfolio_item_' + i).toggle('slow', function() {});
    }

    $('#portfolio_item_' + portfolioInt).toggle('slow', function() {});
    $('.portfolio_item_' + portfolioInt + "_container").toggle('slow', function() {});

    $('.portfolio_help').toggle('slow', function() {});

    $('div[class*="tweets"]').toggle('slow', function() {});
});

$(function() {
    var tweet = "";
    var date, diff, hour_diff;

    $.getJSON("http://twitter.com/status/user_timeline/jkymarsh.json?count=4&callback=?",
        function(data) {
            $.each(data, function(i,item) {
                tweet += "<p> " + item.text + " </p>";

                date = parseDate(item.created_at),
                    diff = (((new Date()).getTime() - date.getTime()) / 1000),
                    hour_diff = Math.floor(diff / 3600);

                function parseDate(str) {
                    var v = str.split(' ');
                    return new Date(Date.parse(v[1] + " " + v[2] + ", " + v[5] + " " + v[3] + " UTC"));
                } 

                tweet += "<span class='tweets_timestamp'>" + hour_diff + " hours ago</span>";
            });

            tweet = tweet.replace(/(^|\s)@(\w+)/g, "$1<a href='http://twitter.com/$2' target='_blank'>@$2</a>");
            tweet = tweet.replace(/(^|\s)#(\w+)/g, "$1<a href='http://twitter.com/search/%23$2' target='_blank'>#$2</a>");

            $('.tweets').append(tweet);
        }
    );
});