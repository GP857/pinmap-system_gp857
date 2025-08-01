// A importação direta da biblioteca MarkerClusterer foi removida.
// Em vez disso, ela será carregada dinamicamente pela API do Google Maps.

// Importa a função inicializarSistemaBuscaGoogleMaps do sistemaBuscaGoogleMaps.js
import { inicializarSistemaBuscaGoogleMaps } from './sistemaBuscaGoogleMaps.js';
// Importa a lista de usuários do ficheiro dados.js
import { usuarios } from './dados.js';

let map; // Variável global para o mapa do Google
let sistemaBuscaGoogleMaps; // Variável global para o sistema de busca

// Função principal assíncrona para inicializar o mapa e os marcadores
// Definida como uma função global para ser chamada pelo callback da API do Google Maps
window.initMap = async function() {
    // Agora que a API já carregou, o objeto 'google' está definido e podemos importar bibliotecas.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    // A biblioteca MarkerClusterer é importada como um módulo separado no index.html,
    // então a sua classe já está disponível no escopo global.

    // Inicializa o mapa do Google
    map = new Map(document.getElementById('map'), {
        center: { lat: -23.55052, lng: -46.633309 }, // Exemplo: Centralizado em São Paulo. Ajuste para a sua localização inicial.
        zoom: 12, // Nível de zoom inicial
        // IMPORTANTE: Adicione o seu Map ID aqui. Você precisa criar um no Google Cloud Console.
        // https://developers.google.com/maps/documentation/javascript/cloud-customization/overview#map_id
        mapId: "4e6d7b9df89250e7ae048791" // <--- SEU MAP ID REAL FOI INSERIDO AQUI
    });

    // Adicionado log para verificar o objeto 'map' após a inicialização
    console.log('Objeto do mapa inicializado:', map);
    if (map instanceof Map) { // Agora usa a classe Map importada
        console.log('✔️ O objeto "map" é uma instância válida de google.maps.Map.');
    } else {
        console.error('❌ O objeto "map" NÃO é uma instância válida de google.maps.Map.');
    }

    // Inicializa o seu Sistema de Busca Avançado, passando o objeto 'map'
    sistemaBuscaGoogleMaps = inicializarSistemaBuscaGoogleMaps(map);


    // --- Lógica para os botões de toggle do cabeçalho e estatísticas ---
    const header = document.getElementById('header');
    const toggleHeaderBtn = document.getElementById('toggle-header-btn');
    const headerIcon = toggleHeaderBtn.querySelector('i');

    toggleHeaderBtn.addEventListener('click', () => {
        header.classList.toggle('hidden');
        if (header.classList.contains('hidden')) {
            headerIcon.classList.remove('fa-chevron-up');
            headerIcon.classList.add('fa-chevron-down');
            headerIcon.title = 'Mostrar Cabeçalho';
        } else {
            headerIcon.classList.remove('fa-chevron-down');
            headerIcon.classList.add('fa-chevron-up');
            headerIcon.title = 'Ocultar Cabeçalho';
        }
    });

    const mapStats = document.getElementById('map-stats');
    const toggleStatsBtn = document.getElementById('toggle-stats-btn');
    const statsIcon = toggleStatsBtn.querySelector('i');

    toggleStatsBtn.addEventListener('click', () => {
        mapStats.classList.toggle('hidden');
        if (mapStats.classList.contains('hidden')) {
            statsIcon.classList.remove('fa-chevron-down');
            statsIcon.classList.add('fa-chevron-up');
            statsIcon.title = 'Mostrar Estatísticas';
        } else {
            statsIcon.classList.remove('fa-chevron-up');
            statsIcon.classList.add('fa-chevron-down');
            statsIcon.title = 'Ocultar Estatísticas';
        }
    });

    // --- Lógica para atualizar as estatísticas do mapa ---
    const zoomLevelSpan = document.getElementById('zoom-level');
    const centerCoordsSpan = document.getElementById('center-coords');
    const visibleMarkersSpan = document.getElementById('visible-markers');

    // Função para atualizar as estatísticas
    function updateMapStats() {
        if (map) {
            zoomLevelSpan.textContent = map.getZoom();
            const center = map.getCenter();
            centerCoordsSpan.textContent = `${center.lat().toFixed(4)}, ${center.lng().toFixed(4)}`;
            visibleMarkersSpan.textContent = 'N/A (Lógica necessária)'; 
        }
    }

    // Event listeners para o mapa atualizar as estatísticas
    map.addListener('zoom_changed', updateMapStats);
    map.addListener('center_changed', updateMapStats);

    // --- Lógica para os botões de rotação ---
    const rotateLeftBtn = document.getElementById('rotate-left-btn');
    const rotateRightBtn = document.getElementById('rotate-right-btn');
    const resetRotationBtn = document.getElementById('reset-rotation-btn');

    // É crucial que estes elementos existam no DOM antes de tentar adicionar listeners.
    // Como initMap é um callback da API, o DOM deve estar pronto.
    if (rotateLeftBtn && rotateRightBtn && resetRotationBtn) {
        rotateLeftBtn.addEventListener('click', () => {
            // Gira o mapa 15 graus para a esquerda (anti-horário)
            let currentHeading = map.getHeading();
            map.setHeading(currentHeading - 15);
        });

        rotateRightBtn.addEventListener('click', () => {
            // Gira o mapa 15 graus para a direita (horário)
            let currentHeading = map.getHeading();
            map.setHeading(currentHeading + 15);
        });

        resetRotationBtn.addEventListener('click', () => {
            // Redefine a rotação para o norte (0 graus)
            map.setHeading(0);
        });
    } else {
        console.error('❌ Botões de rotação não encontrados no DOM. Verifique os IDs no index.html.');
    }


    // Chama a função uma vez na inicialização para preencher os dados
    updateMapStats();

    // --- Lógica para carregar marcadores do dados.js ---
    console.log('Iniciando carregamento de marcadores...');
    // A variável 'usuarios' é assumida como global, definida em dados.js
    if (usuarios && usuarios.length > 0) {
        console.log(`Variável 'usuarios' encontrada com ${usuarios.length} itens.`);
        
        const mapMarkers = await Promise.all(usuarios.map(async (data) => {
            // Cria um AdvancedMarkerElement
            const marker = new AdvancedMarkerElement({
                position: { lat: data.latitude, lng: data.longitude },
                map: map, // Associa o marcador ao mapa
                title: data.nome,
                // Para ícones personalizados com AdvancedMarkerElement, você pode usar um PinElement
                // ou um elemento HTML/SVG personalizado.
                // Se o seu 'data.icone' for uma URL de imagem, você precisaria criar um <img> element:
                content: (() => {
                    const img = document.createElement('img');
                    img.src = data.icone;
                    img.style.width = '30px'; // Ajuste o tamanho conforme necessário
                    img.style.height = '30px';
                    img.alt = data.nome; // Adiciona texto alternativo
                    return img;
                })(),
            });
            
            // Criar InfoWindow (popup) com informações do resultado da busca
            const infoWindowContent = document.createElement('div');
            infoWindowContent.className = 'info-window-content';
            infoWindowContent.innerHTML = `
                <h4>${data.nome}</h4>
                <p>${data.descricao}</p>
                ${data.link ? `<a href="${data.link}" target="_blank" class="btn-direcoes" style="background-color: #007bff;"><i class="fas fa-map-marker-alt"></i> Ver no Google Maps</a>` : ''}
            `;
            const infoWindow = new InfoWindow({ // Usa a classe InfoWindow importada
                content: infoWindowContent,
                pixelOffset: new google.maps.Size(0, -30) // Ajusta a posição do InfoWindow
            });

            // Abre o InfoWindow ao clicar no marcador
            marker.addListener('click', () => {
                infoWindow.open({
                    anchor: marker,
                    map,
                });
            });
            return marker;
        }));
        
        console.log(`Foram criados ${mapMarkers.length} objetos de marcador do Google Maps.`);
        
        // ADICIONA OS MARCADORES AO MARCADOR CLUSTERER
        // Acesso direto à classe, pois ela é carregada como um módulo no index.html
        new MarkerClusterer({ markers: mapMarkers, map: map });
        console.log(`📍 ${mapMarkers.length} marcadores carregados do dados.js e agrupados.`);
    } else {
        console.warn('⚠️ dados.js não encontrado ou não contém marcadores (variável usuarios vazia ou indefinida).'); 
        console.log('Tipo de "usuarios":', typeof usuarios);
        if (usuarios) {
            console.log('Tamanho de "usuarios":', usuarios.length);
        }
    }
}

// A API do Google Maps carregará e chamará initMap automaticamente
// Não é necessário chamar initMap() aqui, pois o callback da API fará isso.
