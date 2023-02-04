import {Loader} from '@googlemaps/js-api-loader'
import data from '../../token.json'
import {errorWindow} from "./errorWindow";

//Настройка подключения к api google maps
const loader = new Loader(
{
    apiKey: data.GOOGLE_MAPS_API_TOKEN,
    version: 'weekly',
    libraries: ['places']
})

//Html элемент для вставки карты
const mapContainer = document.getElementById('Map')

//Функция для загрузки карты по переданным координатам
export function mapFindLocation(x,y)
{
    const mapOption =
    {
        center:
        {
            lat: x,
            lng: y
        },
        zoom: 13
    }

    loader
        .load()
            .then(google =>
                {
                    new google.maps.Map(mapContainer,mapOption)
                })
        .catch(e =>
        {
            console.error(e)
            errorWindow('Не удалось загрузить карту')
        })
}