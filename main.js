// main.js (Plano P - Usando a Biblioteca Mapeadora)

import { usuarios } from './dados.js';

// Renomeamos a função para evitar qualquer conflito de nome com o callback.
export function init() {
    console.log("init() executada com sucesso!");

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new google.maps.InfoWindow();
        
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

        // Instancia o MarkerClusterer da biblioteca Mapeadora.
        // A sintaxe é new MarkerClusterer(map, markers, options)
        try {
            console.log("Tentando criar clusters com a biblioteca Mapeadora...");
            new MarkerClusterer(map, markers, {
                // Esta biblioteca precisa do caminho para as imagens dos ícones de cluster.
                imagePath: 'https://unpkg.com/@mapeadora/markerclusterer/dist/icons/m'
            } );
            console.log("✔️ Clusters criados com sucesso.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
