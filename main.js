// ตัวแปรแมพ
var map;
var infowindow;
// Get element
const geopos = document.querySelector("#geopos");
const desPoint = document.querySelector("#distancepoint");
const status = document.querySelector("#status");

const posCenter = { lat: 18.8018824, lng: 100.790792 };
initMap();

function initMap() {
  // Set innerHTML
  status.innerHTML = "เลือกจุดหมาย";
  geopos.innerHTML = "I' m here";
  // set center map
  const setCenterMap = {
    zoom: 15,
    center: posCenter,
  };

  map = new google.maps.Map(document.querySelector("#map"), setCenterMap);
  const infowindowCenter = new google.maps.InfoWindow({
    position: posCenter,
    content: "I'm here",
  });

  const markerCenter = new google.maps.Marker({
    position: posCenter,
    map,
    icon: "https://img.icons8.com/color/48/000000/user-male.png",
  });
  infowindowCenter.open({
    anchor: markerCenter,
  });

  setAllMarker();
}

function setAllMarker() {
  axios.get("./server.php").then((res) => {
    const arrLocations = res.data.locations;
    arrLocations.forEach((item) => {
      const lat = item[0];
      const lng = item[1];
      const title = item[2];
      const latlng = new google.maps.LatLng(lat, lng);

      //   สร้าง infowindow
      const infowindow = new google.maps.InfoWindow({
        content: title,
      });
      // สร้าง marker
      const listMarker = new google.maps.Marker({
        position: latlng,
      });

      //   สร้าง Event onclick
      listMarker.addListener("click", () => {
        infowindow.open({
          anchor: listMarker,
          map,
        });
        chooseLocation(lat, lng, title);
      });

      listMarker.setMap(map);
    });
  });
}

// เลือกสานที่
function chooseLocation(lat, lng, title) {
  desPoint.innerHTML = title;

  var origin1 = new google.maps.LatLng(posCenter.lat, posCenter.lng);
  var origin2 = "จุดเริ่มต้น";
  var destinationA = title;
  var destinationB = new google.maps.LatLng(lat, lng);

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: "DRIVING",
    },
    calDistance
  );
  function calDistance(response, status) {
    const distance = document.querySelector("#distance");
    const time = document.querySelector("#time");
    const address = document.querySelector("#address");
    if (status === "OK") {
      address.innerHTML = response.destinationAddresses[1];
      distance.innerHTML = response.rows[0].elements[1].distance.text;
      time.innerHTML = response.rows[0].elements[1].duration.text;
    }
  }
}
