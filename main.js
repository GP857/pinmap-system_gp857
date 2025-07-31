// main.js

// Importa os outros módulos. Isso funciona porque o index.html carrega este script como type="module".
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';
import { usuarios } from './dados.js';

// Anexa a função initMap DIRETAMENTE ao objeto window.
// Isso a torna global e encontrável pela API do Google, que é carregada logo após este script.
window.initMap = async function() {
    
    // Declara as variáveis principais que serão usadas dentro desta função.
    let map;
    let sistemaBuscaGoogleMaps;

    // 1. Importar todas as bibliotecas da API do Google necessárias.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { MarkerClusterer } = await google.maps.importLibrary("markerclusterer");

    // 2. Inicializar o mapa.
    map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 }, // Centro do Brasil
        zoom: 4, // Zoom para ver o país todo
        mapId: "4e6d7b9df89250e7ae048791" // SEU MAP ID REAL
    });

    // 3. Inicializar o sistema de busca (que carregará suas próprias bibliotecas).
    sistemaBuscaGoogleMaps = await inicializarSistemaBuscaGoogleMaps(map);
    console.log('✔️ Sistema PINMAP totalmente inicializado.');

    // 4. Lógica da Interface (configura os event listeners para os botões).
    const header = document.getElementById('header');
    const toggleHeaderBtn = document.getElementById('toggle-header-btn');
    const headerIcon = toggleHeaderBtn.querySelector('i');

    toggleHeaderBtn.addEventListener('click', () => {
        header.classList.toggle('hidden');
        headerIcon.className = header.classList.contains('hidden') ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        headerIcon.title = header.classList.contains('hidden') ? 'Mostrar Cabeçalho' : 'Ocultar Cabeçalho';
    });

    const mapStats = document.getElementById('map-stats');
    const toggleStatsBtn = document.getElementById('toggle-stats-btn');
    const statsIcon = toggleStatsBtn.querySelector('i');

    toggleStatsBtn.addEventListener('click', () => {
        mapStats.classList.toggle('hidden');
        statsIcon.className = mapStats.classList.contains('hidden') ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        statsIcon.title = mapStats.classList.contains('hidden') ? 'Mostrar Estatísticas' : 'Ocultar Estatísticas';
    });

    const rotateLeftBtn = document.getElementById('rotate-left-btn');
    const rotateRightBtn = document.getElementById('rotate-right-btn');
    const resetRotationBtn = document.getElementById('reset-rotation-btn');

    rotateLeftBtn.addEventListener('click', () => map.setHeading(map.getHeading() - 15));
    rotateRightBtn.addEventListener('click', () => map.setHeading(map.getHeading() + 15));
    resetRotationBtn.addEventListener('click', () => map.setHeading(0));

    // 5. Carregar e exibir os marcadores do arquivo de dados.
    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow(); // Cria uma única InfoWindow para ser reutilizada.

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

        // 6. Agrupar os marcadores com o MarkerClusterer.
        new MarkerClusterer({ markers: mapMarkers, map });
        console.log(`📍 ${mapMarkers.length} marcadores carregados e agrupados.`);
    } else {
        console.warn('⚠️ Nenhum usuário encontrado em dados.js.');
    }
};
