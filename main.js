import { usuarios } from './usuarios.js';

function initMap() {
  const mapa = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -22.9099, lng: -47.0626 },
    zoom: 8,
  });

  usuarios.forEach(usuario => {
    const marker = new google.maps.Marker({
      position: { lat: usuario.latitude, lng: usuario.longitude },
      map: mapa,
      title: usuario.nome,
    });
  });
}

window.initMap = initMap;
