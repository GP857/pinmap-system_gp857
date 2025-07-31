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
    
    // URL corrigida com loading=async
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&callback=onGoogleMapsApiLoaded&loading=async`;

    try {
        console.log("Carregando MarkerClusterer...");
        await loadScript(markerClustererURL);
        console.log("✔️ MarkerClusterer carregado");

        window.onGoogleMapsApiLoaded = async () => {
            console.log("✔️ Google Maps API carregada");
            
            // Garante que o DOM está pronto
            if (document.readyState !== 'complete') {
                await new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));
            }
            
            const mainModule = await import('./main.js');
            mainModule.init();
        };

        console.log("Carregando Google Maps API...");
        await loadScript(googleMapsURL);

    } catch (error) {
        console.error("Falha ao carregar scripts:", error);
        // Adicione tratamento visual de erro aqui
        alert("Erro ao carregar o mapa. Recarregue a página.");
    }
})();
