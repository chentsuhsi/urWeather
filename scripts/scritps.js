var corsanywhere = "https://cors-anywhere.herokuapp.com/";
var site = "https://api.darksky.net/forecast/fec89db37f2fcb2d5016166a49f41e82";

// example: https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=
var googleMapsTimezoneAPI_url = "https://maps.googleapis.com/maps/api/timezone/json";
var googleMapsTimezoneAPI_Key = "AIzaSyDjB2WPD36RiK2jUTMwrJyp_UlFMpUeqic";


var myLatitute = 0.00;
var myLongitute = 0.00;
var myTimezone = "";
var myTimezoneName = "";
var myCity = "";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $(".quote").html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    setMyPositions(position.coords.latitude,position.coords.longitude, function(){ return true} );
    showLocation(myLatitute, myLongitute, function(){return true});

    url = corsanywhere.concat(site, "/", myLatitute + "," + myLongitute);
    var html = url;
    $(".forecast").html(html + "<br>");

    $.getJSON(
        url,
        function (data) {
            html += JSON.stringify(data);
            $(".forecast").html(html);
        }
    )
}

function setMyPositions(lat, lng, callback) {
    myLatitute = lat;
    myLongitute = lng;
    callback();
}

function showLocation(lat, lng, callback) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                /*
                 alert(results[0].formatted_address);
                 alert(results[0].address_components[0].long_name) -> number;
                 alert(results[0].address_components[1].long_name) -> street;
                 alert(results[0].address_components[2].long_name) -> city;
                 alert(results[0].address_components[3].long_name) -> county;
                 alert(results[0].address_components[4].long_name) -> state;
                 alert(results[0].address_components[5].long_name) -> country;
                 alert(results[0].address_components[6].long_name) -> postal_code;
                 alert(results[0].address_components[6].long_name) -> postal_code_suffix;
                 */
                $(".myLocation").html(
                    "City   : " + results[0].address_components[2].long_name + "<br>" +
                    "State  : " + results[0].address_components[4].long_name + "<br>" +
                    "Country: " + results[0].address_components[5].long_name + "<br>"
                );
            } else {
                $(".myLocation").html(
                    "My position is: " + "<br>Latitude: " + myLatitute + ", Longitude: " + myLongitute);
            }
        } else {
            $(".myLocation").html(
                "My position is: " + "<br>Latitude: " + myLatitute + ", Longitude: " + myLongitute + "<br>" +
                "Geocoder failed due to: " + status);
        }
    });
    callback();
}

function errorFunction(){
    alert("Geocoder failed");
}

function initialize() {
    geocoder = new google.maps.Geocoder();
}

$(document).ready(function() {
//    $('#getQuote').on('click', getQuote);
    getLocation();
});

