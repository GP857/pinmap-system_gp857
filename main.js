import { usuarios } from './dados.js';

export function init() {
  console.log("init() executada com sucesso!");

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -14.2350, lng: -51.9253 },
    zoom: 4,
    mapId: "4e6d7b9df89250e7ae048791"
  });

  if (usuarios && usuarios.length > 0) {
    const infoWindow = new google.maps.InfoWindow();

    const markers = usuarios.map(data => {
      // Criação do novo marcador avançado
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: data.latitude, lng: data.longitude },
        map,
        title: data.nome,
        content: criarElementoPersonalizado(data) // opcional, se quiser ícone customizado
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

    try {
      console.log("Tentando criar clusters com renderer customizado (modo avançado)...");

      new MarkerClusterer(map, markers, {
        renderer: {
          render: ({ count, position }) => {
            return new google.maps.marker.AdvancedMarkerElement({
              position,
              map,
              title: `${count} locais`,
              content: criarCluster(count)
            });
          }
        }
      });

      console.log("✔️ Clusters configurados com AdvancedMarkerElement.");
    } catch (e) {
      console.error("Falha ao criar os clusters:", e);
    }
  }
}

// Cria um elemento visual para o marcador avançado (pode ser um ícone ou bolha)
function criarElementoPersonalizado(data) {
  const div = document.createElement('div');
  div.className = 'custom-marker';
  div.style.backgroundImage = `url(${data.icone})`;
  div.style.width = '32px';
  div.style.height = '32px';
  div.style.backgroundSize = 'cover';
  div.style.borderRadius = '50%';
  return div;
}

// Cria um cluster visual
function criarCluster(count) {
  const div = document.createElement('div');
  div.className = 'cluster-marker';
  div.textContent = count;
  div.style.background = '#4285F4';
  div.style.color = 'white';
  div.style.fontSize = '12px';
  div.style.width = '40px';
  div.style.height = '40px';
  div.style.borderRadius = '50%';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';
  div.style.boxShadow = '0 0 4px rgba(0,0,0,0.3)';
  return div;
}
