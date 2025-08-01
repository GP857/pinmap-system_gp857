export function inicializarSistemaBuscaGoogleMaps(mapa) {
  class SistemaBuscaMapaGoogle {
    constructor(mapa) {
      this.mapa = mapa;
      this.markers = [];
      this.infoWindow = new google.maps.InfoWindow();
    }

    limparMarcadores() {
      for (const marker of this.markers) {
        marker.setMap(null);
      }
      this.markers = [];
    }

    adicionarMarcador(posicao, titulo, descricao, linkDetalhes) {
      const marker = new google.maps.Marker({
        position: posicao,
        map: this.mapa,
        title: titulo,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // ou seu ícone SVG/PNG
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      marker.addListener('click', () => {
        const conteudo = `
          <div style="max-width: 200px;">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
            <a href="${linkDetalhes}" target="_blank">Ver mais</a>
          </div>
        `;
        this.infoWindow.setContent(conteudo);
        this.infoWindow.open(this.mapa, marker);
      });

      this.markers.push(marker);
    }
  }

  return new SistemaBuscaMapaGoogle(mapa);
}
