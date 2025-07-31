// main.js (Versão Final Corrigida)

import { usuarios } from './dados.js';
// Se você não estiver usando o sistema de busca, pode remover a linha abaixo.
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';

export async function initMap() {
    console.log("initMap executada com sucesso!");

    // 1. Importa as bibliotecas essenciais da API do Google.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    // A linha que importava o MarkerClusterer foi removida, pois ele é carregado globalmente.

    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791" // Seu Map ID
    });

    // Lógica da interface do usuário (botões, etc.)
    // (Seu código de botões existente vai aqui)

    // 2. Carrega os marcadores do seu arquivo de dados.
    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        const mapMarkers = usuarios.map(data => {
            const marker = new AdvancedMarkerElement({
                position: { lat: data.latitude, lng: data.longitude },
                map: map,
                title: data.nome,
            });

            marker.addListener('click', () => {
                const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank" class="btn-detalhes">Ver no Google Maps</a>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // 3. Instancia o MarkerClusterer com a sintaxe correta.
        try {
            console.log("Tentando criar clusters...");
            // Acessa o objeto global 'markerClusterer' (minúsculo)
            // para instanciar a classe 'MarkerClusterer' (maiúsculo).
            new markerClusterer.MarkerClusterer({
                map: map,
                markers: mapMarkers
            });
            console.log("✔️ Clusters criados com sucesso.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
