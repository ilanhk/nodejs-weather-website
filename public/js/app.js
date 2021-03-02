console.log('client side js file is loaded')

// fetch('http://localhost:3000/weather?search=Boston').then((response) =>{
//     response.json().then((data) =>{
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })//this fetches data from a url and then runs this callback fucntion


const weatherForm = document.querySelector('form')
const search_text = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS' //.textContent allows you to change a string in the browser

weatherForm.addEventListener('submit', (event_object)=>{
    event_object.preventDefault() // prevents the default behavior of refreshing the browser when click submit

    const location = search_text.value

    // console.log(location)

    const searchUrl = 'http://localhost:3000/weather?search=' + location

    messageOne.textContent = 'Loading...'
            messageTwo.textContent = ''

    fetch(searchUrl).then((response) =>{
    response.json().then((data) =>{
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})//this fetches data from a url and then runs this callback fucntion
}) //two arguments are the name of the event and a function