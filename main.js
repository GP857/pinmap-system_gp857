import { usuarios } from './dados.js';

window.initMap = () => {
    console.log("Inicializando o mapa...");

    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error("Elemento #map não encontrado.");
        return;
    }

    const map = new google.maps.Map(mapElement, {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapId: "4e6d7b9df89250e7ae048791",
        gestureHandling: "greedy",
        mapTypeControl: true,
        streetViewControl: false,
    });

    const infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });

    if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
        console.warn("Nenhum dado de usuário encontrado.");
        new google.maps.Marker({
            position: { lat: -15.795, lng: -47.891 },
            map,
            title: "Brasília",
            icon: "https://maps.gstatic.com/mapfiles/ms2/micons/flag.png"
        });
        return;
    }

    const markers = usuarios.map(user => {
        if (!user.latitude || !user.longitude) return null;

        const marker = new google.maps.Marker({
            position: {
                lat: parseFloat(user.latitude),
                lng: parseFloat(user.longitude)
            },
            title: user.nome || "Sem nome",
            icon: user.icone || "https://maps.gstatic.com/mapfiles/ms2/micons/blue.png",
        });

        marker.addListener('click', () => {
            const content = `
                <div class="info-window">
                    <
