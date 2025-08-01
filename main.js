import { usuarios } from './usuarios.js';

function initMap() {
  const mapa = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -22.9, lng: -47.05 },
    zoom: 9,
  });

  const infoWindow = new google.maps.InfoWindow();

  usuarios.forEach(usuario => {
    const marker = new google.maps.Marker({
      position: { lat: usuario.latitude, lng: usuario.longitude },
      map: mapa,
      title: usuario.nome,
    });

    marker.addListener('click', () => {
      infoWindow.setContent(`
        <div>
          <strong>${usuario.nome}</strong><br>
          ${usuario.cidade}, ${usuario.estado}<br>
          <a href="${usuario.link}" target="_blank">Ver no mapa</a>
        </div>
      `);
      infoWindow.open(mapa, marker);
    });
  });
}

window.initMap = initMap;
