// main.js (Versão Final e Correta)

import { usuarios } from './dados.js';

// Exporta a função para que o loader.js possa chamá-la.
export function init() {
    console.log("init() executada com sucesso!");

    // As classes já estão disponíveis globalmente.
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new google.maps.InfoWindow();
        
        // Usa o google.maps.Marker legado para máxima compatibilidade.
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

        // Instancia o MarkerClusterer. A classe global é 'MarkerClusterer' (M maiúsculo).
        try {
            console.log("Tentando criar clusters...");
            new MarkerClusterer({ map, markers });
            console.log("✔️ Clusters criados com sucesso.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
