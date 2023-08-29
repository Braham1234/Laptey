const coordinates = [27.630302, 85.523645];

var mymap = L.map("map").setView(coordinates, 100);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic3Zhcm5pbW4iLCJhIjoiY2tudzA5emZ2MHM1MTJua3RwNWxrcnBkYyJ9.MFj8Gf_2bum8WDk2pifwbw",
  }
).addTo(mymap);

var marker = L.marker(coordinates).addTo(mymap);
marker.bindPopup("<b>Laptey restaurant").openPopup();
