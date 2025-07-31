// main.js (Plano M - A Sintaxe de Importação Correta)

// 1. Importa os dados dos usuários.
import { usuarios } from './dados.js';

// 2. CORREÇÃO: Importa a classe MarkerClusterer como a exportação PADRÃO (sem chaves {}).
import MarkerClusterer from "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";

// 3. Função principal que organiza a inicialização.
async function init( ) {
    const mapDiv = document.getElementById("map");
    
    // Carrega a API do Google e as bibliotecas 'maps' e 'marker'.
    const { Map, InfoWindow, Marker } = await google.maps.importLibrary("maps");

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
            const infoWindow = new google.maps.InfoWindow();
            const content = `<h4>${data.nome}</h4><p>${data.descricao}</p><a href="${data.link}" target="_blank">Ver no Google Maps</a>`;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
        return marker;
    });

    // Usa a classe MarkerClusterer que foi importada corretamente no topo.
    new MarkerClusterer({ map, markers });
    console.log(`✔️ Mapa e ${markers.length} clusters configurados com sucesso.`);
}

// 4. Ponto de entrada: Carrega a API do Google dinamicamente e depois chama init().
(async () => {
    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
    const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
    
    const script = document.createElement('script' );
    script.src = src;
    document.head.appendChild(script);
    
    script.onload = () => {
        // Garante que a função init só será chamada após a API estar pronta.
        init();
    };
    script.onerror = () => {
        console.error("Falha ao carregar o script da API do Google.");
    };
})();
