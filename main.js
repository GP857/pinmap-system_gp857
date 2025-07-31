// main.js (Plano L - Abordagem 100% Módulo)

// 1. Importa os dados dos usuários e a classe MarkerClusterer.
import { usuarios } from './dados.js';
import { MarkerClusterer } from "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";

// 2. Função principal que organiza a inicialização.
async function init( ) {
    const mapDiv = document.getElementById("map");
    
    // Carrega a API do Google e as bibliotecas 'maps' e 'marker'.
    const { Map } = await google.maps.importLibrary("maps");
    const { Marker } = await google.maps.importLibrary("marker");

    console.log("API do Google e bibliotecas carregadas.");

    // Cria o mapa.
    const map = new Map(mapDiv, {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    // Cria os marcadores (usando o Marker legado para máxima compatibilidade).
    const markers = usuarios.map(data => {
        const marker = new Marker({
            position: { lat: data.latitude, lng: data.longitude },
            title: data.nome,
            icon: data.icone
        });

        marker.addListener('click', () => {
            // Reutiliza uma única InfoWindow para performance.
            const infoWindow = new google.maps.InfoWindow();
            const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank">Ver no Google Maps</a>`;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
        return marker;
    });

    // Usa a classe MarkerClusterer que foi importada no topo do arquivo.
    new MarkerClusterer({ map, markers });
    console.log(`✔️ Mapa e ${markers.length} clusters configurados com sucesso.`);
}

// 3. Ponto de entrada: Carrega a API do Google dinamicamente e depois chama init().
(async () => {
    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
    const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
    
    const script = document.createElement('script' );
    script.src = src;
    document.head.appendChild(script);
    
    script.onload = () => {
        init();
    };
    script.onerror = () => {
        console.error("Falha ao carregar o script da API do Google.");
    };
})();
