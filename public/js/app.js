//console.log('Client side java script')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    const localUrl = 'http://localhost:3000/weather?address='+ location;

    fetch(localUrl).then((response)=>{
        response.json().then((data) => {
            if (data.error)  {
                messageOne.textContent = data.error
            }
            else if (data.message) {
                messageOne.textContent = data.message
            }
            
            else {
                console.log(data)
                messageOne.textContent = 'Current Weather at ' + data.location + ' is ' + data.description 
                messageTwo.textContent = 'with temperature at ' + data.temperature + ' degree C and '
                messageThree.textContent = 'feels like ' + data.feelslike
            }
        })
    })
})