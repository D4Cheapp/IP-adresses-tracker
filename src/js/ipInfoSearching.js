import data from '../../token.json'
import axios from "axios";
import {errorWindow} from "./errorWindow";
import {mapFindLocation} from "./mapInteracting";

//Контейнеры с информацией по ip
const ipAddress = document.getElementById('IpAddress')
const location = document.getElementById('Location')
const timezone = document.getElementById('Timezone')
const isp = document.getElementById('ISP')

//Переменные для взаимодействия с api
const url = 'https://ipgeolocation.abstractapi.com/v1/?'
const token = `api_key=${data.IP_API_TOKEN}`
const fieldsArray = ['ip_address,city','timezone','connection','longitude','latitude']
const fields = `fields=${fieldsArray.join(',')}`

export async function ipInfoSearching(ip = null)
{
    try
    {
        const yourIpData = !!ip ?
            await axios.get(`${url}${token}&${fields}`).then(data => {return data.data}) :
                await axios.get(`${url}${token}&${fields}&ip_address=${ip}`).then(data => {return data.data})

        ipAddress.textContent = yourIpData.ip_address
        location.textContent = yourIpData.city
        isp.textContent = yourIpData.connection.autonomous_system_organization

        const gmtTime = yourIpData.timezone.gmt_offset
        timezone.textContent = `GMT  ${gmtTime < 0 ? '-0' + (gmtTime+'')[1] : '0' + gmtTime}:00`

        const latitude = yourIpData.latitude
        const longitude = yourIpData.longitude
        mapFindLocation(latitude,longitude)
    }
    catch (e)
    {
        console.error(e)
        errorWindow('Api connection error')
    }

}

window.onload = ipInfoSearching