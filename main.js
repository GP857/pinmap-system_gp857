import { usuarios } from './dados.js';

export function init() {
    console.log("Iniciando mapa...");
    
    // 1. Verificar elemento do mapa
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error("Elemento #map não encontrado!");
        throw new Error("Elemento do mapa não encontrado no DOM");
    }
    
    // 2. Verificar se o google.maps está disponível
    if (!window.google || !google.maps) {
        console.error("Google Maps API não carregada corretamente");
        throw new Error("Biblioteca do Google Maps não disponível");
    }
    
    try {
        // 3. Criar mapa
        const map = new google.maps.Map(mapElement, {
            center: { lat: -14.2350, lng: -51.9253 },
            zoom: 4,
            mapId: "4e6d7b9df89250e7ae048791",
            gestureHandling: "greedy",
            mapTypeControl: true,
            streetViewControl: false
        });

        // 4. Verificar dados de usuários
        if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
            console.warn("Nenhum dado de usuário encontrado");
            
            // Adicionar marcador padrão
            new google.maps.Marker({
                position: { lat: -15.795, lng: -47.891 },
                map: map,
                title: "Brasília",
                icon: "https://maps.gstatic.com/mapfiles/ms2/micons/flag.png"
            });
            
            return;
        }

        const infoWindow = new google.maps.InfoWindow({
            maxWidth: 300,
            disableAutoPan: false
        });
        
        // 5. Criar marcadores
        const markers = usuarios.map(data => {
            if (!data.latitude || !data.longitude) {
                console.warn("Dados inválidos para marcador:", data);
                return null;
            }
            
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) },
                title: data.nome || "Sem nome",
                icon: data.icone || "https://maps.gstatic.com/mapfiles/ms2/micons/blue.png",
                map: map
            });

            marker.addListener('click', () => {
                const content = `
                    <div class="info-window">
                        <h4>${data.nome || "Local"}</h4>
                        <p>${data.descricao || "Sem descrição"}</p>
                        ${data.link ? `<a href="${data.link}" target="_blank" class="btn-detalhes">
                            <i class="fas fa-map-marker-alt"></i> Ver no Maps
                        </a>` : ''}
                    </div>
                `;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        }).filter(marker => marker !== null); // Remover nulos

        // 6. Configurar clusters
        try {
            if (typeof MarkerClusterer !== 'function') {
                throw new Error("MarkerClusterer não está disponível");
            }
            
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

        // 7. Centralizar mapa nos marcadores
        if (markers.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            markers.forEach(marker => bounds.extend(marker.getPosition()));
            map.fitBounds(bounds);
        }
        
    } catch (error) {
        console.error("Erro crítico na inicialização do mapa:", error);
        throw error; // Propaga o erro para o loader
    }
}
