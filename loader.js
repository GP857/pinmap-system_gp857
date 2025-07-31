// loader.js (Versão de Compatibilidade Estável)

import { initMap } from './main.js';

window.initMap = initMap;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function startApp() {
    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
    
    const markerClustererURL = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
    await loadScript(markerClustererURL );
    console.log("✔️ MarkerClusterer carregado.");

    // CORREÇÃO: Removido '&v=beta' para usar a versão ESTÁVEL da API.
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&callback=initMap`;
    await loadScript(googleMapsURL );
    console.log("✔️ Google Maps API (stable) carregada.");
}

startApp();
