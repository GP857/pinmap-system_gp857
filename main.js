// main.js

// Importa a função inicializarSistemaBuscaGoogleMaps do sistemaBuscaGoogleMaps.js
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';
// Importa a lista de usuários do ficheiro dados.js (assumindo que exporta 'usuarios')
// import { usuarios } from './dados.js';
// IMPORTANTE: Importa a classe MarkerClusterer como um módulo
import { MarkerClusterer } from 'https://unpkg.com/@googlemaps/markerclusterer@2.0.0/dist/index.min.js';

let map; // Variável global para o mapa do Google
let sistemaBuscaGoogleMaps; // Variável global para o sistema de busca
// Assumimos que 'usuarios' é uma variável global definida em dados.js

// A função 'initMap' é o ponto de entrada principal.
// É atribuída a `window.initMap` para que a API do Google Maps,
// carregada com `callback=initMap`, consiga encontrá-la.
window.initMap = async function() {
    console.log("Sistema de Busca Avançado (Google Maps) carregado - PINMAP v5.2");

    try {
        const { Map, InfoWindow } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        
        // Inicializa o mapa do Google
        map = new Map(document.getElementById('map'), {
            center: { lat: -23.55052, lng: -46.633309 },
            zoom: 12,
            mapId: "4e6d7b9df89250e7ae048791" // Substitua pelo seu Map ID
        });

        if (map instanceof Map) {
            console.log('✔️ O objeto "map" é uma instância válida de google.maps.Map.');
        } else {
            console.error('❌ O objeto "map" NÃO é uma instância válida de google.maps.Map.');
            return; 
        }

        // Inicializa o sistema de busca (a ser implementado)
        // sistemaBuscaGoogleMaps = inicializarSistemaBuscaGoogleMaps(map);

        // --- Lógica para os botões e estatísticas do cabeçalho ---
        const header = document.getElementById('header');
        const toggleHeaderBtn = document.getElementById('toggle-header-btn');
        const headerIcon = toggleHeaderBtn.querySelector('i');

        if (toggleHeaderBtn) {
            toggleHeaderBtn.addEventListener('click', () => {
                header.classList.toggle('hidden');
                headerIcon.classList.toggle('fa-chevron-up');
                headerIcon.classList.toggle('fa-chevron-down');
                headerIcon.title = header.classList.contains('hidden') ? 'Mostrar Cabeçalho' : 'Ocultar Cabeçalho';
            });
        }

        const mapStats = document.getElementById('map-stats');
        const toggleStatsBtn = document.getElementById('toggle-stats-btn');
        const statsIcon = toggleStatsBtn.querySelector('i');

        if (toggleStatsBtn) {
            toggleStatsBtn.addEventListener('click', () => {
                mapStats.classList.toggle('hidden');
                statsIcon.classList.toggle('fa-chevron-up');
                statsIcon.classList.toggle('fa-chevron-down');
                statsIcon.title = mapStats.classList.contains('hidden') ? 'Mostrar Estatísticas' : 'Ocultar Estatísticas';
            });
        }

        const zoomLevelSpan = document.getElementById('zoom-level');
        const centerCoordsSpan = document.getElementById('center-coords');
        const visibleMarkersSpan = document.getElementById('visible-markers');

        const updateMapStats = () => {
            if (map && zoomLevelSpan && centerCoordsSpan) {
                zoomLevelSpan.textContent = map.getZoom();
                const center = map.getCenter();
                centerCoordsSpan.textContent = `${center.lat().toFixed(4)}, ${center.lng().toFixed(4)}`;
                if (visibleMarkersSpan) {
                    visibleMarkersSpan.textContent = 'N/A (Lógica necessária)';
                }
            }
        };

        if (map) {
            map.addListener('zoom_changed', updateMapStats);
            map.addListener('center_changed', updateMapStats);
            updateMapStats();
        }

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
        // Verifique se a variável global 'usuarios' existe
        if (typeof usuarios !== 'undefined' && usuarios.length > 0) {
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
            
            // Usando a classe MarkerClusterer importada
            new MarkerClusterer({ markers: mapMarkers, map: map });
            console.log(`📍 ${mapMarkers.length} marcadores carregados do dados.js e agrupados.`);
        } else {
            console.warn('⚠️ dados.js não contém marcadores ou não foi carregado corretamente.');
        }

    } catch (error) {
        console.error("Erro ao inicializar o mapa ou importar bibliotecas:", error);
    }
};
