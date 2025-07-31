// main.js (Versão Final com Marcadores Compatíveis)

import { usuarios } from './dados.js';

export async function initMap() {
    console.log("initMap executada com sucesso!");

    // 1. Importa as bibliotecas. Note que não precisamos mais do AdvancedMarkerElement.
    const { Map, InfoWindow, Marker } = await google.maps.importLibrary("maps");
    
    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        
        // 2. CORREÇÃO: Criamos os marcadores usando o 'new Marker()' legado.
        //    Isso garante total compatibilidade com o MarkerClusterer.
        const markers = usuarios.map(data => {
            const marker = new Marker({
                position: { lat: data.latitude, lng: data.longitude },
                // O 'map: map' foi removido daqui. O Clusterer cuidará de adicionar ao mapa.
                title: data.nome,
                icon: data.icone // O marcador legado usa a propriedade 'icon'.
            });

            marker.addListener('click', () => {
                const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank" class="btn-detalhes">Ver no Google Maps</a>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // 3. Instancia o MarkerClusterer. Agora ele receberá os marcadores corretos.
        try {
            console.log("Tentando criar clusters...");
            new MarkerClusterer({ map, markers });
            console.log("✔️ Clusters criados com sucesso.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
