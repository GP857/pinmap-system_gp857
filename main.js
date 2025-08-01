// main.js

// Importa a função inicializarSistemaBuscaGoogleMaps do sistemaBuscaGoogleMaps.js
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';
// Importa a lista de usuários do ficheiro dados.js
import { usuarios } from './dados.js';

let map; // Variável global para o mapa do Google
let sistemaBuscaGoogleMaps; // Variável global para o sistema de busca

// A função 'initMap' é o ponto de entrada principal,
// e será chamada automaticamente pela API do Google Maps após o seu carregamento.
window.initMap = async function() {
    console.log("Sistema de Busca Avançado (Google Maps) carregado - PINMAP v5.2");

    // Agora que a API carregou, o objeto 'google' está definido.
    // Importamos as bibliotecas necessárias para o mapa.
    try {
        const { Map, InfoWindow } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        
        // A biblioteca MarkerClusterer é importada como um módulo separado no index.html,
        // por isso a sua classe já está disponível no escopo global.
        
        // Inicializa o mapa do Google
        map = new Map(document.getElementById('map'), {
            center: { lat: -23.55052, lng: -46.633309 },
            zoom: 12,
            mapId: "4e6d7b9df89250e7ae048791" // <--- SEU MAP ID REAL FOI INSERIDO AQUI
        });

        // Verifica se o mapa foi inicializado corretamente
        if (map instanceof Map) {
            console.log('✔️ O objeto "map" é uma instância válida de google.maps.Map.');
        } else {
            console.error('❌ O objeto "map" NÃO é uma instância válida de google.maps.Map.');
            return; // Interrompe a execução se o mapa não for válido
        }

        // Inicializa o sistema de busca
        sistemaBuscaGoogleMaps = inicializarSistemaBuscaGoogleMaps(map);

        // --- Lógica para os botões e estatísticas do cabeçalho ---
        const header = document.getElementById('header');
        const toggleHeaderBtn = document.getElementById('toggle-header-btn');
        const headerIcon = toggleHeaderBtn.querySelector('i');

        toggleHeaderBtn.addEventListener('click', () => {
            header.classList.toggle('hidden');
            headerIcon.classList.toggle('fa-chevron-up');
            headerIcon.classList.toggle('fa-chevron-down');
            headerIcon.title = header.classList.contains('hidden') ? 'Mostrar Cabeçalho' : 'Ocultar Cabeçalho';
        });

        const mapStats = document.getElementById('map-stats');
        const toggleStatsBtn = document.getElementById('toggle-stats-btn');
        const statsIcon = toggleStatsBtn.querySelector('i');

        toggleStatsBtn.addEventListener('click', () => {
            mapStats.classList.toggle('hidden');
            statsIcon.classList.toggle('fa-chevron-up');
            statsIcon.classList.toggle('fa-chevron-down');
            statsIcon.title = mapStats.classList.contains('hidden') ? 'Mostrar Estatísticas' : 'Ocultar Estatísticas';
        });

        const zoomLevelSpan = document.getElementById('zoom-level');
        const centerCoordsSpan = document.getElementById('center-coords');
        const visibleMarkersSpan = document.getElementById('visible-markers');

        const updateMapStats = () => {
            if (map) {
                zoomLevelSpan.textContent = map.getZoom();
                const center = map.getCenter();
                centerCoordsSpan.textContent = `${center.lat().toFixed(4)}, ${center.lng().toFixed(4)}`;
                visibleMarkersSpan.textContent = 'N/A (Lógica necessária)';
            }
        };

        map.addListener('zoom_changed', updateMapStats);
        map.addListener('center_changed', updateMapStats);
        updateMapStats();

        // --- Lógica para os botões de rotação ---
        const rotateLeftBtn = document.getElementById('rotate-left-btn');
        const rotateRightBtn = document.getElementById('rotate-right-btn');
        const resetRotationBtn = document.getElementById('reset-rotation-btn');

        if (rotateLeftBtn && rotateRightBtn && resetRotationBtn) {
            rotateLeftBtn.addEventListener('click', () => map.setHeading(map.getHeading() - 15));
            rotateRightBtn.addEventListener('click', () => map.setHeading(map.getHeading() + 15));
            resetRotationBtn.addEventListener('click', () => map.setHeading(0));
        }

        // --- Lógica para carregar marcadores do dados.js ---
        console.log('Iniciando carregamento de marcadores...');
        if (usuarios && usuarios.length > 0) {
            console.log(`Variável 'usuarios' encontrada com ${usuarios.length} itens.`);
            
            const mapMarkers = await Promise.all(usuarios.map(async (data) => {
                const marker = new AdvancedMarkerElement({
                    position: { lat: data.latitude, lng: data.longitude },
                    map: map,
                    title: data.nome,
                    content: (() => {
                        const img = document.createElement('img');
                        img.src = data.icone;
                        img.style.width = '30px';
                        img.style.height = '30px';
                        img.alt = data.nome;
                        return img;
                    })(),
                });
                
                const infoWindowContent = document.createElement('div');
                infoWindowContent.className = 'info-window-content';
                infoWindowContent.innerHTML = `
                    <h4>${data.nome}</h4>
                    <p>${data.descricao}</p>
                    ${data.link ? `<a href="${data.link}" target="_blank" class="btn-direcoes" style="background-color: #007bff;"><i class="fas fa-map-marker-alt"></i> Ver no Google Maps</a>` : ''}
                `;
                const infoWindow = new InfoWindow({
                    content: infoWindowContent,
                    pixelOffset: new google.maps.Size(0, -30)
                });

                marker.addListener('click', () => infoWindow.open({ anchor: marker, map }));
                return marker;
            }));
            
            console.log(`Foram criados ${mapMarkers.length} objetos de marcador do Google Maps.`);
            
            new MarkerClusterer({ markers: mapMarkers, map: map });
            console.log(`📍 ${mapMarkers.length} marcadores carregados do dados.js e agrupados.`);
        } else {
            console.warn('⚠️ dados.js não contém marcadores ou não foi carregado corretamente.');
        }

    } catch (error) {
        console.error("Erro ao inicializar o mapa ou importar bibliotecas:", error);
    }
};

// Não é necessário chamar initMap() aqui, pois o callback da API fará isso.
