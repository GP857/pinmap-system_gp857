// main.js

// Importa os dados do seu arquivo grande.
import { usuarios } from './dados.js';
// Importa o sistema de busca (se você o estiver usando).
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';

// EXPORTA a função. Não a anexa mais ao 'window' aqui.
export async function initMap() {
    console.log("initMap executada com sucesso!");

    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { MarkerClusterer } = await google.maps.importLibrary("markerclusterer");

    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791" // SEU MAP ID
    });

    // Lógica dos botões e da interface...
    // (Cole aqui a sua lógica de botões que já estava funcionando)

    // Carrega os marcadores do seu arquivo de 3000 cadastros.
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
