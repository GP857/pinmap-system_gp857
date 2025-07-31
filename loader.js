// loader.js (Plano P - Usando a Biblioteca Mapeadora)

import { init } from './main.js';

// 1. Anexa a função init ao window para que a API do Google a encontre.
window.initMap = init;

// 2. Função para carregar um script e retornar uma Promise.
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 3. Ponto de partida principal do aplicativo.
async function startApp() {
    const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
    
    // CORREÇÃO: URL da biblioteca de cluster alternativa e estável.
    const markerClustererURL = "https://unpkg.com/@mapeadora/markerclusterer/dist/index.min.js";
    
    // URL da API do Google, usando a versão estável.
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&callback=initMap`;

    try {
        // PRIMEIRO, carrega e espera pelo MarkerClusterer.
        console.log("Carregando MarkerClusterer (Mapeadora )...");
        await loadScript(markerClustererURL);
        console.log("✔️ MarkerClusterer (Mapeadora) carregado e pronto.");

        // SÓ ENTÃO, carrega a API principal do Google Maps.
        console.log("Carregando Google Maps API...");
        await loadScript(googleMapsURL);
        // A API do Google chamará initMap automaticamente.

    } catch (error) {
        console.error("Falha ao carregar os scripts necessários.", error);
    }
}

// Inicia todo o processo.
startApp();
