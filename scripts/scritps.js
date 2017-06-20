var corsanywhere = "https://cors-anywhere.herokuapp.com/";
var site = "https://api.darksky.net/forecast/fec89db37f2fcb2d5016166a49f41e82";

// example: https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=
var googleMapsTimezoneAPI_url = "https://maps.googleapis.com/maps/api/timezone/json";
var googleMapsTimezoneAPI_Key = "AIzaSyDjB2WPD36RiK2jUTMwrJyp_UlFMpUeqic";


var myLatitute = 0.00;
var myLongitute = 0.00;
var myObj = [];

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
    getForecastMessage(site, myLatitute, myLongitute, function(){return true});
    //weatherNow(myObj);
}

function getForecastMessage (pSite, pLat, pLng, callback){
    var aux= '';
    pSite = corsanywhere.concat(pSite, '/', pLat + ',' + pLng);
    $.getJSON(
        pSite,
        function (data) {
                //txt =  JSON.stringify(data);
                //$('.forecast').html(JSON.stringify(data));
                    //myObj = $.parseJSON(myObj);
                myObj = data;

                aux = myObj['currently']['precipType'];
                switch (aux) {
                    case aux = 'rain':
                        aux = "Rain Fall";
                        break;
                    case aux = 'rain':
                        aux = "Snow Fall";
                        break;
                    case aux = undefined:
                        aux = "Precipitation";
                        break;
                }


                $('.weatherNow').html(
                    '<div class="row infoNow">' +
                    '    <div class="col-xs-6"> Weather Now: </div>'+
                    '    <div class="col-xs-6">' + myObj['currently']['summary'] + ' </div>'+
                    '</div>' +

                    '    <hr>' +

                    '<div class="row">' +
                    '    <div class="col-xs-6"> Cloud Cover: </div>' +
                    '    <div class="col-xs-6"> ' + Math.round(myObj['currently']['cloudCover']) + ' %</div>' +
                    '</div>' +

                    '<div class="row">' +
                    '    <div class="col-xs-6" id="nowTemperature"> Temperature: </div>' +
                    '    <div class="col-xs-6"> ' + Math.round(myObj['currently']['temperature']) + ' ºF</div>' +
                    '</div>' +

                    '<div class="row">' +
                    '    <div class="col-xs-6"> Humidity: </div>' +
                    '    <div class="col-xs-6"> ' + Math.round(myObj['currently']['humidity'] * 100) + ' %</div>' +
                    '</div>' +

                    '<div class="row">' +
                    '    <div class="col-xs-6"> Wind Speed: </div>' +
                    '    <div class="col-xs-6"> ' +myObj['currently']['windSpeed'] + ' mph</div>' +
                    '</div>' +

                    '    <hr>' +

                    '<div class="row">' +
                    '    <div class="col-xs-6"> ' + aux + ' Probability: </div>' +
                    '    <div class="col-xs-6"> ' +Math.round(myObj['currently']['precipProbability'] * 100) + ' %</div>' +
                    '</div>'
                );

                callback();
        }
    )
}

function weatherNow (obj) {
    var txt = '';

    txt  = '<hr>';
    txt += '    <div>' + obj[0].summary + ' </div>';
    txt += '    <div id="nowTemperature"> Temperature: ' + obj[1].summary + ' ºC</div>';
    txt += '    <div> Humidity:' + obj[1].summary + ' %</div>';
    txt += '    <div> Wind Speed: ' + obj[1].summary + ' km/h</div>';
    txt += '    <div> ' + obj[1].precipType.toUpperCase() + ' Probability: ' + Math.floor(obj[1].precipProbability * 100) + ' </div>';

    $('.infoWeatherNow').html(txt);
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

