import { usuarios } from './dados.js';

export function init() {
  console.log("init() executada com sucesso!");

  // Inicializa o mapa no centro do Brasil
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -14.2350, lng: -51.9253 },
    zoom: 4,
    mapId: "4e6d7b9df89250e7ae048791"
  });

  if (usuarios && usuarios.length > 0) {
    const infoWindow = new google.maps.InfoWindow();

    // Cria os marcadores
    const markers = usuarios.map(data => {
      const marker = new google.maps.Marker({
        position: { lat: data.latitude, lng: data.longitude },
        title: data.nome,
        icon: data.icone
      });

      marker.addListener('click', () => {
        const content = `
          <h4>${data.nome}</h4>
          <p>${data.descricao}</p>
          <a href="${data.link}" target="_blank" class="btn-detalhes">Ver no Google Maps</a>
        `;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      return marker;
    });

    // Aplica clustering com renderer customizado (estrutura correta do markerclustererplus)
    try {
      console.log("Tentando criar clusters com renderer customizado...");

      new MarkerClusterer(map, markers, {
        renderer: {
          render: ({ count, position }) => {
            return new google.maps.Marker({
              position,
              label: {
                text: String(count),
                color: "white",
                fontSize: "12px"
              },
              map: map,
              zIndex: 1000 + count,
              icon: {
                url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
                anchor: new google.maps.Point(27, 26),
                scaledSize: new google.maps.Size(53, 52)
              }
            });
          }
        }
      });

      console.log("✔️ Clusters configurados com renderer.");
    } catch (e) {
      console.error("Falha ao criar os clusters:", e);
    }
  }
}
