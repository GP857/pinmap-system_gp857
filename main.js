// main.js (Versão Final e Simplificada)

function initMap() {
    console.log("initMap executada com sucesso!");

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    // Carrega os dados diretamente.
    // Se o dados.js for muito grande, esta é a única desvantagem,
    // mas vamos primeiro garantir que o mapa funcione.
    const usuarios = dados; // Assumindo que dados.js é carregado antes de main.js

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new google.maps.InfoWindow();
        
        const markers = usuarios.map(data => {
            const marker = new google.maps.Marker({
                position: { lat: data.latitude, lng: data.longitude },
                title: data.nome,
                icon: data.icone
            });

            marker.addListener('click', () => {
                const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank">Ver no Google Maps</a>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // Instancia o MarkerClusterer legado.
        // A sintaxe é um pouco diferente: new MarkerClusterer(map, markers, options)
        try {
            console.log("Tentando criar clusters com a biblioteca legada...");
            new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            } );
            console.log("✔️ Clusters criados com sucesso.");
        } catch (e) {
            console.error("Falha ao criar os clusters:", e);
        }
    }
}
