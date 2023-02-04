import data from '../../token.json'
import axios from "axios";
import {errorWindow} from "./errorWindow";
import {mapFindLocation} from "./mapInteracting";

//Контейнеры с информацией по ip
const ipAddress = document.getElementById('IpAddress')
const location = document.getElementById('Location')
const timezone = document.getElementById('Timezone')
const isp = document.getElementById('ISP')

//Переменные для взаимодействия с api для ip
const ipUrl = 'https://ipgeolocation.abstractapi.com/v1/?'
const ipToken = `api_key=${data.IP_API_TOKEN}`
const ipFieldsArray = ['ip_address,city','timezone','connection','longitude','latitude']
const ipOptions = `fields=${ipFieldsArray.join(',')}`

//IP запрос на сервер
export async function ipInfoSearching(ip)
{
    try
    {
        const yourIpData = typeof ip !== 'string' ?
            await axios.get(`${ipUrl}${ipToken}&${ipOptions}`).then(data => {return data.data}) :
                await axios.get(`${ipUrl}${ipToken}&${ipOptions}&ip_address=${ip}`).then(data => {return data.data})

        ipAddress.textContent = yourIpData.ip_address
        location.textContent = yourIpData.city
        isp.textContent = yourIpData.connection.autonomous_system_organization

        const gmtTime = yourIpData.timezone.gmt_offset
        timezone.textContent = `UTC  ${gmtTime < 0 ? '-0' + (gmtTime+'')[1] : '0' + gmtTime}:00`

        mapFindLocation(yourIpData.latitude,yourIpData.longitude)
    }
    catch (e)
    {
        console.error(e)
        errorWindow('Ip api connection error')
    }

}

//Domain запрос на сервер
export async function domainSearchInfo(domain)
{
    try
    {
        const token = data.DOMAIN_API_TOKEN
        const domainUrl = `https://www.whoisxmlapi.com/whoisserver/` +
            `WhoisService?apiKey=${token}&domainName=${domain}&outputFormat=JSON`
        const domainApiResponseData = await axios.get(domainUrl).then(data => {return data.data.WhoisRecord})

        const domainName = domainApiResponseData?.domainName
        const domainCountry = domainApiResponseData?.registryData?.registrant?.country
        const domainRegister = domainApiResponseData?.registrarName

        ipAddress.textContent = domainName === undefined ? '–' : domainName
        location.textContent = domainCountry === undefined ? '–' : domainCountry
        isp.textContent = domainRegister === undefined ? '–' : domainRegister
        timezone.textContent = `–`
    }
    catch (e)
    {
        console.error(e)
        errorWindow('Domain api connection error')
    }
}

window.onload = ipInfoSearching