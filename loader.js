// loader.js (Plano Q - Versão Final sem 'import')

// Esta função é auto-executável.
(async function startApp() {

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

    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
    
    // URL da biblioteca de cluster alternativa e estável.
    const markerClustererURL = "https://unpkg.com/@mapeadora/markerclusterer/dist/index.min.js";
    
    // URL da API do Google, usando a versão estável e com callback.
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&callback=onGoogleMapsApiLoaded`;

    try {
        // PRIMEIRO, carrega e espera pelo MarkerClusterer.
        console.log("Carregando MarkerClusterer (Mapeadora )...");
        await loadScript(markerClustererURL);
        console.log("✔️ MarkerClusterer (Mapeadora) carregado e pronto.");

        // SEGUNDO, anexa a função de callback ao window ANTES de carregar a API.
        window.onGoogleMapsApiLoaded = async () => {
            console.log("✔️ Google Maps API carregada e pronta.");
            console.log("Carregando o módulo principal do aplicativo...");
            
            // SÓ DEPOIS que a API do Google estiver pronta, importa e executa o main.js.
            const mainModule = await import('./main.js');
            mainModule.init(); // Chama a função exportada do main.js
        };

        // TERCEIRO, carrega a API do Google. Ela chamará a função acima quando terminar.
        console.log("Carregando Google Maps API...");
        await loadScript(googleMapsURL);

    } catch (error) {
        console.error("Falha ao carregar os scripts necessários.", error);
    }

})();
