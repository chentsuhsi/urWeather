var corsanywhere = "https://cors-anywhere.herokuapp.com/"
var site = "https://api.darksky.net/forecast/";
var apiKey = "fec89db37f2fcb2d5016166a49f41e82";

var myLatitute = 0;
var myLongitute = 0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $(".quote").html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    myLatitute = position.coords.latitude;
    myLongitute = position.coords.longitude;

    $(".quote").html("My position is: " + "<br>Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude);
}

function getQuote() {
    url = corsanywhere.concat(site, "/", apiKey, "/", myLatitute, ",", myLongitute );
    $.getJSON(
        url,
        function (data) {
            var html = "";

            html = JSON.stringify(data);
            $(".forecast").html(html);
        }
    )
};

$(document).ready(function() {
//    $('#getQuote').on('click', getQuote);
    getLocation();
    getQuote();
});
