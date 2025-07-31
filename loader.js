// loader.js (Versão Híbrida Final)

import { initMap } from './main.js';

// 1. Anexa a função initMap ao window para que a API do Google a encontre.
window.initMap = initMap;

// 2. Função para carregar um script e retornar uma Promise.
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

// 3. Ponto de partida principal do aplicativo.
async function startApp() {
    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA"; // Sua chave de API.
    
    // URLs dos scripts que precisamos carregar.
    const markerClustererURL = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=beta`;

    try {
        // PRIMEIRO, carrega a biblioteca MarkerClusterer.
        console.log("Carregando MarkerClusterer..." );
        await loadScript(markerClustererURL);
        console.log("✔️ MarkerClusterer carregado.");

        // SEGUNDO, carrega a API principal do Google Maps.
        console.log("Carregando Google Maps API...");
        await loadScript(googleMapsURL);
        // A API do Google chamará initMap automaticamente quando terminar.

    } catch (error) {
        console.error("Falha ao carregar os scripts necessários.", error);
    }
}

// Inicia todo o processo.
startApp();
