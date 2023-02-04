import * as L from 'leaflet'
import Marker from '../images/icon-location.svg'
import {errorWindow} from "./errorWindow";

//Html элемент для вставки карты
const mapContainer = document.getElementById('Map')
const map = L.map(mapContainer,
    {
        center: [0,0],
        zoom: 13
    })

//Функция для загрузки карты по переданным координатам
export function mapFindLocation(x,y)
{
    try
    {
        map.setView([x,y])
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([x,y]).addTo(map)

        const markers = document.getElementsByClassName('leaflet-marker-icon')
        markers[markers.length-1].src = Marker

        if (markers.length > 1)
            document.getElementsByClassName('leaflet-marker-icon')[0].remove()
    }
    catch (e)
    {
        console.error(e)
        errorWindow('maps api error')
    }

}
