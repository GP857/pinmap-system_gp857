import { usuarios } from './dados.js';

export function init() {
    console.log("Iniciando mapa...");

    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error("Elemento #map não encontrado!");
        return;
    }

    const map = new google.maps.Map(mapElement, {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new google.maps.InfoWindow({
            maxWidth: 300
        });
        
        const markers = usuarios.map(data => {
            const marker = new google.maps.Marker({
                position: { lat: data.latitude, lng: data.longitude },
                title: data.nome,
                icon: data.icone
            });

            marker.addListener('click', () => {
                const content = `
                    <div class="info-window">
                        <h4>${data.nome}</h4>
                        <p>${data.descricao}</p>
                        <a href="${data.link}" target="_blank" class="btn-detalhes">
                            <i class="fas fa-map-marker-alt"></i> Ver no Maps
                        </a>
                    </div>
                `;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        try {
            console.log("Configurando clusters...");
            new MarkerClusterer({
                map,
                markers,
                renderer: {
                    render: ({ count, position }) => {
                        return new google.maps.Marker({
                            position,
                            label: { 
                                text: String(count), 
                                color: "white", 
                                fontSize: "12px",
                                fontWeight: "bold"
                            },
                            zIndex: 1000 + count,
                            icon: {
                                url: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png`,
                                anchor: new google.maps.Point(27, 26),
                                scaledSize: new google.maps.Size(53, 52)
                            }
                        });
                    },
                },
            });
            console.log("✔️ Clusters configurados");
        } catch (e) {
            console.error("Erro nos clusters:", e);
        }
    } else {
        console.warn("Nenhum dado de usuário encontrado");
    }
}
