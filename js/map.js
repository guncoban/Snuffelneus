const googleApiKey = 'AIzaSyCHo5c-LRxqHqogNlDqMGvxA1JKLLp3V2U';
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = `//maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback=initMap`;
document.body.appendChild(script);

const contentString = 'haha';

function initMap() {
    const instance = axios.create({
        baseURL: 'http://145.24.222.50:8000/api/',
        headers: {"Access-Control-Allow-Origin": "*"},
        timeout: 5000
    });

    instance.get('/measurements')
        .then(function(response) {
            var pinsData = response.data;
            const marker = new google.maps.Marker({
                position = {
                    lat = pinsData[0].latitude
                }
            });
            console.log(lat);
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
    ;

    const map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 12,
            center: {
                lat: 51.929433,
                lng: 4.488680,
            },
        },
    );

    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
    });

    const marker = new google.maps.Marker({
        position: {
            lat: 51.929431,
            lng: 4.488679,
        },
        map,
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}
