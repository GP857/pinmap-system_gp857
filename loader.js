// loader.js (Plano T - A Solução Final com DOMContentLoaded)

// Adiciona um "ouvinte" que espera o HTML da página estar completamente pronto.
document.addEventListener('DOMContentLoaded', () => {
    console.log("✔️ DOM completamente carregado e pronto. Iniciando o carregamento dos scripts...");
    
    // Coloca toda a nossa lógica de carregamento DENTRO deste ouvinte.
    (async function startApp() {

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
        
        const markerClustererURL = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
        const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&callback=onGoogleMapsApiLoaded`;

        try {
            console.log("Carregando MarkerClusterer (Moderno )...");
            await loadScript(markerClustererURL);
            console.log("✔️ MarkerClusterer (Moderno) carregado e pronto.");

            window.onGoogleMapsApiLoaded = async () => {
                console.log("✔️ Google Maps API carregada e pronta.");
                console.log("Carregando o módulo principal do aplicativo...");
                
                const mainModule = await import('./main.js');
                mainModule.init();
            };

            console.log("Carregando Google Maps API...");
            await loadScript(googleMapsURL);

        } catch (error) {
            console.error("Falha ao carregar os scripts necessários.", error);
        }

    })();
});
