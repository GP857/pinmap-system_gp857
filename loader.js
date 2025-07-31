// loader.js (Versão de Compatibilidade Final)

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
    
    // Carrega o MarkerClusterer primeiro.
    const markerClustererURL = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
    await loadScript(markerClustererURL );
    console.log("✔️ MarkerClusterer carregado.");

    // Carrega a API do Google, pedindo as bibliotecas 'maps' e 'marker' na URL.
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&callback=initMap&v=beta`;
    await loadScript(googleMapsURL );
    console.log("✔️ Google Maps API carregada.");
}

startApp();
