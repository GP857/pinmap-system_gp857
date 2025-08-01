<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PINMAP - Sistema de Busca Avançado (Google Maps)</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>

    <div class="main-container">
        <!-- Cabeçalho (Header) com logo e botões -->
        <header id="header" class="header">
            <div class="header-content">
                <div class="logo-container">
                    <img src="https://placehold.co/100x50/FFFFFF/000000?text=PINMAP" alt="Logo" class="logo">
                    <span class="app-title">PINMAP v5.2</span>
                </div>

                <div class="header-actions">
                    <button id="toggle-header-btn" class="icon-button" title="Ocultar Cabeçalho">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button id="toggle-stats-btn" class="icon-button" title="Ocultar Estatísticas do Mapa">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="rotate-controls">
                        <button id="rotate-left-btn" class="icon-button" title="Girar para Esquerda">
                            <i class="fas fa-undo"></i>
                        </button>
                        <button id="rotate-right-btn" class="icon-button" title="Girar para Direita">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button id="reset-rotation-btn" class="icon-button" title="Reiniciar Rotação">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Estatísticas do Mapa (Map Stats) -->
        <div id="map-stats" class="map-stats">
            <p>Nível de Zoom: <span id="zoom-level">--</span></p>
            <p>Centro: <span id="center-coords">--</span></p>
            <p>Marcadores Visíveis: <span id="visible-markers">--</span></p>
        </div>

        <!-- Onde o mapa será renderizado -->
        <div id="map" class="map"></div>

        <!-- Painel lateral (Sidebar) -->
        <aside id="sidebar" class="sidebar">
            <!-- Conteúdo da barra lateral (será preenchido dinamicamente) -->
            <div id="results-list" class="results-list">
                <!-- A lista de resultados da busca aparecerá aqui -->
            </div>
        </aside>

        <!-- Scripts, carregados como módulos -->
        <!-- Carrega a biblioteca MarkerClusterer antes do seu script principal -->
        <script src="https://unpkg.com/@googlemaps/markerclusterer@2.0.0/dist/index.min.js"></script>

        <script type="module" src="dados.js"></script>
        <script type="module" src="main.js"></script>
        
        <!-- Carrega a API do Google Maps de forma assíncrona com um callback -->
        <!-- A chave da API foi removida a seu pedido -->
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&libraries=places,marker&loading=async&callback=initMap&v=beta"></script>
    </div>

</body>
</html>
