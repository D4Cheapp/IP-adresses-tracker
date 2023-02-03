//Считывание элементов кнопки и ввода
import {ipInfoSearching} from "./ipInfoSearching";

const userInput = document.getElementById('UserInput')
const searchButton = document.getElementById('SearchButton')

//Считывание ввода по нажатию на кнопку поиска и на кнопку enter
searchButton.addEventListener('click', (key) => inputValidate(key))
userInput.addEventListener('keypress', (key) => inputValidate(key))

//Функция валидации ввода
async function inputValidate(key)
{
    if (key.key === 'Enter' && !!userInput.value.trim())
    {
        await ipInfoSearching(userInput.value)
        userInput.value = ''
    }
    if (!userInput.value.trim())
    {
        userInput.value = ''
    }
}