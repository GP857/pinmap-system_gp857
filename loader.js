(async function startApp() {
    const loader = document.getElementById('loader');
    
    function updateLoader(message) {
        if (loader) {
            loader.querySelector('p').textContent = message;
        }
    }
    
    function hideLoader() {
        if (loader) {
            loader.style.display = 'none';
        }
    }
    
    function showError(message) {
        if (loader) {
            loader.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #d32f2f;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px;"></i>
                    <h2>Erro ao carregar o mapa</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #d32f2f; color: white; border: none; cursor: pointer;">
                        Recarregar
                    </button>
                </div>
            `;
        }
    }
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Falha ao carregar script: ${src}`));
            document.head.appendChild(script);
        });
    }

    try {
        updateLoader("Carregando MarkerClusterer...");
        console.log("Carregando MarkerClusterer...");
        
        const markerClustererURL = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
        await loadScript(markerClustererURL);
        
        console.log("✔️ MarkerClusterer carregado");
        updateLoader("MarkerClusterer carregado...");

        window.onGoogleMapsApiLoaded = async () => {
            console.log("✔️ Google Maps API carregada");
            updateLoader("Google Maps carregado...");

            // Garante que o DOM está pronto
            if (document.readyState !== 'complete') {
                await new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));
            }
            
            try {
                updateLoader("Carregando dados do mapa...");
                const mainModule = await import('./main.js');
                mainModule.init();
                hideLoader();
            } catch (e) {
                console.error("Falha ao inicializar o mapa:", e);
                showError(`Erro no módulo principal: ${e.message}`);
            }
        };

        console.log("Carregando Google Maps API...");
        updateLoader("Carregando Google Maps API...");
        
        const apiKey = "AIzaSyB0b1zuLpUMNoppvRFE8Ta8G0RPERIZLVA";
        const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&callback=onGoogleMapsApiLoaded&loading=async`;
        await loadScript(googleMapsURL);

    } catch (error) {
        console.error("Falha crítica:", error);
        showError(`Falha ao carregar recursos: ${error.message}`);
    }
})();
