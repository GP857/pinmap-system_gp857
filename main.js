// main.js - Versão Simplificada (Sem Módulos)

// ==================================================================
// CONTEÚDO DO DADOS.JS (colado diretamente aqui)
// ==================================================================
const usuarios = [
  {
    "id": 1,
    "nome": "Juliane Ap. Cyrilo Cunha",
    "cidade": "Paulínia",
    "estado": "SP",
    "latitude": -22.744338,
    "longitude": -47.1767203,
    "descricao": "Usuário da cidade de Paulínia.",
    "link": "https://www.google.com/maps/search/?api=1&query=-22.744338,-47.1767203",
    "icone": "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
  },
  {
    "id": 2,
    "nome": "João Paulo de Moraes",
    "cidade": "Campinas",
    "estado": "SP",
    "latitude": -22.9320985,
    "longitude": -47.0762548,
    "descricao": "Usuário da cidade de Campinas.",
    "link": "https://www.google.com/maps/search/?api=1&query=-22.9320985,-47.0762548",
    "icone": "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  }
  // Adicione mais usuários aqui se necessário
];


// ==================================================================
// FUNÇÃO DE INICIALIZAÇÃO (agora garantida de ser global )
// ==================================================================
async function initMap() {
    console.log("initMap foi chamada. A API do Google está pronta.");

    // Importa as bibliotecas da API do Google.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { MarkerClusterer } = await google.maps.importLibrary("markerclusterer");

    // Inicializa o mapa.
    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791" // SEU MAP ID
    });

    // Lógica dos botões da interface (código original)
    const header = document.getElementById('header');
    const toggleHeaderBtn = document.getElementById('toggle-header-btn');
    if (toggleHeaderBtn) {
        toggleHeaderBtn.addEventListener('click', () => header.classList.toggle('hidden'));
    }
    // Adicione a lógica dos outros botões aqui se desejar.

    // Carrega os marcadores.
    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        const mapMarkers = usuarios.map(data => {
            const pinIcon = document.createElement('img');
            pinIcon.src = data.icone;
            pinIcon.className = 'custom-marker-icon';

            const marker = new AdvancedMarkerElement({
                position: { lat: data.latitude, lng: data.longitude },
                map: map,
                title: data.nome,
                content: pinIcon,
            });

            marker.addListener('click', () => {
                const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank">Ver no Google Maps</a>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        new MarkerClusterer({ markers: mapMarkers, map });
        console.log(`📍 ${mapMarkers.length} marcadores carregados e agrupados.`);
    }
}
