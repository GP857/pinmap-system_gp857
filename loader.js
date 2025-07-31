// loader.js (Versão Final e Correta)

// 1. Função para carregar um script e retornar uma Promise.
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 2. Ponto de partida principal do aplicativo.
async function start() {
    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
    
    // URLs dos scripts globais
    const markerClustererURL = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker`;

    try {
        // PRIMEIRO, carrega e espera pelo MarkerClusterer.
        console.log("Carregando MarkerClusterer..." );
        await loadScript(markerClustererURL);
        console.log("✔️ MarkerClusterer carregado e pronto.");

        // SEGUNDO, carrega a API principal do Google Maps.
        console.log("Carregando Google Maps API...");
        await loadScript(googleMapsURL);
        console.log("✔️ Google Maps API carregada e pronta.");

        // SÓ DEPOIS de tudo carregado, importa e executa o main.js.
        console.log("Carregando o módulo principal do aplicativo...");
        const main = await import('./main.js');
        main.init(); // Chama a função exportada do main.js

    } catch (error) {
        console.error("Falha ao carregar os scripts necessários.", error);
    }
}

// Inicia todo o processo.
start();
