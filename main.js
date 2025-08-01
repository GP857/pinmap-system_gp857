function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -22.9, lng: -47.05 },
    zoom: 10,
    mapId: "DEMO_MAP_ID"
  });

  const infoWindow = new google.maps.InfoWindow();
  const markers = usuarios.map(usuario => {
    const marker = new google.maps.Marker({
      position: { lat: usuario.latitude, lng: usuario.longitude },
      icon: usuario.icone,
      title: usuario.nome,
    });

    marker.addListener("click", () => {
      infoWindow.setContent(`
        <strong>${usuario.nome}</strong><br>
        ${usuario.localizacao}<br>
        <a href="${usuario.link}" target="_blank">Ver no mapa</a>
      `);
      infoWindow.open(map, marker);
    });

    return marker;
  });

  new markerClusterer.MarkerClusterer({ map, markers });
}
