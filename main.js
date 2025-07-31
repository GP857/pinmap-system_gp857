// main.js

// 1. Importe os outros módulos primeiro.
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';
import { usuarios } from './dados.js';

// 2. Exporte a função initMap para que o loader.js possa importá-la.
export async function initMap() {
    // 3. Declare as variáveis principais DENTRO da função.
    let map;
    let sistemaBuscaGoogleMaps;

    // --- O resto do seu código original vai aqui, sem alterações ---

    // Importar todas as bibliotecas necessárias para a visualização inicial
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { MarkerClusterer } = await google.maps.importLibrary("markerclusterer");

    // Inicializar o mapa
    map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 }, // Centro do Brasil
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791" // SEU MAP ID
    });

    // Inicializar o sistema de busca
    sistemaBuscaGoogleMaps = await inicializarSistemaBuscaGoogleMaps(map);
    console.log('✔️ Sistema PINMAP totalmente inicializado.');

    // Lógica da Interface (event listeners para botões, etc.)
    const header = document.getElementById('header');
    const toggleHeaderBtn = document.getElementById('toggle-header-btn');
    const headerIcon = toggleHeaderBtn.querySelector('i');

    toggleHeaderBtn.addEventListener('click', () => {
        header.classList.toggle('hidden');
        headerIcon.className = header.classList.contains('hidden') ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        headerIcon.title = header.classList.contains('hidden') ? 'Mostrar Cabeçalho' : 'Ocultar Cabeçalho';
    });

    // ... (resto dos seus event listeners) ...

    // Carregar e exibir os marcadores do arquivo de dados
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
                const content = `
                    <div class="info-window-content">
                        <h4>${data.nome}</h4>
                        <p>${data.descricao}</p>
                        <a href="${data.link}" target="_blank" class="btn-detalhes">Ver no Google Maps</a>
                    </div>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // Agrupar os marcadores com o MarkerClusterer
        new MarkerClusterer({ markers: mapMarkers, map });
        console.log(`📍 ${mapMarkers.length} marcadores carregados e agrupados.`);
    } else {
        console.warn('⚠️ Nenhum usuário encontrado em dados.js.');
    }
}
