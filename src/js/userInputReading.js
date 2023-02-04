//Считывание элементов кнопки и ввода
import {domainSearchInfo, ipAndDomainInfoSearching} from "./ipAndDomainInfoSearching";
import {errorWindow} from "./errorWindow";

const userInput = document.getElementById('UserInput')
const searchButton = document.getElementById('SearchButton')

//Считывание ввода по нажатию на кнопку поиска и на кнопку enter
searchButton.addEventListener('click', (key) => inputValidate(key,true))
userInput.addEventListener('keypress', (key) => inputValidate(key))

//Функция валидации ввода
async function inputValidate(key, isButton)
{
    if ((key.key === 'Enter' || isButton) && !!userInput.value.trim())
    {
        if (new RegExp(/\d+\.\d+\.\d+\.\d+/gm).test(userInput.value))
        {
            await ipAndDomainInfoSearching(userInput.value)
        }
        else if (new RegExp(/\w+\.\w+/gm).test(userInput.value))
        {
            await domainSearchInfo(userInput.value)
        }
        else
        {
            errorWindow('Вы ввели неправильный запрос')
        }
        userInput.value = ''
    }
    if (!userInput.value.trim())
    {
        userInput.value = ''
    }
}