import * as L from 'leaflet'
import Marker from '../images/icon-location.svg'
import {errorWindow} from "./errorWindow";

//Html элемент для вставки карты
const mapContainer = document.getElementById('Map')

//Функция для загрузки карты по переданным координатам
export function mapFindLocation(x,y)
{
    try
    {
        const map = L.map(mapContainer,
    {
            center: [x,y],
            zoom: 13
        })
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([x,y]).addTo(map)

        document.getElementsByClassName('leaflet-marker-icon')[0].src = Marker
    }
    catch (e)
    {
        console.error(e)
        errorWindow('Google maps api error')
    }

}
