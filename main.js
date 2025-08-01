// A função initMap é atribuída ao objeto `window` para que o callback da API do Google Maps possa encontrá-la.
window.initMap = async () => {
    const mapa = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -23.55052, lng: -46.633308 },
        zoom: 12,
        mapId: "DEMO_MAP_ID",
    });

    const marcadoresVisiveisSpan = document.getElementById("visible-markers");

    // Array para armazenar os marcadores
    let marcadores = [];
    
    // Supondo que a variável `dados` esteja disponível a partir de `dados.js`
    for (const item of dados) {
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: item.lat, lng: item.lng },
            map: mapa,
            title: item.titulo,
        });

        // Adiciona um evento de clique para mostrar informações no console (exemplo)
        marker.addListener("click", () => {
            console.log("Clicado no marcador:", item.titulo);
        });

        marcadores.push(marker);
    }
    
    // Instancia o MarkerClusterer
    new MarkerClusterer({ markers: marcadores, map: mapa });

    // Restante da lógica do seu código, como listeners de eventos do mapa
    mapa.addListener('bounds_changed', () => {
        // Lógica para contar marcadores visíveis
        const bounds = mapa.getBounds();
        const visiveis = marcadores.filter(m => bounds.contains(m.position)).length;
        marcadoresVisiveisSpan.textContent = visiveis;
    });

    // Inicializa a contagem de marcadores visíveis
    mapa.addListener('idle', () => {
        const bounds = mapa.getBounds();
        const visiveis = marcadores.filter(m => bounds.contains(m.position)).length;
        marcadoresVisiveisSpan.textContent = visiveis;
    });

};
