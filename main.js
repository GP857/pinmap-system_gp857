// main.js (Versão de Módulo Completa e Final )

// 1. Importa os dados dos usuários.
import { usuarios } from './dados.js';

// 2. Importa a classe MarkerClusterer DIRETAMENTE da sua fonte.
//    Esta é a forma moderna e correta de usar a biblioteca.
import { MarkerClusterer } from "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";

// 3. Função principal que será chamada após a API do Google carregar.
async function runMap(google ) {
    console.log("API do Google carregada. Executando o mapa...");

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    if (usuarios && usuarios.length > 0) {
        const infoWindow = new google.maps.InfoWindow();
        const markers = usuarios.map(data => {
            const marker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: data.latitude, lng: data.longitude },
                title: data.nome,
            });
            marker.addListener('click', () => {
                const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank">Ver no Google Maps</a>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });

        // Usa a classe MarkerClusterer que foi importada no topo do arquivo.
        new MarkerClusterer({ markers, map });
        console.log(`📍 ${markers.length} marcadores carregados e agrupados.`);
    }
}

// 4. Função para carregar a API do Google e outras bibliotecas.
async function loadGoogleMaps() {
    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
    
    // Carrega a biblioteca principal do Google Maps.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    // Retorna um objeto 'google' simulado com as classes carregadas.
    return {
        maps: { Map, InfoWindow: google.maps.InfoWindow },
        marker: { AdvancedMarkerElement }
    };
}

// 5. Ponto de entrada do script.
(async () => {
    try {
        // Carrega a API do Google dinamicamente usando um método moderno.
        const loader = new google.maps.plugins.loader.Loader({
            apiKey: "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA",
            version: "beta",
            libraries: ["maps", "marker"]
        });
        
        const google = await loader.load();
        runMap(google);

    } catch (e) {
        console.error("Falha ao carregar o Google Maps:", e);
    }
})();
