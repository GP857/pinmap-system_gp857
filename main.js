// main.js (Versão Final com Renderização Manual)

import { usuarios } from './dados.js';

export function initMap() {
    console.log("initMap executada com sucesso!");

    // Usamos as classes que são carregadas pela URL no loader.js
    const Map = google.maps.Map;
    const InfoWindow = google.maps.InfoWindow;
    // Usamos o AdvancedMarkerElement, que está dentro do namespace 'marker'
    const AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;

    const map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791",
        // Importante: desativa os pontos de interesse padrão para não poluir o mapa
        clickableIcons: false
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        
        // Criamos os marcadores avançados.
        const markers = usuarios.map(data => {
            // Cria o ícone como um elemento de imagem HTML
            const icon = document.createElement('img');
            icon.src = data.icone;
            icon.style.width = '24px';
            icon.style.height = '24px';

            const marker = new AdvancedMarkerElement({
                position: { lat: data.latitude, lng: data.longitude },
                title: data.nome,
                content: icon // O conteúdo do marcador avançado é um elemento HTML
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
                // A propriedade 'map' é removida daqui. O renderer cuidará disso.
                renderer: {
                    render: ({ count, position }, stats) => {
                        // Cria um marcador AVANÇADO para o cluster.
                        // O 'count' é o número de marcadores no cluster.
                        return new AdvancedMarkerElement({
                            position,
                            // Cria um ícone customizado para o cluster
                            content: new_cluster_icon(count),
                            // Adiciona o cluster ao mapa
                            map: map,
                            // Remove o popup do cluster
                            zIndex: 1000 + count,
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

// Função auxiliar para criar o ícone do cluster
function new_cluster_icon(count) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div style="
            cursor: pointer;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            background: rgba(26, 115, 232, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 14px;
            font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
        ">
            ${count}
        </div>
    `;
    return div;
}
