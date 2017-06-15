const googleApiKey = 'AIzaSyCHo5c-LRxqHqogNlDqMGvxA1JKLLp3V2U';
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = `//maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback=initMap`;
document.body.appendChild(script);

var tempContentString;
var markerArray = [];
var infoWindowArray = [];
moment.locale('nl');

function initMap() 
{
    var infowindow = new InfoBubble
    ({
        maxWidth: 150,
        padding: 0,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 3,
        borderColor: '#00a4ad',
        hideCloseButton: true,
    });
    const instance = axios.create
        ({
            baseURL: 'http://145.24.222.50:8000/api/',
            headers: { "Access-Control-Allow-Origin": "*" },
            timeout: 5000
        });

    instance.get('/measurements')
        .then(function (response) 
        {
            var pinsData = response.data;
            for (i = 0; i < pinsData.length; i++)
            {
                marker = new google.maps.Marker
                    ({
                        position:
                        {
                            lat: pinsData[i].location_latitude,
                            lng: pinsData[i].location_longitude,
                        },
                        map,
                    });
                google.maps.event.addListener(marker, 'click', (function (marker, i)
                {
                    return function ()
                    {
                        var tempDate = moment(pinsData[i].measurement_datetime, moment.ISO_8601);
                        tempDate = tempDate.format('LLL');
                        infowindow.setContent(`
                        <div class="Measurement">
                        <center><h2>
                            ${pinsData[i].location_address}
                        </h2></center>
                        <center><h3>
                            ${tempDate}
                        </h3></center>
                        <p class="Temperature">Temperatuur: ${pinsData[i].temperature}</p>
                        <p class="Humidity">Luchtvochtigheid: ${pinsData[i].humidity}</p>
                        <p class="Nitro">Stikstof: ${pinsData[i].nitrodioxide}</p>
                        <p class="Particulates">Luchtvochtigheid: ${pinsData[i].particulates}</p>
                        </div>
                        `);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
            console.log(response);
        })
        .catch(function (error) { console.log(error); })
        ;

    const map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 15,
            center:
            {
                lat: 51.929433,
                lng: 4.488680,
            },
            mapTypeId: 'terrain',
            styles: [ { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.neighborhood", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape.natural.landcover", "stylers": [ { "visibility": "on" } ] }, { "featureType": "landscape.natural.terrain", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "stylers": [ { "visibility": "on" }, { "weight": 2 } ] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "stylers": [ { "visibility": "on" } ] }, { "featureType": "water", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] } ]
        },
    );
}
