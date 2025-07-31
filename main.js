// main.js (Versão Final e Correta)

import { usuarios } from './dados.js';

export async function initMap() {
    console.log("initMap executada com sucesso!");

    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        const markers = usuarios.map(data => {
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

        // CORREÇÃO FINAL: A classe é anexada diretamente ao 'window'.
        // A chamamos simplesmente por 'MarkerClusterer' (com M maiúsculo).
        try {
            console.log("Tentando criar clusters...");
            new MarkerClusterer({ map, markers });
            console.log("✔️ Clusters criados com sucesso.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
