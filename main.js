// main.js (Versão de Compatibilidade Estável)

import { usuarios } from './dados.js';

export function initMap() {
    console.log("initMap executada com sucesso!");

    // As classes já estão disponíveis globalmente, pois foram carregadas pela URL.
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new google.maps.InfoWindow();
        
        // CORREÇÃO: Usamos o 'google.maps.Marker' legado, que é mais estável.
        const markers = usuarios.map(data => {
            const marker = new google.maps.Marker({
                position: { lat: data.latitude, lng: data.longitude },
                title: data.nome,
                icon: data.icone
            });

            marker.addListener('click', () => {
                const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank" class="btn-detalhes">Ver no Google Maps</a>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // Instancia o MarkerClusterer.
        try {
            console.log("Tentando criar clusters...");
            // A classe global é 'MarkerClusterer' (M maiúsculo).
            new MarkerClusterer({ map, markers });
            console.log("✔️ Clusters criados com sucesso.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
