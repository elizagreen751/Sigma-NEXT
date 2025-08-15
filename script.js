function whenClicked() {
    const textf = document.getElementById("text-field")
    const inputField = document.getElementById("input-field")
    const inputText = inputField.value
    textf.innerHTML = inputText
    //Sva the data  the server
    fetch("http://0.0.0.0:3000/myname",{
        method:"POST",
        body:JSON.stringify({name:inputText}),
        headers:{
            'Content-Type':"application/json"
        }
    })
}
const buttonEl = document.getElementById("myButton")
buttonEl.addEventListener('click', whenClicked)
fetch('http://0.0.0.0:3000/myname').then(process_name_response) //specify the protocol (http://)
function process_name_response(response){
    response.json().then(process_json)}
function process_json(json){
    console.log(json['name'])
    const textf = document.getElementById('text-field')
    textf.innerHTML=json['name']
}
