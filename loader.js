// loader.js

// 1. Importa a função principal do seu módulo main.js.
import { initMap } from './main.js';

// 2. Anexa a função importada ao objeto global 'window'.
//    Isso a torna acessível para o callback da API do Google.
window.initMap = initMap;

// 3. Função para carregar a API do Google dinamicamente.
function loadGoogleMapsAPI() {
    // Insira sua chave de API aqui.
    const apiKey = "AIzaSyDE15OWDlj-EMQmtn6xm6J_DsvCf7y__ho"; 
    
    const script = document.createElement('script');
    // O 'async' e 'defer' garantem o carregamento sem bloquear a página.
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=beta`;
    
    document.head.appendChild(script );
}

// 4. Inicia o carregamento da API.
loadGoogleMapsAPI();
