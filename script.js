const locations = [
  { lat: 18.8040788, lng: 100.7877376, title: "RMUTL NAN" },
  { lat: 18.8029839, lng: 100.7898941, title: "Place 1" },
  { lat: 18.801578, lng: 100.7852763, title: "Place 2" },
  { lat: 18.7983775, lng: 100.78845, title: "Place 3" },
];

const center = { lat: 18.8049498, lng: 100.7882792, title: "I'm here" };

// Get element
const geopos = document.querySelector("#geopos");
const desPoint = document.querySelector("#distancepoint");
const status = document.querySelector("#status");

function initMap() {
  const mapOptions = { zoom: 16, center: center };
  // Set default location
  status.innerHTML = "เลือกจุดหมาย";
  geopos.innerHTML = center.title;

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  const centerMarker = new google.maps.Marker({
    position: center,
    map,
    icon: "https://img.icons8.com/office/1x/user.png",
  });

  const infowindow_geo = new google.maps.InfoWindow({
    position: center,
    content: center.title,
  });

  infowindow_geo.open({
    anchor: centerMarker,
  });

  locations.forEach((item) => {
    const position = new google.maps.LatLng(item.lat, item.lng);
    const marker = new google.maps.Marker({
      position: position,
    });

    const infowindow = new google.maps.InfoWindow({
      content: item.title,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });

      chooseLocation(item.lat, item.lng, item.title);
    });

    marker.setMap(map);
  });
}

// เลือกสานที่
function chooseLocation(lat, lng, title) {
  desPoint.innerHTML = title;

  // วัดระยะทาง
  var origin1 = new google.maps.LatLng(center.lat, center.lng);
  var origin2 = center.title;
  var destinationA = title;
  var destinationB = new google.maps.LatLng(lat, lng);

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: "DRIVING",
    },
    getDistance
  );

  function getDistance(res, status) {
    const distance = document.querySelector("#distance");
    const time = document.querySelector("#time");
    const address = document.querySelector("#address");
    if (status === "OK") {
      address.innerHTML = res.destinationAddresses[1];
      distance.innerHTML = res.rows[0].elements[1].distance.text;
      time.innerHTML = res.rows[0].elements[1].duration.text;
    }
  }
}

initMap();
