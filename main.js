import { MarkerClusterer } from "@googlemaps/markerclusterer";

let map;

window.onGoogleMapsApiLoaded = async function () {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("Elemento #map não encontrado.");
    return;
  }

  map = new google.maps.Map(mapDiv, {
    center: { lat: -23.55, lng: -46.63 },
    zoom: 10,
    mapId: "DEMO_MAP_ID", // Pode deixar sem se não tiver um
  });

  const locations = [
    { position: { lat: -23.55, lng: -46.63 }, title: "Local A" },
    { position: { lat: -23.56, lng: -46.64 }, title: "Local B" },
    { position: { lat: -23.57, lng: -46.65 }, title: "Local C" },
  ];

  const svgPin = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    </svg>`;

  const markers = locations.map((loc) => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: loc.position,
      map,
      title: loc.title,
      content: new DOMParser().parseFromString(svgPin, "image/svg+xml").documentElement,
    });

    return marker;
  });

  new MarkerClusterer({ map, markers });
};
