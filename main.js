// main.js (Versão Híbrida Final)

import { usuarios } from './dados.js';
// import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';

export async function initMap() {
    console.log("initMap executada com sucesso!");

    // 1. Importa apenas as bibliotecas que funcionam.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    // A linha que importava o MarkerClusterer foi REMOVIDA.

    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        const mapMarkers = usuarios.map(data => {
            const marker = new AdvancedMarkerElement({
                position: { lat: data.latitude, lng: data.longitude },
                map: map,
                title: data.nome,
            });
            marker.addListener('click', () => {
                const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank">Ver no Google Maps</a>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // 2. Usa a classe MarkerClusterer diretamente do escopo global.
        //    O nome da classe global é 'MarkerClusterer'.
        new markerClusterer.MarkerClusterer({ markers: mapMarkers, map });
        console.log(`📍 ${mapMarkers.length} marcadores carregados e agrupados.`);
    }
}
