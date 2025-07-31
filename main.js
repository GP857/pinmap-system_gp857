// main.js

// Importa os outros módulos primeiro.
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';
import { usuarios } from './dados.js';

// 1. Define a função initMap e a anexa ao window para torná-la global.
//    Esta é a função que a API do Google irá chamar quando for carregada.
window.initMap = async function() {
    console.log("API do Google carregada, executando initMap...");
    
    let map;
    let sistemaBuscaGoogleMaps;

    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { MarkerClusterer } = await google.maps.importLibrary("markerclusterer");

    map = new Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791"
    });

    sistemaBuscaGoogleMaps = await inicializarSistemaBuscaGoogleMaps(map);
    console.log('✔️ Sistema PINMAP totalmente inicializado.');

    // ... (toda a sua lógica de botões e criação de marcadores) ...
    // Cole a lógica dos botões e marcadores da sua versão anterior aqui.
    // Por exemplo:
    const header = document.getElementById('header');
    const toggleHeaderBtn = document.getElementById('toggle-header-btn');
    // ... e assim por diante.
    
    if (usuarios && usuarios.length > 0) {
        const infoWindow = new InfoWindow();
        const mapMarkers = usuarios.map(data => {
            const pinIcon = document.createElement('img');
            pinIcon.src = data.icone;
            pinIcon.className = 'custom-marker-icon';
            const marker = new AdvancedMarkerElement({
                position: { lat: data.latitude, lng: data.longitude },
                map: map,
                title: data.nome,
                content: pinIcon,
            });
            marker.addListener('click', () => {
                const content = `
                    <div class="info-window-content">
                        <h4>${data.nome}</h4>
                        <p>${data.descricao}</p>
                        <a href="${data.link}" target="_blank" class="btn-detalhes">Ver no Google Maps</a>
                    </div>`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
            return marker;
        });
        new MarkerClusterer({ markers: mapMarkers, map });
        console.log(`📍 ${mapMarkers.length} marcadores carregados e agrupados.`);
    }
};

// 2. Função para carregar um script dinamicamente.
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 3. Ponto de partida principal do nosso aplicativo.
async function startApp() {
    console.log("App iniciado. Carregando API do Google Maps...");
    const apiKey = "SUA_CHAVE_API_AQUI"; // <-- INSIRA SUA CHAVE DE API AQUI
    const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=beta`;
    
    try {
        await loadScript(apiUrl );
    } catch (error) {
        console.error("Falha ao carregar a API do Google Maps", error);
        // Você pode exibir uma mensagem de erro para o usuário aqui.
    }
}

// Inicia todo o processo.
startApp();```

### Resumo da Nova Estratégia

1.  O `index.html` apenas carrega o `main.js`.
2.  O `main.js` é executado.
3.  A primeira coisa que ele faz é chamar a função `startApp`.
4.  `startApp` define a função `initMap` globalmente e **depois** cria dinamicamente a tag `<script>` para carregar a API do Google.
5.  Quando a API do Google finalmente carrega, a função `initMap` já está definida e esperando no escopo global, eliminando qualquer chance de erro.

Esta é a abordagem mais segura e moderna. Por favor, substitua os arquivos `index.html` e `main.js` por estas versões, insira sua chave de API no `main.js`, e envie para o GitHub. Estou muito confiante que isso resolverá o problema de uma vez por todas.
