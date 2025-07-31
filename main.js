// main.js (Plano S - A Síntese Definitiva)

import { usuarios } from './dados.js';

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

        // Instancia o MarkerClusterer com um RENDERER customizado para contornar o bug.
        try {
            console.log("Tentando criar clusters com renderer customizado...");
            // A classe global é 'MarkerClusterer' (M maiúsculo).
            new MarkerClusterer({
                markers,
                // A propriedade 'map' é REMOVIDA daqui. O renderer cuidará de desenhar.
                renderer: {
                    render: ({ count, position }) => {
                        // Esta função cria o ícone visual do cluster.
                        return new google.maps.Marker({
                            position,
                            label: { text: String(count), color: "white", fontSize: "12px" },
                            map: map,
                            zIndex: 1000 + count,
                            // Ícone de cluster padrão do Google
                            icon: {
                                url: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png`,
                                anchor: new google.maps.Point(27, 26 ),
                                scaledSize: new google.maps.Size(53, 52)
                            }
                        });
                    },
                },
            });
            console.log("✔️ Clusters configurados com renderer.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
