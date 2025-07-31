// main.js (Plano O - A Solução Final com Renderizador Manual)

import { usuarios } from './dados.js';

// Exporta a função para que o loader.js possa chamá-la.
export function init() {
    console.log("init() executada com sucesso!");

    // As classes já estão disponíveis globalmente.
    const Map = google.maps.Map;
    const InfoWindow = google.maps.InfoWindow;
    const Marker = google.maps.Marker; // Usaremos o Marker legado para os ícones de cluster.

    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        
        // Cria os marcadores individuais.
        const markers = usuarios.map(data => {
            const marker = new Marker({
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

        // Instancia o MarkerClusterer com um RENDERER customizado.
        // Esta é a solução definitiva para o bug 'setMap'.
        try {
            console.log("Tentando criar clusters com renderer customizado...");
            new MarkerClusterer({
                markers,
                // A propriedade 'map' é REMOVIDA daqui. O renderer cuidará de desenhar.
                renderer: {
                    render: ({ count, position }) => {
                        // Esta função cria o ícone visual do cluster.
                        // Usamos um Marker legado simples para isso, que é muito estável.
                        return new Marker({
                            position,
                            label: { text: String(count), color: "white", fontSize: "12px" },
                            // Adiciona o cluster ao mapa
                            map: map,
                            // Garante que os clusters fiquem sobre os marcadores
                            zIndex: 1000 + count,
                            // Ícone customizado (opcional, mas recomendado)
                            icon: {
                                url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
                                anchor: new google.maps.Point(26, 26 ),
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
