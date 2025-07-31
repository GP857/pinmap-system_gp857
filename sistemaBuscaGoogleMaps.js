// sistemaBuscaGoogleMaps.js
class SistemaBuscaMapaGoogle {
    constructor(mapa) {
        this.mapa = mapa;
        this.markers = [];
        this.AdvancedMarkerElement = null;
        this.InfoWindow = null;
        this.Geocoder = null;
    }

    async init() {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const { InfoWindow } = await google.maps.importLibrary("maps");
        const { Geocoder } = await google.maps.importLibrary("geocoding");
        this.AdvancedMarkerElement = AdvancedMarkerElement;
        this.InfoWindow = new InfoWindow();
        this.Geocoder = new Geocoder();
        console.log('✔️ Módulo de busca inicializado.');
    }

    limparMarcadores() {
        this.markers.forEach(marker => marker.map = null);
        this.markers = [];
    }

    adicionarMarcador(posicao, titulo, descricao, link) {
        const marker = new this.AdvancedMarkerElement({ position: posicao, map: this.mapa, title: titulo });
        marker.addListener('click', () => {
            const content = `<div><h4>${titulo}</h4><p>${descricao}</p>${link ? `<a href="${link}" target="_blank" class="btn-detalhes">Ver detalhes</a>` : ''}</div>`;
            this.InfoWindow.setContent(content);
            this.InfoWindow.open(this.mapa, marker);
        });
        this.markers.push(marker);
    }

    async buscarPorEndereco(endereco) {
        try {
            const response = await this.Geocoder.geocode({ address: endereco });
            if (response.results[0]) {
                return response.results[0].geometry.location;
            }
            throw new Error('Nenhum resultado encontrado.');
        } catch (error) {
            console.error(`Geocoding falhou para "${endereco}":`, error);
            throw new Error('Endereço não encontrado.');
        }
    }

    centralizarMapaNaPosicao(posicao) {
        this.mapa.setCenter(posicao);
        this.mapa.setZoom(15);
    }
}

export async function inicializarSistemaBuscaGoogleMaps(mapa) {
    const sistemaBusca = new SistemaBuscaMapaGoogle(mapa);
    await sistemaBusca.init();
    return sistemaBusca;
}
