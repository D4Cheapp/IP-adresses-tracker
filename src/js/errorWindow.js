const errorContainer = document.getElementById('ErrorContainer')

//Функция вызова контейнера ошибки
export function errorWindow(text)
{
    errorContainer.textContent = `Error : ${text}`

    errorContainer.parentElement.classList.add('Error-Happens')
    setTimeout(()=>
    {
        errorContainer.parentElement.classList.remove('Error-Happens')
    },3000)
}